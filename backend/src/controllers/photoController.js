const Photo = require("../models/Photo");
const cloudinary = require("../config/cloudinary");

// @desc Upload a photo
// @route POST /api/photos
// @access Private
const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const { title, albumId } = req.body;
    if (!title || !albumId) {
      return res.status(400).json({ message: "Title and album ID are required" });
    }

    const imageUrl = req.file.path; // Get image URL from Cloudinary

    const photo = await Photo.create({
      title,
      album: albumId,
      imageUrl,
    });

    res.status(201).json(photo);
  } catch (error) {
    console.error("Photo upload error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get photos in an album
// @route GET /api/photos/:albumId
// @access Private
const getAlbumPhotos = async (req, res) => {
  try {
    const photos = await Photo.find({ album: req.params.albumId });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Update photo title
// @route PUT /api/photos/:photoId
// @access Private
const updatePhotoTitle = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.photoId);
    if (!photo) return res.status(404).json({ message: "Photo not found" });

    photo.title = req.body.title || photo.title;
    await photo.save();
    res.json(photo);
  } catch (error) {
    console.error("Update title error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Delete a photo
// @route DELETE /api/photos/:photoId
// @access Private
const deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.photoId);
    if (!photo) return res.status(404).json({ message: "Photo not found" });

    // Delete from Cloudinary
    const publicId = photo.imageUrl.split("/").pop().split(".")[0]; // Extract public ID from URL
    await cloudinary.uploader.destroy(publicId);

    await photo.deleteOne();
    res.json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.error("Delete photo error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { uploadPhoto, getAlbumPhotos, updatePhotoTitle, deletePhoto };
