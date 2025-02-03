import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Home() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const token = localStorage.getItem("userInfo") 
          ? JSON.parse(localStorage.getItem("userInfo")).token 
          : null;

        if (!token) {
          console.error("No authentication token found. Please log in.");
          return;
        }

        const { data } = await api.get("/albums", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAlbums(data);
      } catch (error) {
        console.error("Error fetching albums", error);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Albums</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {albums.length > 0 ? (
          albums.map((album) => (
            <div key={album._id} className="p-4 border rounded">
              <h2 className="text-lg font-semibold">{album.title}</h2>
            </div>
          ))
        ) : (
          <p>No albums found.</p>
        )}
      </div>
    </div>
  );
}
