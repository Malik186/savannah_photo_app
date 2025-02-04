import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../utils/api";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
        if (!token) return;

        const { data } = await api.get("/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Users</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {users.map((user) => (
          <Link key={user._id} href={`/user/${user._id}`}>
            <div className="p-4 border rounded cursor-pointer hover:shadow-md">
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-500">{user.albumsCount} Albums</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
