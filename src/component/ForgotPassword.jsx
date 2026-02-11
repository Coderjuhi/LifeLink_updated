import React, { useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const sendResetLink = async () => {
    try {
      setError("");
      setMessage("");

      await sendPasswordResetEmail(auth, email);

      setMessage("Password reset link sent to your email 📧");
    } catch (err) {
      console.error(err);
      setError("Failed to send reset email. Check your email address.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-4">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-600 mb-3">
          Enter your email to receive a password reset link
        </p>

        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded mb-3"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        <button
          onClick={sendResetLink}
          className="w-full bg-purple-800 text-white py-2 rounded"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}
