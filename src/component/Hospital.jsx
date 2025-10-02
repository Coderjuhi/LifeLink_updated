import React, { useState } from 'react'
import { BiSolidHeartCircle } from 'react-icons/bi'
import { Link } from 'react-router';
import { AlertTriangle, Activity, Settings, Bell, Building2, Dot, MapPin, Calendar, Zap, Heart, UsersRound, Award, Phone, Clock, Star, Shield, Search, Funnel, Users, Droplet } from "lucide-react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";



function Hospital() {

    const getStatusColor = (status) => {
        switch (status) {
            case "Critical":
                return "border-red-500 bg-red-50 text-red-600";
            case "High":
                return "border-pink-500 bg-pink-50 text-pink-600";
            case "Medium":
                return "border-blue-500 bg-blue-50 text-blue-600";
            default:
                return "border-gray-500 bg-gray-50 text-gray-600";
        }
    };

    const getStateColor = (state) => {
        switch (state) {
            case "Active":
                return "border-green-500 bg-green-50 text-green-600";
            case "Matching":
                return "border-yellow-500 bg-yellow-50 text-yellow-600";
            case "Scheduled":
                return "border-purple-500 bg-purple-50 text-purple-600";
            default:
                return "border-gray-500 bg-gray-50 text-gray-600";
        }
    };

    // Dummy Data Example
    const ActiveData = [
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
    ];

    const DonorData = [
        {
            id: "John D.",
            miles: "0.8 ",
            group: "O-",
            rating: 4.9,
            responses: "now",
            time: "3 month ago",
        },
        {
            id: "Sarah M.",
            miles: "1.2 ",
            group: "A+",
            rating: 4.8,
            responses: 5,
            time: "now",
        },
        {
            id: "Mike R.",
            miles: "2.1 ",
            group: "B+",
            rating: 5,
            responses: 3,
            time: "in 30 min",
        },
    ];



    const bloodData = [
        {
            group: "B+",
            current: 45,
            min: 20,
            max: 100,
            status: "Good",
            Color: "purple",
            statusColor: "purple",
            percent: 80, // for bar width
        },
        {
            group: "A-",
            current: 12,
            min: 15,
            max: 80,
            status: "Low",
            Color: "yellow",
            statusColor: "purple",
            percent: 30,
        },
        {
            group: "B+",
            current: 6,
            min: 20,
            max: 60,
            status: "Critical",
            Color: "red",
            statusColor: "purple",
            percent: 10,
        },
        {
            group: "AB+",
            current: 25,
            min: 10,
            max: 70,
            status: "Normal",
            Color: "green",
            statusColor: "purple",
            percent: 50,
        },
        {
            group: "O+",
            current: 45,
            min: 20,
            max: 100,
            status: "Good",
            Color: "purple",
            statusColor: "purple",
            percent: 80, // for bar width
        },
        {
            group: "A+",
            current: 12,
            min: 15,
            max: 80,
            status: "Low",
            Color: "yellow",
            statusColor: "purple",
            percent: 30,
        },
        {
            group: "B+",
            current: 6,
            min: 20,
            max: 60,
            status: "Critical",
            Color: "red",
            statusColor: "purple",
            percent: 10,
        },
        {
            group: "O+",
            current: 25,
            min: 10,
            max: 70,
            status: "Normal",
            Color: "green",
            statusColor: "purple",
            percent: 50,
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
                    <h1 className="font-medium text-xl text-black">Hospital Dashboard</h1>
                    <p className="text-gray-600 text-sm">Welcome back</p>
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
                    ><Building2 size={18} className="text-purple-900 mr-2" />Hospital
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
                        className={`flex-1 py-2 text-center font-medium rounded-2xl ${activeTab === "inventory"
                            ? "bg-gray-200 text-black"
                            : "bg-white hover:text-black"
                            }`}
                        onClick={() => setActiveTab("inventory")}
                    >
                        Blood Inventory
                    </button>
                    <button
                        className={`flex-1 py-2 text-center font-medium rounded-2xl ${activeTab === "requests"
                            ? "bg-gray-200 text-black"
                            : "bg-white hover:text-black"
                            }`}
                        onClick={() => setActiveTab("requests")}
                    >
                        Active Requests
                    </button>
                    <button
                        className={`flex-1 py-2 text-center font-medium rounded-2xl ${activeTab === "donors"
                            ? "bg-gray-200 text-black"
                            : "bg-white hover:text-black"
                            }`}
                        onClick={() => setActiveTab("donors")}
                    >
                        Donor Network
                    </button>
                </div>

                {/* Content below buttons */}
                {activeTab === "overview" && (
                    <div className=" rounded-xl  ">
                        {/* Overview content */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {/* Active Requests */}
                            <div className="bg-white p-12 rounded-xl  shadow-sm flex items-center justify-between">
                                {/* Left content */}
                                <div>
                                    <p className="text-gray-600 text-sm">Active Requests</p>
                                    <p className="text-red-500 text-2xl font-extrabold">12</p>
                                </div>
                                {/* Right icon */}
                                <div className="flex items-center">
                                    <AlertTriangle className="text-red-500 text-3xl" />
                                </div>
                            </div>

                            {/* Available Donors */}
                            <div className="bg-white p-12 rounded-xl  shadow-sm flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Available Donors</p>
                                    <p className="text-green-600 text-2xl font-extrabold">47</p>
                                </div>
                                <div className="flex items-center">
                                    <Users className="text-green-600 text-3xl" />
                                </div>
                            </div>

                            {/* Blood Units */}
                            <div className="bg-white p-12 rounded-xl shadow-sm flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Blood Units</p>
                                    <p className="text-purple-700 text-2xl font-extrabold">153</p>
                                </div>
                                <div className="flex items-center">
                                    <Heart className="text-purple-700 text-3xl" />
                                </div>
                            </div>

                            {/* Response Time */}
                            <div className="bg-white p-12 rounded-xl  shadow-sm flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Response Time</p>
                                    <p className="text-teal-600 text-2xl font-extrabold">8m</p>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="text-teal-600 text-3xl" />
                                </div>
                            </div>
                        </div>


                        {/* Alerts + Activity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Critical Alerts */}
                            <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
                                <h2 className="text-red-600 font-semibold flex items-center gap-2 mb-4">
                                    <AlertTriangle className="text-red-600" /> Critical Alerts
                                </h2>

                                {/* Critical Alert */}
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3 relative">
                                    {/* Badge top-right */}
                                    <span className="absolute top-2 right-2 text-xs text-white bg-red-500 px-2 py-0.5 rounded-full">
                                        Critical
                                    </span>

                                    {/* Content */}
                                    <p className="font-medium text-red-700">A- Blood Critical</p>
                                    <p className="text-sm text-gray-600">
                                        Only 8 units remaining (minimum: 10)
                                    </p>
                                    <button className="mt-2 px-3 py-1 text-white bg-pink-600 rounded-full text-sm">
                                        Request Emergency Supply
                                    </button>
                                </div>

                                {/* Low Alert */}
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 relative">
                                    {/* Badge top-right */}
                                    <span className="absolute top-2 right-2 text-xs text-white bg-pink-500 px-2 py-0.5 rounded-full">
                                        Low
                                    </span>

                                    {/* Content */}
                                    <p className="font-medium text-red-700">O- Blood Low</p>
                                    <p className="text-sm text-gray-600">
                                        12 units remaining (minimum: 15)
                                    </p>
                                    <button className="mt-2 px-3 py-1 hover:bg-pink-600 hover:text-white border border-gray-300 rounded-full text-sm">
                                        Find Donors
                                    </button>
                                </div>

                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white p-5 rounded-xl border shadow-lg border-gray-200">
                                <h2 className="font-semibold text-gray-800 mb-4 flex items-center"><Activity className='text-purple-800 mr-3' />Recent Activity</h2>

                                <div className="flex justify-between items-center py-2">
                                    <div>
                                        <p className="text-green-700 text-sm flex items-center">
                                            <Dot size={32} className="text-green-600 " />
                                            Received 3 units of O+
                                        </p>
                                        <p className="text-xs text-gray-500 ml-8">2024-01-20 at 14:30</p>
                                    </div>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                                        Completed
                                    </span>
                                </div>


                                <div className="flex justify-between items-center  py-2">
                                    <div>
                                        <p className="text-purple-700 text-sm flex items-center">
                                            <Dot size={32} className=" text-puple-700" />

                                            Distributed 2 units of A-
                                        </p>
                                        <p className="text-xs text-gray-500 ml-8">2024-01-20 at 12:15</p>
                                    </div>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                                        Completed
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-2">
                                    <div>
                                        <p className="text-blue-700 text-sm flex items-center">
                                            <Dot size={32} className=" text-puple-700" />

                                            Received 1 unit of B+
                                        </p>
                                        <p className="text-xs text-gray-500 ml-8">2024-01-19 at 16:45</p>
                                    </div>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                                        Processing
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                )}

                {activeTab === "inventory" && (
                    <div>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Blood Inventory</h2>
                                <p className="text-gray-600 text-base">
                                    Current Blood bank status and levels
                                </p>
                            </div>
                            <button className="bg-purple-900 text-white px-3 py-2 rounded-2xl flex items-center gap-2 hover:bg-purple-800 transition">
                                <FaPlus className="text-white" />
                                Add Inventory
                            </button>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {bloodData.map((blood, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 shadow bg-white rounded-xl py-8 px-4 flex flex-col gap-4"
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="font-semibold text-2xl">{blood.group}</div>
                                        <button
                                            className={`border border-${blood.Color}-500 bg-${blood.Color}-50 text-${blood.Color}-600 rounded-2xl px-3 py-1 text-sm`}
                                        >
                                            {blood.status}
                                        </button>
                                    </div>

                                    {/* Body */}
                                    <div>
                                        <div className="flex justify-between text-sm mb-4">
                                            <span>Current</span>
                                            <span className="font-medium">{blood.current} Units</span>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-full h-2 bg-gray-200 rounded-full">
                                            <div
                                                className={`h-2 bg-${blood.statusColor}-600 rounded-full`}
                                                style={{ width: `${blood.percent}%` }}
                                            ></div>
                                        </div>

                                        {/* Min & Max */}
                                        <div className="flex justify-between text-xs text-gray-400">
                                            <p>Min: {blood.min}</p>
                                            <p>Max: {blood.max}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>

                )}








                {activeTab === "requests" && (
                    <div>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Active Requests</h2>
                                <p className="text-gray-600 text-base">
                                    Manage blood donation requests</p>
                            </div>
                            <button className="bg-red-500 text-white px-3 py-2 rounded-2xl flex items-center gap-2 hover:bg-red-600 transition">
                                <FaPlus className="text-white" />
                                New Request
                            </button>
                        </div>
                        {/* grid */}



                        <div className="grid grid-cols-1 gap-4">
                            {ActiveData.map((blood, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 shadow bg-white rounded-xl py-10 px-4 flex-row flex justify-between"
                                >
                                    {/* Header */}
                                    <div className="flex items-start gap-3">
                                        {/* Heart Icon */}
                                        <div className="p-3 rounded-full bg-pink-50">
                                            <Heart className="text-pink-500" size={24} />
                                        </div>

                                        {/* Patient Info */}
                                        <div className="flex flex-col gap-1">
                                            {/* First row: ID + badges */}
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-semibold text-lg">
                                                    Patient {blood.id}
                                                </span>
                                                <span
                                                    className={`rounded-2xl px-3 py-0.5 text-sm border ${getStatusColor(
                                                        blood.urgency
                                                    )}`}
                                                >
                                                    {blood.urgency}
                                                </span>
                                                <span className="rounded-2xl px-3 py-0.5 text-sm border font-semibold">
                                                    {blood.group}
                                                </span>
                                            </div>

                                            {/* Second row: details */}
                                            <span className="text-sm text-gray-500">
                                                {blood.department} • {blood.units} units needed • Requested by{" "}
                                                {blood.doctor}
                                            </span>

                                            {/* Third row: responses + time */}
                                            <span className="text-xs text-gray-400">
                                                {blood.responses} donor responses • {blood.time}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="flex  items-center gap-3">
                                        <span
                                            className={`rounded-2xl px-3 py-1 text-sm border ${getStateColor(
                                                blood.state
                                            )}`}
                                        >
                                            {blood.state}
                                        </span>
                                        <button className="border border-gray-300 rounded-2xl px-4 py-1 text-sm hover:bg-gray-100">
                                            View Details
                                        </button>
                                        <button className="bg-purple-600 text-white rounded-2xl px-4 py-1 text-sm hover:bg-purple-700">
                                            Manage
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>



                    </div>
                )}

                {activeTab === "donors" && (

                    <div>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Donor Network</h2>
                                <p className="text-gray-600 text-base">
                                    Available donors in your area</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="hover:bg-red-500 text-black border border-gray-200 px-3 py-1 rounded-2xl flex items-center gap-2 hover:text-white transition">
                                    <Funnel size={18} />
                                    Filters
                                </button>
                                <button className="hover:bg-red-500 text-black border border-gray-200 px-3 py-1 rounded-2xl flex items-center gap-2 hover:text-white transition">
                                    <Search size={18} />
                                    Search
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            {DonorData.map((blood, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 shadow bg-white rounded-xl py-10 px-4 flex-row flex justify-between"
                                >
                                    {/* Header */}
                                    <div className="flex items-start gap-3">
                                        {/* First Letter Badge */}
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold text-lg">
                                            {blood.id.charAt(0)}
                                        </div>

                                        {/* Patient Info */}
                                        <div className="flex flex-col gap-1">
                                            {/* First row: ID + badges */}
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-semibold text-lg">
                                                    {blood.id}
                                                </span>

                                                <span className="rounded-2xl px-3 py-0.5 text-sm border font-semibold">
                                                    {blood.group}
                                                </span><Shield size={18} className='text-green-700' />

                                            </div>

                                            {/* Second row: details */}
                                            <span className="text-sm text-gray-500 flex items-center">
                                                {blood.miles}miles • <Star size={16} className='text-yellow-400 mr-1' />  {blood.rating} rating
                                            </span>

                                            {/* Third row: responses + time */}
                                            <span className="text-xs text-gray-400">
                                                Available {blood.responses} • Last Donation: {blood.time}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="flex  items-center gap-3 flex-col">

                                        <button className="border border-gray-300 rounded-2xl px-4 py-1 text-sm hover:bg-gray-100">
                                            View Profile
                                        </button>
                                        <button className="bg-red-500 text-white rounded-2xl px-6 py-2 text-sm hover:bg-red-400">
                                            Contact
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>




                    </div>
                )}


            </div>




        </>
    )
}

export default Hospital
