const Reservation = require("../models/Reservation");
const Court = require("../models/Court");

const createReservation = async (req, res) => {
  const { courtId, date, time } = req.body;

  try {
    // Log request data for debugging
    console.log("Request Body:", req.body);

    // Find the court
    const court = await Court.findById(courtId);
    if (!court) {
      return res.status(404).json({ message: "Court not found" });
    }

    // Log current court availability
    console.log("Court Availability:", court.availability);

    // Format the time
    const [hour, minute] = time.split(":");
    const formattedTime = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    const timeSlot = `${date}T${formattedTime}`;

    // Check if the time slot is available
    if (!court.availability.includes(timeSlot)) {
      return res.status(400).json({ message: "Time slot not available" });
    }

    // Check for duplicate reservations for this time slot
    const existingReservation = await Reservation.findOne({ courtId, date, time: formattedTime });
    if (existingReservation) {
      return res.status(400).json({ message: "Reservation already exists for this time slot" });
    }

    // Create the new reservation
    const newReservation = new Reservation({
      courtId,
      userId: req.user.id,
      date,
      time: formattedTime
    });

    // Save the reservation
    await newReservation.save();

    // Update court availability
    court.availability = court.availability.filter((slot) => slot !== timeSlot);
    await court.save();

    // Respond with the success message and reservation details
    res.status(201).json({ message: "Reservation created successfully", reservation: newReservation });
  } catch (err) {
    console.error("Error creating reservation:", err);
    res.status(500).json({ message: "Error creating reservation", error: err.message });
  }
};


const getReservations = async (req, res) => {
  const { date } = req.query;

  try {
    const query = {};
    if (req.user.role !== "admin") query.userId = req.user._id;
    if (date) query.date = date;

    const reservations = await Reservation.find(query)
      .populate("courtId", "name location")
      .populate("userId", "userName email");

    res.status(200).json(reservations);
  } catch (err) {
    console.error("Error fetching reservations:", err);
    res.status(500).json({ message: "Error fetching reservations", error: err.message });
  }
};

const getReservationsByCourtId = async (req, res) => {
  const { courtId } = req.params;

  try {
    const query = { courtId };
    if (req.user.role !== "admin") query.userId = req.user._id;

    const reservations = await Reservation.find(query)
      .populate("userId", "userName email")
      .populate("courtId", "name location");

    if (!reservations.length) {
      return res.status(404).json({ message: "No reservations found for this court" });
    }

    res.status(200).json(reservations);
  } catch (err) {
    console.error("Error fetching reservations:", err);
    res.status(500).json({ message: "Error fetching reservations", error: err.message });
  }
};

const liberateCourt = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) return res.status(404).json({ message: "Reservation not found" });

    const court = await Court.findById(reservation.courtId);
    if (!court) return res.status(404).json({ message: "Associated court not found" });

    const datePart = reservation.date.toISOString().split("T")[0];
    const timeSlot = `${datePart}T${reservation.time}`;

    court.availability.push(timeSlot);
    await court.save();

    await reservation.deleteOne();
    res.status(200).json({ message: "Court liberated successfully" });
  } catch (err) {
    console.error("Error liberating court:", err);
    res.status(500).json({ message: "Error liberating court", error: err.message });
  }
};

const deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) return res.status(404).json({ message: "Reservation not found" });

    await reservation.deleteOne();

    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (err) {
    console.error("Error deleting reservation:", err);
    res.status(500).json({ message: "Error deleting reservation", error: err.message });
  }
};

module.exports = {
  createReservation,
  getReservations,
  getReservationsByCourtId,
  liberateCourt,
  deleteReservation,
};
