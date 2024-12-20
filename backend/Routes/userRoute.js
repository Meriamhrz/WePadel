const express = require("express");
const userRoute = express.Router();
const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  getOneUser,
  signIn,
} = require("../Controllers/userController");
const isAuth = require('../middleware/isAuth');
const isAutho = require('../middleware/isAutho');

// Public routes
userRoute.post("/SignIn", signIn);  // For signing in a user
userRoute.post("/users", postUser); // Public route for user registration

// Protected routes - requiring authentication first
userRoute.use(isAuth);  // Apply authentication middleware globally to all routes below

// Route for getting a list of all users - requires admin role
userRoute.get("/users", isAutho(['admin']), getUsers);

// Route for getting a single user by ID
userRoute.get("/users/:id", isAutho(['user', 'admin']), (req, res, next) => {
  // Check if the user is trying to access their own profile or an admin profile
  if (req.user.id !== req.params.id && req.user.role !== 'admin') {
    return res.status(403).json({ msg: "Access forbidden - You can only view your own profile or admin profiles." });
  }
  return getOneUser(req, res, next); // Proceed to the controller if checks pass
});

// Route for updating a user's information - only accessible by the user or an admin
userRoute.put("/users/:id", isAutho(['user', 'admin']), putUser);

// Route for deleting a user - requires 'admin' role
userRoute.delete("/users/:id", isAutho(['admin']), deleteUser);

module.exports = userRoute;
