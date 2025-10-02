import React, { useState } from 'react';
import { BiSolidHeartCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (password.length < 6) {
            alert('Password must be at least 6 characters for demo');
            return;
        }
        alert(`Demo sign in with ${email}`);
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-pink-50 to-pink-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-pink-200">
                <div className="p-8">
                    {/* Logo + Title */}
                    <div className="flex flex-col items-center gap-3 mb-4">
                        <div className="flex items-center gap-3">
                            <BiSolidHeartCircle size={32} className="text-purple-800 mr-2 ml-3 inline" />           
                               <h1 className="text-2xl font-semibold text-gray-800">LifeLink</h1>
                        </div>
                        <h2 className="text-xl font-medium text-gray-700">Welcome Back</h2>
                        <p className="text-sm text-gray-500 text-center">
                            Sign in to your LifeLink account to continue helping save lives
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-pink-200"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-purple-800 hover:bg-purple-900 text-white rounded-lg py-3 font-medium shadow-sm transition"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-5 text-center text-sm text-gray-600">
                        <p>
                            Don't have an account?{' '}
                            <Link to="/signUp" className="text-purple-800 font-medium underline">
                                Create New Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
