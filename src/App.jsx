// File: App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './component/Navbar';
import Home from './component/Home';
import Signup from './component/Signup';
import Signin from './component/Signin';
import Footer from './component/Footer';
import BloodDonor from './component/Blooddonor';
import Recipient from './component/Recipient';
import Hospital from './component/Hospital';
import Administrator from './component/Administrator';

// Layout with Navbar + Footer
function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

// Layout with only Navbar
function NavbarLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

// Layout with nothing
function BlankLayout({ children }) {
  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page - Navbar + Footer */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />

        {/* Signup & Signin - Only Navbar */}
        <Route path="/signup" element={<NavbarLayout><Signup /></NavbarLayout>} />
        <Route path="/signin" element={<NavbarLayout><Signin /></NavbarLayout>} />

        {/* Account Type Pages - No Navbar, No Footer */}
        <Route path="/blood-donor" element={<BlankLayout><BloodDonor /></BlankLayout>} />
        {/* Uncomment when ready */}
        <Route path="/recipient" element={<BlankLayout><Recipient /></BlankLayout>} />
        <Route path="/hospital" element={<BlankLayout><Hospital /></BlankLayout>} />
        <Route path="/admin" element={<BlankLayout><Administrator /></BlankLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
