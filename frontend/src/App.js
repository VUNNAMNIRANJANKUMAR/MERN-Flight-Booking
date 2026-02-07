import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Flights from "./pages/Flights";
import MyBookings from "./pages/MyBookings";
import Navbar from "./components/Navbar";


export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Flights />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mybookings" element={<MyBookings/>}/>
  <BrowserRouter>
 <Navbar/>
 <Routes>

      </Routes>
    </HashRouter>
  );
}
