// File: ./component/Signup/SignUp.jsx
import React, { useState } from 'react';
import { BiSolidHeartCircle } from 'react-icons/bi';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [accountType, setAccountType] = useState('');
  const [bloodType, setBloodType] = useState('');

  // Handle account type change with redirect
  const handleAccountChange = (e) => {
    const value = e.target.value;
    setAccountType(value);

    // Redirect based on selected account type
    switch (value) {
      case 'donor':
        navigate('/blood-donor');
        break;
      case 'recipient':
        navigate('/recipient');
        break;
      case 'hospital':
        navigate('/hospital');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    alert(`Signup Successful!\nAccount: ${accountType}\nBlood Type: ${bloodType}\nEmail: ${email}`);

    // Reset form
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPhone('');
    setAddress('');
    setAccountType('');
    setBloodType('');

    // Redirect to signin page
    navigate('/signin');
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-pink-100 flex items-start pt-17 justify-center p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-pink-200">
        <div className="p-8">
          {/* Logo + Title */}
          <div className="flex flex-col items-center gap-3 mb-4">
            <div className="flex items-center gap-3">
              <BiSolidHeartCircle size={32} className="text-purple-800 mr-2 ml-3 inline" />
              <h1 className="text-2xl font-semibold text-gray-800">Join LifeLink</h1>
            </div>
            <p className="text-gray-600">Create your account to start saving lives</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-200 px-4 py-1 focus:outline-none focus:ring-2 focus:ring-pink-200"
                placeholder="Juhi Gupta"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full rounded-lg border border-gray-200 px-4 py-1 focus:outline-none focus:ring-2 focus:ring-pink-200"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full rounded-lg border border-gray-200 px-4 py-1 pr-12 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  placeholder="Create a strong password"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full rounded-lg border border-gray-200 px-4 py-1 focus:outline-none focus:ring-2 focus:ring-pink-200"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Account Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
              <select
                value={accountType}
                onChange={handleAccountChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-1 focus:outline-none focus:ring-2 focus:ring-pink-200"
              >
                <option value="">Select account type</option>
                <option value="donor">Blood Donor</option>
                <option value="recipient">Recipient</option>
                <option value="hospital">Hospital / Medical Center</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            {/* Blood Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-1 focus:outline-none focus:ring-2 focus:ring-pink-200"
              >
                <option value="">Select blood type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                className="w-full rounded-lg border border-gray-200 px-4 py-1 focus:outline-none focus:ring-2 focus:ring-pink-200"
                placeholder="+91 1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-200 px-4 py-1 focus:outline-none focus:ring-2 focus:ring-pink-200"
                placeholder="123 Main St, City, State"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-800 hover:bg-purple-900 text-white rounded-lg py-3 font-medium shadow-sm transition"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              Already have an account?{' '}
              <Link to="/signin" className="text-purple-600 font-medium underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
