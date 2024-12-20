const express = require("express");
const {
  createCoachReservation,
  getCoachReservations,
  deleteCoachReservation,
  updateCoachAvailability
} = require("../Controllers/reservationCoachController");

const isAuth = require("../middleware/isAuth");
const isAutho = require("../middleware/isAutho");

const coachReservationRoute = express.Router();

// Routes
coachReservationRoute.post("/", isAuth, isAutho(["user", "admin"]), createCoachReservation);
coachReservationRoute.get("/", isAuth, getCoachReservations);
coachReservationRoute.delete("/:id", isAuth, isAutho(["admin"]), deleteCoachReservation);
coachReservationRoute.put("/:id", isAuth, isAutho(["admin"]), updateCoachAvailability);


module.exports = coachReservationRoute;
