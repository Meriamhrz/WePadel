import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Shop from "./pages/Shop";
import Services from "./pages/Services";

import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ProfileAdmin from "./pages/ProfileAdmin";
import Courts from "./pages/Courts";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Customers from "./pages/Customers";
import ReservationHistory from "./pages/ReservationHistory";
import ManageReservations from "./pages/ManageReservations";
import AdminPage from "./pages/AdminPage";
import PrivateRoute from "./pages/PrivateRoute";
import ManageCoachReservations from "./pages/ManageCoachReservation";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/courts" element={<Courts />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Services" element={<Services />} />

        <Route path="/Cart" element={<Cart />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route
          path="/AdminPage"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        />
 <Route
          path="/ProfileAdmin"
          element={
            <PrivateRoute>
              <ProfileAdmin />
            </PrivateRoute>
          }
        />
         <Route
          path="/reservation-history"
          element={
            <PrivateRoute>
              <ReservationHistory />
            </PrivateRoute>
          }
        />
                 <Route
          path="/manage-coach-reservations"
          element={
            <PrivateRoute>
              <ManageCoachReservations />
            </PrivateRoute>
          }
        />
        ManageReservations
      </Routes>
    </Router>
  );
}

export default App;
