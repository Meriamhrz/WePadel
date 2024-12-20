const express = require("express");
const courtRoute = express.Router();
const {
  getAllCourts,
  addCourt,
  deleteCourt,
  updateCourt,
  createReservation // Add the reservation controller here
} = require("../Controllers/courtController");
const isAuth = require("../middleware/isAuth");
const isAutho = require("../middleware/isAutho");
// Court CRUD operations
courtRoute.get("/", isAuth, getAllCourts); // No authentication needed here
courtRoute.post("/", isAuth, isAutho(['user', 'admin']),addCourt); // Only authenticated users (admin) can add a court
courtRoute.delete("/:id", isAuth, deleteCourt); // Only authenticated users (admin) can delete a court
courtRoute.put("/:id", isAuth, updateCourt); // Only authenticated users (admin) can update a court


module.exports = courtRoute;
