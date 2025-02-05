import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";
import UploadPhoto from "../../components/UploadPhoto";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageSquare, Pencil, Trash2, Image as ImageIcon } from "lucide-react";

const ImageSkeleton = () => (
  <div className="animate-pulse">
    <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
    <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

export default function AlbumPage() {
    const router = useRouter();
    const { id } = router.query;
    const [album, setAlbum] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [photoTitles, setPhotoTitles] = useState({});
    const [commentText, setCommentText] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const fetchAlbumData = async () => {
        try {
            const tokenData = JSON.parse(localStorage.getItem("userInfo"));
            const token = tokenData?.token;
            if (!token) {
                console.error("No authentication token found.");
                return;
            }

            setCurrentUser(tokenData);

            console.log("Fetching album details from:", `/albums/${id}`);

            const albumRes = await api.get(`/albums/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const photosRes = await api.get(`/photos/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setAlbum(albumRes.data);
            setPhotos(photosRes.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching album:", error.response?.data || error.message);
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
            setCommentText("");
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
            fetchAlbumData();
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
            fetchAlbumData();
            setPhotoTitles({ ...photoTitles, [photoId]: "" });
        } catch (error) {
            alert("Error updating photo title.");
        }
    };

    // Render functions
    const renderPhotoActions = (photo) => (
        <div className="flex gap-2 mt-2">
            <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleLike(photo._id)}
                className="flex items-center gap-1"
            >
                <Heart className="w-4 h-4" /> 
                <span>Like</span>
            </Button>
            
            <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedImage(photo)}
                className="flex items-center gap-1"
            >
                <MessageSquare className="w-4 h-4" />
                <span>Comment</span>
            </Button>
        </div>
    );

    const renderOwnerActions = (photo) => (
        currentUser && album?.user && currentUser._id === album.user._id && (
            <div className="flex gap-2 mt-2">
                <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(photo._id)}
                    className="flex items-center gap-1"
                >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                </Button>
                
                <Dialog>
                    <DialogTrigger asChild>
                        <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-1"
                        >
                            <Pencil className="w-4 h-4" />
                            <span>Edit</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <CardTitle className="mb-4">Edit Photo Title</CardTitle>
                        <Input
                            value={photoTitles[photo._id] || ""}
                            onChange={(e) => setPhotoTitles({ ...photoTitles, [photo._id]: e.target.value })}
                            placeholder="New title"
                            className="mb-4"
                        />
                        <Button 
                            onClick={() => handleEditTitle(photo._id, photoTitles[photo._id] || photo.title)}
                            className="w-full"
                        >
                            Save Changes
                        </Button>
                    </DialogContent>
                </Dialog>
            </div>
        )
    );

    if (loading) {
        return (
            <div className="p-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Card key={i}>
                            <CardContent className="p-4">
                                <ImageSkeleton />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (!album) return (
        <div className="flex items-center justify-center h-[50vh]">
            <Card className="w-96">
                <CardContent className="p-6">
                    <div className="flex flex-col items-center gap-4">
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                        <p className="text-lg font-medium">Album not found</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>{album.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    {currentUser && album.user && currentUser._id === album.user._id && (
                        <UploadPhoto albumId={id} onPhotoUploaded={fetchAlbumData} />
                    )}
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((photo) => (
                    <Card key={photo._id} className="overflow-hidden">
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="cursor-pointer">
                                    <img 
                                        src={photo.imageUrl} 
                                        alt={photo.title} 
                                        className="w-full h-64 object-cover transition-transform hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                                <img 
                                    src={photo.imageUrl} 
                                    alt={photo.title} 
                                    className="w-full h-auto max-h-[80vh] object-contain"
                                />
                            </DialogContent>
                        </Dialog>
                        
                        <CardContent className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{photo.title}</h3>
                            {renderPhotoActions(photo)}
                            {renderOwnerActions(photo)}
                            
                            <div className="mt-4">
                                <Label htmlFor={`comment-${photo._id}`}>Add a comment</Label>
                                <Textarea
                                    id={`comment-${photo._id}`}
                                    placeholder="Write a comment..."
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    className="mt-1"
                                />
                                <Button 
                                    onClick={() => handleComment(photo._id)}
                                    className="mt-2"
                                    variant="secondary"
                                >
                                    Post Comment
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}