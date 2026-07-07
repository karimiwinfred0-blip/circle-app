import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import SignUp from "./pages/SignUp";
import Onboarding from "./pages/Onboarding";
import GroupDashboard from "./pages/GroupDashboard";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import GroupsManagement from "./pages/GroupsManagement";
import "./App.css";

function App() {
  const isAdmin = true;
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("circleDarkMode") === "true"
  );

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("circleDarkMode", darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Nav darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/group" element={<GroupDashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin isAdmin={isAdmin} />} />
        <Route path="/groups" element={<GroupsManagement isAdmin={isAdmin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;