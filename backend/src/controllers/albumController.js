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

module.exports = { createAlbum, getAllAlbums, getUserAlbums };
