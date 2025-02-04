import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import api from "../../utils/api";
import CreateAlbum from "../../components/CreateAlbum";

export default function UserPage() {
  const router = useRouter();
  const { id } = router.query; // Get user ID from URL
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null); // Store the logged-in user

  // Move `fetchUserData` outside `useEffect` so it can be called manually
  const fetchUserData = async () => {
    try {
      const tokenData = JSON.parse(localStorage.getItem("userInfo"));
      const token = tokenData?.token;
      if (!token) {
        console.error("No authentication token found.");
        return;
      }

      setCurrentUser(tokenData); // Store the logged-in user

      console.log("Fetching user details from:", `/users/${id}`); // Debug Log
      console.log("Fetching albums from:", `/albums/user/${id}`); // Debug Log

      // ✅ Fetch user details first
      const userRes = await api.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(userRes.data); // Store user data

      // ✅ Fetch user albums only if the user exists
      const albumsRes = await api.get(`/albums/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAlbums(albumsRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error.response?.data || error.message);
    }
  };

  // Use `useEffect` to fetch data initially
  useEffect(() => {
    if (id) fetchUserData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{user.name}'s Albums</h1>

      {/* Call `fetchUserData` after an album is created to refresh instantly */}
      {currentUser && currentUser._id === id && <CreateAlbum onAlbumCreated={fetchUserData} />}

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
