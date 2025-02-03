const Like = require("../models/Like");

// @desc Like a photo
// @route POST /api/likes
// @access Private
const likePhoto = async (req, res) => {
  try {
    const { photoId } = req.body;

    const existingLike = await Like.findOne({ photo: photoId, user: req.user.id });
    if (existingLike) return res.status(400).json({ message: "Already liked this photo" });

    const like = await Like.create({
      photo: photoId,
      user: req.user.id,
    });

    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Unlike a photo
// @route DELETE /api/likes/:photoId
// @access Private
const unlikePhoto = async (req, res) => {
  try {
    const like = await Like.findOneAndDelete({ photo: req.params.photoId, user: req.user.id });

    if (!like) return res.status(404).json({ message: "Like not found" });

    res.json({ message: "Photo unliked" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get likes count for a photo
// @route GET /api/likes/:photoId
// @access Private
const getPhotoLikes = async (req, res) => {
  const likes = await Like.countDocuments({ photo: req.params.photoId });
  res.json({ likes });
};

module.exports = { likePhoto, unlikePhoto, getPhotoLikes };
