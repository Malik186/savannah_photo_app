import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import api from "../../utils/api";
import CreateAlbum from "../../components/CreateAlbum";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Image, Plus, UserCircle, AlertCircle } from "lucide-react";

export default function UserPage() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const tokenData = JSON.parse(localStorage.getItem("userInfo"));
      const token = tokenData?.token;
      if (!token) {
        console.error("No authentication token found.");
        return;
      }

      setCurrentUser(tokenData);

      const userRes = await api.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(userRes.data);

      const albumsRes = await api.get(`/albums/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAlbums(albumsRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error.response?.data || error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchUserData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-48 bg-gray-200 rounded"></div>
          <div className="h-64 w-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Alert variant="destructive" className="max-w-xl mx-auto mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>User not found</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center space-x-4">
          <UserCircle className="h-12 w-12 text-gray-400" />
          <h1 className="text-3xl font-bold tracking-tight">{user.name}'s Albums</h1>
        </div>
        
        {currentUser && currentUser._id === id && (
          <div className="mt-6">
            <CreateAlbum onAlbumCreated={fetchUserData} />
          </div>
        )}
      </div>

      {albums.length === 0 ? (
        <Card className="bg-gray-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <Image className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No albums</h3>
              <p className="mt-1 text-sm text-gray-500">
                {currentUser && currentUser._id === id
                  ? "You haven't created any albums yet. Start by creating your first album!"
                  : "This user hasn't created any albums yet."}
              </p>
              {currentUser && currentUser._id === id && (
                <div className="mt-6">
                  <Button onClick={() => document.getElementById('create-album-title').focus()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create album
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <Link key={album._id} href={`/album/${album._id}`}>
              <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">{album.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                    <Image className="h-8 w-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}