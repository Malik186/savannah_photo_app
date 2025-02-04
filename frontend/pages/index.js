import Link from "next/link";
import { useEffect, useState } from "react";
import api from "../utils/api";
import CreateAlbum from "../components/CreateAlbum";

export default function Home() {
  const [albums, setAlbums] = useState([]);

  const fetchAlbums = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      if (!token) {
        console.error("No authentication token found.");
        return;
      }

      const { data } = await api.get("/albums", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAlbums(data);
    } catch (error) {
      console.error("Error fetching albums", error);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Albums</h1>
      <CreateAlbum onAlbumCreated={fetchAlbums} />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {albums.map((album) => (
          <Link key={album._id} href={`/album/${album._id}`}>
            <div className="p-4 border rounded cursor-pointer hover:shadow-md">
              <h2 className="text-lg font-semibold">{album.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
