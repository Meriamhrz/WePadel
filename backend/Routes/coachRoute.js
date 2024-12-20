const express = require("express");
const {
  getAllCoaches,
  createCoach,
  getCoachById,
  updateCoach,
  deleteCoach,
} = require("../Controllers/coachController");

const coachRoute = express.Router();

// Routes for Coaches
coachRoute.get("/", getAllCoaches); // GET /api/coaches
coachRoute.post("/", createCoach); // POST /api/coaches
coachRoute.get("/:id", getCoachById); // GET /api/coaches/:id
coachRoute.put("/:id", updateCoach); // PUT /api/coaches/:id
coachRoute.delete("/:id", deleteCoach); // DELETE /api/coaches/:id

module.exports = coachRoute;
