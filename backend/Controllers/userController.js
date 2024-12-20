const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Import bcrypt
require('dotenv').config();

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users && users.length > 0) {
            res.status(200).json({ users });
        } else {
            res.status(404).json({ msg: "No users found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error on getting users" });
    }
};

const getOneUser  = async (req, res) => {
    const id = req.params.id;
    try {
        const foundUser  = await User.findById(id);
        if (foundUser ) {
            res.status(200).json({ user: foundUser  });
        } else {
            res.status(404).json({ msg: "No user found with the given ID" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error retrieving user" });
    }
};

const postUser = async (req, res) => {
    try {
        const { userName, email, age, password, profilePicture } = req.body;

        // Add additional validation as needed
        if (!userName || !email || !age || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Create the new user with the profile picture
        const newUser = new User({
            userName,
            email,
            age,
            password, // Make sure to hash the password before saving!
            profilePicture, // Save profile picture URL or base64 string
        });

        await newUser.save();
        return res.status(201).json({ msg: "User created successfully" });
    } catch (err) {
        console.error("Error during user creation:", err);
        return res.status(500).json({ msg: "An error occurred during registration" });
    }
};

const putUser = async (req, res) => {
    const id = req.params.id;
    const { userName, email, age, profilePicture } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            userName,
            email,
            age,
            profilePicture,  // Update profile picture if provided
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({ msg: "Update successful", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error updating user" });
    }
};


const deleteUser  = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser  = await User.findByIdAndDelete(id);
        if (!deletedUser ) {
            return res.status(404).json({ msg: "User  not found" });
        }
        res.status(200).json({ msg: "Delete successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error deleting user" });
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare the hashed password with the provided password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Send token as part of the response body
        res.status(200).json({
            message: "Login successful",
            token: token, // Add token in response
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = { getUsers, postUser , putUser , deleteUser , getOneUser , signIn };