import { useState } from "react";
import api from "../utils/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Loader2 } from "lucide-react";

export default function UploadPhoto({ albumId, onPhotoUploaded }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload a Photo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <Label htmlFor="photo-title">Photo Title</Label>
            <Input
              id="photo-title"
              type="text"
              placeholder="Enter a title for your photo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="photo-upload">Choose Photo</Label>
            <div className="mt-1">
              <Input
                id="photo-upload"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="cursor-pointer"
              />
            </div>
          </div>

          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}