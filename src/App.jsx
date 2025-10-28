// File: App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar } from "./component/Navbar";
import Home from "./component/Home";
import Signup from "./component/Signup";
import Signin from "./component/Signin";
import Footer from "./component/Footer";
import BloodDonor from "./component/Blooddonor";
import Recipient from "./component/Recipient";
import Hospital from "./component/Hospital";
import Administrator from "./component/Administrator";

// Layout with Navbar + Footer
const MainLayout = ({ children, user, setUser }) => (
  <>
    <Navbar user={user} setUser={setUser} />
    {children}
    <Footer />
  </>
);

// Layout with only Navbar
const NavbarLayout = ({ children, user, setUser }) => (
  <>
    <Navbar user={user} setUser={setUser} />
    {children}
  </>
);

// Layout with nothing
const BlankLayout = ({ children }) => <>{children}</>;

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Update localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        {/* Home page - Navbar + Footer */}
        <Route
          path="/"
          element={<MainLayout user={user} setUser={setUser}><Home /></MainLayout>}
        />

        {/* Signup & Signin - Only Navbar */}
        <Route
          path="/signup"
          element={<NavbarLayout user={user} setUser={setUser}><Signup setUser={setUser} /></NavbarLayout>}
        />
        <Route
          path="/signin"
          element={<NavbarLayout user={user} setUser={setUser}><Signin setUser={setUser} /></NavbarLayout>}
        />

        {/* Account Type Pages - No Navbar, No Footer */}
        <Route path="/blood-donor" element={<BlankLayout><BloodDonor /></BlankLayout>} />
        <Route path="/recipient" element={<BlankLayout><Recipient /></BlankLayout>} />
        <Route path="/hospital" element={<BlankLayout><Hospital /></BlankLayout>} />
        <Route path="/admin" element={<BlankLayout><Administrator /></BlankLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
