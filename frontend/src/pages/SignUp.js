import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const url = "https://wepadel.onrender.com//api/users";
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
    email: "",
    age: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!user.userName || !user.email || !user.age || !user.password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(user.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Validate age is a positive number
    if (isNaN(user.age) || user.age <= 0) {
      setErrorMessage("Please enter a valid age.");
      return;
    }

    // Reset error message and set loading
    setErrorMessage("");
    setLoading(true);

    try {
      console.log("Sending user data:", user); // Log user data for debugging
      const response = await axios.post(url, user, { withCredentials: true });
      alert(response.data.msg || "Registration successful!");
      navigate("/SignIn");
    } catch (error) {
      // Display error message from the server if available
      const serverMessage =
        error.response?.data?.msg || "An error occurred during registration.";
      setErrorMessage(serverMessage);
      console.error("Error during registration:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center bg-image"
      style={{
        backgroundColor: "#FFFFF",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <MDBCard
        className="m-5"
        style={{ maxWidth: "600px", borderRadius: "12px" }}
      >
        <MDBCardBody className="px-5">
          <h2
            className="text-uppercase text-center mb-5"
            style={{ color: "#007bff" }}
          >
            Create an account
          </h2>
          <form onSubmit={handleSubmit}>
            <MDBInput
              wrapperClass="mb-4"
              label="Your Name"
              size="lg"
              type="text"
              placeholder="Enter username"
              onChange={handleChange}
              id="userName"
              contrast
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Your Email"
              size="lg"
              placeholder="Enter email"
              onChange={handleChange}
              id="email"
              contrast
            />
            <MDBInput
              label="Your Age"
              wrapperClass="mb-4"
              size="lg"
              placeholder="Enter age"
              type="number"
              onChange={handleChange}
              id="age"
              contrast
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Your Password"
              size="lg"
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
              id="password"
              contrast
            />
            {errorMessage && (
              <div className="text-center text-danger mb-4">
                <p>{errorMessage}</p>
              </div>
            )}
            <MDBBtn
              className="mb-4 w-100"
              size="lg"
              type="submit"
              style={{ backgroundColor: "#ffc107", color: "#003366" }}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </MDBBtn>
            <div className="text-center">
              <p className="mb-0">
                Already have an account?{" "}
                <Link to="/SignIn" className="text-warning">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignUp;
