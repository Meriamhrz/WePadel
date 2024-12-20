import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import LayoutPages from "../components/Layouts/LayoutPages";
import "../styles/courts.css"

const Courts = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [reservationDetails, setReservationDetails] = useState({
    date: "",
    time: "",
    userId: "", // Set this dynamically after login
  });

  // Fetch courts data from backend
  useEffect(() => {
    const fetchCourts = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("auth_token");
        if (!token) {
          throw new Error("User not authenticated. Please log in.");
        }
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get("http://localhost:8080/api/courts", {
          headers,
          withCredentials: true,
        });
        if (Array.isArray(response.data.courts)) {
          setCourts(response.data.courts);
        } else {
          throw new Error("Unexpected data format: 'courts' is not an array");
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching courts:", err);
        setError("Unable to fetch courts. Please try again later.");
        setCourts([]); // Fallback to an empty array
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, []);

  // Retrieve user ID from the token
  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      try {
        const user = JSON.parse(atob(token.split('.')[1])); // Decoding JWT token
        console.log(user);  // Log the decoded user data to verify it contains the expected userId
        setReservationDetails((prevDetails) => ({
          ...prevDetails,
          userId: user.id,  // Assuming _id is in the token's payload
        }));
      } catch (err) {
        console.error("Error decoding token:", err);
        setError("Error decoding token. Please log in again.");
      }
    }
  }, []);


  const handleChange = (e) => {
    setReservationDetails({ ...reservationDetails, [e.target.name]: e.target.value });
  };

  const handleReserve = async () => {
    console.log(selectedCourt, reservationDetails); // Add this log to check values

    if (!selectedCourt || !reservationDetails.date || !reservationDetails.time || !reservationDetails.userId) {
      alert("Please fill in all details!");
      return;
    }

    try {
      const token = Cookies.get("auth_token");
      if (!token) {
        throw new Error("User not authenticated. Please log in.");
      }

      const response = await axios.post(
        "http://localhost:8080/api/reservations",
        {
          courtId: selectedCourt._id,
          userId: reservationDetails.userId,
          date: reservationDetails.date,
          time: reservationDetails.time,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Reservation response:", response.data); // Log the full response
      if (response.data && response.data._id) {
        alert("Successfully reserved");
        setSelectedCourt(null);
        setReservationDetails({ date: "", time: "", userId: reservationDetails.userId });
      } else {
        alert("Reservation failed: Invalid response from server.");
      }
    } catch (err) {
      console.error("Error during reservation:", err);

      if (err.response) {
        alert(`Reservation failed: ${err.response.data.message || "Unknown error"}`);
      } else {
        alert("Reservation failed: " + (err.message || "Unknown error"));
      }
    }
  };


  return (
    <LayoutPages>
      <div className="container2 mt-5">
        <h1 className="text-center mb-4">Padel Courts</h1>
        {loading && <p>Loading courts...</p>}
        {error && <p className="text-danger">{error}</p>}
        <div className="row">
          {Array.isArray(courts) && courts.length > 0 ? (
            courts.map((court) => (
              <div key={court._id} className="col-md-4 mb-4">
                <div className="card shadow">
                  <div className="card-body">
                    <h5 className="card-title">{court.name}</h5>
                    <p className="card-text">Location: {court.location}</p>
                    <p>Available Slots:</p>
                    <ul className="list-group mb-3">
                      {court.availability.map((slot, index) => (
                        <li key={index} className="list-group-item">{slot}</li>
                      ))}
                    </ul>
                    <button
                      className="btn btn-primary"
                      onClick={() => setSelectedCourt(court)}
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No courts available at the moment.</p>
          )}
        </div>

        {selectedCourt && (
          <div className="reservation-form mt-5">
            <h3>Reserve {selectedCourt.name}</h3>
            <div className="form-group mb-3">
              <label>Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={reservationDetails.date}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Time</label>
              <input
                type="time"
                className="form-control"
                name="time"
                value={reservationDetails.time}
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-success" onClick={handleReserve}>
              Confirm Reservation
            </button>
          </div>
        )}
      </div>
    </LayoutPages>
  );
};

export default Courts;
