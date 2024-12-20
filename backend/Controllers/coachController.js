const Coach = require("../models/Coach.js");
 
// Get all coaches
const getAllCoaches = async (req, res) => {
  try {
    const coaches = await Coach.find({});
    res.status(200).json(coaches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching coaches", error });
  }
};
 
// Create a new coach
const createCoach = async (req, res) => {
  try {
    const { name, Ranking,image,  description, price, availability } = req.body;

    // Check if availability is undefined or not a string, default to an empty array
    const availabilityArray = availability && typeof availability === 'string' 
      ? availability.split(',') 
      : [];

    // Create the new coach object
    const newCoach = new Coach({
      name,
      Ranking,
      image,
      description,
      price,
      availability: availabilityArray,
    });

    // Save the new coach
    await newCoach.save();

    res.status(201).json(newCoach);
  } catch (error) {
    console.error('Error creating coach:', error);
    res.status(500).json({ message: 'Error creating coach', error });
  }
};


 
// Get a coach by ID
const getCoachById = async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);
    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }
    res.status(200).json(coach);
  } catch (error) {
    res.status(500).json({ message: "Error fetching coach", error });
  }
};
 
// Update a coach
const updateCoach = async (req, res) => {
  try {
    const updatedCoach = await Coach.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCoach) {
      return res.status(404).json({ message: "Coach not found" });
    }
    res.status(200).json(updatedCoach);
  } catch (error) {
    res.status(500).json({ message: "Error updating coach", error });
  }
};
 
// Delete a coach
const deleteCoach = async (req, res) => {
  try {
    const deletedCoach = await Coach.findByIdAndDelete(req.params.id);
    if (!deletedCoach) {
      return res.status(404).json({ message: "Coach not found" });
    }
    res.status(200).json({ message: "Coach deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting coach", error });
  }
};
 
module.exports = {
  getAllCoaches,
  createCoach,
  getCoachById,
  updateCoach,
  deleteCoach,
};
 
