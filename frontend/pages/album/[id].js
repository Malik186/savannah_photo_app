import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";
import UploadPhoto from "../../components/UploadPhoto";

export default function AlbumPage() {
    const router = useRouter();
    const { id } = router.query; // Get album ID from URL
    const [album, setAlbum] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [photoTitles, setPhotoTitles] = useState({}); // State for photo titles
    const [commentText, setCommentText] = useState(""); // State for comment input

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

    useEffect(() => {
        if (id) fetchAlbumData();
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

    const handleComment = async (photoId) => {
        if (!commentText.trim()) {
            alert("Comment cannot be empty!");
            return;
        }

        try {
            const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
            if (!token) return;

            await api.post("/comments", { text: commentText, photoId }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("Comment Added!");
            setCommentText(""); // Clear input field
        } catch (error) {
            alert("Error adding comment.");
        }
    };

    const handleDelete = async (photoId) => {
        try {
            const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
            if (!token) return;

            await api.delete(`/photos/${photoId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("Photo deleted successfully!");
            fetchAlbumData(); // Refresh album list after deletion
        } catch (error) {
            alert("Error deleting photo.");
        }
    };

    const handleEditTitle = async (photoId, newTitle) => {
        if (!newTitle.trim()) {
            alert("Title cannot be empty!");
            return;
        }

        try {
            const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
            if (!token) return;

            await api.put(`/photos/${photoId}`, { title: newTitle }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("Photo title updated!");
            fetchAlbumData(); // Refresh album list after editing
            setPhotoTitles({ ...photoTitles, [photoId]: "" }); // Reset input field
        } catch (error) {
            alert("Error updating photo title.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!album) return <p>Album not found</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">{album.title}</h1>

            {/* Upload Photo Component */}
            <UploadPhoto albumId={id} onPhotoUploaded={fetchAlbumData} />

            <div className="grid grid-cols-3 gap-4 mt-4">
                {photos.map((photo) => (
                    <div key={photo._id} className="p-4 border rounded">
                        <img src={photo.imageUrl} alt={photo.title} className="w-full h-40 object-cover" />
                        <h2 className="text-lg font-semibold mt-2">{photo.title}</h2>

                        {/* Like Button */}
                        <button
                            onClick={() => handleLike(photo._id)}
                            className="bg-red-500 text-white px-4 py-1 rounded mt-2"
                        >
                            ❤️ Like
                        </button>

                        {/* Delete Button */}
                        <button
                            onClick={() => handleDelete(photo._id)}
                            className="bg-red-500 text-white px-4 py-1 rounded mt-2"
                        >
                            🗑️ Delete
                        </button>

                        {/* Edit Title */}
                        <div className="mt-2">
                            <input
                                type="text"
                                placeholder="New Title"
                                className="p-2 border w-full mb-2"
                                value={photoTitles[photo._id] || ""}
                                onChange={(e) =>
                                    setPhotoTitles({ ...photoTitles, [photo._id]: e.target.value })
                                }
                            />
                            <button
                                onClick={() =>
                                    handleEditTitle(photo._id, photoTitles[photo._id] || photo.title)
                                }
                                className="bg-green-500 text-white px-4 py-1 rounded"
                            >
                                ✏️ Edit Title
                            </button>
                        </div>

                        {/* Comment Section */}
                        <div className="mt-2">
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                className="p-2 border w-full mb-2"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <button
                                onClick={() => handleComment(photo._id)}
                                className="bg-blue-500 text-white px-4 py-1 rounded"
                            >
                                💬 Comment
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
