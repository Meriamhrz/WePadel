import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie for handling cookies
import "../styles/AdminPage.css";
import LayoutPagesAdmin from "../components/Layouts/LayoutPagesAdmin";

const AdminPage = () => {
  const [courts, setCourts] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [newCourt, setNewCourt] = useState({ name: "", location: "Indoor", availability: [] });
  const [newCoach, setNewCoach] = useState({
    name: "",
    Ranking: "",
    image: "",
    description: "",
    price: "",
  });
  const [newTimeSlot, setNewTimeSlot] = useState("");
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [timeSlotError, setTimeSlotError] = useState("");

  // Axios interceptor to include cookies in every request
  useEffect(() => {
    console.log("Setting up axios interceptor");
    axios.defaults.withCredentials = true; // Send cookies with requests
    axios.interceptors.request.use(
      (config) => {
        const token = Cookies.get("auth_token"); // Retrieve the token from cookies
        console.log("Token retrieved from cookies:", token);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        console.error("Interceptor error:", error);
        return Promise.reject(error);
      }
    );
  }, []);

  // Fetch all courts and coaches on page load
  useEffect(() => {
    console.log("Fetching courts and coaches");
    fetchCourts();
    fetchCoaches();
  }, []);

  const fetchCourts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/courts");
      console.log("Courts API response:", response.data);
  
      // Check if the response.data.courts is an array
      if (Array.isArray(response.data.courts)) {
        setCourts(response.data.courts);  // Use the courts array from the response
      } else {
        console.error("API returned data is not an array:", response.data.courts);
        setCourts([]); // Set an empty array if courts is not an array
      }
    } catch (err) {
      console.error("Error fetching courts:", err);
      setCourts([]); // Fallback to empty array on error
    }
  };
  
  
  const fetchCoaches = async () => {
    console.log("Fetching coaches...");
    try {
      const response = await axios.get("http://localhost:8080/api/coaches");
      console.log("Coaches fetched:", response.data);
  
      // Check if the response data is an array
      if (Array.isArray(response.data)) {
        setCoaches(response.data);
      } else {
        console.error("API returned data is not an array:", response.data);
        setCoaches([]); // Set an empty array if the data is not an array
      }
    } catch (err) {
      console.error("Error fetching coaches:", err);
      setCoaches([]); // Fallback to empty array on error
    }
  };
  

  const handleAddCourt = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/courts", newCourt, {
        withCredentials: true, // Ensure cookies are sent
      });
      setCourts([...courts, response.data]);
      setNewCourt({ name: "", location: "Indoor", availability: [] });
      alert("Court added successfully!");
    } catch (err) {
      console.error("Error adding court:", err);
      alert("Failed to add court.");
    }
  };
  
  

  const handleDeleteCourt = async (id) => {
    console.log("Attempting to delete court with ID:", id);
    if (!window.confirm("Are you sure you want to delete this court?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/courts/${id}`);
      console.log("Court deleted successfully");
      setCourts(courts.filter((court) => court._id !== id));
      alert("Court deleted successfully!");
    } catch (err) {
      console.error("Error deleting court:", err);
      alert("Failed to delete court.");
    }
  };

  const handleAddCoach = async (e) => {
    e.preventDefault();
    console.log("Adding coach with data:", newCoach);
    try {
      const response = await axios.post("http://localhost:8080/api/coaches", newCoach);
      console.log("Coach added:", response.data);
      setCoaches([...coaches, response.data]);
      setNewCoach({ name: "", Ranking: "", image: "", description: "", price: "" });
      alert("Coach added successfully!");
    } catch (err) {
      console.error("Error adding coach:", err);
      alert("Failed to add coach.");
    }
  };

  const handleDeleteCoach = async (id) => {
    console.log("Attempting to delete coach with ID:", id);
    if (!window.confirm("Are you sure you want to delete this coach?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/coaches/${id}`);
      console.log("Coach deleted successfully");
      setCoaches(coaches.filter((coach) => coach._id !== id));
      alert("Coach deleted successfully!");
    } catch (err) {
      console.error("Error deleting coach:", err);
      alert("Failed to delete coach.");
    }
  };

  const validateTimeSlot = (timeSlot) => {
    console.log("Validating time slot:", timeSlot);
    const timeSlotRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/; // Expected format: YYYY-MM-DDTHH:MM
    return timeSlotRegex.test(timeSlot);
  };

  const handleAddTimeSlot = async (e, isCoach = false) => {
    e.preventDefault();
    console.log("Adding time slot for", isCoach ? "coach" : "court", "with time slot:", newTimeSlot);
    if ((!selectedCourt && !isCoach) || !newTimeSlot) return;

    if (!validateTimeSlot(newTimeSlot)) {
      setTimeSlotError("Invalid time slot format. Expected YYYY-MM-DDTHH:MM.");
      return;
    }

    try {
      const updatedEntity = isCoach
        ? { ...selectedCoach, availability: [...selectedCoach.availability, newTimeSlot] }
        : { ...selectedCourt, availability: [...selectedCourt.availability, newTimeSlot] };

      const response = isCoach
        ? await axios.put(`http://localhost:8080/api/coaches/${selectedCoach._id}`, updatedEntity)
        : await axios.put(`http://localhost:8080/api/courts/${selectedCourt._id}`, updatedEntity);

      if (isCoach) {
        setCoaches(coaches.map((coach) => (coach._id === selectedCoach._id ? response.data : coach)));
      } else {
        setCourts(courts.map((court) => (court._id === selectedCourt._id ? response.data : court)));
      }

      setNewTimeSlot("");
      setSelectedCourt(null);
      setSelectedCoach(null);
      setTimeSlotError("");
      alert("Time slot added successfully!");
    } catch (err) {
      console.error("Error adding time slot:", err);
      alert("Failed to add time slot.");
    }
  };

  return (
    <LayoutPagesAdmin>
      <div className="admin-page">
        <h1>Admin Panel</h1>




        {/* Manage Courts Section */}
        <section className="manage-courts">
          <h2>Manage Courts</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courts.map((court) => (
                <tr key={court._id}>
                  <td>{court.name}</td>
                  <td>{court.location}</td>
                  <td>{court.availability.length > 0 ? court.availability.join(", ") : "No time slots available"}</td>
                  <td>
                    <button onClick={() => setSelectedCourt(court)}>Add Time Slot</button>
                    <button onClick={() => handleDeleteCourt(court._id)}>Delete Court</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Add Coach Section */}
        <section className="add-coach">
          <h2>Add New Coach</h2>
          <form onSubmit={handleAddCoach}>
            <input
              type="text"
              placeholder="Coach Name"
              value={newCoach.name}
              onChange={(e) => setNewCoach({ ...newCoach, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Ranking"
              value={newCoach.Ranking}
              onChange={(e) => setNewCoach({ ...newCoach, Ranking: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newCoach.image}
              onChange={(e) => setNewCoach({ ...newCoach, image: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={newCoach.description}
              onChange={(e) => setNewCoach({ ...newCoach, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Price"
              value={newCoach.price}
              onChange={(e) => setNewCoach({ ...newCoach, price: e.target.value })}
            />
            <button type="submit">Add Coach</button>
          </form>
        </section>

        {/* Manage Coaches Section */}
        <section className="manage-coaches">
          <h2>Manage Coaches</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>Price</th>
                <th>Ranking</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coaches.map((coach) => (
                <tr key={coach._id}>
                  <td>{coach.name}</td>
                    <td><img src={coach.image} alt={coach.name} width="50" /></td>
                    <td>{coach.description}</td>
                    <td>{coach.price}</td>
                    <td>{coach.Ranking}</td> {/* Render Ranking value */}
                    <td>{coach.availability.length > 0 ? coach.availability.join(", ") : "No time slots available"}</td>
                    <td>
                      <button onClick={() => setSelectedCoach(coach)}>Add Time Slot</button>
                      <button onClick={() => handleDeleteCoach(coach._id)}>Delete Coach</button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Add Time Slot Section */}
        {(selectedCourt || selectedCoach) && (
          <section className="add-time-slot">
            <h2>Add Time Slot for {selectedCourt ? selectedCourt.name : selectedCoach.name}</h2>
            <input
              type="text"
              placeholder="Time Slot (YYYY-MM-DDTHH:MM)"
              value={newTimeSlot}
              onChange={(e) => setNewTimeSlot(e.target.value)}
              required
            />
            {timeSlotError && <div className="error">{timeSlotError}</div>}
            <button onClick={(e) => handleAddTimeSlot(e, selectedCoach !== null)}>Add Time Slot</button>
          </section>
        )}
      </div>
    </LayoutPagesAdmin>
  );
};

export default AdminPage;
