import { useState } from "react"
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

function DonorDashboard({ user, setUser }) {
    const [isAvailable, setIsAvailable] = useState(false)
    const [activeTab, setActiveTab] = useState("blood")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate();

    console.log("user is", user);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/", { replace: true });
    };

    const requests = {
        organs: [
            {
                type: "Kidney",
                urgency: "Critical",
                match: "98%",
                matchColor: "bg-emerald-100 text-emerald-700",
                urgencyColor: "bg-red-500 text-white",
                center: "Transplant Center",
                distance: "1.5 mi",
                time: "30 min ago",
                waiting: "2 yrs",
            },
            {
                type: "Liver (Living)",
                urgency: "High",
                match: "95%",
                matchColor: "bg-emerald-100 text-emerald-700",
                urgencyColor: "bg-orange-500 text-white",
                center: "Medical Center",
                distance: "3.2 mi",
                time: "2 hrs ago",
                waiting: "8 mo",
            },
            {
                type: "Cornea",
                urgency: "Medium",
                match: "100%",
                matchColor: "bg-emerald-100 text-emerald-700",
                urgencyColor: "bg-slate-300 text-slate-700",
                center: "Eye Institute",
                distance: "4.1 mi",
                time: "1 day ago",
                waiting: "6 mo",
            },
        ],
        blood: [
            {
                type: "O+",
                urgency: "Critical",
                urgencyColor: "bg-red-500 text-white",
                hospital: "Emergency Hospital",
                distance: "0.8 mi",
                time: "2 min ago",
            },
            {
                type: "O+",
                urgency: "High",
                urgencyColor: "bg-orange-500 text-white",
                hospital: "City Medical",
                distance: "1.2 mi",
                time: "15 min ago",
            },
            {
                type: "O-",
                urgency: "Medium",
                urgencyColor: "bg-slate-300 text-slate-700",
                hospital: "General Hospital",
                distance: "2.1 mi",
                time: "1 hr ago",
            },
        ],
    }

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
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Bell size={20} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
                            onClick={() => setIsAvailable(!isAvailable)}
                            className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-all duration-200 text-white ${isAvailable ? "bg-emerald-500 hover:bg-emerald-600" : "bg-gray-400 hover:bg-gray-500"}`}
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
                                        onClick={() => setIsAvailable(!isAvailable)}
                                        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${isAvailable ? "bg-emerald-500" : "bg-gray-300"}`}
                                    >
                                        <div
                                            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${isAvailable ? "translate-x-6" : "translate-x-1"}`}
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
                                    {(activeTab === "blood" ? requests.blood : requests.organs).map((req, idx) => (
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
                                                        <h3 className="font-semibold text-gray-900">{req.type}</h3>
                                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${req.urgencyColor}`}>
                                                            {req.urgency}
                                                        </span>
                                                        {activeTab === "organs" && (
                                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${req.matchColor}`}>
                                                                {req.match} Match
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600">
                                                        {activeTab === "blood" ? req.hospital : req.center} • {req.distance}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">{req.time}</p>
                                                </div>
                                            </div>
                                            <button className="ml-4 px-4 py-2 rounded-lg font-semibold text-white transition-all text-sm group-hover:scale-105 bg-red-600 hover:bg-red-700">
                                                Respond
                                            </button>
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
                                        <span className="text-gray-600 capitalize">{user ? user.accounType : "unkown"}</span>
                                        <span className="flex items-center gap-1 font-medium text-emerald-600">
                                            <CheckCircle size={14} /> Registered
                                        </span>
                                    </div>
                                </div>

                                <button className="w-full px-4 py-2 rounded-lg border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
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
        </>
    )
}

export default DonorDashboard