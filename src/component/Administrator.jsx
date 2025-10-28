import React, { useState } from 'react'
import { BiSolidHeartCircle } from 'react-icons/bi'
import { Link } from 'react-router';
import {
    AlertTriangle, Activity, Settings, Bell, Building2, Dot, MapPin, Calendar, Zap, Heart, UsersRound, Award, Phone, Clock,
    Star, Shield, Search, Funnel, Users, Droplet, Eye, Edit, Trash2, Filter, Download, TrendingUp, ChartColumnIncreasing,
    ShieldCheck, Cpu, Lock, Database, FileSearch
} from "lucide-react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
function Administrator() {


    const hospitalDetails = [
        {
            name: "City Hospital",
            location: "New York, NY",
            status: "Active",
            totalRequests: 45,
            fulfillmentRate: 92,
        },
        {
            name: "Emergency Medical Center",
            location: "Los Angeles, CA",
            status: "Active",
            totalRequests: 38,
            fulfillmentRate: 89,
        },
        {
            name: "General Hospital",
            location: "Chicago, IL",
            status: "Pending",
            totalRequests: 12,
            fulfillmentRate: 95,
        },
    ];
    const userDetails = [
        {
            name: "Juhi",
            email: "juhig@gmail.com",
            role: "Donor",
            bloodType: "O+",
            status: "Active",
            joined: "1/15/2024",
            donations: "5",
        },
        {
            name: "Saumya",
            email: "saumya123@gmail.com",
            role: "Recipient",
            bloodType: "A-",
            status: "Active",
            joined: "1/10/2024",
            donations: "0",
        },
        {
            name: "City Hospital",
            email: "admin@cityhospital.com",
            role: "Hospital",
            bloodType: "-",
            status: "Active",
            joined: "12/1/2023",
            donations: "-",
        },
        {
            name: "Minal",
            email: "mike@example.com",
            role: "Donor",
            bloodType: "B+",
            status: "Inactive",
            joined: "11/20/2023",
            donations: "12",
        },
    ];

    const [activeTab, setActiveTab] = useState("overview");

    return (
        <>
            <nav className="fixed top-0 left-0 w-full h-[65px] bg-white text-black z-50 border-b border-gray-200 flex justify-between items-center px-4 md:px-8">
                {/* Brand */}
                <div className="flex items-center text-lg md:text-2xl font-bold text-black">
                    <BiSolidHeartCircle size={28} className="text-purple-800 mr-2" />
                    LifeLink
                </div>

                {/* Dashboard Text */}
                <div className="hidden md:flex flex-col items-center space-y-1">
                    <h1 className="font-medium text-xl text-black">Admin Dashboard</h1>
                    <p className="text-gray-600 text-sm">System Administartion</p>
                </div>

                {/* Right Side */}
                <div className="flex items-center space-x-3 md:space-x-6">
                    <Link to="/home" className="text-black hover:text-purple-800">
                        <Bell size={20} />
                    </Link>
                    <Link to="/home" className="text-black hover:text-purple-800">
                        <Settings size={20} />
                    </Link>
                    <Link to="/" className="hidden sm:block text-black hover:text-purple-800">
                        Home
                    </Link>
                    <Link
                        to="/signup"
                        className="border flex items-center border-gray-300 rounded-2xl px-2 py-1 text-red-500 hover:text-red-600 text-sm md:text-base"
                    >
                        <FaArrowRightFromBracket className="mr-1 md:mr-2" />
                        LogOut
                    </Link>
                    <button
                        className="border border-gray-300 rounded-2xl px-2 py-1  text-purple-800 hover:text-purple-9500 flex items-center text-xs"
                    ><Shield size={12} className="text-purple-900 mr-2" />Administrator
                    </button>
                </div>
            </nav>

            <div className="mt-[80px] p-4 md:p-6 lg:p-8">
                {/* Tabs */}
                <div className="flex border rounded-2xl border-gray-300 mb-6 overflow-hidden">
                    <button
                        className={`flex-1 py-2 text-center font-medium rounded-2xl ${activeTab === "overview"
                            ? "bg-gray-200 text-black"
                            : "bg-white hover:text-black"
                            }`}
                        onClick={() => setActiveTab("overview")}
                    >
                        Overview
                    </button>
                    <button
                        className={`flex-1 py-2 text-center font-medium rounded-2xl ${activeTab === "users"
                            ? "bg-gray-200 text-black"
                            : "bg-white hover:text-black"
                            }`}
                        onClick={() => setActiveTab("users")}
                    >
                        Users
                    </button>
                    <button
                        className={`flex-1 py-2 text-center font-medium rounded-2xl ${activeTab === "Hospitals"
                            ? "bg-gray-200 text-black"
                            : "bg-white hover:text-black"
                            }`}
                        onClick={() => setActiveTab("Hospitals")}
                    >
                        Hospitals
                    </button>
                    <button
                        className={`flex-1 py-2 text-center font-medium rounded-2xl ${activeTab === "Analytics"
                            ? "bg-gray-200 text-black"
                            : "bg-white hover:text-black"
                            }`}
                        onClick={() => setActiveTab("Analytics")}
                    >
                        Analytics
                    </button>
                    <button
                        className={`flex-1 py-2 text-center font-medium rounded-2xl ${activeTab === "System"
                            ? "bg-gray-200 text-black"
                            : "bg-white hover:text-black"
                            }`}
                        onClick={() => setActiveTab("System")}
                    >
                        System
                    </button>
                </div>



                {/* Content below buttons */}
                {activeTab === "overview" && (
                    <div className=" rounded-xl  ">
                        {/* Overview content */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 ">
                            {/* Active Requests */}
                            <div className="bg-white py-12 px-4 rounded-xl  shadow-sm flex items-center justify-between border border-gray-200 ">
                                {/* Left content */}
                                <div>
                                    <p className="text-gray-600 text-sm">Total Users</p>
                                    <p className="text-purple-700 text-2xl font-bold">24,827</p>
                                </div>
                                {/* Right icon */}
                                <div className="flex items-center">
                                    <Users size={32} className="text-purple-700 text-3xl" />
                                </div>
                            </div>

                            {/* Available Donors */}
                            <div className="bg-white p-12 rounded-xl  shadow-sm flex items-center justify-between border border-gray-200">
                                <div>
                                    <p className="text-gray-600 text-sm">Active Donors</p>
                                    <p className="text-red-500 text-2xl font-bold">1,203</p>
                                </div>
                                <div className="flex items-center">
                                    <Heart size={32} className="text-red-500 text-3xl" />
                                </div>
                            </div>

                            {/* Blood Units */}
                            <div className="bg-white p-12 rounded-xl shadow-sm flex items-center justify-between border border-gray-200">
                                <div>
                                    <p className="text-gray-600 text-sm">Partner Hospitals</p>
                                    <p className="text-green-500 text-2xl font-bold">47</p>
                                </div>
                                <div className="flex items-center">
                                    <Building2 size={32} className="text-green-500 text-3xl" />
                                </div>
                            </div>

                            {/* Response Time */}
                            <div className="bg-white p-12 rounded-xl  shadow-sm flex items-center justify-between border border-gray-200">
                                <div>
                                    <p className="text-gray-600 text-sm">Lives Connected</p>
                                    <p className="text-teal-600 text-2xl font-bold">12,847</p>
                                </div>
                                <div className="flex items-center">
                                    <TrendingUp size={32} className="text-teal-600 text-3xl" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols md:grid-cols-2 gap-6">
                            {/* System Alerts */}

                            <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
                                <h2 className="text-red-600 font-semibold flex items-center gap-2 mb-6">
                                    <AlertTriangle className="text-red-600" /> System Alerts
                                </h2>

                                {/* Critical Alert */}
                                <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-5 mb-3 relative">
                                    {/* Badge top-right */}
                                    <span className="absolute top-2 right-2 text-xs text-gray-60">
                                        2 hours ago
                                    </span>

                                    {/* Content */}
                                    <span className="font-medium rounded-full bg-pink-600 text-white px-3 py-1 ">Critical</span>
                                    <p className="text-sm text-gray-600 mt-3">
                                        Blood shortage alert: O- critically low in NYC area
                                    </p>
                                    <div className='flex flex-row gap-3'>
                                        <button className="mt-2 px-3 py-1 text-black border border-gray-200 bg-white rounded-full text-sm">
                                            View Details
                                        </button>
                                        <button className="mt-2 px-3 py-1 text-white bg-pink-600 rounded-full text-sm">
                                            Take Action
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-5 mb-3 relative">
                                    {/* Badge top-right */}
                                    <span className="absolute top-2 right-2 text-xs text-gray-60">
                                        4 hours ago
                                    </span>

                                    {/* Content */}
                                    <span className="font-medium rounded-full bg-pink-600 text-white px-3 py-1 ">Warning</span>
                                    <p className="text-sm text-gray-600 mt-3">
                                        High response time detected in LA region</p>
                                    <button className="mt-2 px-3 py-1 text-black border border-gray-200 bg-white rounded-full text-sm">
                                        View Details
                                    </button>
                                </div>


                                <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-5 mb-3 relative">
                                    {/* Badge top-right */}
                                    <span className="absolute top-2 right-2 text-xs text-gray-60">
                                        1 day ago
                                    </span>

                                    {/* Content */}
                                    <span className="font-medium rounded-full border border-gray-200  text-black px-3 py-1 ">Info</span>
                                    <p className="text-sm text-gray-600 mt-3">
                                        New hospital partnership request from Metro Medical</p>
                                    <button className="mt-2 px-3 py-1 text-black border border-gray-200 bg-white rounded-full text-sm">
                                        View Details
                                    </button>
                                </div>


                            </div>

                            {/* Recent Activity */}

                            <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
                                <h2 className="text-red-600 font-semibold flex items-center gap-2 mb-4">
                                    <AlertTriangle className="text-red-600" /> Recent Activity
                                </h2>

                                <div className="rounded-lg px-3 py-2 relative flex items-start gap-3">
                                    {/* Badge top-right */}
                                    <span className="absolute top-2 right-2 text-xs text-gray-600">
                                        5 min ago
                                    </span>

                                    {/* Heart with round background */}
                                    <div className="w-7 h-7 flex items-center justify-center rounded-full">
                                        <Heart className="text-red-500 w-4 h-4" />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <span className="text-sm text-black font-semibold">John D.</span>
                                        <p className="text-xs text-gray-600">
                                            Completed blood donation <br />
                                            at City Hospital
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-lg px-3 py-2 relative flex items-start gap-3">
                                    {/* Badge top-right */}
                                    <span className="absolute top-2 right-2 text-xs text-gray-600">
                                        12 min ago
                                    </span>

                                    {/* Alert icon with round background */}
                                    <div className="w-7 h-7 flex items-center justify-center rounded-full ">
                                        <AlertTriangle className="text-blue-500 w-4 h-4" />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <span className="text-sm text-black font-semibold">Sarah M.</span>
                                        <p className="text-xs text-gray-600">
                                            Emergency request fulfilled <br />
                                            at Emergency Center
                                        </p>
                                    </div>
                                </div>
                                <div className="rounded-lg px-3 py-2 relative flex items-start gap-3">
                                    {/* Badge top-right */}
                                    <span className="absolute top-2 right-2 text-xs text-gray-600">
                                        23 min ago
                                    </span>

                                    {/* Users icon with round background */}
                                    <div className="w-7 h-7 flex items-center justify-center rounded-full ">
                                        <Users className="text-green-500 w-4 h-4" />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <span className="text-sm text-black font-semibold">Mike R.</span>
                                        <p className="text-xs text-gray-600">New donor registration</p>
                                    </div>
                                </div>
                                <div className="rounded-lg px-3 py-2 relative flex items-start gap-3">
                                    {/* Badge top-right */}
                                    <span className="absolute top-2 right-2 text-xs text-gray-600">
                                        1 hours ago
                                    </span>

                                    {/* Bell icon with round background */}
                                    <div className="w-7 h-7 flex items-center justify-center rounded-full ">
                                        <Bell className="text-orange-500 w-4 h-4" />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <span className="text-sm text-black font-semibold">General Hospital</span>
                                        <p className="text-xs text-gray-600">
                                            Critical blood shortage alert <br />
                                            at General Hospital
                                        </p>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>
                )}

                {activeTab === "users" && (
                    <div>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Users Management</h2>
                                <p className="text-gray-600 text-base">
                                    Manage donors, recipients, and hospital accounts
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="hover:bg-red-500 text-black border border-gray-200 px-3 py-1 rounded-2xl flex items-center gap-2 hover:text-white transition">
                                    <Funnel size={18} />
                                    Filters
                                </button>
                                <button className="hover:bg-red-500 text-black border border-gray-200 px-3 py-1 rounded-2xl flex items-center gap-2 hover:text-white transition">
                                    <Download size={18} />
                                    Export
                                </button>
                            </div>
                        </div>

                        {/* user box */}
                        {/* 🔹 Table Header Row */}
                        <div className="w-full bg-white border border-gray-200 shadow-lg rounded-2xl mt-6 overflow-hidden">

                            {/* Header Row */}
                            <div className="grid grid-cols-7 text-gray-700 text-md font-semibold  px-4 py-6 border-b border-gray-200">
                                <span>Users</span>
                                <span>Role</span>
                                <span>Blood Type</span>
                                <span>Status</span>
                                <span>Joined</span>
                                <span>Donations</span>
                                <span>Actions</span>
                            </div>

                            {/* User Rows */}
                            <div className="divide-y divide-gray-200">
                                {userDetails.map((user, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-7 items-center px-4 py-6 hover:bg-gray-50 transition"
                                    >
                                        {/* User Info */}
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-800">{user.name}</span>
                                            <span className="text-xs text-gray-500">{user.email}</span>
                                        </div>

                                        {/* Role */}
                                        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs w-fit">
                                            {user.role}
                                        </span>

                                        {/* Blood Type */}
                                        <span className="text-sm">{user.bloodType}</span>

                                        {/* Status */}
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs w-fit ${user.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-200 text-gray-600"
                                                }`}
                                        >
                                            {user.status}
                                        </span>

                                        {/* Joined */}
                                        <span className="text-sm">{user.joined}</span>

                                        {/* Donations */}
                                        <span className="text-sm">{user.donations}</span>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <button className="p-2 rounded-full text-black hover:bg-red-500 hover:text-white transition">
                                                <Eye size={16} />
                                            </button>

                                            <button className="p-2 rounded-full text-black hover:bg-red-500 hover:text-white transition">
                                                <Edit size={16} />
                                            </button>

                                            <button className="p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>


                                    </div>
                                ))}
                            </div>
                        </div>




                    </div>

                )}


                {activeTab === "Hospitals" && (
                    <div>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Hospital Partners
                                </h2>
                                <p className="text-gray-600 text-base">
                                    Manage hospital partnerships and verification</p>
                            </div>
                            <button className="bg-purple-800 text-white px-3 py-2 rounded-2xl flex items-center gap-2 hover:bg-purple-900 transition">
                                <FaPlus className="text-white" />
                                Add Hospital
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            {hospitalDetails.map((hospital, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col justify-between"
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-800">
                                                {hospital.name}
                                            </h2>
                                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                                <MapPin size={14} className="mr-1" />
                                                {hospital.location}
                                            </div>
                                        </div>

                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${hospital.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {hospital.status}
                                        </span>
                                    </div>

                                    {/* Stats */}
                                    <div className="text-sm text-gray-600 space-y-2">
                                        <div className="flex justify-between">
                                            <span>Total Requests</span>
                                            <span className="font-medium">{hospital.totalRequests}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Fulfillment Rate</span>
                                            <span className="font-medium">{hospital.fulfillmentRate}%</span>
                                        </div>
                                    </div>

                                    {/* Performance Bar */}
                                    <div className="mt-4">
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>Performance</span>
                                            <span>{hospital.fulfillmentRate}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 h-2 rounded-full">
                                            <div
                                                className="h-2 bg-purple-900 rounded-full"
                                                style={{ width: `${hospital.fulfillmentRate}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-3 mt-6">
                                        <button className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
                                            View Details
                                        </button>
                                        <button className="flex-1 bg-purple-900 text-white rounded-lg px-3 py-2 text-sm hover:bg-purple-850 transition">
                                            Manage
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>
                )}



                {activeTab === "Analytics" && (
                    <div>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Platform Analytics   </h2>
                                <p className="text-gray-600 text-base">
                                    Insights and performance metrics
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="hover:bg-red-500 text-black border border-gray-200 px-3 py-1 rounded-2xl flex items-center gap-2 hover:text-white transition">
                                    <Funnel size={18} />
                                    Data Range
                                </button>
                                <button className="hover:bg-red-500 text-black border border-gray-200 px-3 py-1 rounded-2xl flex items-center gap-2 hover:text-white transition">
                                    <Download size={18} />
                                    Export Report
                                </button>
                            </div>
                        </div>

                        {/* analytics box */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 ">
                            {/* Active Requests */}
                            <div className="bg-white py-12 px-4 rounded-xl  shadow-sm flex items-center justify-between border border-gray-200 ">
                                {/* Left content */}
                                <div>
                                    <p className="text-gray-600 text-sm">Success Rate</p>
                                    <p className="text-green-500 text-2xl font-bold">94.7%</p>
                                </div>
                                {/* Right icon */}
                                <div className="flex items-center">
                                    <TrendingUp size={32} className="text-green-500 text-3xl" />
                                </div>
                            </div>

                            {/* Available Donors */}
                            <div className="bg-white p-12 rounded-xl  shadow-sm flex items-center justify-between border border-gray-200">
                                <div>
                                    <p className="text-gray-600 text-sm">Avg Response Time</p>
                                    <p className="text-teal-600 text-2xl font-bold">8.2 min</p>
                                </div>
                                <div className="flex items-center">
                                    <Clock size={32} className="text-teal-600 text-3xl" />
                                </div>
                            </div>

                            {/* Blood Units */}
                            <div className="bg-white p-12 rounded-xl shadow-sm flex items-center justify-between border border-gray-200">
                                <div>
                                    <p className="text-gray-600 text-sm">Total Donations</p>
                                    <p className="text-red-500 text-2xl font-bold">3,456</p>
                                </div>
                                <div className="flex items-center">
                                    <Heart size={32} className="text-red-500 text-3xl" />
                                </div>
                            </div>

                            {/* Response Time */}
                            <div className="bg-white p-12 rounded-xl  shadow-sm flex items-center justify-between border border-gray-200">
                                <div>
                                    <p className="text-gray-600 text-sm">Recepient Hospital</p>
                                    <p className="text-purple-800 text-2xl font-bold">892</p>
                                </div>
                                <div className="flex items-center">
                                    <Building2 className="text-purple-800 text-3xl" />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols md:grid-cols-2 gap-6">


                            <div className="bg-white border border-gray-200 shadow-md rounded-xl p-8">
                                <h3 className="text-lg font-semibold text-purple-800 flex items-center mb-4">
                                    <span className="mr-2"><ChartColumnIncreasing /></span> Donation Trends
                                </h3>
                                <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                                    <span className="text-3xl"><ChartColumnIncreasing /></span>
                                    <p className="text-sm mt-2 text-center">
                                        Chart visualization would be implemented here <br />
                                        <span className="text-xs">Showing donation trends over time</span>
                                    </p>
                                </div>
                            </div>


                            <div className="bg-white border border-gray-200 shadow-md rounded-xl p-8">
                                <h3 className="text-lg font-semibold text-orange-500 flex items-center mb-4">
                                    <span className="mr-2"><Clock /></span> Blood Type Distribution
                                </h3>
                                <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                                    <span className="text-3xl"><Clock /></span>
                                    <p className="text-sm mt-2 text-center">
                                        Chart visualization would be implemented here <br />
                                        <span className="text-xs">Showing blood type distribution</span>
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>



                )}

                {activeTab === "System" && (
                    <div>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">System Management </h2>
                                <p className="text-gray-600 text-base">
                                    Platform configuration and maintenance</p>
                            </div>
                        </div>

                        {/* user box */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Container 1: System Configuration */}
                            <div className="bg-white shadow rounded-2xl p-6">
                                <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
                                    <Settings className="w-5 h-5 text-purple-600" />
                                    System Configuration
                                </h3>

                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="font-medium">Emergency Alert System</p>
                                        <p className="text-sm text-gray-500">Global emergency notifications</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-lime-600 text-white text-sm font-medium">
                                        Active
                                    </span>
                                </div>

                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="font-medium">Auto-matching Algorithm</p>
                                        <p className="text-sm text-gray-500">AI-powered donor matching</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-lime-600 text-white text-sm font-medium">
                                        Active
                                    </span>
                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <p className="font-medium">Real-time Tracking</p>
                                        <p className="text-sm text-gray-500">GPS location services</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-lime-600 text-white text-sm font-medium">
                                        Active
                                    </span>
                                </div>

                                <button className="w-full py-1 rounded-lg text-black font-medium hover:bg-pink-500 hover:text-white">
                                    Configure Settings
                                </button>
                            </div>

                            {/* Container 2: Security & Compliance */}
                            <div className="bg-white shadow rounded-2xl p-6">
                                <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
                                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                                    Security & Compliance
                                </h3>

                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="font-medium">HIPAA Compliance</p>
                                        <p className="text-sm text-gray-500">Medical data protection</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-lime-600 text-white text-sm font-medium">
                                        Compliant
                                    </span>
                                </div>

                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="font-medium">Data Encryption</p>
                                        <p className="text-sm text-gray-500">End-to-end encryption</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-lime-600 text-white text-sm font-medium">
                                        Active
                                    </span>
                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <p className="font-medium">Audit Logging</p>
                                        <p className="text-sm text-gray-500">System activity tracking</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-lime-600 text-white text-sm font-medium">
                                        Active
                                    </span>
                                </div>

                                <button className="w-full py-1 rounded-lg border border-gray-300 font-medium hover:bg-pink-500  text-black hover:text-white">
                                    Security Report
                                </button>
                            </div>
                        </div>
                    </div>

                )}



            </div >

        </>
    )
}

export default Administrator
