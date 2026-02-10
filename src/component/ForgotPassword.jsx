import React, { useState } from "react";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [step, setStep] = useState(1); // 1 = enter phone, 2 = enter otp
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Setup reCAPTCHA
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
    }
  };

  const sendOtp = async () => {
    try {
      setError("");
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;

      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setStep(2);
    } catch (err) {
      console.error(err);
      setError("Failed to send OTP. Check phone number.");
    }
  };

  const verifyOtp = async () => {
    try {
      setError("");
      await confirmationResult.confirm(otp);
      // OTP verified 
      navigate("/reset-password"); // create this page
    } catch (err) {
      console.error(err);
      setError("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-4">
          Forgot Password
        </h2>

        {step === 1 && (
          <>
            <p className="text-sm text-gray-600 mb-3">
              Enter your phone number for verification
            </p>
            <input
              type="text"
              placeholder="+91XXXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border px-4 py-2 rounded mb-3"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={sendOtp}
              className="w-full bg-purple-800 text-white py-2 rounded"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-sm text-gray-600 mb-3">
              Enter the 6-digit OTP sent to your phone
            </p>
            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border px-4 py-2 rounded mb-3 text-center tracking-widest text-lg"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={verifyOtp}
              className="w-full bg-purple-800 text-white py-2 rounded"
            >
              Verify OTP
            </button>
          </>
        )}

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
