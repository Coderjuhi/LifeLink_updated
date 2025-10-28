import React, { useState } from 'react';
import { BiSolidHeartCircle } from "react-icons/bi";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate, Link } from 'react-router-dom';
import api from "../api/api";

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      const res = await api.post("/login", { email, password });

      alert("Login Successful ✅");

      const userType = res.data.user.accountType;

      // Redirect based on account type
      if (userType === "donor") navigate("/blood-donor");
      else if (userType === "recipient") navigate("/recipient");
      else if (userType === "hospital") navigate("/hospital");
      else if (userType === "admin") navigate("/admin");
      else navigate("/");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-pink-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-pink-200">
        <div className="p-8 text-center">
          <BiSolidHeartCircle size={32} className="text-purple-800 inline mb-2" />
          <h1 className="text-2xl font-semibold text-gray-800">LifeLink</h1>
          <h2 className="text-xl font-medium text-gray-700 mt-2">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1 mb-4">Sign in to your LifeLink account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required
              className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200"/>

            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-pink-200"/>
              
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
              </button>
            </div>

            <button type="submit" className="w-full bg-purple-800 hover:bg-purple-900 text-white rounded-lg py-3 font-medium shadow-sm transition">
              Sign In
            </button>
          </form>

          <p className="mt-5 text-sm text-gray-600">
            Don't have an account? <Link to="/signup" className="text-purple-800 font-medium underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
