import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
    
    if (!token) {
      navigate("/SignIn");
      return;
    }

    const jwt = token.split('=')[1];
    try {
      const decodedToken = jwtDecode(jwt);
      setRole(decodedToken.role);
    } catch (error) {
      console.error("Error decoding token", error);
      navigate("/SignIn");
    }
  }, [navigate]);

  if (role === null) {
    // While waiting for the role to be decoded, you can show a loading state
    return <div>Loading...</div>;
  }

  // Only render the children if the role is valid and authorized
  if (role !== "admin") {
    navigate("/SignIn"); // If the role isn't admin, redirect
    return null; // Optionally render nothing while redirecting
  }

  return <>{children}</>;
};

export default PrivateRoute;
