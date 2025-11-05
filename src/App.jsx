// File: App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import API from './api/api';

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

//  Layouts
const MainLayout = ({ user, setUser }) => (
  <>
    <Navbar user={user} setUser={setUser} />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

const NavbarLayout = ({ user, setUser }) => (
  <>
    <Navbar user={user} setUser={setUser} />
    <Outlet />
  </>
);

const BlankLayout = () => <Outlet />;

//  Protected Route Component
const ProtectedRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/signin" replace />;
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Fetch logged-in user on app start (token-based verification)
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

  //  Persist user in localStorage when it changes
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  //  Avoid flashing redirect before auth check finishes
  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <Router>
      <Routes>
        {/*  Main Layout (Navbar + Footer) */}
        <Route element={<MainLayout user={user} setUser={setUser} />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/*  Navbar Only Layout */}
        <Route element={<NavbarLayout user={user} setUser={setUser} />}>
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/signin" element={<Signin setUser={setUser} />} />
        </Route>

        {/*  Protected Routes (Require Login) */}
        <Route
          element={
            <ProtectedRoute user={user}>
              <BlankLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/blood-donor" element={<BloodDonor user={user} setUser={setUser} />} />
          <Route path="/recipient" element={<Recipient />} />
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/admin" element={<Administrator />} />
        </Route>

        {/*  Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
