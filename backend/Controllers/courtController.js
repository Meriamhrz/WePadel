const User = require("../models/User");
const Court = require("../models/Court"); // Ensure this is imported
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const getAllCourts = async (req, res) => {
  console.log("Fetching all courts...");
  try {
    const courts = await Court.find(); // Ensure Court is imported
    console.log("Courts fetched:", courts);

    if (courts.length > 0) {
      res.status(200).json({ courts });
    } else {
      res.status(404).json({ msg: "No courts found" });
    }
  } catch (err) {
    console.error("Error fetching courts:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

const addCourt = async (req, res) => {
  const { name, location, availability } = req.body;
  console.log("Adding new court:", { name, location, availability });

  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Only admins can add courts." });
    }

    const newCourt = new Court({ name, location, availability });
    await newCourt.save();
    console.log("New court added:", newCourt);

    res.status(201).json(newCourt);
  } catch (err) {
    console.error("Error adding court:", err);
    res.status(500).json({ message: "Error adding court", error: err.message });
  }
};

const deleteCourt = async (req, res) => {
  const { id } = req.params;
  console.log("Deleting court with ID:", id);

  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Only admins can delete courts." });
    }

    const deletedCourt = await Court.findByIdAndDelete(id);
    if (!deletedCourt) {
      console.log("Court not found:", id);
      return res.status(404).json({ message: "Court not found" });
    }

    console.log("Court deleted successfully:", deletedCourt);
    res.status(200).json({ message: "Court deleted successfully", deletedCourt });
  } catch (err) {
    console.error("Error deleting court:", err);
    res.status(500).json({ message: "Error deleting court", error: err.message });
  }
};

const updateCourt = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  console.log("Updating court with ID:", id, "Data:", updatedData);

  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Only admins can update courts." });
    }

    const updatedCourt = await Court.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedCourt) {
      console.log("Court not found:", id);
      return res.status(404).json({ message: "Court not found" });
    }

    console.log("Court updated successfully:", updatedCourt);
    res.status(200).json(updatedCourt);
  } catch (err) {
    console.error("Error updating court:", err);
    res.status(500).json({ message: "Error updating court", error: err.message });
  }
};

module.exports = {
  getAllCourts,
  addCourt,
  deleteCourt,
  updateCourt,
};
