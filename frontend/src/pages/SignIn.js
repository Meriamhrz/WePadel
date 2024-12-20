import React, { useState } from "react";
import { UserRole } from "./UserRole.js";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import '../styles/App.css'; 
import { Link } from "react-router-dom"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
import Cookies from "js-cookie";  // Import js-cookie

function SignIn() {
  const url = "https://wepadel.onrender.com//api/signIn";
  const navigate = useNavigate();  
  const [user, setUser] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user.email || !user.password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    axios
      .post(url, user, { withCredentials: true }) 
      .then((response) => {
        console.log("Login successful:", response.data);
        
        const token = response.data.token || response.data.data?.token;
        if (!token) {
          setErrorMessage("An error occurred");
          console.log("No token received. Please check the server response");
          return;
        }

        // Set the token in cookies with js-cookie
        Cookies.set("auth_token", token, { expires: 7, path: "/" });

        try {
          const decodedToken = jwtDecode(token);
          console.log("Decoded Token:", decodedToken);
          const role = decodedToken.role;
          console.log("User Role:", role);
          
          if (role === "admin") {
            navigate("/AdminPage");
          } else {
            navigate("/Home");
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          setErrorMessage("Failed to decode token. Please try again.");
        }
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.message || "Invalid credentials. Please try again.");
        } else if (error.request) {
          setErrorMessage("No response from server. Please try again later.");
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      });
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor:"#FFFFF",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <MDBContainer fluid className="d-flex align-items-center justify-content-center bg-image">
        <div className="mask gradient-custom-3"></div>
        <div style={{ marginTop: "60px" }}>
          <MDBCard className="m-5" style={{ maxWidth: "600px", borderRadius: "10px", borderColor: "#0056b3" }}>
            <MDBCardBody className="px-5">
              <h2 className="text-uppercase text-center mb-5" style={{ color: "#0056b3" }}>Sign In to your account</h2>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass="mb-4"
                  size="lg"
                  placeholder="Enter email"
                  onChange={handleChange}
                  id="email"
                  style={{ borderColor: "#0056b3" }}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  size="lg"
                  type="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                  id="password"
                  style={{ borderColor: "#0056b3" }}
                />
                <MDBBtn
                  className="mb-4 w-100"
                  size="lg"
                  type="submit"
                  style={{
                    backgroundColor: "#f1c40f",
                    color: "#fff",
                    borderColor: "#f1c40f",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Sign In
                </MDBBtn>
                {errorMessage && (
                  <div className="text-center text-danger mb-4">
                    <p>{errorMessage}</p>
                  </div>
                )}
                <div className="text-center">

                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </div>
      </MDBContainer>
    </div>
  );
}

export default SignIn;
