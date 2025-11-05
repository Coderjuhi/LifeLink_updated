import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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
import { Outlet } from "react-router-dom";

// ✅ Protected Route Component
const ProtectedRoute = ({ user, allowedRoles, children }) => {
  if (!user) {
    // Redirect unauthenticated users to Signin
    return <Navigate to="/signin" replace />;
  }

  // Optional: Role-based restriction
  if (allowedRoles && !allowedRoles.includes(user.accountType)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// ✅ Layouts
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

// ✅ App Component
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  return (
    <Router>
      <Routes>
        {/* ✅ Main Layout (Navbar + Footer) */}
        <Route element={<MainLayout user={user} setUser={setUser} />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ✅ Navbar Only Layout */}
        <Route element={<NavbarLayout user={user} setUser={setUser} />}>
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/signin" element={<Signin setUser={setUser} />} />
        </Route>

        {/* ✅ Protected Routes (Require Login) */}
        <Route element={<BlankLayout />}>
          <Route
            path="/blood-donor"
            element={
              <ProtectedRoute user={user}>
                <BloodDonor user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipient"
            element={
              <ProtectedRoute user={user}>
                <Recipient />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hospital"
            element={
              <ProtectedRoute user={user} allowedRoles={["hospital", "admin"]}>
                <Hospital />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user} allowedRoles={["admin"]}>
                <Administrator />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
