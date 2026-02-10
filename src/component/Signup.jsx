import React, { useState } from 'react';
import { BiSolidHeartCircle } from 'react-icons/bi';
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";


export default function Signup({ setUser }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    accountType: '',
    bloodType: 'Not Applicable'
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({ ...prev, [name]: value }));

    // LIVE PASSWORD VALIDATION
    if (name === "password") {
      if (value.length < 6) {
        setErrors(prev => ({ ...prev, password: "Password must be at least 6 characters" }));
      } else {
        setErrors(prev => ({ ...prev, password: "" }));
      }
    }

    // CONFIRM PASSWORD VALIDATION
    if (name === "confirmPassword") {
      if (value !== form.password) {
        setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: "" }));
      }
    }
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  const { name, email, phone, address, password, confirmPassword, accountType, bloodType } = form;

  if (password.length < 6) return alert('Password must be at least 6 characters');
  if (password !== confirmPassword) return alert('Passwords do not match');

  try {
    //  Create user in Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    //  Send verification email
    await sendEmailVerification(userCredential.user);

    // // //  Save extra data in your backend (optional but recommended)
    // await API.post("/signup", {
    //   name,
    //   email,
    //   phone,
    //   address,
    //   accountType,
    //   bloodType
    // });

    alert("Verification email sent! Please verify before login.");

    navigate("/signin");

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-pink-100 flex items-start justify-center p-6 pt-24">
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
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-1"
              placeholder="Full Name"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-1"
              placeholder="Email"
            />

            {/* Phone */}
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-1"
              placeholder="Phone Number"
            />

            {/* Address */}
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-1"
              placeholder="Address"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className={`w-full rounded-lg border px-4 py-1 pr-12 
      ${errors.password ? "border-red-500" : "border-gray-200"}`}
                placeholder="Password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
              </button>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>


            {/*confirm*/}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className={`w-full rounded-lg border px-4 py-1 pr-12 
      ${errors.confirmPassword ? "border-red-500" : "border-gray-200"}`}
                placeholder="Confirm Password"
              />

              {/* Eye Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
              </button>

              {/* Error Message */}
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>




            {/* Account Type */}
            <select
              name="accountType"
              value={form.accountType}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-1"
            >
              <option value="">Select account type</option>
              <option value="donor">Donor</option>
              <option value="recipient">Recipient</option>
              <option value="hospital">Hospital</option>
              {/* <option value="admin">Admin</option> */}
            </select>

            {/* Blood Type (Visible only if donor or recipient) */}
            {(form.accountType === 'donor' || form.accountType === 'recipient') && (
              <select
                name="bloodType"
                value={form.bloodType}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-1"
              >
                <option value="">Select blood type</option>
                <option value="A+">A+</option><option value="A-">A-</option>
                <option value="B+">B+</option><option value="B-">B-</option>
                <option value="O+">O+</option><option value="O-">O-</option>
                <option value="AB+">AB+</option><option value="AB-">AB-</option>
              </select>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-purple-800 hover:bg-purple-900 text-white rounded-lg py-3 font-medium"
            >
              Create Account
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <Link to="/signin" className="text-purple-600 underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
