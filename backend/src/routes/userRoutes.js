const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserProfile, getAllUsers, getUserById } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

// User Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

// Get all users
router.get("/", protect, getAllUsers);

// Get a single user by ID
router.get("/:id", protect, getUserById);

module.exports = router;
