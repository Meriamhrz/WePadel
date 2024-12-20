const express = require("express");
const paymentRoute = express.Router();
const { createCheckoutSession } = require("../Controllers/paymentController");

// Define the routes
paymentRoute.post("/checkout", createCheckoutSession);

module.exports = paymentRoute;
