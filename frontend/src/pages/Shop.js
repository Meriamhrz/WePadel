import React, { useState, useEffect } from "react";
import axios from "axios";
import LayoutPages from "../components/Layouts/LayoutPages";
import Sidebar from "./Shop/Sidebar/Sidebar";
import ShopBody from "./Shop/ShopBody";
import "./Shop/Shop.css";

function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);


  // Helper function to get token from cookies
  const getTokenFromCookies = () => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="));
    return cookie ? cookie.split("=")[1] : null;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Get token from cookies
        const token = getTokenFromCookies(); 

        // Include the Authorization header if token exists
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        console.log(headers);

        const response = await axios.get("http://localhost:8080/api/products", {
          headers, // Send token if available
          withCredentials: true, // Include cookies with the request
        });

        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Unable to fetch products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <LayoutPages>
      <div className="shop-container">
        <Sidebar
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts}
          InitialProducts={products}
        />
        <ShopBody
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts}
          InitialProducts={products}
        />
        {error && <div className="error-message">{error}</div>}
      </div>
    </LayoutPages>
  );
}

export default Shop;
