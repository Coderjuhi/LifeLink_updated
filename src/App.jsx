// File: App.jsx
import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import API from "./api/api";

// Components
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Signup from "./component/Signup";
import Signin from "./component/Signin";
import Footer from "./component/Footer";
import BloodDonor from "./component/Blooddonor";
import Recipient from "./component/Recipient";
import Hospital from "./component/Hospital";
import Administrator from "./component/Administrator";
import About from "./component/About";
import Contact from "./component/Contact";

// Loader component
const Loader = ({
  message = "Loading...",
  loaderWidth = "10rem",
  loaderHeight = "10rem",
  containerHeight = "100vh",
}) => (
  <div
    className="flex flex-col items-center justify-center bg-gradient-to-b from-red-50 to-white"
    style={{ minHeight: containerHeight }}
  >
    <img
      src="/src/assets/Loading.gif"
      alt="Loading"
      style={{ width: loaderWidth, height: loaderHeight }}
      className="mb-6 object-contain"
    />
    <p className="text-gray-700 text-xl font-semibold tracking-wide animate-pulse">
      {message}
    </p>
  </div>
);

// Layouts
const MainLayout = ({ user, setUser }) => (
  <>
    <Navbar user={user} setUser={setUser} />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

const BlankLayout = () => <Outlet />;

// Protected routes
const ProtectedRoute = ({ user, loading, children }) => {
  if (loading) return <Loader message="Checking session..." />;
  if (!user) return <Navigate to="/#/signin" replace />;
  return children;
};

const RoleProtectedRoute = ({ user, loading, allowedRole, children }) => {
  if (loading) return <Loader message="Checking session..." />;
  if (!user) return <Navigate to="/#/signin" replace />;
  if (user.accountType !== allowedRole) return <Navigate to="/#" replace />;
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user once on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get("/me", { withCredentials: true });
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (err) {
        console.error("Auth check failed:", err.response?.data || err.message);
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Keep user synced to localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  if (loading) return <Loader message="Loading, please wait..." />;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout user={user} setUser={setUser} />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/signin" element={<Signin setUser={setUser} />} />
        </Route>

        {/* Role-Protected Dashboards */}
        <Route
          path="/dashboard/blood-donor"
          element={
            <RoleProtectedRoute
              user={user}
              loading={loading}
              allowedRole="donor"
            >
              <BloodDonor user={user} setUser={setUser} />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/dashboard/recipient"
          element={
            <RoleProtectedRoute
              user={user}
              loading={loading}
              allowedRole="recipient"
            >
              <Recipient user={user} setUser={setUser} />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/dashboard/hospital"
          element={
            <RoleProtectedRoute
              user={user}
              loading={loading}
              allowedRole="hospital"
            >
              <Hospital user={user} setUser={setUser} />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/dashboard/admin"
          element={
            <RoleProtectedRoute
              user={user}
              loading={loading}
              allowedRole="admin"
            >
              <Administrator user={user} setUser={setUser} />
            </RoleProtectedRoute>
          }
        />

        {/* Catch-All */}
        <Route path="*" element={<Navigate to="/#" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
