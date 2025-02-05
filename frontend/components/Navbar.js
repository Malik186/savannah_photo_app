import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo); // Get user info

  const handleLogout = () => {
    dispatch(logout()); // Clear Redux state
    router.push("/login");
  };

  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between items-center shadow-lg">
      <Link href="/" className="text-xl font-bold">
        Home
      </Link>
      <div className="flex items-center gap-4">
        {userInfo && <span className="text-gray-300">Welcome, {userInfo.name}</span>}
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </nav>
  );
}
