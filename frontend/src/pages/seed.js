// Import required modules
const axios = require("axios");
const fs = require("fs");
const path = require("path");


axios
  .post("http://localhost:8080/api/products",  {
    image: 'https://res.cloudinary.com/dpwwwzfsh/image/upload/v1732877024/products/nwpadfntteahiq4lzfta.webp',
    brand: "ADIDAS",
    paragraph: "Barricade 13 M Black/Orange 2024 Shoes",
    rating: 4.0,
    price: 99.99,
    category: "Shoes",
  })
  .then((res) => {
    console.log("Products uploaded successfully:", res.data);
  })
  .catch((err) => {
    console.error("Error uploading products:", err);
  });
