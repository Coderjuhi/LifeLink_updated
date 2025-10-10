import React, { useState } from 'react'
import { BiSolidHeartCircle } from 'react-icons/bi'
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Activity, Settings, Bell, TriangleAlert, Dot, MapPin, Calendar, Zap, Heart, UsersRound, Award, Phone, Clock, X, Shield, Search, Funnel, Users, Droplet } from "lucide-react";
import { Link } from 'react-router';
function Recipient() {
    const [isOn, setIsOn] = useState(false);
    const [activeTab, setActiveTab] = useState("blood");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const requests = {
        organs: [
            {
                type: "Kidney",
                urgency: "Critical",
                match: "98%",
                matchColor: "bg-green-100 text-green-700",
                urgencyColor: "bg-red-500 text-white",
                center: "Transplant Center",
                distance: "1.5 miles",
                time: "30 min ago",
                waiting: "2 years",
            },
            {
                type: "Liver (Living)",
                urgency: "High",
                match: "95%",
                matchColor: "bg-green-100 text-green-700",
                urgencyColor: "bg-orange-500 text-white",
                center: "Medical Center",
                distance: "3.2 miles",
                time: "2 hours ago",
                waiting: "8 months",
            },
            {
                type: "Cornea",
                urgency: "Medium",
                match: "100%",
                matchColor: "bg-green-100 text-green-700",
                urgencyColor: "bg-gray-300 text-black",
                center: "Eye Institute",
                distance: "4.1 miles",
                time: "1 day ago",
                waiting: "6 months",
            },
        ],
        blood: [
            {
                type: "O+",
                urgency: "Critical",
                urgencyColor: "bg-red-500 text-white",
                hospital: "Emergency Hospital",
                distance: "0.8 miles",
                time: "2 min ago",
            },
            {
                type: "O+",
                urgency: "High",
                urgencyColor: "bg-orange-500 text-white",
                hospital: "City Medical",
                distance: "1.2 miles",
                time: "15 min ago",
            },
            {
                type: "O-",
                urgency: "Medium",
                urgencyColor: "bg-gray-300 text-black",
                hospital: "General Hospital",
                distance: "2.1 miles",
                time: "1 hour ago",
            },
        ],
    };

    const donationBoxes = [
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
            bgColor: "bg-red-100",   // icon background
            iconColor: "text-red-600", // icon color
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
            bgColor: "bg-yellow-100",
            iconColor: "text-yellow-600",
        },
        {
            id: 3,
            icon: Droplet,
            title: "Platelet Request",
            urgency: "High",
            bloodType: "O+",
            hospital: "Medical Center",
            responses: 1,
            time: "1 day ago",
            status: "Pending",
            bgColor: "bg-blue-100",
            iconColor: "text-blue-600",
        },
    ];

    const History = [
        {
            id: 1,
            title: "Blood Transfusion",
            tag: "blood",
            location: "Emergency Hospital",
            date: "2025-05-03",
            donor: "Donor:Anonymous Donor"
        },
        {
            id: 2,
            title: "Kidney Transplant",
            tag: "organ",
            location: "Transplant Center",
            date: "2025-07-13",
            donor: "Donor:Living Dono"
            
        },


        {
            id: 3,
            title: "Platelets Transfusion",
            tag: "Blood",
            location: "City Hospital",
            date: "2025-08-03",
            donor: "Donor: Jhon Doe"
        },
    ];
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
                               <h1 className="font-medium text-xl text-black">Recepient Dashboard</h1>
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
                                
                                   className="border border-gray-300 rounded-2xl px-3 py-1  text-red-500 hover:text-red-600"
                               >Recepient
                               </button>
                           </div>
                       </nav>


            {/* Grid Layout */}
            <section className="max-w-8xl mx-auto p-4 md:p-6 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* LEFT COLUMN */}
                    <div className="col-span-8 flex flex-col gap-6">

                        {/* Section 1 - Donation Status */}

                        <section className="border border-red-300 shadow-md rounded-xl p-4 max-w-9xl bg-red-50">
                            <div className="w-full">
                                <div className="flex items-center pt-2">
                                    <TriangleAlert size={18} className="inline mr-2 text-red-500" />
                                    <h1 className="text-red-500 font-semibold">Emergency Request</h1>
                                </div>
                                <p className="text-gray-600 ml-8 text-sm md:text-base">
                                    Send urgent request to nearby donors and hospitals for blood or organ needs
                                </p>
                            </div>

                            {/* Form Section */}
                            <div className="mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Dropdown 1 */}
                                    <div>
                                        <h2 className="text-gray-700 font-medium mb-1 text-sm">Request Type</h2>
                                        <select className="w-[60%] border border-gray-300 rounded-lg p-2 text-sm b focus:outline-none focus:ring-2 focus:ring-red-400">
                                            <option value="Blood/Platelets">Blood/Platelets</option>
                                            <option value="Organ Transplant">Organ Transplant</option>
                                        </select>
                                    </div>

                                    {/* Dropdown 2 */}
                                    <div>
                                        <h2 className="text-gray-700 font-medium mb-1 text-sm">Urgency Level</h2>
                                        <select className="w-[60%] border border-gray-300 rounded-xl p-2 text-sm   focus:outline-none focus:ring-2 focus:ring-red-400">
                                            <option value="Critical(life-threatening)">Critical(life-threatening)</option>
                                            <option value="High(Urgent)">High(Urgent)</option>
                                            <option value="Medium(Scheduled)">Medium(Scheduled)</option>
                                        </select>
                                    </div>

                                    {/* Dropdown 3 */}
                                    <div>
                                        <h2 className="text-gray-700 font-medium mb-1 text-sm">Search Radius</h2>
                                        <select className="w-[60%]  border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400">
                                            <option value="5 miles"> 5 miles</option>
                                            <option value="10 miles">10 miles</option>
                                            <option value="hospital3">25 miles</option>
                                            <option value="hospital4">50 miles</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Button */}
                            <div className="mt-8">
                                <button className="w-full p-1 mt-4 bg-red-500 hover:bg-red-600 text-white border border-gray-200 rounded-2xl">
                                    Send Emergency Blood Request
                                </button>
                            </div>
                        </section>


                        {/* Section 2 - Nearby Requests */}
                        <section className="border border-gray-300 shadow-md rounded-xl p-4">
                            <div className="flex items-center mb-1">
                                <Search size={20} className="inline mr-3 text-purple-950" />
                                <h1 className=" font-semibold">Find Donors</h1>
                            </div>
                            <p className="text-gray-600 mb-4 text-sm md:text-base">
                                Search for compatible blood and organ donors in your area
                            </p>
                            {/* Search Bar + Buttons Row */}
                            <div className="mt-8 flex flex-col md:flex-row items-center gap-4 mb-4">
                                {/* Search Bar */}
                                <input
                                    type="text"
                                    placeholder="Search by loaction, blood type, organ type...."
                                    className="w-full md:flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />

                                {/* Buttons */}
                                <div className="flex gap-3">
                                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-black hover:bg-red-500 hover:text-white transition">
                                        <Funnel size={18} className="inline" />
                                        <span className="text-sm font-medium">Filters</span>
                                    </button>
                                    <button className="px-5 py-2 bg-purple-800 text-white text-sm font-medium rounded-lg shadow hover:bg-purpl8-300 transition">
                                        Search
                                    </button>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="flex border rounded-2xl border-gray-300 mb-6">
                                <button
                                    className={`flex-1 py-2 text-center font-medium rounded-2xl ${activeTab === "blood" ? "bg-gray-200 text-black" : "hover:text-black"
                                        }`}
                                    onClick={() => setActiveTab("blood")}
                                >
                                    Blood Donors
                                </button>
                                <button
                                    className={`flex-1 py-2 text-center font-medium rounded-2xl ${activeTab === "organs" ? "bg-gray-200 text-black" : "hover:text-black"
                                        }`}
                                    onClick={() => setActiveTab("organs")}
                                >
                                    Organ Donors
                                </button>
                            </div>

                            {/* Blood Requests */}
                            {activeTab === "blood" && (
                                <div className="space-y-4">
                                    {requests.blood.map((req, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center p-4 border rounded-xl hover:shadow-md transition  border-gray-200 hover:border-gray-400"
                                        >
                                            {/* Left Info */}
                                            <div className="flex items-start gap-4">
                                                <div className="bg-pink-100 p-2 rounded-2xl">
                                                    <Heart className='text-red-600' />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold text-lg">{req.type}</h3>
                                                        <span
                                                            className={`text-xs px-2 py-0.5 rounded-full ${req.urgencyColor}`}
                                                        >
                                                            {req.urgency}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 flex items-center">
                                                        {req.hospital} <Dot /> {req.distance}
                                                    </p>
                                                    <p className="text-xs text-gray-500">{req.time}</p>
                                                </div>
                                            </div>

                                            {/* Right Button */}
                                            <button className="bg-purple-800 hover:bg-purple-900 text-white px-4 py-2 rounded-lg font-medium">
                                                Respond
                                            </button>
                                        </div>
                                    ))}
                                    <button className="w-full p-1 mt-4 bg-red-500 hover:bg-red-600 text-white border border-gray-200 rounded-2xl">
                                        Load More Donors
                                    </button>
                                </div>
                            )}

                            {/* Organ Requests */}
                            {activeTab === "organs" && (
                                <div className="space-y-4">
                                    {requests.organs.map((req, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center p-4 border rounded-xl hover:shadow-md transition r border-gray-200 hover:border-gray-400"
                                        >
                                            {/* Left Info */}
                                            <div className="flex items-start gap-4">
                                                <div className="bg-purple-100 p-2 rounded-2xl">
                                                    <Zap className='text-purple-950' />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold text-lg">{req.type}</h3>
                                                        <span
                                                            className={`text-xs px-2 py-0.5 rounded-full ${req.urgencyColor}`}
                                                        >
                                                            {req.urgency}
                                                        </span>
                                                        <span
                                                            className={`text-xs px-2 py-0.5 rounded-full ${req.matchColor}`}
                                                        >
                                                            {req.match} Match
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 flex items-center">
                                                        {req.center} <Dot />{req.distance}
                                                    </p>
                                                    <p className="text-xs text-gray-400 flex items-center">
                                                        {req.time} <Dot /> Patient waiting: {req.waiting}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Right Button */}
                                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium">
                                                Respond
                                            </button>
                                        </div>
                                    ))}
                                    <button className="w-full p-1 mt-4 bg-red-500 hover:bg-red-600 text-white border border-gray-200 rounded-2xl">
                                        Load More Donors
                                    </button>
                                </div>
                            )}


                        </section>

                        <section className="border border-gray-300 shadow-md rounded-xl p-6">
                            <div className="space-y-4">
                                {/* Header */}
                                <div className="flex items-center mb-1">
                                    <Activity size={20} className="inline mr-3 text-green-600" />
                                    <h1 className="font-semibold text-samll">Active Requests</h1>
                                </div>
                                <p className="text-gray-600 mb-4 text-sm">
                                    Your current blood and organ donation requests and their status
                                </p>

                                {/* Donation Items */}
                                <div className="flex flex-col gap-5">
                                    {donationBoxes.map((box) => (
                                        <div
                                            key={box.id}
                                            className="flex justify-between items-center p-4 md:p-5 border border-gray-200 rounded-2xl"
                                        >
                                            {/* Left Info */}
                                            <div className="flex items-start gap-4">
                                                <div className={`${box.bgColor} p-2 rounded-2xl`}>
                                                    <box.icon className={`${box.iconColor} w-5 h-5`} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h3 className="font-semibold text-base md:text-lg">
                                                            {box.title}
                                                        </h3>

                                                        {/* Urgency badge */}
                                                        <span
                                                            className={`text-xs px-2 py-0.5 rounded-full font-medium
                    ${box.urgency === "Critical"
                                                                    ? "bg-red-100 text-red-600"
                                                                    : box.urgency === "High"
                                                                        ? "bg-pink-100 text-pink-600"
                                                                        : "bg-yellow-100 text-yellow-600"
                                                                }`}
                                                        >
                                                            {box.urgency}
                                                        </span>

                                                        {/* Blood / Organ type */}
                                                        {box.bloodType && (
                                                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
                                                                {box.bloodType}
                                                            </span>
                                                        )}
                                                        {box.organ && (
                                                            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-600">
                                                                {box.organ}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="text-sm text-gray-600">
                                                        {box.hospital} • {box.responses} responses
                                                    </p>
                                                    <p className="text-xs text-gray-500">Created {box.time}</p>
                                                </div>
                                            </div>

                                            {/* Right Side: Status + View Details */}
                                            <div className="flex flex-col items-end gap-2">
                                                <span
                                                    className={`text-xs px-3 py-1 rounded-xl font-medium
                ${box.status === "Active"
                                                            ? "bg-green-100 text-green-700"
                                                            : box.status === "Pending"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : box.status === "Matching"
                                                                    ? "bg-blue-100 text-blue-700"
                                                                    : "bg-gray-100 text-gray-600"
                                                        }`}
                                                >
                                                    {box.status}
                                                </span>
                                                <button className="px-3 py-1.5 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition mt-2">
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* View Full History Button */}
                                <button className="w-full p-2 mt-4 text-black hover:bg-pink-500 hover:text-white font-medium border border-gray-200 rounded-2xl">
                                    View Full History
                                </button>
                            </div>
                        </section>






                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="col-span-4 flex flex-col gap-6 ">

                        {/* first container rigght */}

                        <section className="border border-gray-300 shadow-md rounded-xl min-h-[40vh] p-4 bg-white">
                            {/* Header */}
                            <div className="flex items-center mb-4">
                                <UsersRound size={20} className="mr-2 text-purple-950" />
                                <h1 className="font-semibold text-small">Your Profile</h1>
                            </div>

                            {/* Avatar + Name */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center text-lg font-bold text-purple-700">
                                    J
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">Juhi Gupta</p>
                                    <p className="text-sm text-gray-500">Blood Type:</p>
                                </div>
                            </div>

                            {/* Profile Details */}
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span className="font-medium">Location:</span>
                                    <span>knit near purana shiv mandir</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Member Since:</span>
                                    <span>9/21/2025</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Emergency:</span>
                                    <span>Not Sent</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Organ Recipient:</span>
                                    <span className="text-red-400 font-semibold flex items-center"><Shield size={12} /> Registered</span>
                                </div>
                            </div>

                            {/* Edit Profile Button */}
                            <button className="mt-6 w-full px-3 py-1 rounded-xl border border-gray-200 hover:bg-gray-200 font-medium text-gray-700 flex items-center justify-center gap-2">
                                <Settings size={16} /> Edit Profile
                            </button>
                        </section>

                        {/* second */}
                        <section className="border border-gray-300 shadow-md rounded-xl min-h-[40vh] p-6">
                            {/* Header */}
                            <div className="flex items-center mb-3">
                                <Activity size={20} className="inline mr-3 text-purple-950" />
                                <h1 className="font-semibold text-small">Medical Info</h1>
                            </div>

                            {/* Info List */}
                            <div className="space-y-3 text-sm  text-gray-600 mt-4">
                                <div className="flex justify-between">
                                    <span className="font-medium">Blood Type</span>
                                    <span className="text-red-600">O</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Conditions</span>
                                    <span className="text-black"> 0 listed</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Medications</span>
                                    <span className="text-black"> 0 listed</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Allergies</span>
                                    <span className="text-black">0 listed</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Organ Compatability</span>
                                    <span className="text-black">HLA Typed</span>
                                </div>
                            </div>

                            {/* Button */}
                            <button className="w-full mt-4 border border-gray-200 px-4 py-2 rounded-lg font-medium text-black hover:bg-red-500 hover:text-white transition">
                                Update Medical Info
                            </button>
                        </section>



                        {/* third */}
                        <section className="border border-gray-300 shadow-md rounded-xl min-h-[60vh] p-4 bg-white">
                            {/* Header */}
                            <div className="flex items-center mb-3">
                                <Calendar size={20} className="inline mr-3 text-yellow-400" />
                                <h1 className="font-semibold text-sm md:text-base">Recent History</h1>
                            </div>

                            {/* Upcoming Events */}
                            <div className="flex flex-col gap-5">
                                {History.map((box) => (
                                    <div
                                        key={box.id}
                                        className="w-full flex justify-between items-center p-3 md:p-4 border border-gray-200 rounded-2xl"
                                    >
                                        {/* Left side (event info) */}
                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="font-semibold text-base">{box.title}</h3>
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200">
                                                    {box.tag}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">{box.location}</p>
                                            <p className="text-xs text-gray-600 flex items-center">
                                                {box.date} <Dot /> {box.donor}
                                            </p>
                                        </div>

                                        {/* Right side (Complete badge) */}
                                        <span className="px-3 py-1 text-xs font-medium rounded-lg bg-green-100 text-green-700">
                                            Completed
                                        </span>
                                    </div>
                                ))}

                                {/* Bottom main action */}
                                <button className="w-full mt-3 border border-gray-200 hover:bg-red-500 hover:text-white text-black px-4 py-2 rounded-lg font-medium">
                                    Schedule Donation
                                </button>
                            </div>
                        </section>




                        {/* fourth */}
                        <section className="border border-gray-200 shadow-md rounded-xl min-h-[20vh] bg-white p-4">
                            <div className="flex items-center mb-3">
                                <Clock size={20} className="inline mr-3 text-red-500" />
                                <h1 className="font-semibold text-black text-small">Quick Actions</h1>
                            </div>

                            {/* 4 Divs stacked */}
                            <div className="space-y-3">
                                <div className="flex items-center p-3 rounded-lg border border-gray-200 shadow-sm bg-white hover:bg-red-500 transition text-black hover:text-white cursor-pointer">
                                    <MapPin size={18} className="mr-3" />
                                    <span className="text-base font-small">Find Nearby Hospitals</span>
                                </div>

                                <div className="flex items-center p-3 rounded-lg border border-gray-200 shadow-sm bg-white hover:bg-red-500 transition text-black hover:text-white cursor-pointer">
                                    <Users size={18} className="mr-3" />
                                    <span className="text-base font-small">Join Support Groups</span>
                                </div>

                                <div className="flex items-center p-3 rounded-lg border border-gray-200 shadow-sm bg-white hover:bg-red-500 transition text-black hover:text-white cursor-pointer">
                                    <Calendar size={18} className="mr-3" />
                                    <span className="text-base font-small">Schedule Appointment</span>
                                </div>

                                <div className="flex items-center p-3 rounded-lg border border-gray-200 shadow-sm bg-white hover:bg-red-500 transition text-black hover:text-white cursor-pointer">
                                    <Phone size={18} className="mr-3" />
                                    <span className="text-base font-small">Contact Support</span>
                                </div>
                            </div>
                        </section>














                    </div >
                </div >
            </section >

        </>
    )
}

export default Recipient
