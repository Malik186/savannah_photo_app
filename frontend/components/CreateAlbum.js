import { useState } from "react";
import api from "../utils/api";

export default function CreateAlbum({ onAlbumCreated }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateAlbum = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Album title cannot be empty!");
      return;
    }

    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      if (!token) return;

      const response = await api.post("/albums", { title }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Album created successfully!");
      setTitle("");
      onAlbumCreated();
    } catch (error) {
      alert("Error creating album.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCreateAlbum} className="p-4 border rounded mb-4">
      <h2 className="text-lg font-bold mb-2">Create an Album</h2>
      <input
        type="text"
        placeholder="Album Title"
        className="p-2 border w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Album"}
      </button>
    </form>
  );
}
