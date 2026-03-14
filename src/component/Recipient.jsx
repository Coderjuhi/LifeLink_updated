
import { useState } from "react"
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
    UsersRound, X
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

    const [darkMode, setDarkMode] = useState(false);

    const notifications = [
        {
            id: 1,
            message: "You have 1 new message",
            time: "Just now"
        }
    ];
    const toggleTheme = () => {
        setDarkMode(!darkMode);

        if (!darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    const requests = {
        organs: [
            {
                type: "Kidney",
                urgency: "Critical",
                match: "98%",
                center: "Transplant Center",
                distance: "1.5 miles",
                time: "30 min ago",
                waiting: "2 years",
            },
            {
                type: "Liver (Living)",
                urgency: "High",
                match: "95%",
                center: "Medical Center",
                distance: "3.2 miles",
                time: "2 hours ago",
                waiting: "8 months",
            },
        ],
        blood: [
            {
                type: "O+",
                urgency: "Critical",
                hospital: "Emergency Hospital",
                distance: "0.8 miles",
                time: "2 min ago",
            },
            {
                type: "O+",
                urgency: "High",
                hospital: "City Medical",
                distance: "1.2 miles",
                time: "15 min ago",
            },
        ],
    }
    // ACTIVE TAB SE REQUESTS
    const activeRequestsData =
        activeTab === "blood" ? requests.blood : requests.organs;

    // SEARCH FILTER
    const filteredRequests = activeRequestsData.filter((req) => {
        const q = searchQuery.toLowerCase();
        return (
            req.type.toLowerCase().includes(q) ||
            req.hospital?.toLowerCase().includes(q) ||
            req.center?.toLowerCase().includes(q) ||
            req.distance?.toLowerCase().includes(q)
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

        try {

            // Step 1 → Send emergency request
            const res1 = await API.post(
                "/emergency",
                {
                    donorType: requestType,
                    organType: organType

                },
                {
                    withCredentials: true
                }
            );

            alert(res1.data.message);


            // Step 2 → Fetch matched donors
            const res2 = await API.get(
                "/donordata",
                {
                    withCredentials: true
                }
            );

            const matches = res2.data.data || [];
            setEmergencyResults(res2.data.data || []);

            localStorage.setItem("totalMatches", matches.length);



            if (!matches.length) {
                alert("No donors found");
            }

        } catch (err) {

            console.error(err);

            alert(err.response?.data?.message || "Error");

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
                            onClick={() =>
                                setSidebar(sidebar === "notifications" ? null : "notifications")
                            }
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                        >
                            <Bell size={20} className="text-gray-600" />

                            {notifications.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                    {notifications.length}
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
                                    <select value={requestType} onChange={(e) => setRequestType(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                                        <option>Blood/Platelets</option>
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
                                                onChange={(e) => setOrganType(e.target.value)}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
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

                            <button onClick={handleEmergencyRequest} className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
                                Send Emergency Request
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
                                    onClick={() => setActiveTab("organs")}
                                    className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === "organs"
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
                                    filteredRequests.map((req, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                                    <Heart className="w-5 h-5 text-red-600" />
                                                </div>

                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold text-gray-900">{req.type}</h3>
                                                        <span
                                                            className={`text-xs px-2 py-1 rounded-full font-medium ${req.urgency === "Critical"
                                                                ? "bg-red-100 text-red-700"
                                                                : "bg-amber-100 text-amber-700"
                                                                }`}
                                                        >
                                                            {req.urgency}
                                                        </span>
                                                    </div>

                                                    <p className="text-sm text-gray-600">
                                                        {req.hospital || req.center} • {req.distance}
                                                    </p>
                                                </div>
                                            </div>

                                            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors text-sm">
                                                Respond
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500 py-6 text-sm">
                                        No data found
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
                        onClick={() => setNotificationOpen(false)}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Notification List */}
                <div className="p-4 space-y-3">

                    {notifications.map((n) => (
                        <div
                            key={n.id}
                            className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                        >
                            <p className="text-sm font-medium text-gray-800">
                                {n.message}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                                {n.time}
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
                        onClick={() => setSettingsOpen(false)}
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
