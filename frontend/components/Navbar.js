import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); //Clear Redux state
    router.push("/login");
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-xl">My App</h1>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
    </nav>
  );
}
