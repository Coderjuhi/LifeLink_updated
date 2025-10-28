// File: ./component/Signup/Signup.jsx
import React, { useState } from 'react';
import { BiSolidHeartCircle } from 'react-icons/bi';
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';

export default function Signup({ setUser }) {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState('');
  const [bloodType, setBloodType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) return alert('Password must be at least 6 characters');
    if (password !== confirmPassword) return alert('Passwords do not match');

    try {
      const { data } = await API.post("/signup", {
        name,
        email,
        password,
        accountType,
        bloodType
      });

      alert("✅ Signup Successful!");

      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      navigate(accountType === "donor" ? "/blood-donor" :
        accountType === "recipient" ? "/recipient" :
        accountType === "hospital" ? "/hospital" :
        "/admin");

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed, try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-pink-100 flex items-start pt-17 justify-center p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-pink-200">
        <div className="p-8">
          <div className="flex flex-col items-center gap-3 mb-4">
            <div className="flex items-center gap-3">
              <BiSolidHeartCircle size={32} className="text-purple-800 mr-2 ml-3 inline" />
              <h1 className="text-2xl font-semibold text-gray-800">Join LifeLink</h1>
            </div>
            <p className="text-gray-600">Create your account to start saving lives</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <input type="text" value={name} onChange={e => setName(e.target.value)} required
              className="w-full rounded-lg border border-gray-200 px-4 py-1" placeholder="Full Name" />

            {/* Email */}
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full rounded-lg border border-gray-200 px-4 py-1" placeholder="Email" />

            {/* Password */}
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full rounded-lg border border-gray-200 px-4 py-1 pr-12" placeholder="Password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
              </button>
            </div>

            {/* Confirm Password */}
            <input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required
              className="w-full rounded-lg border border-gray-200 px-4 py-1" placeholder="Confirm Password" />

            {/* Account Type */}
            <select value={accountType} onChange={e => setAccountType(e.target.value)} required
              className="w-full border border-gray-200 rounded-lg px-4 py-1">
              <option value="">Select account type</option>
              <option value="donor">Blood Donor</option>
              <option value="recipient">Recipient</option>
              <option value="hospital">Hospital</option>
              <option value="admin">Admin</option>
            </select>

            {/* Blood Type */}
            <select value={bloodType} onChange={e => setBloodType(e.target.value)} required
              className="w-full border border-gray-200 rounded-lg px-4 py-1">
              <option value="">Select blood type</option>
              <option value="A+">A+</option><option value="A-">A-</option>
              <option value="B+">B+</option><option value="B-">B-</option>
              <option value="O+">O+</option><option value="O-">O-</option>
              <option value="AB+">AB+</option><option value="AB-">AB-</option>
            </select>

            {/* Submit */}
            <button type="submit" className="w-full bg-purple-800 hover:bg-purple-900 text-white rounded-lg py-3 font-medium">
              Create Account
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Already have an account? <Link to="/signin" className="text-purple-600 underline">Sign in</Link></p>
          </div>

        </div>
      </div>
    </div>
  );
}
