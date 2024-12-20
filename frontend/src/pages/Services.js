import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "../api";
import LayoutPages from "../components/Layouts/LayoutPages";
import "../styles/Services.css";

const Services = () => {
  const [coaches, setCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [reservationDetails, setReservationDetails] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const token = Cookies.get("auth_token");
        if (!token) {
          alert("You need to log in first.");
          return;
        }

        const response = await api.get("http://localhost:8080/api/coaches", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCoaches(response.data);
      } catch (err) {
        console.error("Error fetching coaches:", err.message);
        alert("Error fetching coaches: " + err.message);
      }
    };
    fetchCoaches();
  }, []);

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      try {
        const user = JSON.parse(atob(token.split(".")[1])); // Decoding JWT token
        setReservationDetails((prevDetails) => ({
          ...prevDetails,
          userId: user.id, // Adjust key to match your token structure
        }));
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, []);

  const handleChange = (e) => {
    setReservationDetails({
      ...reservationDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleReserve = async () => {
    if (!selectedCoach || !reservationDetails.date || !reservationDetails.time) {
      alert("Please fill in all details!");
      return;
    }

    try {
      const token = Cookies.get("auth_token");
      if (!token) {
        alert("You need to log in first.");
        return;
      }

      const response = await api.post(
        "http://localhost:8080/api/coach-reservations",
        {
          coachId: selectedCoach._id,
          userId: reservationDetails.userId,
          date: reservationDetails.date,
          time: reservationDetails.time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        `Reservation successful for ${selectedCoach.name} at ${reservationDetails.time} on ${reservationDetails.date}`
      );
      setSelectedCoach(null);

      await api.put(
        `http://localhost:8080/api/coaches/${selectedCoach._id}`,
        {
          availability: selectedCoach.availability.filter(
            (slot) => slot !== `${reservationDetails.date}T${reservationDetails.time}`
          ),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const refreshedCoaches = await api.get("http://localhost:8080/api/coaches", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCoaches(refreshedCoaches.data);
    } catch (err) {
      console.error("Error during reservation:", err.response || err.message);
      alert("Reservation failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <LayoutPages>
      <div className="container2 mt-5">
        <h1 className="text-center mb-4">Padel Coaches</h1>
        <div className="row">
          {coaches.map((coach) => (
            <div key={coach._id} className="col-md-4 mb-4">
              <div className="card shadow" style={{ height: "100%" }}>
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="card-img-top"
                  style={{ height: "900px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{coach.name}</h5>
                  <p className="card-text">
                    <strong>Ranking:</strong> {coach.Ranking}
                  </p>
                  <p className="card-text">
                    <strong>Description:</strong> {coach.description}
                  </p>
                  <p className="card-text">
                    <strong>Price per session:</strong> ${coach.price}
                  </p>
                  <p className="card-text">
                    <strong>Available Slots:</strong>
                  </p>
                  <ul className="list-group mb-3">
                    {coach.availability.map((slot, index) => (
                      <li key={index} className="list-group-item">
                        {slot}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => setSelectedCoach(coach)}
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCoach && (
          <div className="reservation-form mt-5">
            <h3>Reserve {selectedCoach.name}</h3>
            <p>
              <strong>Price:</strong> ${selectedCoach.price} per session
            </p>
            <div className="form-group mb-3">
              <label>Date</label>
              <input
                type="date"
                name="date"
                className="form-control"
                value={reservationDetails.date}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Time</label>
              <input
                type="time"
                name="time"
                className="form-control"
                value={reservationDetails.time}
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-success" onClick={handleReserve}>
              Confirm Reservation
            </button>
            <button
              className="btn btn-secondary ms-3"
              onClick={() => setSelectedCoach(null)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </LayoutPages>
  );
};

export default Services;
