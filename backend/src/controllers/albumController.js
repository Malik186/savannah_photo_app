const Album = require("../models/Album");

// @desc Create a new album
// @route POST /api/albums
// @access Private (Authenticated Users)
const createAlbum = async (req, res) => {
  const { title } = req.body;

  try {
    if (!title) {
      return res.status(400).json({ message: "Album title is required" });
    }

    const album = await Album.create({
      user: req.user.id,
      title,
    });

    res.status(201).json(album);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get all albums
// @route GET /api/albums
// @access Private (Authenticated Users)
const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate("user", "name username email");
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get albums of the logged-in user
// @route GET /api/albums/user
// @access Private (Authenticated Users)
const getUserAlbums = async (req, res) => {
  try {
    const albums = await Album.find({ user: req.user.id });
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get albums by user ID
// @route GET /api/albums/user/:id
// @access Private
const getAlbumsByUser = async (req, res) => {
  try {
    console.log("Fetching albums for user ID:", req.params.id); //Debug Log

    const albums = await Album.find({ user: req.params.id });

    if (!albums || albums.length === 0) {
      console.log("No albums found for user ID:", req.params.id); //Debug Log
      return res.status(404).json({ message: "No albums found for this user" });
    }

    console.log("Albums found:", albums.length); //Debug Log
    res.json(albums);
  } catch (error) {
    console.error("Error fetching albums by user:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get an album by ID
// @route GET /api/albums/:id
// @access Private (Authenticated Users)
const getAlbumById = async (req, res) => {
  try {
    console.log("Fetching album by ID:", req.params.id); //Debug Log

    const album = await Album.findById(req.params.id).populate("user", "name email");

    if (!album) {
      console.log("Album not found:", req.params.id); //Debug Log
      return res.status(404).json({ message: "Album not found" });
    }

    res.json(album);
  } catch (error) {
    console.error("Error fetching album by ID:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createAlbum, getAllAlbums, getUserAlbums, getAlbumsByUser, getAlbumById };

