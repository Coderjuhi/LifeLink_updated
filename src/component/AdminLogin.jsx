import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin",
        {
          email,
          password,
        },
        {
          withCredentials: true
        }
      );
      setUser({
        email: res.data.email,
        accountType: "admin"
      });

      setSuccess("Login Successful! ");
    setTimeout(() => {
      navigate("/dashboard/admin");
    }, 1000);

    } catch (err) {
      setError("Invalid Email or Password");

    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-600 text-center mb-4">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Sign In
          </button>

        </form>
      </div>
    </div>
  );
}

export default AdminLogin;