
import { useState, useEffect } from "react"
import {
    Heart,
    AlertCircle,
    MapPin,
    Calendar,
    Zap,
    Users,
    Phone,
    Settings,
    Bell,
    LogOut,
    Search,
    Filter,
    Activity,
    Clock,
    CheckCircle,
    UsersRound, X, Check
} from "lucide-react"
import { FaArrowRightFromBracket } from "react-icons/fa6"
import { useNavigate } from "react-router"
import API from "../api/api"
import NearbyHospital from "./NearbyHospital";

export default function RecipientDashboard({ user, setUser }) {
    const [requestType, setRequestType] = useState("Blood/Platelets");
    const [urgencyLevel, setUrgencyLevel] = useState("Critical");
    const [organType, setOrganType] = useState("Kidney");
    const [emergencyResults, setEmergencyResults] = useState([]);

    const [activeTab, setActiveTab] = useState("blood")
    const [searchQuery, setSearchQuery] = useState("");

    const [editModal, setEditModal] = useState(false);
    const [editName, setEditName] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [sidebar, setSidebar] = useState(null);
    const [emergencySent, setEmergencySent] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [responses, setResponses] = useState([]);
    const [respondedRequests, setRespondedRequests] = useState([]);

    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const fetchNotifications = async () => {

        try {

            const res = await API.get("/notifications", {
                withCredentials: true
            });

            setNotifications(res.data);

            const unread = res.data.filter(n => !n.isRead).length;
            setUnreadCount(unread);

        } catch (err) {
            console.error(err);
        }

    };
    useEffect(() => {

        fetchNotifications();

        const interval = setInterval(() => {
            fetchNotifications();
        }, 8000);

        return () => clearInterval(interval);

    }, []);
    const toggleNotifications = async () => {

        const opening = sidebar !== "notifications";
        setSidebar(opening ? "notifications" : null);

        if (opening) {

            try {

                await API.put("/notifications/read", {}, {
                    withCredentials: true
                });

                setNotifications(prev =>
                    prev.map(n => ({
                        ...n,
                        isRead: true
                    }))
                );

                setUnreadCount(0);

            } catch (err) {
                console.error(err);
            }

        }

    };
    useEffect(() => {
        fetchResponses();
    }, []);

const fetchResponses = async () => {
    try {
        const res = await API.get("/notifications", {
            withCredentials: true
        });

        setResponses(res.data || []);
    } catch (err) {
        console.error("Error fetching responses:", err);
    }
};

    const toggleTheme = () => {
        setDarkMode(!darkMode);

        if (!darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };
    const activeRequestsData = responses.filter((r) =>
        activeTab === "blood"
            ? r.donorType === "Blood/Platelets"
            : r.donorType === "Organ Transplant"
    );

    // SEARCH FILTER
    const filteredRequests = activeRequestsData.filter((req) => {
        const q = searchQuery.toLowerCase();

        return (
            req.donorName?.toLowerCase().includes(q) ||
            req.donorBlood?.toLowerCase().includes(q) ||
            req.organType?.toLowerCase().includes(q) ||
            req.donorLocation?.toLowerCase().includes(q)
        );
    });
    const useractiveRequests = [
        {
            id: 1,
            icon: Heart,
            title: "Blood Request",
            urgency: "Critical",
            bloodType: "O+",
            hospital: "City Hospital",
            responses: 3,
            time: "2 hours ago",
            status: "Active",
            bgColor: "bg-red-100",
            iconColor: "text-red-600",
        },
        {
            id: 2,
            icon: Zap,
            title: "Kidney Request",
            urgency: "High",
            organ: "Kidney",
            hospital: "Transplant Center",
            responses: 2,
            time: "1 day ago",
            status: "Matching",
            bgColor: "bg-amber-100",
            iconColor: "text-amber-600",
        },
    ]

    const history = [
        {
            id: 1,
            title: "Blood Transfusion",
            tag: "blood",
            location: "Emergency Hospital",
            date: "2025-05-03",
            donor: "Anonymous Donor",
        },
        {
            id: 2,
            title: "Kidney Transplant",
            tag: "organ",
            location: "Transplant Center",
            date: "2025-07-13",
            donor: "Living Donor",
        },
    ]
    const navigate = useNavigate();
    const [showHospitals, setShowHospitals] = useState(false);

    const handleEmergencyRequest = async () => {

        if (emergencySent) return;

        try {

            const res = await API.post(
                "/emergency",
                {
                    donorType: requestType,
                    organType: organType
                },
                { withCredentials: true }
            );

            if (res.data.alreadySent) {
                setEmergencySent(true);
                return;
            }

            setEmergencySent(true);

            const res2 = await API.get("/donordata", {
                withCredentials: true
            });

            setEmergencyResults(res2.data.data || []);

        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        checkExistingRequest();
    }, []);

    const checkExistingRequest = async (type = requestType, organ = organType) => {
        try {

            const res = await API.get("/my-emergency", {
                withCredentials: true
            });

            if (!res.data.requests) {
                setEmergencySent(false);
                return;
            }

            const exists = res.data.requests.some((req) =>
                req.donorType === type &&
                (type !== "Organ Transplant" || req.organType === organ)
            );

            setEmergencySent(exists);

        } catch (err) {
            console.error(err);
        }
    };
    const handleLogout = async () => {
        try {
            //  Destroy backend session
            await API.post("/logout", {}, { withCredentials: true });
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            //  Clear frontend auth
            localStorage.removeItem("user");
            setUser(null);
            setDropdownOpen(false);

            //  Hard redirect to reset app state
            window.location.href = "/";
        }
    };

    const updateProfile = async () => {

        try {

            const res = await API.put(
                "/update-profile",
                {
                    name: editName,
                    address: editAddress
                },
                {
                    withCredentials: true
                }
            );

            const updatedUser = res.data.user;

            setUser(updatedUser);

            localStorage.setItem("user", JSON.stringify(updatedUser));

            setEditModal(false);

            alert("Profile Updated Successfully");

        } catch (err) {

            console.log(err);

            alert("Update Failed");

        }

    };

    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            day: 86400,
            hour: 3600,
            minute: 60
        };

        for (let key in intervals) {
            const value = Math.floor(seconds / intervals[key]);
            if (value >= 1) {
                return `${value} ${key}${value > 1 ? "s" : ""} ago`;
            }
        }

        return "Just now";
    };
    const [acceptedResponse, setAcceptedResponse] = useState(null);
    const [hospitals, setHospitals] = useState([]);
    const [showHospitalSelect, setShowHospitalSelect] = useState(false);

    const acceptDonor = async (responseId) => {
        try {
            const res = await API.put(
                `/accept-response/${responseId}`,
                {},
                { withCredentials: true }
            );

            if (res.data.success) {
                setAcceptedResponse(res.data.data); // or res.data.response
            }

            // fetch hospitals for your city (reuse user.address logic)
            const city = user?.address?.split(",").pop().trim() || "";
            const resHosp = await API.get(`/hospitals?city=${encodeURIComponent(city)}`, { withCredentials: true });
            setHospitals(resHosp.data || []);
            setShowHospitalSelect(true);
        } catch (err) {
            console.error("Accept failed", err);
        }
    };

    // select hospital for accepted response
    const selectHospital = async (hospitalId) => {
        try {
            if (!acceptedResponse) return;
            await API.put("/assign-hospital", { responseId: acceptedResponse._id, hospitalId }, { withCredentials: true });
            // refresh responses / notifications
            fetchResponses();
            setShowHospitalSelect(false);
            alert("Hospital assigned and donor will be notified.");
        } catch (err) {
            console.error("Assign hospital failed", err);
        }
    };
    return (
        <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-12">            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full h-16 bg-white/95 backdrop-blur-md text-gray-900 z-50 border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto h-full px-4 md:px-6 flex justify-between items-center">
                    {/* Brand */}
                    <div className="flex items-center gap-2 text-xl font-bold">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                            <Heart size={24} className="text-white" />
                        </div>
                        <span className="hidden sm:inline text-gray-900">LifeLink</span>
                    </div>

                    {/* Center Title */}
                    <div className="hidden md:flex flex-col items-center">
                        <h1 className="font-semibold text-gray-900">Recipient Dashboard</h1>
                        <p className="text-xs text-gray-500">Welcome back</p>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3 md:gap-4">
                        <button
                            onClick={toggleNotifications}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                        >
                            <Bell size={20} className="text-gray-600" />

                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() =>
                                setSidebar(sidebar === "settings" ? null : "settings")
                            }
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Settings size={20} className="text-gray-600" />
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Home
                        </button>

                        <button onClick={() => handleLogout()} className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-500 hover:text-white rounded-lg transition-colors font-medium text-sm">
                            <FaArrowRightFromBracket size={16} />
                            Logout
                        </button>

                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Emergency Request Card */}
                        <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900">Emergency Request</h2>
                            </div>
                            <p className="text-sm text-gray-600 mb-6">
                                Send urgent request to nearby donors and hospitals for blood or organ needs
                            </p>

                            {/* Form */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Request Type</label>
                                    <select
                                        value={requestType}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setRequestType(value);
                                            checkExistingRequest(value, organType);
                                        }}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >         <option>Blood/Platelets</option>
                                        <option>Organ Transplant</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                                    <select value={urgencyLevel} onChange={(e) => setUrgencyLevel(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                                        <option>Critical</option>
                                        <option>High</option>
                                        <option>Medium</option>
                                    </select>
                                </div>
                                <div>
                                    {requestType === "Organ Transplant" && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Organ Type
                                            </label>

                                            <select
                                                value={organType}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setOrganType(value);
                                                    checkExistingRequest(requestType, value);
                                                }} className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                <option>Kidney</option>
                                                <option>Liver</option>
                                                <option>Heart</option>
                                                <option>Eyes</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={handleEmergencyRequest}
                                disabled={emergencySent}
                                className={`w-full px-6 py-3 font-semibold rounded-lg transition-all duration-200
${emergencySent
                                        ? "bg-emerald-500 text-white cursor-not-allowed"
                                        : "bg-red-600 hover:bg-red-700 text-white"}
`}
                            >
                                {emergencySent ? "Emergency Sent " : "Send Emergency Request"}
                            </button>
                            {/* Nearby Donor Matches */}
                            {emergencyResults.length > 0 && (

                                <div className="mt-6">

                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-gray-900">
                                            Nearby Donors
                                        </h3>

                                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                                            {emergencyResults.length} Matches
                                        </span>
                                    </div>


                                    {/* Responsive Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                        {emergencyResults.map((donor, index) => (

                                            <div
                                                key={index}
                                                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                                            >

                                                {/* Top Row */}
                                                <div className="flex items-center justify-between mb-3">

                                                    <div className="flex items-center gap-3">

                                                        {/* Avatar */}
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold shadow-sm">
                                                            {donor.name ? donor.name[0].toUpperCase() : "D"}
                                                        </div>

                                                        <div>
                                                            <p className="font-semibold text-gray-900">
                                                                {donor.name}
                                                            </p>

                                                            <p className="text-xs text-gray-500">
                                                                Donor Available
                                                            </p>
                                                        </div>

                                                    </div>


                                                    {/* Blood Badge */}
                                                    <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                        {donor.bloodType}
                                                    </div>

                                                </div>



                                                {/* Info Section */}
                                                <div className="space-y-1 text-sm text-gray-600">

                                                    <p>
                                                        📍 {donor.address}
                                                    </p>

                                                    <p>
                                                        📞 {donor.phone}
                                                    </p>

                                                </div>



                                                {/* Buttons */}
                                                <div className="flex gap-2 mt-4">

                                                    <a
                                                        href={`tel:${donor.phone}`}
                                                        className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold"
                                                    >
                                                        Call
                                                    </a>

                                                    <button
                                                        className="flex-1 border border-red-500 text-red-600 hover:bg-red-50 py-2 rounded-lg text-sm font-semibold"
                                                    >
                                                        Request
                                                    </button>

                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                </div>

                            )}                   </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">

                            {/* Heading */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <Search className="w-5 h-5 text-purple-600" />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900">Find Donors</h2>
                            </div>

                            <p className="text-sm text-gray-600 mb-6">
                                Search for compatible blood and organ donors in your area
                            </p>

                            {/* Search Bar */}
                            <div className="flex flex-col md:flex-row gap-3 mb-6">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search by location, blood type, organ type..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />

                                    {/* Clear Button (X Icon) */}
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <X size={18} />
                                        </button>
                                    )}
                                </div>

                                <button className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-gray-900 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                                    <Filter className="w-4 h-4" />
                                    <span className="hidden sm:inline">Filters</span>
                                </button>
                            </div>


                            {/* Tabs */}
                            <div className="flex gap-2 mb-6 border-b border-slate-200">
                                <button
                                    onClick={() => setActiveTab("blood")}
                                    className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === "blood"
                                        ? "border-red-600 text-red-600"
                                        : "border-transparent text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    Blood Donors
                                </button>

                                <button
                                    onClick={() => setActiveTab("organ")}
                                    className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === "organ"
                                        ? "border-red-600 text-red-600"
                                        : "border-transparent text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    Organ Donors
                                </button>
                            </div>

                            {/* Donor List */}
                            <div className="space-y-3">
                                {filteredRequests.length > 0 ? (
                                    filteredRequests.map((req) => (

                                        <div
                                            key={req._id}
                                            className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
                                        >

                                            <div className="flex items-center gap-4">

                                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                                    <Heart className="w-5 h-5 text-red-600" />
                                                </div>

                                                <div>

                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold text-gray-900">
                                                            {req.donorName || "Unknown Donor"}
                                                        </h3>
                                                        <h3 className="font-semibold text-gray-900">
                                                            {activeTab === "blood" ? req.donorBlood : req.organType}
                                                        </h3>

                                                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-red-100 text-red-700">
                                                            Donor
                                                        </span>

                                                    </div>

                                                    <p className="text-sm text-gray-600">
                                                        {req.donorLocation}
                                                    </p>

                                                    <p className="text-sm text-gray-600">
                                                        📞 {req.donorPhone}
                                                    </p>
                                                    <p className="text-xs text-green-600 font-medium mt-1">
                                                        {timeAgo(req.createdAt)}
                                                    </p>

                                                </div>
                                            </div>


                                            {/* Accept / Ignore Buttons */}
                                            <div className="flex items-center gap-2">

                                                {/* Accept */}
                                                <button
                                                    onClick={() => acceptDonor(req._id)}
                                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 transition"
                                                    title="Accept"
                                                >
                                                    ✓
                                                </button>
                                                {/* Ignore */}
                                                <button
                                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 transition"
                                                    title="Ignore"
                                                >
                                                    ✕
                                                </button>

                                            </div>

                                        </div>

                                    ))
                                ) : (
                                    <p className="text-center text-gray-500 py-6 text-sm">
                                        No donors responded yet
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* Active Requests */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                                    <Activity className="w-5 h-5 text-emerald-600" />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900">Active Requests</h2>
                            </div>

                            <div className="space-y-4">
                                {useractiveRequests.map((req) => (
                                    <div
                                        key={req.id}
                                        className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`${req.bgColor} p-3 rounded-lg`}>
                                                <req.icon className={`${req.iconColor} w-5 h-5`} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold text-gray-900">{req.title}</h3>
                                                    <span
                                                        className={`text-xs px-2 py-1 rounded-full font-medium ${req.urgency === "Critical" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                                                            }`}
                                                    >
                                                        {req.urgency}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    {req.hospital} • {req.responses} responses
                                                </p>
                                                <p className="text-xs text-gray-500">Created {req.time}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="inline-block text-xs px-3 py-1 rounded-full font-medium bg-emerald-100 text-emerald-700 mb-2">
                                                {req.status}
                                            </span>
                                            <button className="block w-full text-xs px-3 py-1 border border-gray-300 hover:bg-gray-50 rounded-full transition-colors">
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Profile Card */}
                        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-blue-100 rounded-lg">
                                    <UsersRound size={20} className="text-blue-600" />
                                </div>
                                <h2 className="font-semibold text-gray-900">Your Profile</h2>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-md">
                                    {user ? user.name[0].toUpperCase() : "U"}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 capitalize">{user ? user.name : "User001"}</p>
                                    <p className="text-sm text-gray-600 capitalize">Blood Type : {user ? user.bloodType : "unkown"} </p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Location</span>
                                    <span className="font-medium text-gray-900 capitalize">
                                        {user?.address || "Not specified"}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Member Since</span>
                                    <span className="font-medium text-gray-900 capitalize">{user ? user.memberSince : "Sep 21, 2025"}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 capitalize">{user ? user.accounType : "unkown"}</span>
                                    <span className="flex items-center gap-1 font-medium text-emerald-600">
                                        <CheckCircle size={14} /> Registered
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setEditModal(true);
                                    setEditName(user?.name || "");
                                    setEditAddress(user?.address || "");
                                }}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <Settings size={16} /> Edit Profile
                            </button>
                        </section>

                        {/* Medical Info Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <div className="flex items-center gap-2 mb-6">
                                <Heart className="w-5 h-5 text-red-600" />
                                <h3 className="font-bold text-gray-900">Medical Info</h3>
                            </div>

                            <div className="space-y-3 text-sm mb-6">
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Blood Type</span>
                                    <span className="text-red-600 font-semibold"> {user ? user.bloodType : "unkown"}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span className="font-medium">Conditions</span>
                                    <span>0 listed</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span className="font-medium">Medications</span>
                                    <span>0 listed</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span className="font-medium">Allergies</span>
                                    <span>0 listed</span>
                                </div>
                            </div>

                            <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                                Update Medical Info
                            </button>
                        </div>

                        {/* Recent History */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <div className="flex items-center gap-2 mb-6">
                                <Calendar className="w-5 h-5 text-amber-600" />
                                <h3 className="font-bold text-gray-900">Recent History</h3>
                            </div>

                            <div className="space-y-3 mb-6">
                                {history.map((item) => (
                                    <div
                                        key={item.id}
                                        className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-all"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                                                <p className="text-xs text-gray-600">{item.location}</p>
                                                <p className="text-xs text-gray-500">{item.date}</p>
                                            </div>
                                            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                                                Completed
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full px-4 py-2 border border-slate-300 hover:bg-slate-50 rounded-lg font-medium text-gray-900 transition-colors">
                                View Full History
                            </button>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <div className="flex items-center gap-2 mb-6">
                                <Clock className="w-5 h-5 text-red-600" />
                                <h3 className="font-bold text-gray-900">Quick Actions</h3>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { icon: MapPin, label: "Find Nearby Hospitals", action: () => setShowHospitals(true) },
                                    { icon: Users, label: "Join Support Groups" },
                                    { icon: Calendar, label: "Schedule Appointment" },
                                    { icon: Phone, label: "Contact Support" },
                                ].map((action, idx) => (
                                    <button
                                        key={idx}
                                        onClick={action.action}
                                        className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-red-300 hover:bg-red-50 transition-all group"
                                    >
                                        <action.icon className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                                        <span className="text-sm font-medium text-gray-900">{action.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Notification Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 
${sidebar === "notifications" ? "translate-x-0" : "translate-x-full"}`}
            >

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">Notifications</h2>

                    <button
                        onClick={() => setSidebar(null)}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Notification List */}
                <div className="p-4 space-y-3">

                    {notifications.map((n) => (
                        <div
                            key={n._id}
                            className={`p-4 rounded-lg border 
${n.isRead ? "bg-gray-50" : "bg-red-50 border-red-200"}`}
                        >

                            <p className="text-sm font-medium text-gray-800">
                                {n.donorName} is willing to donate
                                {n.donorType === "Blood/Platelets" ? " blood" : ` ${n.organType}`} at your location
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                {timeAgo(n.createdAt)}
                            </p>

                        </div>
                    ))}

                </div>
            </div>

            {/* Settings Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 
${sidebar === "settings" ? "translate-x-0" : "translate-x-full"}`}
            >

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Settings size={20} /> Settings
                    </h2>

                    <button
                        onClick={() => setSidebar(null)}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Settings Options */}
                <div className="p-4 space-y-4">

                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                            {darkMode ? "🌙" : "☀️"}
                            <span className="text-sm font-medium">
                                {darkMode ? "Dark Mode" : "Light Mode"}
                            </span>
                        </div>

                        <button
                            onClick={toggleTheme}
                            className="px-3 py-1 bg-gray-200 rounded-lg text-sm"
                        >
                            Toggle
                        </button>
                    </div>

                    {/* Brightness */}
                    <div className="p-3 border rounded-lg">
                        <p className="text-sm font-medium mb-2">Brightness</p>

                        <input
                            type="range"
                            min="50"
                            max="150"
                            defaultValue="100"
                            className="w-full"
                            onChange={(e) => {
                                document.body.style.filter = `brightness(${e.target.value}%)`;
                            }}
                        />
                    </div>

                </div>

            </div>

            {/* update profile */}
            {editModal && (

                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md">

                        <h2 className="text-xl font-bold mb-4">
                            Edit Profile
                        </h2>

                        <label className="block text-sm mb-1">
                            Name
                        </label>

                        <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full border p-2 rounded mb-4"
                        />


                        <label className="block text-sm mb-1">
                            Location
                        </label>

                        <input
                            value={editAddress}
                            onChange={(e) => setEditAddress(e.target.value)}
                            className="w-full border p-2 rounded mb-4"
                        />


                        <div className="flex gap-3">

                            <button
                                onClick={updateProfile}
                                className="flex-1 bg-red-600 text-white p-2 rounded-lg"
                            >
                                Save
                            </button>

                            <button
                                onClick={() => setEditModal(false)}
                                className="flex-1 bg-gray-300 p-2 rounded-lg"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

            )}

            {/* after respond */}
            {showHospitalSelect && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-[90%] max-w-lg">
                        <h3 className="text-lg font-bold mb-4">Select Hospital</h3>

                        {hospitals.length === 0 ? (
                            <p>No hospitals found in your city. You can add one from Hospital Dashboard.</p>
                        ) : (
                            <div className="space-y-3 max-h-60 overflow-auto">
                                {hospitals.map(h => (
                                    <div key={h._id} className="p-3 border rounded flex justify-between items-start">
                                        <div>
                                            <div className="font-semibold">{h.name}</div>
                                            <div className="text-sm text-gray-600">{h.address}</div>
                                            <div className="text-xs text-gray-500">{h.phone}</div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <a href={`tel:${h.phone}`} className="px-3 py-1 bg-emerald-500 text-white rounded text-sm">Call</a>
                                            <button onClick={() => selectHospital(h._id)} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Select</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-4 text-right">
                            <button onClick={() => setShowHospitalSelect(false)} className="px-4 py-2 bg-gray-200 rounded">Close</button>
                        </div>
                    </div>
                </div>
            )}
            {showHospitals && (

                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-2xl relative">

                        <button
                            onClick={() => setShowHospitals(false)}
                            className="absolute top-3 right-3"
                        >
                            X
                        </button>

                        <NearbyHospital />

                    </div>

                </div>

            )}
        </div>
    )
}
