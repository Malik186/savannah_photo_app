const express = require("express");
const router = express.Router();
const { uploadPhoto, getAlbumPhotos, updatePhotoTitle, deletePhoto } = require("../controllers/photoController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Photo Routes
router.post("/", protect, upload.single("image"), uploadPhoto); // Upload a photo
router.get("/:albumId", protect, getAlbumPhotos); // Get photos in an album
router.put("/:photoId", protect, updatePhotoTitle); // Update photo title
router.delete("/:photoId", protect, deletePhoto); // Delete a photo

module.exports = router;
