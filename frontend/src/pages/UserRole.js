import { jwtDecode } from "jwt-decode"; // Use named import
import Cookies from "js-cookie"; // Ensure js-cookie is installed

export function UserRole() {
  try {
    const token = Cookies.get("auth_token"); // Fetch the token from cookies
    if (!token) return null;

    const decoded = jwtDecode(token); // Decode the JWT
    return decoded.role; // Return the user's role
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
}
