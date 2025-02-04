import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";

export default function AlbumPage() {
  const router = useRouter();
  const { id } = router.query; // Get album ID from URL
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchAlbumData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
        if (!token) {
          console.error("No authentication token found.");
          return;
        }

        // Fetch album details
        const albumRes = await api.get(`/albums/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Fetch album photos
        const photosRes = await api.get(`/photos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAlbum(albumRes.data.find((a) => a._id === id));
        setPhotos(photosRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching album", error);
      }
    };

    fetchAlbumData();
  }, [id]);

  const handleLike = async (photoId) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      if (!token) return;
  
      await api.post("/likes", { photoId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert("Photo Liked!");
    } catch (error) {
      alert("Error liking photo.");
    }
  };
  
  const handleComment = async (photoId, commentText) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      if (!token) return;
  
      await api.post("/comments", { text: commentText, photoId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert("Comment Added!");
    } catch (error) {
      alert("Error adding comment.");
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (!album) return <p>Album not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{album.title}</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {photos.map((photo) => (
          <div key={photo._id} className="p-4 border rounded">
            <img src={photo.imageUrl} alt={photo.title} className="w-full h-40 object-cover" />
            <h2 className="text-lg font-semibold mt-2">{photo.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
