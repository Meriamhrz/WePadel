const express = require("express");
const {
  createReservation,
  getReservations,
  getReservationsByCourtId,
  liberateCourt,
  deleteReservation,
} = require("../Controllers/reservationController");

const isAuth = require("../middleware/isAuth"); // Middleware now validates cookies
const isAutho = require("../middleware/isAutho");

const reservationRoute = express.Router();

reservationRoute.post("/", isAuth, isAutho(["user", "admin"]), createReservation);
reservationRoute.get("/", isAuth, getReservations);
reservationRoute.get("/:courtId", isAuth, getReservationsByCourtId);
reservationRoute.put("/liberate/:id", isAuth, isAutho(["admin"]), liberateCourt);
reservationRoute.delete("/reservations/:id", isAuth, deleteReservation); // Secured delete with isAuth

module.exports = reservationRoute;
