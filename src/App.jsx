// File: App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
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

// Loader
const Loader = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <p className="text-xl font-semibold animate-pulse">{message}</p>
  </div>
);

// Layout
const MainLayout = ({ user, setUser }) => (
  <>
    <Navbar user={user} setUser={setUser} />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

// Protected Routes
const ProtectedRoute = ({ user, loading, children }) => {
  if (loading) return <Loader message="Checking session..." />;
  if (!user) return <Navigate to="/signin" replace />;
  return children;
};

const RoleProtectedRoute = ({ user, loading, allowedRole, children }) => {
  if (loading) return <Loader message="Checking session..." />;
  if (!user) return <Navigate to="/signin" replace />;
  if (user.accountType !== allowedRole) return <Navigate to="/" replace />;
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchUser = async () => {
    try {
      // Always trust backend session
      const { data } = await API.get("/me", { withCredentials: true });

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (err) {
      //  Not logged in
      setUser(null);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);


  if (loading) return <Loader message="Loading..." />;

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

        {/* Role Dashboards */}
        <Route
          path="/dashboard/blood-donor"
          element={
            <RoleProtectedRoute user={user} loading={loading} allowedRole="donor">
              <BloodDonor user={user} setUser={setUser} />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/dashboard/recipient"
          element={
            <RoleProtectedRoute user={user} loading={loading} allowedRole="recipient">
              <Recipient user={user} setUser={setUser} />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/dashboard/hospital"
          element={
            <RoleProtectedRoute user={user} loading={loading} allowedRole="hospital">
              <Hospital user={user} setUser={setUser} />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/dashboard/admin"
          element={
            <RoleProtectedRoute user={user} loading={loading} allowedRole="admin">
              <Administrator user={user} setUser={setUser} />
            </RoleProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
