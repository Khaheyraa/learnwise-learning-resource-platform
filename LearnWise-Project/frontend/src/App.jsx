import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Resources from "./pages/Resources";
import Bookmarks from "./pages/Bookmarks";
import Dashboard from "./pages/Dashboard";
import Recommendations from "./pages/Recommendations";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;