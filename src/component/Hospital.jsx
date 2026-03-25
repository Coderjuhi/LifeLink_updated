import { useState, useEffect } from "react"
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
    const [requests, setRequests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [donorType, setDonorType] = useState("Blood/Platelets");
    const [bloodGrp, setBloodGrp] = useState("A+");
    const [organType, setOrganType] = useState("Kidney");
    const [showDetails, setShowDetails] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [responses, setResponses] = useState([]);
    const [responseCounts, setResponseCounts] = useState({});


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
    const createRequest = async (data) => {
        try {
            const res = await API.post("/request/create", data);

            const newRequest = res.data.data;

            setRequests((prev) => [newRequest, ...prev]);

            setShowModal(false);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const updatedCounts = {};

                await Promise.all(
                    requests.map(async (req) => {
                        const res = await API.get(`/responses/${req._id}`, {
                            withCredentials: true,
                        });

                        updatedCounts[req._id] = res.data.data.length;
                    })
                );

                setResponseCounts(updatedCounts);
            } catch (err) {
                console.error("Error fetching counts", err);
            }
        };

        if (requests.length > 0) {
            fetchCounts();
        }
    }, [requests]);
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await API.get("/nearby-requests", { withCredentials: true });
                setRequests(res.data.data);
            } catch (err) {
                console.error("Error fetching requests", err);
            }
        };

        fetchRequests();
    }, []);
    const fetchResponses = async (requestId) => {
        try {
            const res = await API.get(`/responses/${requestId}`, {
                withCredentials: true,
            });

            setResponses(res.data.data);
            setSelectedRequestId(requestId);
            setShowDetails(true);
        } catch (err) {
            console.error("Error fetching responses", err);
        }
    };

    return (
        <>
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
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                                >
                                    <Plus size={18} />
                                    New Request
                                </button>
                            </div>

                            <div className="space-y-4">
                                {requests.map((req, index) => (

                                    <div
                                        key={index}
                                        className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition"
                                    >
                                        <div className="flex items-start justify-between">

                                            {/* LEFT SIDE */}
                                            <div>
                                                {/* Requested Blood / Organ Big Letters */}
                                                <p className="text-2xl font-bold text-red-500 mb-1">
                                                    {req.donorType?.toLowerCase().includes("blood")
                                                        ? req.bloodGrp
                                                        : `${req.organType || "Unknown"} (${req.bloodGrp || "N/A"})`}

                                                </p>

                                                {/* Responses count */}
                                                <p className="text-sm text-gray-500 mb-2">
                                                    {responseCounts[req._id] ?? 0} donor responses                                                </p>
                                            </div>

                                            {/* RIGHT SIDE ACTIONS */}
                                            <div className="flex items-center gap-2">

                                                <button
                                                    onClick={() => fetchResponses(req._id)}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
                                                >
                                                    Details
                                                </button>

                                                <button
                                                    onClick={() => navigate(`/manage-request/${req._id}`)}
                                                    className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition"
                                                >
                                                    Manage
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
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Create Request</h2>

                        {/* Request Type */}
                        <label className="block mb-2 text-sm font-medium">Select Type</label>
                        <select
                            value={donorType}
                            onChange={(e) => setDonorType(e.target.value)}
                            className="w-full border p-2 rounded-lg mb-4"
                        >
                            <option>Blood/Platelets</option>
                            <option>Organ Transplant</option>
                        </select>

                        {/* Blood Group Dropdown */}
                        {donorType === "Blood/Platelets" && (
                            <>
                                <label className="block mb-2 text-sm font-medium">Blood Group</label>
                                <select
                                    value={bloodGrp}
                                    onChange={(e) => setBloodGrp(e.target.value)}
                                    className="w-full border p-2 rounded-lg mb-4"
                                >
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </>
                        )}

                        {/* Organ Dropdown */}
                        {donorType === "Organ Transplant" && (
                            <>
                                <label className="block mb-2 text-sm font-medium">Organ Type</label>
                                <select
                                    value={organType}
                                    onChange={(e) => setOrganType(e.target.value)}
                                    className="w-full border p-2 rounded-lg mb-4"
                                >
                                    <option value="Kidney">Kidney</option>
                                    <option value="Liver">Liver</option>
                                    <option value="Heart">Heart</option>
                                    <option value="Lungs">Lungs</option>
                                    <option value="Pancreas">Pancreas</option>
                                </select>
                                <label className="block mb-2 text-sm font-medium">Blood Group</label>
                                <select
                                    value={bloodGrp}
                                    onChange={(e) => setBloodGrp(e.target.value)}
                                    className="w-full border p-2 rounded-lg mb-4"
                                >
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>

                            </>
                        )}

                        {/* Buttons */}
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 border rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={async () => {
                                    try {
                                        await API.post("/emergency", {
                                            donorType,
                                            bloodGrp,
                                            organType: donorType === "Organ Transplant" ? organType : null
                                        }, { withCredentials: true });

                                        setShowModal(false);

                                        const res = await API.get("/nearby-requests", { withCredentials: true });
                                        setRequests(res.data.data);

                                    } catch (err) {
                                        console.error(err);
                                    }
                                }}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                Send Request
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showDetails && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-lg">

                        <h2 className="text-lg font-bold mb-4">
                            Donor Responses
                        </h2>

                        {responses.length > 0 ? (
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {responses.map((d, i) => (
                                    <div key={i} className="border p-3 rounded-lg">
                                        <p className="font-semibold">
                                            {d.donorName || "Unknown Donor"}
                                        </p>

                                        <p className="text-sm text-gray-600">
                                            {d.donorBlood} • {d.donorLocation}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            {d.donorPhone || "No contact"}
                                        </p>

                                        <span className="text-xs text-blue-600">
                                            Status: {d.status || "pending"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No donors responded yet</p>
                        )}

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setShowDetails(false)}
                                className="px-4 py-2 border rounded-lg"
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
