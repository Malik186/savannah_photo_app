import { useState } from "react";
import api from "../utils/api";

export default function CreateAlbum({ onAlbumCreated }) {
  const [title, setTitle] = useState("");

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      if (!token) {
        console.error("No authentication token found.");
        return;
      }

      await api.post("/albums", { title }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Album created successfully!");
      setTitle("");
      onAlbumCreated(); // Refresh album list
    } catch (error) {
      alert("Error creating album.");
    }
  };

  return (
    <form onSubmit={handleCreateAlbum} className="mb-4 p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">Create New Album</h2>
      <input
        type="text"
        placeholder="Album Title"
        className="p-2 border w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Create Album
      </button>
    </form>
  );
}
