import React, { useState } from "react";
import { BiSolidHeartCircle } from "react-icons/bi";
import { Settings, Bell, Activity, Dot, MapPin, Calendar, Zap, Heart, UsersRound, Award, Phone, Clock, X, Shield } from "lucide-react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Link } from "react-router";

function Blooddonor() {
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
            title: "Donation 1",
            bloodType: "O+",
            hospital: "City Hospital",
            distance: "1.2 miles",
            time: "2 hours ago",
        },
        {
            id: 2,
            icon: Heart,

            title: "Donation 2",
            bloodType: "A-",
            hospital: "Emergency Clinic",
            distance: "0.8 miles",
            time: "30 min ago",
        },
        {
            id: 3,
            icon: Zap,

            title: "Donation 3",
            bloodType: "B+",
            hospital: "General Hospital",
            distance: "2.1 miles",
            time: "1 day ago",
        },
        {
            id: 4,
            icon: Heart,

            title: "Donation 3",
            bloodType: "B+",
            hospital: "General Hospital",
            distance: "2.1 miles",
            time: "1 day ago",
        },
        {
            id: 5,
            icon: Zap,

            title: "Donation 3",
            bloodType: "B+",
            hospital: "General Hospital",
            distance: "2.1 miles",
            time: "1 day ago",
        },

    ];
    const Upcoming = [
        {
          id:1,
          title:"Blood Donation",
          tag:"blood",
          location:"City Hospital",
          date:"2025-05-03",
          time:"10:00 AM"
        }, 
         {
          id:2,
          title:"Health Checkup",
          tag:"general",
          location:"LifeLink Clinic",
          date:"2025-07-13",
          time:"4:00 pM"
        }, 
        
        
        {
          id:3,
          title:"Organ Compatability Test",
          tag:"Organ",
          location:"Transplant Center",
          date:"2025-08-03",
          time:"11:00 AM"
        },
    ];
    return (
        <>
            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full h-[65px] bg-white text-black z-50 border-b border-gray-200 flex justify-between items-center px-4 md:px-8">
                {/* Brand */}
                <div className="flex items-center text-lg md:text-2xl font-bold text-black">
                    <BiSolidHeartCircle size={28} className="text-purple-800 mr-2" />
                    LifeLink
                </div>

                {/* Dashboard Text */}
                <div className="hidden md:flex flex-col items-center space-y-1">
                    <h1 className="font-medium text-xl text-black">Donor Dashboard</h1>
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
                        onClick={() => setIsOn(!isOn)}
                        className="border border-gray-300 rounded-2xl px-3 py-1 text-white bg-red-500 hover:bg-red-600"
                    >
                        {isOn ? "Available" : "Unavailable"}
                    </button>
                </div>
            </nav>

            {/* Grid Layout */}
            <section className="max-w-8xl mx-auto p-4 md:p-6 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* LEFT COLUMN */}
                    <div className="col-span-8 flex flex-col gap-6">
                        {/* Section 1 - Donation Status */}
                        <section className="border border-gray-300 shadow-md rounded-xl p-4 max-w-9xl ">
                            <div className="w-full">
                                <div className="flex items-center justify-between pt-2 mb-2">
                                    <div className="flex items-center">
                                        <Activity className="inline mr-3 text-purple-950" />
                                        <h1 className=" font-semibold text-small">Donation Status</h1>
                                    </div>

                                    {/* Toggle Switch */}
                                    <div
                                        onClick={() => setIsOn(!isOn)}
                                        className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${isOn ? "bg-red-600" : "bg-gray-200"
                                            }`}
                                    >
                                        <div
                                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isOn ? "translate-x-5" : "translate-x-0"
                                                }`}
                                        ></div>
                                    </div>
                                </div>

                                <p className="text-gray-600 ml-8 text-sm md:text-base">
                                    Control your availability for blood and organ donation requests
                                </p>
                            </div>

                            {/* Availability Box */}
                            {isOn ? (
                                <div className="flex flex-col border border-gray-200 bg-gray-100 min-h-[5vh] rounded-2xl mt-4 p-3 mb-2">
                                    <h2 className="flex items-center text-base md:text-lg font-medium">
                                        <Dot size={54} className="text-red-600" />
                                        You're available for donations
                                    </h2>
                                    <p className="text-gray-600 ml-10 text-sm md:text-base">
                                        Nearby hospitals and recipients can see your availability for blood and organ donations.
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col border border-gray-200 bg-gray-100 min-h-[5vh] rounded-2xl mt-4 p-3 mb-2">
                                    <h2 className="flex items-center text-base md:text-lg font-medium">
                                        <Dot size={54} className="text-gray-400" />
                                        You're currently unavailable for donations
                                    </h2>
                                    <p className="text-gray-600 ml-10 text-sm md:text-base">
                                        You won't receive donation requests while unavailable.
                                    </p>
                                </div>
                            )}
                        </section>
                        {/* Section 2 - Nearby Requests */}
                        <section className="border border-gray-300 shadow-md rounded-xl p-4">
                            <div className="flex items-center mb-3">
                                <MapPin size={20} className="inline mr-3 text-red-600" />
                                <h1 className=" font-semibold text-small">Nearby Requests</h1>
                            </div>
                            <p className="text-gray-600 mb-4 text-sm md:text-base">
                                Manage and respond to nearby blood and organ donation requests.
                            </p>

                            {/* Tabs */}
                            <div className="flex border rounded-2xl border-gray-300 mb-6">
                                <button
                                    className={`flex-1 py-2 text-center font-medium rounded-2xl ${activeTab === "blood" ? "bg-gray-200 text-black" : "hover:text-black"
                                        }`}
                                    onClick={() => setActiveTab("blood")}
                                >
                                    Blood Requests
                                </button>
                                <button
                                    className={`flex-1 py-2 text-center font-medium rounded-2xl ${activeTab === "organs" ? "bg-gray-200 text-black" : "hover:text-black"
                                        }`}
                                    onClick={() => setActiveTab("organs")}
                                >
                                    Organ Requests
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
                                            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
                                                Respond
                                            </button>
                                        </div>
                                    ))}
                                    <button className="w-full p-1.5 mt-4 text-black hover:bg-pink-500 hover:text-white font-medium border border-gray-200 rounded-2xl">
                                        View All Organ Requests
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
                                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium">
                                                Respond
                                            </button>
                                        </div>
                                    ))}
                                    <button className="w-full p-1.5 mt-4 text-black hover:bg-pink-500 hover:text-white font-medium border border-gray-200 rounded-2xl">
                                        View All Organ Requests
                                    </button>
                                </div>
                            )}


                        </section>

                        {/* Section 3 - Recent Donations */}
                        <section className="border border-gray-300 shadow-md rounded-xl p-4">
                            <div className="space-y-4">

                                {/* Header */}
                                <div className="flex items-center mb-3">
                                    <Calendar size={20} className="inline mr-3 text-purple-950" />
                                    <h1 className=" font-semibold text-small">Recent Donations</h1>
                                </div>
                                <p className="text-gray-600 mb-4 text-sm md:text-base">
                                    Your blood and organ donation history and impact
                                </p>

                                {/* Donation Items */}
                                <div className="flex flex-col gap-5">
                                    {donationBoxes.map((box) => (
                                        <div
                                            key={box.id}
                                            className="flex justify-between items-start p-5 md:p-7 border border-gray-200 rounded-2xl "
                                        >
                                            {/* Left Info */}
                                            <div className="flex items-start gap-4">
                                                <div className="bg-purple-100 p-2 rounded-2xl">
                                                    <box.icon className="text-purple-950" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold text-lg">{box.title}</h3>
                                                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200">
                                                            {box.bloodType}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 flex items-center">
                                                        {box.hospital} <Dot /> {box.distance}
                                                    </p>
                                                    <p className="text-xs text-gray-500">{box.time}</p>
                                                </div>
                                            </div>

                                            {/* Right Button */}
                                            <button className="bg-gray-100  text-black border border-gray-200 px-2 py-1 rounded-2xl font-small">
                                                complete
                                            </button>
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
                                    <span className="font-medium">Organ Donor:</span>
                                    <span className="text-green-600 font-semibold flex items-center"><Shield size={12} /> Registered</span>
                                </div>
                            </div>

                            {/* Edit Profile Button */}
                            <button className="mt-6 w-full px-3 py-1 rounded-xl border border-gray-200 hover:bg-gray-200 font-medium text-gray-700 flex items-center justify-center gap-2">
                                <Settings size={16} /> Edit Profile
                            </button>
                        </section>

                        {/* second */}
                        <section className="border border-gray-300 shadow-md rounded-xl min-h-[50vh] p-4">
                            <div className="flex items-center mb-3">
                                <Award size={20} className="inline mr-3 text-yellow-500" />
                                <h1 className=" font-semibold text-small">Your Impact</h1>
                            </div>

                            <div className=" flex items-center justify-center mt-8 flex-col">
                                <h1 className="text-red-500 text-3xl font-semibold">18</h1>
                                <p className="text-gray-600">Lives Saved</p>
                                <hr className="border-gray-300 w-full my-3" />
                            </div>

                            <div className="space-y-3 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span className="font-medium">Blood Donation</span>
                                    <span className="text-black text-bold">8</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Organ Donation</span>
                                    <span className="text-black text-bold">2</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Blood Donated</span>
                                    <span className="text-black text-bold">3.2L</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Response Time</span>
                                    <span className="text-black text-bold">12min avg</span>
                                </div>
                                <div className="flex justify-between mt-8">
                                    <span className="font-medium">Next Milestone</span>
                                    <span className="text-black text-bold">20 Lives</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full">
                                    <div className="h-2 bg-purple-950 rounded-full w-4/5"></div>
                                </div>

                            </div>

                        </section>


                        {/* third */}
                        <section className="border border-gray-300 shadow-md rounded-xl min-h-[60vh] p-4 bg-white">
                            {/* Header */}
                            <div className="flex items-center mb-3">
                                <Clock size={20} className="inline mr-3 text-purple-950" />
                                <h1 className="font-semibold text-small">Upcoming</h1>
                            </div>

                            {/* Upcoming Events */}
                            <div className="flex flex-col gap-5">
                                {Upcoming.map((box) => (
                                    <div
                                        key={box.id}
                                        className="  flex justify-between items-start p-3 md:p-4. border border-gray-200 rounded-2xl"
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Left side (event info) */}
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className=" text-base">{box.title}</h3>
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200">
                                                        {box.tag}
                                                    </span>
                                                </div>

                                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                                 {box.location}
                                                </p>

                                                <p className="text-xs text-green-600">{box.date} at {box.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                 <button className="border border-gray-200 hover:bg-red-500 hover:text-white text-black px-3 py-1 rounded-lg font-medium">
                                                Schedule Donation
                                            </button>
                            </div>
                        </section>



                        {/* fourth */}
                        <section className="border border-red-300 shadow-md rounded-xl min-h-[20vh] bg-red-50 p-4">
                            <div className="flex items-center mb-3">
                                <Phone size={20} className="inline mr-3 text-red-500" />
                                <h1 className="font-semibold text-red-500 text-small">Emergency SOS</h1>
                            </div>
                            <p className="text-gray-600 mb-4 text-sm md:text-base">
                                Send emergency alert to nearby hospitals and donors for urgent blood or organ needs
                            </p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full p-2 mt-4 text-white bg-red-500 hover:text-white hover:bg-red-400 font-medium border border-gray-200 rounded-2xl flex items-center justify-center"
                            >
                                <Phone size={20} className="inline mr-2 text-white" />
                                Emergency SOS
                            </button>
                        </section>

                        {/* Modal */}
                        {isModalOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white rounded-2xl p-6 w-96 relative shadow-lg">
                                    <h2 className="text-lg font-semibold mb-4 text-red-500">Emergency Alert</h2>
                                    <p className="text-gray-600 mb-4">
                                        Your emergency SOS has been sent to nearby hospitals and donors. Please wait for responses.
                                    </p>

                                    {/* Close Button */}
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                                    >
                                        <X />
                                    </button>

                                    {/* Optional Confirm Button */}
                                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium mt-2 w-full">
                                        OK
                                    </button>
                                </div>
                            </div>
                        )}









                    </div >
                </div >
            </section >
        </>
    );
}

export default Blooddonor;
