import { useState, useEffect } from "react"
import axios from "axios";

import {
    Settings,
    Bell,
    Activity,
    MapPin,
    Calendar,
    Zap,
    Heart,
    UsersRound,
    Award,
    Phone,
    Clock,
    X,
    CheckCircle,
} from "lucide-react"
import { FaArrowRightFromBracket } from "react-icons/fa6"
import { useNavigate } from "react-router"
import API from "../api/api";

function DonorDashboard({ user, setUser }) {
    const [isAvailable, setIsAvailable] = useState(false);

    // Now the toggle never flips wrongly on refresh
    useEffect(() => {
        if (typeof user?.availability === "boolean") {
            setIsAvailable(user.availability);
        }
    }, [user]);




    const [activeTab, setActiveTab] = useState("blood")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editModal, setEditModal] = useState(false);
    const [editName, setEditName] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [bloodRequests, setBloodRequests] = useState([]);
    const [organRequests, setOrganRequests] = useState([]);
    const [respondedRequests, setRespondedRequests] = useState([]);
    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState(null);
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [acceptedData, setAcceptedData] = useState(null);

    useEffect(() => {
        const checkAccepted = async () => {
            try {
                const res = await API.get("/accepted-response", {
                    withCredentials: true
                });

                if (res.data.accepted) {
                    setAcceptedData({ ...res.data.data });
                }
            } catch (err) {
                console.log(err);
            }
        };

        checkAccepted(); // run only once

    }, []);


    useEffect(() => {

        const fetchNotifications = async () => {

            try {

                const res = await API.get("/request-notifications", {
                    withCredentials: true
                });

                setNotifications(res.data.data);


                const unread = res.data.data.filter(n => !n.isRead).length;
                setUnreadCount(unread);

            } catch (err) {
                console.log(err);
            }

        };

        fetchNotifications();

    }, []);
    const toggleNotifications = async () => {

        const opening = sidebar !== "notifications";

        setSidebar(opening ? "notifications" : null);

        if (opening) {
            try {

                await API.put("/request-notifications/read", {}, {
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
    const toggleTheme = () => {
        setDarkMode(!darkMode);

        if (!darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    useEffect(() => {

        const fetchRequests = async () => {
            try {

                const res = await API.get("/nearby-requests", {
                    withCredentials: true
                });

                const allRequests = res.data.data;


                const blood = allRequests.filter(
                    r => r.donorType === "Blood/Platelets"
                );

                const organs = allRequests.filter(
                    r => r.donorType === "Organ Transplant"
                );


                setBloodRequests(blood);
                setOrganRequests(organs);

            } catch (err) {
                console.log(err);
            }
        };

        fetchRequests();

    }, []);

    const handleLogout = async () => {
        try {
            // Destroy backend session
            await API.post("/logout", {}, { withCredentials: true });
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            // Clear frontend auth
            localStorage.removeItem("user");
            setUser(null);
            setDropdownOpen(false);

            // Hard redirect to reset app state
            window.location.href = "/";
        }
    };



    const recentDonations = [
        {
            id: 1,
            title: "Blood Donation",
            bloodType: "O+",
            hospital: "City Hospital",
            distance: "1.2 mi",
            time: "2 hrs ago",
        },
        {
            id: 2,
            title: "Blood Donation",
            bloodType: "A-",
            hospital: "Emergency Clinic",
            distance: "0.8 mi",
            time: "30 min ago",
        },
        {
            id: 3,
            title: "Organ Screening",
            bloodType: "B+",
            hospital: "General Hospital",
            distance: "2.1 mi",
            time: "1 day ago",
        },
    ]

    const upcomingEvents = [
        { id: 1, title: "Blood Donation", tag: "blood", location: "City Hospital", date: "May 3, 2025", time: "10:00 AM" },
        {
            id: 2,
            title: "Health Checkup",
            tag: "general",
            location: "LifeLink Clinic",
            date: "Jul 13, 2025",
            time: "4:00 PM",
        },
        {
            id: 3,
            title: "Organ Compatibility",
            tag: "organ",
            location: "Transplant Center",
            date: "Aug 3, 2025",
            time: "11:00 AM",
        },
    ]

    const updateAvailability = async () => {
        try {
            const newStatus = !isAvailable;

            // instant UI update
            setIsAvailable(newStatus);

            const res = await axios.put(
                "http://localhost:5000/api/update-availability",
                { availability: newStatus },
                { withCredentials: true }
            );

            const updatedUser = {
                ...user,
                availability: res.data.user.availability,
            };

            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
        } catch (err) {
            console.error(err);
            setIsAvailable(prev => !prev); // rollback if failed
        }
    };



    const timeAgo = (date) => {
        if (!date) return "";

        const seconds = Math.floor((new Date() - new Date(date)) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            day: 86400,
            hour: 3600,
            minute: 60
        };

        for (let key in intervals) {
            const interval = Math.floor(seconds / intervals[key]);

            if (interval >= 1) {
                return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
            }
        }

        return "Just now";
    };

    const handleRespond = async (requestId, donorType) => {
        try {

            const res = await API.post(
                "/respond",
                {
                    requestId,
                    donorType
                },
                { withCredentials: true }
            );

            if (res.data.alreadyResponded) {
                setRespondedRequests(prev => [...prev, requestId]);
                return;
            }

            if (res.data.success) {
                setRespondedRequests(prev => [...prev, requestId]);
            }

        } catch (err) {
            console.log(err);
        }
    };
    const handleHospitalRespond = async (requestId) => {
        try {
            const res = await API.post(
                "/hospital-respond",
                { requestId, action: "assigned" },
                { withCredentials: true }
            );

            if (res.data.alreadyResponded) {
                alert("You have already responded to this request.");
                return;
            }

            if (res.data.success) {
                alert("Response recorded successfully!");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to respond. Try again.");
        }
    };
    useEffect(() => {

        const fetchResponses = async () => {

            const res = await API.get("/my-responses", {
                withCredentials: true
            });

            const ids = res.data.data.map(r => r.requestId.toString());
            setRespondedRequests(ids);

        };

        fetchResponses();

    }, []);

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

            alert("Profile Updated");

        } catch (err) {

            console.log(err);

            alert("Update Failed");

        }
    };

    return (
        <>
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
                        <h1 className="font-semibold text-gray-900">Donor Dashboard</h1>
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
                        <button
                            onClick={updateAvailability}
                            className={`px-4 py-1.5 rounded-full font-semibold text-sm text-white ${isAvailable
                                ? "bg-emerald-500 hover:bg-emerald-600"
                                : "bg-gray-400 hover:bg-gray-500"
                                }`}
                        >
                            {isAvailable ? "Available" : "Unavailable"}
                        </button>




                    </div>
                </div>
            </nav>

            <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-12">
                <div className="max-w-7xl mx-auto p-4 md:p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* LEFT COLUMN - Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Donation Status Card */}
                            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-blue-100 rounded-lg">
                                            <Activity size={20} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <h2 className="font-semibold text-gray-900">Donation Availability</h2>
                                            <p className="text-xs text-gray-500">Control your donation status</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={updateAvailability}
                                        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${isAvailable ? "bg-emerald-500" : "bg-gray-300"
                                            }`}
                                    >
                                        <div
                                            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${isAvailable ? "translate-x-6" : "translate-x-1"
                                                }`}
                                        ></div>
                                    </button>

                                </div>

                                <div
                                    className={`p-4 rounded-xl border-l-4 ${isAvailable ? "bg-emerald-50 border-emerald-500" : "bg-gray-50 border-gray-300"}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div
                                            className={`w-3 h-3 rounded-full mt-1 ${isAvailable ? "bg-emerald-500" : "bg-gray-400"}`}
                                        ></div>
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {isAvailable ? "You're available for donations" : "Currently unavailable"}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {isAvailable
                                                    ? "Hospitals can see your profile and request donations"
                                                    : "You won't receive donation requests"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Nearby Requests */}
                            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 bg-red-100 rounded-lg">
                                        <MapPin size={20} className="text-red-600" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-gray-900">Nearby Requests</h2>
                                        <p className="text-xs text-gray-500">Respond to urgent blood & organ needs</p>
                                    </div>
                                </div>

                                {/* Tab Navigation */}
                                <div className="flex gap-2 mb-6">
                                    {["blood", "organs"].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === tab ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                        >
                                            {tab === "blood" ? "Blood Requests" : "Organ Requests"}
                                        </button>
                                    ))}
                                </div>

                                {/* Requests List */}
                                <div className="space-y-3">
                                    {(activeTab === "blood" ? bloodRequests : organRequests).map((req, idx) => (

                                        <div
                                            key={idx}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100 group"
                                        >

                                            <div className="flex items-start gap-4 flex-1">

                                                <div className={`p-2.5 rounded-lg ${activeTab === "blood" ? "bg-pink-100" : "bg-purple-100"}`}>
                                                    {activeTab === "blood" ? (
                                                        <Heart className="text-pink-600" size={20} />
                                                    ) : (
                                                        <Zap className="text-purple-600" size={20} />
                                                    )}
                                                </div>

                                                <div className="flex-1">

                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-semibold text-gray-900">
                                                            {activeTab === "blood"
                                                                ? req.bloodGrp
                                                                : `${req.organType} (${req.bloodGrp || "Any Blood Group"})`}
                                                        </h3>

                                                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-500 text-white">
                                                            Emergency
                                                        </span>

                                                    </div>

                                                    <p className="text-sm text-gray-600">
                                                        {req.sessionId?.address}
                                                    </p>

                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {req.ownerType === "hospital" ? "Hospital" : "Recipient"}: {req.sessionId?.name}
                                                    </p>

                                                    {/* Live Time */}
                                                    <p className="text-xs text-green-600 font-medium mt-1">
                                                        {timeAgo(req.createdAt)}
                                                    </p>

                                                </div>

                                            </div>

                                            {respondedRequests.includes(req._id.toString()) ? (

                                                <button
                                                    disabled
                                                    className="ml-4 px-4 py-2 rounded-lg font-semibold text-white text-sm bg-green-500 cursor-not-allowed"
                                                >
                                                    Responded
                                                </button>

                                            ) :


                                                user.accountType === "donor" ? (
                                                    <button
                                                        onClick={() => handleRespond(req._id, req.donorType)}
                                                        className="ml-4 px-4 py-2 rounded-lg font-semibold text-white text-sm bg-red-600 hover:bg-red-700"
                                                    >
                                                        Respond
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleHospitalRespond(req._id)}
                                                        className="ml-4 px-4 py-2 rounded-lg font-semibold text-white text-sm bg-blue-600 hover:bg-blue-700"
                                                    >
                                                        Respond
                                                    </button>
                                                )
                                            }



                                        </div>

                                    ))}
                                </div>
                            </section>

                            {/* Recent Donations */}
                            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 bg-purple-100 rounded-lg">
                                        <Calendar size={20} className="text-purple-600" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-gray-900">Recent Donations</h2>
                                        <p className="text-xs text-gray-500">Your donation history and impact</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {recentDonations.map((donation) => (
                                        <div
                                            key={donation.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex items-start gap-4 flex-1">
                                                <div className="p-2.5 bg-purple-100 rounded-lg">
                                                    <CheckCircle className="text-purple-600" size={20} />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{donation.title}</h3>
                                                    <p className="text-sm text-gray-600">
                                                        {donation.hospital} • {donation.distance}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">{donation.time}</p>
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 bg-white text-gray-600 rounded-lg text-sm font-medium border border-gray-200">
                                                {donation.bloodType}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

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
                                        <span className="text-gray-600 capitalize">{user ? user.accountType : "unkown"}</span>
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

                            {/* Impact Stats */}
                            <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 bg-red-200 rounded-lg">
                                        <Award size={20} className="text-red-600" />
                                    </div>
                                    <h2 className="font-semibold text-gray-900">Your Impact</h2>
                                </div>

                                <div className="text-center mb-6">
                                    <div className="text-4xl font-bold text-red-600 mb-1">18</div>
                                    <p className="text-gray-700 font-medium">Lives Saved</p>
                                </div>

                                <div className="space-y-3 mb-6 pb-6 border-t border-red-200 pt-6">
                                    {[
                                        { label: "Blood Donations", value: "8" },
                                        { label: "Organ Donations", value: "2" },
                                        { label: "Blood Donated", value: "3.2L" },
                                        { label: "Avg Response Time", value: "12 min" },
                                    ].map((stat, idx) => (
                                        <div key={idx} className="flex justify-between text-sm">
                                            <span className="text-gray-700">{stat.label}</span>
                                            <span className="font-semibold text-gray-900">{stat.value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mb-2">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium text-gray-900">Next Milestone</span>
                                        <span className="font-medium text-gray-900">20 Lives</span>
                                    </div>
                                    <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                                        <div className="h-full w-4/5 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                                    </div>
                                </div>
                            </section>

                            {/* Upcoming Events */}
                            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 bg-amber-100 rounded-lg">
                                        <Clock size={20} className="text-amber-600" />
                                    </div>
                                    <h2 className="font-semibold text-gray-900">Upcoming</h2>
                                </div>

                                <div className="space-y-3 mb-6">
                                    {upcomingEvents.map((event) => (
                                        <div
                                            key={event.id}
                                            className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="font-semibold text-gray-900 text-sm">{event.title}</h3>
                                                <span className="text-xs px-2 py-1 rounded-full bg-white text-gray-600 border border-gray-200 font-medium">
                                                    {event.tag}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                                                <MapPin size={14} /> {event.location}
                                            </p>
                                            <p className="text-xs text-emerald-600 font-medium">
                                                {event.date} • {event.time}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full px-4 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm">
                                    Schedule Donation
                                </button>
                            </section>

                            {/* Emergency SOS */}
                            <section className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white border border-red-500">
                                <div className="flex items-center gap-3 mb-4">
                                    <Phone size={20} />
                                    <h2 className="font-semibold">Emergency SOS</h2>
                                </div>
                                <p className="text-sm text-red-100 mb-4">
                                    Send urgent alerts to nearby hospitals for critical blood or organ needs.
                                </p>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-full px-4 py-2.5 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2 text-sm"
                                >
                                    <Phone size={16} /> Emergency SOS
                                </button>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            {/* /*****update model */}
            {editModal && (

                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

                    <div className="bg-white p-6 rounded-xl w-96">

                        <h2 className="text-lg font-bold mb-4">
                            Edit Profile
                        </h2>

                        <label className="block mb-2 text-sm">
                            Name
                        </label>

                        <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full border p-2 rounded mb-4"
                        />

                        <label className="block mb-2 text-sm">
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
                                className="flex-1 bg-red-600 text-white p-2 rounded"
                            >
                                Save
                            </button>

                            <button
                                onClick={() => setEditModal(false)}
                                className="flex-1 bg-gray-300 p-2 rounded"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

            )}

            \

            {/* Emergency Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Emergency Alert</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Your emergency SOS has been sent to nearby hospitals and donors. You'll receive responses shortly.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="w-full px-4 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                        >
                            Got it
                        </button>
                    </div>
                </div>
            )}

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

                            <p className="text-sm font-semibold text-gray-800">
                                {n.ownerType === "hospital" ? "Hospital" : "Recipient"} is requesting for{" "}

                                {n.donorType === "Blood/Platelets" && `${n.bloodGrp} blood `}

                                {n.donorType === "Organ Transplant" && `${n.organType} transplant `}

                                at your location
                            </p>

                            <p className="text-xs text-green-600 mt-1">
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
            {/* ACCEPTED POPUP (VERY IMPORTANT) */}
            {acceptedData && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
                    <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl">

                        <h2 className="text-xl font-bold text-green-600 mb-2">
                            🎉 You were selected!
                        </h2>

                        <p className="text-gray-700 mb-4">
                            Recipient accepted your response.
                        </p>

                        {/* Hospital Info */}
                        {acceptedData.hospitalId ? (
                            <div className="p-3 border rounded mb-4">
                                <p className="font-semibold text-gray-900">
                                    {acceptedData.hospitalId.name}
                                </p>

                                <p className="text-sm text-gray-600">
                                    {acceptedData.hospitalId.address}
                                </p>

                                <p className="text-xs text-gray-500">
                                    {acceptedData.hospitalId.phone}
                                </p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 mb-4">
                                Waiting for hospital assignment...
                            </p>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2">

                            {acceptedData.hospitalId && (
                                <>
                                    <a
                                        href={`tel:${acceptedData.hospitalId.phone}`}
                                        className="flex-1 text-center bg-emerald-600 text-white py-2 rounded"
                                    >
                                        Call
                                    </a>

                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={`https://www.google.com/maps?q=${acceptedData.hospitalId.lat},${acceptedData.hospitalId.lng}`}
                                        className="flex-1 text-center border py-2 rounded"
                                    >
                                        Navigate
                                    </a>
                                </>
                            )}

                            <button
                                onClick={() => setAcceptedData(null)}
                                className="px-4 py-2 bg-gray-200 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DonorDashboard