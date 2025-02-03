const express = require("express");
const router = express.Router();
const { likePhoto, unlikePhoto, getPhotoLikes } = require("../controllers/likeController");
const { protect } = require("../middlewares/authMiddleware");

// Like Routes
router.post("/", protect, likePhoto); // Like a photo
router.delete("/:photoId", protect, unlikePhoto); // Unlike a photo
router.get("/:photoId", protect, getPhotoLikes); // Get likes count

module.exports = router;
