import { useState } from "react";
import api from "../utils/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CreateAlbum({ onAlbumCreated }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Album title cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      if (!token) return;

      await api.post("/albums", { title }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTitle("");
      onAlbumCreated();
    } catch (error) {
      setError("Failed to create album. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gray-50">
      <CardHeader>
        <CardTitle className="text-xl">Create New Album</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateAlbum} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="create-album-title">Album Title</Label>
            <Input
              id="create-album-title"
              type="text"
              placeholder="Enter album title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white"
            />
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            <Plus className="h-4 w-4 mr-2" />
            {loading ? "Creating..." : "Create Album"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}