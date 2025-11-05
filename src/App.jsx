import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

// Layouts
const MainLayout = ({ user, setUser }) => (
  <>
    <Navbar user={user} setUser={setUser} />
    <main className="">
      
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

        {/* ✅ Blank Layout */}
        <Route element={<BlankLayout />}>
          <Route path="/blood-donor" element={<BloodDonor />} />
          <Route path="/recipient" element={<Recipient />} />
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/admin" element={<Administrator />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
