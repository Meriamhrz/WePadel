const express = require("express");
const orderRoute = express.Router();
const { getOrders, getOrderById } = require("../Controllers/orderController");

orderRoute.get("/orders", getOrders); // Get all orders
orderRoute.get("/orders/:id", getOrderById); // Get a specific order by ID

module.exports = orderRoute;
