// File: AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import {
    AlertTriangle,
    Activity,
    Settings,
    Bell,
    Building2,
    MapPin,
    Heart,
    Clock,
    Users,
    Eye,
    Edit,
    Trash2,
    Download,
    TrendingUp,
    ShieldCheck,
    LogOut,
    Plus,
    Funnel,
} from "lucide-react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useNavigate } from "react-router"
import API from "../api/api";

const API_BASE = "http://localhost:5000"; // make sure this is added

// ---------- sample fallback data ----------
const SAMPLE_HOSPITALS = [
    { name: "City Hospital", location: "New York, NY", status: "Active", totalRequests: 45, fulfillmentRate: 92 },
    { name: "Emergency Medical Center", location: "Los Angeles, CA", status: "Active", totalRequests: 38, fulfillmentRate: 89 },
    { name: "General Hospital", location: "Chicago, IL", status: "Pending", totalRequests: 12, fulfillmentRate: 95 },
];

const SAMPLE_USERS = [
    { name: "Juhi", email: "juhig@gmail.com", role: "Donor", bloodType: "O+", status: "Active", joined: "1/15/2024", donations: "5" },
    { name: "Saumya", email: "saumya123@gmail.com", role: "Recipient", bloodType: "A-", status: "Active", joined: "1/10/2024", donations: "0" },
    { name: "City Hospital", email: "admin@cityhospital.com", role: "Hospital", bloodType: "-", status: "Active", joined: "12/1/2023", donations: "-" },
    { name: "Minal", email: "mike@example.com", role: "Donor", bloodType: "B+", status: "Inactive", joined: "11/20/2023", donations: "12" },
];

// ---------- UPDATED DEFAULT METRICS ----------
const DEFAULT_METRICS = {
    totalUsers: 0,
    activeDonors: 0,
    partnerHospitals: 0,
    livesConnected: 0,
};

// ---------- tabs ----------
const TABS = [
    { id: "overview", label: "Overview", icon: <Activity size={20} /> },
    { id: "users", label: "Users", icon: <Users size={20} /> },
    { id: "hospitals", label: "Hospitals", icon: <Building2 size={20} /> },
    { id: "analytics", label: "Analytics", icon: <TrendingUp size={20} /> },
    { id: "system", label: "System", icon: <Settings size={20} /> },
];

export default function AdminDashboard({ user, setUser }) {
    const [activeTab, setActiveTab] = useState("overview");
    const [loading, setLoading] = useState(true);

    // UPDATED: metrics start with 0, not default strings
    const [metrics, setMetrics] = useState(DEFAULT_METRICS);

    const [users, setUsers] = useState(SAMPLE_USERS);
    const [hospitals, setHospitals] = useState(SAMPLE_HOSPITALS);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;

        async function fetchAdminData() {
            setLoading(true);
            setError(null);

            try {
                const [statsRes, usersRes, hospitalsRes] = await Promise.allSettled([
                    fetch(`${API_BASE}/api/admin/stats`, { credentials: "include" }),
                    fetch(`${API_BASE}/api/admin/users`, { credentials: "include" }),
                    fetch(`${API_BASE}/api/admin/hospitals`, { credentials: "include" }),
                ]);

                // ---------- METRICS ----------
                if (statsRes.status === "fulfilled" && statsRes.value.ok) {
                    const statsJson = await statsRes.value.json();
                    if (mounted) setMetrics(statsJson);
                } else {
                    setError("Failed to load statistics from server.");
                }

                // ---------- USERS ----------
                if (usersRes.status === "fulfilled" && usersRes.value.ok) {
                    const usersJson = await usersRes.value.json();
                    if (mounted && Array.isArray(usersJson)) {
                        setUsers(usersJson);
                    }
                }


                // ---------- HOSPITALS ----------
                if (hospitalsRes.status === "fulfilled" && hospitalsRes.value.ok) {
                    const hospJson = await hospitalsRes.value.json();
                    if (mounted && Array.isArray(hospJson.hospitals)) {
                        setHospitals(hospJson.hospitals);
                    }
                }

            } catch (err) {
                console.error("Admin data fetch error:", err);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        fetchAdminData();
        return () => (mounted = false);
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



    const activeDonorsCount = users.filter(
        u => u.accountType === "donor" && u.availability === true
    ).length;

    return (
        <>
            {/* Header */}
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
                        <h1 className="font-semibold text-gray-900">Admin Dashboard</h1>
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
                        {/* <button
                            onClick={() => navigate("/")}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Home
                        </button> */}

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

            {/* Main */}
            <main className="pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* show any fetch error */}
                    {error && (
                        <div className="mb-4 rounded-md bg-yellow-50 border border-yellow-200 p-3 text-yellow-800">
                            {error}
                        </div>
                    )}

                    {/* Loading indicator */}
                    {loading ? (
                        <div className="text-center py-16">Loading admin data…</div>
                    ) : (
                        <>
                            {/* Tabs */}
                            <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto">
                                {TABS.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-4 py-3 font-medium whitespace-nowrap border-b-2 transition-all ${activeTab === tab.id
                                            ? "border-red-600 text-red-600"
                                            : "border-transparent text-gray-600 hover:text-gray-900"
                                            }`}
                                    >
                                        {tab.icon}
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Overview */}
                            {activeTab === "overview" && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {[
                                            { label: "Total Users", value: metrics.totalUsers, icon: Users, color: "purple" },
                                            { label: "Active Donors", value: activeDonorsCount, icon: Heart, color: "red" },
                                            { label: "Partner Hospitals", value: metrics.partnerHospitals, icon: Building2, color: "green" },
                                            { label: "Lives Connected", value: metrics.livesConnected, icon: TrendingUp, color: "teal" },
                                        ].map((metric, i) => {
                                            const Icon = metric.icon;
                                            const colorClass = {
                                                purple: "text-purple-600 bg-purple-50",
                                                red: "text-red-600 bg-red-50",
                                                green: "text-green-600 bg-green-50",
                                                teal: "text-teal-600 bg-teal-50",
                                            }[metric.color];

                                            return (
                                                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-gray-600 text-sm font-medium">{metric.label}</p>
                                                            <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                                                        </div>
                                                        <div className={`p-3 rounded-lg ${colorClass}`}>
                                                            <Icon size={24} />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Alerts & Activity */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                                                <AlertTriangle size={20} className="text-red-600" />
                                                System Alerts
                                            </h2>
                                            <div className="space-y-4">
                                                {[
                                                    { severity: "critical", title: "Blood shortage alert", desc: "O- critically low in NYC area", time: "2 hours ago" },
                                                    { severity: "warning", title: "High response time", desc: "Detected in LA region", time: "4 hours ago" },
                                                    { severity: "info", title: "Partnership request", desc: "From Metro Medical", time: "1 day ago" },
                                                ].map((alert, i) => (
                                                    <div key={i} className={`p-4 rounded-lg border-l-4 ${alert.severity === "critical" ? "bg-red-50 border-l-red-600" : alert.severity === "warning" ? "bg-yellow-50 border-l-yellow-600" : "bg-blue-50 border-l-blue-600"}`}>
                                                        <div className="flex justify-between items-start mb-2">
                                                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${alert.severity === "critical" ? "bg-red-600 text-white" : alert.severity === "warning" ? "bg-yellow-600 text-white" : "bg-blue-600 text-white"}`}>{alert.severity.toUpperCase()}</span>
                                                            <span className="text-xs text-gray-500">{alert.time}</span>
                                                        </div>
                                                        <p className="font-medium text-gray-900">{alert.title}</p>
                                                        <p className="text-sm text-gray-600 mt-1">{alert.desc}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                                                <Activity size={20} className="text-blue-600" />
                                                Recent Activity
                                            </h2>
                                            <div className="space-y-4">
                                                {[
                                                    { name: "John D.", action: "Completed blood donation", location: "City Hospital", time: "5 min ago", icon: Heart, color: "red" },
                                                    { name: "Sarah M.", action: "Emergency request fulfilled", location: "Emergency Center", time: "12 min ago", icon: AlertTriangle, color: "blue" },
                                                    { name: "Mike R.", action: "New donor registration", location: "", time: "23 min ago", icon: Users, color: "green" },
                                                    { name: "General Hospital", action: "Critical blood shortage alert", location: "General Hospital", time: "1 hour ago", icon: Bell, color: "orange" },
                                                ].map((activity, i) => {
                                                    const ActivityIcon = activity.icon;
                                                    const colorClass = { red: "text-red-600", blue: "text-blue-600", green: "text-green-600", orange: "text-orange-600" }[activity.color];
                                                    return (
                                                        <div key={i} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
                                                            <div className={`p-2 rounded-lg bg-gray-100 ${colorClass} flex-shrink-0`}>
                                                                <ActivityIcon size={18} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-medium text-gray-900 text-sm">{activity.name}</p>
                                                                <p className="text-xs text-gray-600 mt-1">{activity.action}</p>
                                                                {activity.location && <p className="text-xs text-gray-500">at {activity.location}</p>}
                                                            </div>
                                                            <span className="text-xs text-gray-500 flex-shrink-0">{activity.time}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Users Tab */}
                            {activeTab === "users" && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">Users Management</h2>
                                            <p className="text-gray-600 text-sm mt-1">Manage donors, recipients, and hospital accounts</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700 text-sm font-medium">
                                                <Funnel size={16} />
                                                Filters
                                            </button>
                                            <button className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700 text-sm font-medium">
                                                <Download size={16} />
                                                Export
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                        <table className="w-full">
                                            <thead className="bg-gray-50 border-b border-gray-200">
                                                <tr>
                                                    {["User", "Role", "Blood Type", "Status", "Joined", "Donations", "Actions"].map((header) => (
                                                        <th key={header} className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{header}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {users.map((u, i) => (
                                                    <tr key={i} className="hover:bg-gray-50 transition-colors">

                                                        {/* USER NAME + EMAIL */}
                                                        <td className="px-6 py-4">
                                                            <p className="font-medium text-gray-900 text-sm">{u.name}</p>
                                                            <p className="text-xs text-gray-500">{u.email}</p>
                                                        </td>

                                                        {/* ACCOUNT TYPE */}
                                                        <td className="px-6 py-4">
                                                            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                                                                {u.accountType}
                                                            </span>
                                                        </td>

                                                        {/* BLOOD TYPE */}
                                                        <td className="px-6 py-4 text-sm text-gray-900">
                                                            {u.bloodType || "-"}
                                                        </td>

                                                        {/* STATUS */}
                                                        <td className="px-6 py-4">
                                                            <span
                                                                className={`px-3 py-1 rounded-full text-xs font-medium ${u.availability
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-gray-100 text-gray-700"
                                                                    }`}
                                                            >
                                                                {u.availability ? "Available" : "Unavailable"}
                                                            </span>


                                                        </td>

                                                        {/* JOIN DATE */}
                                                        <td className="px-6 py-4 text-sm text-gray-900">
                                                            {new Date(u.createdAt).toLocaleDateString("en-IN")}
                                                        </td>

                                                        {/* DONATIONS (YOU DON'T HAVE THIS FIELD YET) */}
                                                        <td className="px-6 py-4 text-sm text-gray-900">
                                                            {u.donations || "N/A"}
                                                        </td>

                                                        {/* ACTION BUTTONS */}
                                                        <td className="px-6 py-4">
                                                            <div className="flex gap-2">
                                                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
                                                                    <Eye size={16} />
                                                                </button>
                                                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
                                                                    <Edit size={16} />
                                                                </button>
                                                                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600">
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* Hospitals Tab */}
                            {activeTab === "hospitals" && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">Hospital Partners</h2>
                                            <p className="text-gray-600 text-sm mt-1">Manage hospital partnerships and verification</p>
                                        </div>
                                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 font-medium text-sm">
                                            <Plus size={18} />
                                            Add Hospital
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {hospitals.map((hospital, i) => (
                                            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                                                        <p className="text-xs text-gray-600 flex items-center gap-1 mt-2"><MapPin size={14} />{hospital.location}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${hospital.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{hospital.status}</span>
                                                </div>

                                                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                                                    <div className="flex justify-between text-sm"><span className="text-gray-600">Total Requests</span><span className="font-semibold text-gray-900">{hospital.totalRequests}</span></div>
                                                    <div className="flex justify-between text-sm"><span className="text-gray-600">Fulfillment Rate</span><span className="font-semibold text-gray-900">{hospital.fulfillmentRate}%</span></div>
                                                </div>

                                                <div className="mb-4">
                                                    <div className="flex justify-between text-xs mb-2"><span className="text-gray-600">Performance</span><span className="text-gray-900 font-medium">{hospital.fulfillmentRate}%</span></div>
                                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-purple-600" style={{ width: `${hospital.fulfillmentRate}%` }} /></div>
                                                </div>

                                                <div className="flex gap-3">
                                                    <button className="flex-1 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-900 text-sm font-medium">View Details</button>
                                                    <button className="flex-1 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors text-white text-sm font-medium">Manage</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Analytics & System tabs (kept minimal) */}
                            {activeTab === "analytics" && (
                                <div className="space-y-8">
                                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Donation Trends</h3>
                                        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg"><p className="text-gray-500 text-sm">Chart placeholder</p></div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "system" && (
                                <div className="space-y-6">
                                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-6"><Settings size={20} className="text-purple-600" /> System Configuration</h3>
                                        <div className="space-y-4">
                                            {[{ title: "Emergency Alert System", desc: "Global emergency notifications", status: "Active" }, { title: "Auto-matching Algorithm", desc: "AI-powered donor matching", status: "Active" }].map((item, i) => (
                                                <div key={i} className="flex justify-between items-start pb-4 border-b border-gray-200 last:border-0">
                                                    <div>
                                                        <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                                                        <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                                                    </div>
                                                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">{item.status}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </>
    );
}
