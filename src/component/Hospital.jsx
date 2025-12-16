import { useState } from "react"
import {
    AlertTriangle,
    Activity,
    Settings,
    Bell,
    Heart,
    Clock,
    Star,
    Shield,
    Search,
    Filter,
    Plus,
    ChevronRight,
} from "lucide-react"
import { FaArrowRightFromBracket } from "react-icons/fa6"
import { useNavigate } from "react-router";
import API from "../api/api";

export default function HospitalDashboard({ user, setUser }) {
    const [activeTab, setActiveTab] = useState("overview")
    const navigate = useNavigate();

    // Mock data
    const activeRequests = [
        {
            id: "P-2024-001",
            urgency: "Critical",
            group: "O-",
            department: "Emergency",
            units: 4,
            doctor: "Dr. Smith",
            responses: 2,
            time: "15 min ago",
            state: "Active",
        },
        {
            id: "P-2024-002",
            urgency: "High",
            group: "A+",
            department: "Surgery",
            units: 2,
            doctor: "Dr. Johnson",
            responses: 5,
            time: "1 hour ago",
            state: "Matching",
        },
        {
            id: "P-2024-003",
            urgency: "Medium",
            group: "B+",
            department: "Oncology",
            units: 1,
            doctor: "Dr. Williams",
            responses: 3,
            time: "3 hours ago",
            state: "Scheduled",
        },
    ]

    const donors = [
        { id: "Juhi", miles: "0.8", group: "O-", rating: 4.9, available: true, time: "3 months ago" },
        { id: "Saumya", miles: "1.2", group: "A+", rating: 4.8, available: true, time: "now" },
        { id: "Minal", miles: "2.1", group: "B+", rating: 5, available: false, time: "in 30 min" },
    ]

    const bloodInventory = [
        { group: "B+", current: 45, min: 20, max: 100, status: "Good", percent: 80 },
        { group: "A-", current: 12, min: 15, max: 80, status: "Low", percent: 30 },
        { group: "B+", current: 6, min: 20, max: 60, status: "Critical", percent: 10 },
        { group: "AB+", current: 25, min: 10, max: 70, status: "Normal", percent: 50 },
        { group: "O+", current: 45, min: 20, max: 100, status: "Good", percent: 80 },
        { group: "A+", current: 12, min: 15, max: 80, status: "Low", percent: 30 },
        { group: "B-", current: 6, min: 20, max: 60, status: "Critical", percent: 10 },
        { group: "O-", current: 25, min: 10, max: 70, status: "Normal", percent: 50 },
    ]

    const getStatusStyles = (status) => {
        switch (status) {
            case "Critical":
                return "bg-red-50 border-red-200 text-red-700"
            case "High":
                return "bg-orange-50 border-orange-200 text-orange-700"
            case "Medium":
                return "bg-blue-50 border-blue-200 text-blue-700"
            default:
                return "bg-gray-50 border-gray-200 text-gray-700"
        }
    }

    const getInventoryStatus = (status) => {
        switch (status) {
            case "Critical":
                return "bg-red-100 text-red-700"
            case "Low":
                return "bg-yellow-100 text-yellow-700"
            case "Good":
                return "bg-emerald-100 text-emerald-700"
            default:
                return "bg-blue-100 text-blue-700"
        }
    }

    const getProgressColor = (status) => {
        switch (status) {
            case "Critical":
                return "bg-red-500"
            case "Low":
                return "bg-yellow-500"
            case "Good":
                return "bg-emerald-500"
            default:
                return "bg-blue-500"
        }
    }
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



    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-12">
            {/* Navigation */}
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
                        <h1 className="font-semibold text-gray-900">Hospital Dashboard</h1>
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
                        {/* <button
                            onClick={() => setIsAvailable(!isAvailable)}
                            className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-all duration-200 text-white ${isAvailable ? "bg-emerald-500 hover:bg-emerald-600" : "bg-gray-400 hover:bg-gray-500"}`}
                        >
                            {isAvailable ? "Available" : "Unavailable"}
                        </button> */}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Tabs */}
                <div className="flex gap-2 mb-8 border-b border-slate-200">
                    {["Overview", "Inventory", "Requests", "Donors"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            className={`px-4 py-3 font-medium border-b-2 transition ${activeTab === tab.toLowerCase()
                                ? "border-red-600 text-red-600"
                                : "border-transparent text-slate-600 hover:text-slate-900"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <div className="space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-slate-600 text-sm font-medium">Active Requests</p>
                                        <p className="text-3xl font-bold text-red-600 mt-2">12</p>
                                    </div>
                                    <AlertTriangle className="text-red-500" size={32} />
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-slate-600 text-sm font-medium">Available Donors</p>
                                        <p className="text-3xl font-bold text-emerald-600 mt-2">47</p>
                                    </div>
                                    <Shield className="text-emerald-500" size={32} />
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-slate-600 text-sm font-medium">Blood Units</p>
                                        <p className="text-3xl font-bold text-purple-600 mt-2">153</p>
                                    </div>
                                    <Heart className="text-purple-500" size={32} />
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-slate-600 text-sm font-medium">Response Time</p>
                                        <p className="text-3xl font-bold text-teal-600 mt-2">8m</p>
                                    </div>
                                    <Clock className="text-teal-500" size={32} />
                                </div>
                            </div>
                        </div>

                        {/* Alerts and Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
                                    <AlertTriangle size={20} className="text-red-500" />
                                    Critical Alerts
                                </h3>
                                <div className="space-y-4">
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <p className="font-semibold text-red-900">A- Blood Critical</p>
                                            <span className="text-xs bg-red-600 text-white px-3 py-1 rounded-full">Critical</span>
                                        </div>
                                        <p className="text-sm text-red-700 mb-3">Only 8 units remaining (minimum: 10)</p>
                                        <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition">
                                            Request Emergency Supply
                                        </button>
                                    </div>

                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <p className="font-semibold text-yellow-900">O- Blood Low</p>
                                            <span className="text-xs bg-yellow-600 text-white px-3 py-1 rounded-full">Low</span>
                                        </div>
                                        <p className="text-sm text-yellow-700 mb-3">12 units remaining (minimum: 15)</p>
                                        <button className="border border-yellow-300 hover:bg-yellow-100 text-yellow-700 text-sm px-4 py-2 rounded-lg transition">
                                            Find Donors
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
                                    <Activity size={20} className="text-purple-500" />
                                    Recent Activity
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                                        <div>
                                            <p className="text-sm text-emerald-700 font-medium">Received 3 units of O+</p>
                                            <p className="text-xs text-slate-500 mt-1">2024-01-20 at 14:30</p>
                                        </div>
                                        <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">Completed</span>
                                    </div>

                                    <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                                        <div>
                                            <p className="text-sm text-purple-700 font-medium">Distributed 2 units of A-</p>
                                            <p className="text-xs text-slate-500 mt-1">2024-01-20 at 12:15</p>
                                        </div>
                                        <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">Completed</span>
                                    </div>

                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-sm text-blue-700 font-medium">Received 1 unit of B+</p>
                                            <p className="text-xs text-slate-500 mt-1">2024-01-19 at 16:45</p>
                                        </div>
                                        <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">Processing</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Inventory Tab */}
                {activeTab === "inventory" && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Blood Inventory</h2>
                                <p className="text-slate-600 text-sm mt-1">Current blood bank status and levels</p>
                            </div>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                                <Plus size={18} />
                                Add Inventory
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {bloodInventory.map((blood, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-bold text-slate-900">{blood.group}</span>
                                        <span
                                            className={`text-xs font-semibold px-3 py-1 rounded-full ${getInventoryStatus(blood.status)}`}
                                        >
                                            {blood.status}
                                        </span>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-slate-600">Current</span>
                                            <span className="font-semibold text-slate-900">{blood.current} Units</span>
                                        </div>

                                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                                            <div
                                                className={`h-full ${getProgressColor(blood.status)}`}
                                                style={{ width: `${blood.percent}%` }}
                                            ></div>
                                        </div>

                                        <div className="flex justify-between text-xs text-slate-500">
                                            <p>Min: {blood.min}</p>
                                            <p>Max: {blood.max}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Requests Tab */}
                {activeTab === "requests" && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Active Requests</h2>
                                <p className="text-slate-600 text-sm mt-1">Manage blood donation requests</p>
                            </div>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                                <Plus size={18} />
                                New Request
                            </button>
                        </div>

                        <div className="space-y-4">
                            {activeRequests.map((request, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center">
                                                <Heart className="text-pink-600" size={24} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                    <span className="font-semibold text-slate-900">Patient {request.id}</span>
                                                    <span
                                                        className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusStyles(request.urgency)}`}
                                                    >
                                                        {request.urgency}
                                                    </span>
                                                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                                                        {request.group}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-600">
                                                    {request.department} • {request.units} units needed • Dr. {request.doctor}
                                                </p>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    {request.responses} donor responses • {request.time}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`text-xs font-semibold px-3 py-1 rounded-full ${request.state === "Active"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : request.state === "Matching"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-purple-100 text-purple-700"
                                                    }`}
                                            >
                                                {request.state}
                                            </span>
                                            <button className="border border-slate-300 hover:bg-slate-100 text-slate-700 text-sm px-4 py-2 rounded-lg transition">
                                                Details
                                            </button>
                                            <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg transition flex items-center gap-2">
                                                Manage
                                                <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Donors Tab */}
                {activeTab === "donors" && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Donor Network</h2>
                                <p className="text-slate-600 text-sm mt-1">Available donors in your area</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="border border-slate-300 hover:bg-slate-100 text-slate-700 px-4 py-2 rounded-lg flex items-center gap-2 transition">
                                    <Filter size={18} />
                                    Filter
                                </button>
                                <button className="border border-slate-300 hover:bg-slate-100 text-slate-700 px-4 py-2 rounded-lg flex items-center gap-2 transition">
                                    <Search size={18} />
                                    Search
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {donors.map((donor, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center font-bold text-purple-600 text-lg">
                                                {donor.id.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-semibold text-slate-900">{donor.id}</span>
                                                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                                                        {donor.group}
                                                    </span>
                                                    <Shield className="text-emerald-600" size={16} />
                                                </div>
                                                <p className="text-sm text-slate-600">
                                                    {donor.miles} miles • <Star className="inline text-yellow-400" size={14} /> {donor.rating}{" "}
                                                    rating
                                                </p>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    Available {donor.available ? "now" : "in 30 min"} • Last donation: {donor.time}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <button className="border border-slate-300 hover:bg-slate-100 text-slate-700 text-sm px-4 py-2 rounded-lg transition">
                                                Profile
                                            </button>
                                            <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition">
                                                Contact
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
