const Comment = require("../models/Comment");

// @desc Add a comment to a photo
// @route POST /api/comments
// @access Private
const addComment = async (req, res) => {
  try {
    const { text, photoId } = req.body;

    if (!text || !photoId) {
      return res.status(400).json({ message: "Text and Photo ID are required" });
    }

    const comment = await Comment.create({
      photo: photoId,
      user: req.user.id,
      text,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get comments for a photo
// @route GET /api/comments/:photoId
// @access Private
const getPhotoComments = async (req, res) => {
  try {
    const comments = await Comment.find({ photo: req.params.photoId }).populate("user", "name username");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Delete a comment
// @route DELETE /api/comments/:commentId
// @access Private
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Ensure only the comment owner can delete
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addComment, getPhotoComments, deleteComment };
