import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie"; // Import js-cookie
import LayoutPagesAdmin from "../components/Layouts/LayoutPagesAdmin"

function Customers() {
  const url = "https://wepadel.onrender.com//api/users";
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(""); // To track any error messages

  useEffect(() => {
    const token = Cookies.get("auth_token"); // Corrected token name in cookie
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`, // Use template literals to pass the token in Authorization header
      };

      axios
        .get(url, { headers }) // Add headers to the GET request
        .then((res) => {
          setUsers(res.data.users); // assuming users are in the response data
          setFilteredUsers(res.data.users); // Initialize filtered users
        })
        .catch((err) => {
          setError("Failed to fetch users. Please try again later."); // Show error message
          console.log(err);
        });
    } else {
      setError("No token found. Please log in.");
    }
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = users.filter((user) =>
      user.userName.toLowerCase().includes(searchValue) ||
      user.age.toString().includes(searchValue) // Include age in search criteria
    );

    setFilteredUsers(filtered);
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const token = Cookies.get("auth_token"); // Get token from cookie for delete
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`, // Use template literals here as well
        };
        axios
          .delete(`${url}/${userId}`, { headers }) // Correct the syntax to include the userId in the URL
          .then((res) => {
            // Update the state to remove the deleted user
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
            setFilteredUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
          })
          .catch((err) => {
            setError("Failed to delete user. Please try again later.");
            console.log(err);
          });
      } else {
        setError("No token found. Please log in.");
      }
    }
  };

  return (
    <LayoutPagesAdmin>
      <div
        style={{
          width: "80%",
          margin: "auto",
          marginTop: "40px",
          backgroundColor: "#f0f8ff", // Light blue background
          padding: "150px",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
        
      >
        {/* Title */}
        <h2
          style={{
            textAlign: "center",
            color: "#555", // Softer text color
            fontSize: "30px",
            marginBottom: "30px",
            fontWeight: "bold",
          }}
        >
          User Management
        </h2>

        {/* Search Bar */}
        <Form.Group
          style={{ marginBottom: "20px" }}
          controlId="searchUsers"
        >
          <Form.Control
            type="text"
            placeholder="Search users by name or age"
            value={searchTerm}
            onChange={handleSearch}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "25px",
              border: "2px solid #ffd700", // Yellow border
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Form.Group>

        {/* Show error message if any */}
        {error && (
          <div style={{ textAlign: "center", color: "red", marginBottom: "20px" }}>
            <p>{error}</p>
          </div>
        )}

        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Accordion key={user._id} defaultActiveKey="0">
              <Accordion.Item
                eventKey={user._id}
                style={{
                  borderRadius: "8px",
                  marginBottom: "20px",
                  overflow: "hidden",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Accordion.Header
                  style={{
                    backgroundColor: "#fffff", // Same as background
                    color: "#555",
                    fontWeight: "bold",
                    padding: "15px",
                    borderBottom: "1px solid #e3e3e3",
                    cursor: "pointer",
                  }}
                >
                  {user.userName.toUpperCase()}
                </Accordion.Header>
                <Accordion.Body
                  style={{
                    backgroundColor: "#ffffff", // White background for contrast
                    padding: "25px",
                    fontSize: "16px",
                    lineHeight: "1.6",
                    color: "#555",
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                  }}
                >
                  <div>
                    <h5 style={{ marginBottom: "10px", color: "#555" }}>
                      Email: {user.email}
                    </h5>
                    <h5 style={{ color: "#555" }}>Age: {user.age}</h5>
                  </div>
                  <div>
                    <Button
                      style={{
                        width: "120px",
                        backgroundColor: "#ffd700", // Yellow
                        borderColor: "#ffd700", // Yellow border
                        borderRadius: "25px", // Circular button
                        padding: "10px",
                      }}
                      variant="danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#555" }}>No users found</p>
        )}
      </div>
    </LayoutPagesAdmin>
  );
}

export default Customers;
