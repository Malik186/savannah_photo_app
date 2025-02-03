const express = require("express");
const router = express.Router();
const { addComment, getPhotoComments, deleteComment } = require("../controllers/commentController");
const { protect } = require("../middlewares/authMiddleware");

// Comment Routes
router.post("/", protect, addComment); // Add a comment
router.get("/:photoId", protect, getPhotoComments); // Get comments for a photo
router.delete("/:commentId", protect, deleteComment); // Delete a comment

module.exports = router;
