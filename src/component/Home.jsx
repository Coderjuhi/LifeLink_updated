import React, { useState } from "react";
import { Link } from "react-router";
import { FaRegHeart } from "react-icons/fa6";
import { BsArrowRight } from "react-icons/bs";
import { FaMapMarkerAlt, FaPhoneAlt, FaLock, FaUserFriends, FaHeartbeat, FaClock } from "react-icons/fa";
import { Heart, Users, MapPin, Clock, Award, Shield ,X} from 'lucide-react';


const Home = () => {

    const features = [
        {
            icon: Users,
            title: 'Verified Donors',
            description: 'All our donors are medically verified and regularly screened for safety.',
        },
        {
            icon: MapPin,
            title: 'Location-Based Matching',
            description: 'Find the nearest donors quickly with our advanced location tracking.',
        },
        {
            icon: Shield,
            title: 'Secure & Private',
            description: 'Your personal information is protected with enterprise-grade security.',
        },
        {
            icon: Award,
            title: 'Emergency Response',
            description: '24/7 emergency support for critical blood and organ requirements.',
        },
    ];
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (


        <>

            <section className="w-full bg-red-50 h-full">
                <div className="max-w-6xl mx-auto text-center px-6 py-12 pt-20 min-h-[60vh]">
                    {/* Tagline */}
                    <div className="inline-block bg-gray-100 rounded-2xl px-3 py-1 mt-5">
                        <p className="text-sm font-medium text-black">
                            Connecting Lives Through Technology
                        </p>
                    </div>

                    {/* Heading */}
                    <h1 className=" py-3 text-3xl md:text-5xl font-bold mb-4 mt-3 bg-gradient-to-r from-purple-900 to-pink-600 bg-clip-text text-transparent">
                        Know that your
                        donation<br />is making a difference
                    </h1>

                    {/* Subheading */}
                    <p className="max-w-2xl mx-auto text-gray-600 mb-6">
                        LifeLink connects blood and organ donors with recipients in real-time,
                        providing transparency, emergency response, and life-saving coordination
                        when every second counts.
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-center gap-4">
                        <Link
                            to="/signup"
                            className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition inline-flex items-center"
                        >
                            <FaRegHeart className="text-white mr-2" />
                            Become a Donor
                        </Link>

                        <Link
                            to="/find-help"
                            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition inline-flex items-center"
                        >
                            Find Help <BsArrowRight className="ml-2" />
                        </Link>
                    </div>

                </div>
            </section>

            {/* second container */}
            <section className="w-full bg-white mt-8">
                <div className="mx-auto text-center  w-full min-h-[18vh] px-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 ">
                        <div>
                            <h2 className="text-3xl font-bold text-pink-600">24,847</h2>
                            <p className="text-gray-600">Lives Connected</p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-purple-700">1,203</h2>
                            <p className="text-gray-600">Active Donors</p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-green-600">47</h2>
                            <p className="text-gray-600">Partner Hospitals</p>
                        </div>
                    </div>
                </div>

            </section >

            {/* third container */}
            <section className="w-full bg-pink-50 min-h-screen pt-[100px] px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="text-center flex flex-col">
                        <h2 className=" text-black text-3xl font-bold mb-4">
                            Real-time coordination for life-saving care</h2>
                        <p className=" text-gray-600 text-2xl mb-12">Advanced technology meets compassionate care to save lives faster</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8
                    ">
                        {/* Card 1 */}
                        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border border-transparent hover:border-pink-500  hover:scale-98 transition duration-300">
                            <FaMapMarkerAlt className="text-pink-500 text-3xl mb-4" />
                            <h2 className="text-xl font-semibold mb-2">Real-time Tracking</h2>
                            <p className="text-gray-600">
                                Track donor locations and availability in real-time with GPS integration for fastest response times.
                            </p>
                        </div>

                        {/* Emergency SOS Card */}
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border border-transparent hover:border-red-400 hover:scale-98 transition duration-300 cursor-pointer"
                        >
                            <FaPhoneAlt className="text-red-400 text-3xl mb-4" />
                            <h2 className="text-xl font-semibold mb-2">Emergency SOS</h2>
                            <p className="text-gray-600">
                                One-tap emergency alerts notify nearby compatible donors and hospitals instantly during critical situations.
                            </p>
                        </div>

                        {/* Modal */}
                        {isModalOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                                <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
                                    {/* Modal Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-semibold text-gray-900">Emergency Alert</h2>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>

                                    {/* Modal Body */}
                                    <p className="text-gray-600 mb-6">
                                        Your emergency SOS has been sent to nearby hospitals and donors. You'll receive responses shortly.
                                    </p>

                                    {/* Close Button */}
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="w-full px-4 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                    >
                                        Got it
                                    </button>
                                </div>
                            </div>
                        )}


                        {/* Card 3 */}
                        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border border-transparent hover:border-green-500 hover:scale-98 transition duration-300">
                            <FaLock className="text-green-500 text-3xl mb-4" />
                            <h2 className="text-xl font-semibold mb-2">Secure & Private</h2>
                            <p className="text-gray-600">
                                HIPAA-compliant platform with end-to-end encryption protecting all medical and personal information.
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border border-transparent hover:border-purple-500 hover:scale-98 transition duration-300">
                            <FaUserFriends className="text-purple-500 text-3xl mb-4" />
                            <h2 className="text-xl font-semibold mb-2">Smart Matching</h2>
                            <p className="text-gray-600">
                                AI-powered compatibility matching based on blood type, location, and medical requirements.
                            </p>
                        </div>

                        {/* Card 5 */}
                        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border border-transparent hover:border-teal-500 hover:scale-98 transition duration-300">
                            <FaHeartbeat className="text-teal-500 text-3xl mb-4" />
                            <h2 className="text-xl font-semibold mb-2">Health Monitoring</h2>
                            <p className="text-gray-600">
                                Track donation history, health metrics, and eligibility status with personalized health insights.
                            </p>
                        </div>

                        {/* Card 6 */}
                        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border border-transparent hover:border-orange-400 hover:scale-98 transition duration-300">
                            <FaClock className="text-orange-400 text-3xl mb-4" />
                            <h2 className="text-xl font-semibold mb-2">24/7 Support</h2>
                            <p className="text-gray-600">
                                Round-the-clock medical support and coordination with healthcare professionals and emergency services.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* fourth container */}

            <div className="max-w-10xl mx-auto p-3.5">

                <section className="py-16 bg-gray-50 rounded-1xl  overflow-hidden flex flex-col md:flex-row items-center min-h-[80vh]">                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose LifeLink?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We provide a secure, efficient, and reliable platform for blood and organ donation
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-md   hover:scale-105 transition duration-300">
                                <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <feature.icon className="h-6 w-6 text-red-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                </section>

            </div>

            {/* fifth container */}


            <section className="w-full bg-red-100">
                <div className="mx-auto text-center w-full min-h-[40vh] px-6 py-10">
                    {/* Heading */}
                    <h2 className="text-black text-2xl md:text-3xl font-bold mb-4">
                        Ready to save lives?
                    </h2>

                    {/* Paragraph */}
                    <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
                        Join thousands of donors and recipients who trust LifeLink for
                        life-saving connections every day.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/signup"
                            className="border border-gray-300 rounded-2xl py-2 px-4 text-white bg-red-600 hover:bg-red-700"
                        >
                            Start Donating
                        </Link>
                        <button className="border border-gray-600 text-gray-600 px-6 py-2 rounded-lg font-medium  hover:scale-105 transition duration-300">
                            Partner With Us
                        </button>
                    </div>
                </div>
            </section>

        </>


    );
};

export default Home;
