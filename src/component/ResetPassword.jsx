import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../firebase";
import { confirmPasswordReset } from "firebase/auth";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const oobCode = searchParams.get("oobCode"); // from email link

  const handleReset = async () => {
    try {
      if (!oobCode) {
        setError("Invalid or expired reset link");
        return;
      }

      await confirmPasswordReset(auth, oobCode, newPassword);

      alert("Password updated successfully!");
      navigate("/signin");
    } catch (err) {
      console.error(err);
      setError("Failed to update password. Link may be expired.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full border px-4 py-2 rounded mb-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={handleReset}
          className="w-full bg-purple-800 text-white py-2 rounded"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
