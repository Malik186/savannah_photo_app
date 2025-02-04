import { useState } from "react";
import api from "../utils/api";

export default function UploadPhoto({ albumId, onPhotoUploaded }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      alert("Please provide a title and select an image.");
      return;
    }

    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
    if (!token) {
      alert("No authentication token found. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("albumId", albumId); // Ensure albumId is included
    formData.append("image", image); // Ensure image is selected

    try {
      setLoading(true);

      const response = await api.post("/photos", formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Ensure correct content type
        },
      });

      if (response.status === 201) {
        alert("Photo uploaded successfully!");
        setTitle("");
        setImage(null);
        onPhotoUploaded(); // Refresh the photo list
      }
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      alert("Error uploading photo: " + (error.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="p-4 border rounded mb-4">
      <h2 className="text-lg font-bold mb-2">Upload a Photo</h2>
      <input
        type="text"
        placeholder="Photo Title"
        className="p-2 border w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file"
        className="p-2 border w-full mb-2"
        onChange={handleFileChange}
        accept="image/*"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Photo"}
      </button>
    </form>
  );
}
