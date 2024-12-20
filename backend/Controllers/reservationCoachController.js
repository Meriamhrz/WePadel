const CoachReservation = require("../models/CoachReservation");

const createCoachReservation = async (req, res) => {
  try {
    const { coachId, userId, date, time } = req.body;

    if (!coachId || !userId || !date || !time) {
      return res.status(400).json({ message: "Missing required fields!" });
    }

    const reservation = await CoachReservation.create({
      coachId,
      userId,
      date,
      time,
    });

    res.status(201).json(reservation);
  } catch (err) {
    console.error("Error creating coach reservation:", err);
    res.status(500).json({ message: err.message });
  }
};

const getCoachReservations = async (req, res) => {
  try {
    const reservations = await CoachReservation.find().populate("coachId").populate("userId");
    res.status(200).json(reservations);
  } catch (err) {
    console.error("Error fetching coach reservations:", err);
    res.status(500).json({ message: err.message });
  }
};


const deleteCoachReservation = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the reservation exists
    const reservation = await CoachReservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Coach reservation not found!" });
    }

    // Delete the reservation
    await CoachReservation.findByIdAndDelete(id);

    res.status(200).json({ message: "Coach reservation deleted successfully!" });
  } catch (err) {
    console.error("Error deleting coach reservation:", err);
    res.status(500).json({ message: err.message });
  }
};
// Backend example for updating the coach's availability
const updateCoachAvailability = async (req, res) => {
  const { coachId } = req.params;
  const { availability } = req.body;

  try {
    const coach = await Coach.findById(coachId);

    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    coach.availability = availability;
    await coach.save();

    res.status(200).json(coach);
  } catch (err) {
    console.error("Error updating coach availability:", err);
    res.status(500).json({ message: "Error updating coach availability" });
  }
};


module.exports = {
  createCoachReservation,
  getCoachReservations,
  deleteCoachReservation,
  updateCoachAvailability
};
