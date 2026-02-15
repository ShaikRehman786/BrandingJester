import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./admin/Login";
import Admin from "./admin/Admin";

import "./App.css";

function App() {
  return (
    <Routes>
      {/* Public Website */}
      <Route path="/" element={<Home />} />

      {/* Hidden Admin Login */}
      <Route path="/login" element={<Login />} />

      {/* Admin Panel */}
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  );
}

export default App;
