import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Shop from "./pages/Shop";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Courts from "./pages/Courts";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import ReservationHistory from "./pages/ReservationHistory";
import ManageReservations from "./pages/ManageReservations";
import AdminPage from "./pages/AdminPage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courts" element={<Courts />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/SignUp" element={<SignUp />} /> 
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/reservation-history" element={<ReservationHistory />} />
        <Route path="/manage-reservations" element={<ManageReservations />} />
      </Routes>
    </Router>
  );
}

export default App;
