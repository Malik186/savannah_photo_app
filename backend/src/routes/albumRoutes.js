const express = require("express");
const router = express.Router();
const { createAlbum, getUserAlbums, getAllAlbums, getAlbumsByUser, getAlbumById } = require("../controllers/albumController");
const { protect } = require("../middlewares/authMiddleware");

// Album Routes
router.post("/", protect, createAlbum); // Create an album (Authenticated User)
router.get("/", protect, getAllAlbums); // Get all albums (Authenticated User)
router.get("/user", protect, getUserAlbums); // Get albums of the logged-in user
router.get("/user/:id", protect, getAlbumsByUser);
router.get("/:id", protect, getAlbumById);

module.exports = router;
