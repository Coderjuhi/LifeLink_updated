import { useState } from "react";
import { auth } from "../firebase";
import { updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      await updatePassword(auth.currentUser, newPassword);
      alert("Password updated successfully!");
      navigate("/signin");
    } catch (err) {
      console.error(err);
      alert("Failed to update password");
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
          className="w-full border px-4 py-2 rounded mb-4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
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
