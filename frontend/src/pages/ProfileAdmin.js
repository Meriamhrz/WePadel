import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Ensure correct import
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../styles/Profile.css'; // Assuming you have a separate CSS file for styles
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import LayoutPagesAdmin from "../components/Layouts/LayoutPagesAdmin";

function Profile() {
  const url = "http://localhost:8080/api/users";
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(null); // Use state for userId
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userUpdate, setUpdate] = useState({
    userName: "",
    email: "",
    age: "",
  });

  // Reload page function (optional, can be used for updating after changes)
  const reload = () => window.location.reload();

  useEffect(() => {
    // Get token from cookies or localStorage
    const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
    console.log('Token from cookie:', token); // Log the token from cookies
    
    if (!token) {
      // If no token found, redirect to sign-in page (optional)
      console.log('No token found, please log in');
      return;
    }

    const jwt = token.split('=')[1]; // Extract token
    console.log('JWT:', jwt); // Log the raw JWT token

    try {
      const decodedToken = jwtDecode(jwt); // Decode token
      console.log('Decoded Token:', decodedToken); // Log the decoded token
      setUserId(decodedToken.id); // Set userId from decoded token
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      // Fetch user data if userId is available
      const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
      const jwt = token.split('=')[1];
      const headers = {
        'Authorization': `Bearer ${jwt}`
      };
      console.log('Fetching data for user ID:', userId);

      axios.get(`${url}/${userId}`, { headers })
        .then((res) => {
          console.log('User Data:', res.data.user);
          setUser(res.data.user); // Set the user data in state
        })
        .catch((error) => {
          console.error(error.response?.data?.msg || error);
        });
    }
  }, [userId]);

  const handleChange = (e) => {
    setUpdate({ ...userUpdate, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Update user data
      const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
      const jwt = token.split('=')[1];
      const headers = {
        'Authorization': `Bearer ${jwt}`
      };

      await axios.put(`${url}/${user._id}`, userUpdate, { headers });
      handleClose();
      reload(); // Reload page to show updated data
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = () => {
    // Clear the token from cookies
    document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Redirect to home page
    window.location.href = "/SignIn";
  };

  return (
    <>
    <LayoutPagesAdmin>
      <div className="profile-container"> {/* Use a class for styling */}
        <h3 className="welcome-back">Profile</h3>
        <Card className="profile-card">
          <Card.Body>
            <div className="user-detail">
              <h6>UserName:</h6>
              <Card.Text>{user.userName}</Card.Text>
            </div>
            <div className="user-detail">
              <h6>Email:</h6>
              <Card.Text>{user.email}</Card.Text>
            </div>
            <div className="user-detail">
              <h6>Age:</h6>
              <Card.Text>{user.age}</Card.Text>
            </div>
            <div className="action-buttons">
              <Button variant="success" onClick={handleShow}>Update</Button>
              <Button variant="danger" onClick={handleSignOut}>Sign Out</Button>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Modal for updating user information */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form for updating user information */}
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="userName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder={user.userName}
                value={userUpdate.userName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder={user.email}
                value={userUpdate.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder={user.age}
                value={userUpdate.age}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      </LayoutPagesAdmin>
    </>
  );
}

export default Profile;
