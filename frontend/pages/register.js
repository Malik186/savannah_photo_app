import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import api from "../utils/api";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !username || !email || !password) {
      alert("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      await api.post("/users/register", { name, username, email, password });
      alert("Registration successful! Please log in.");
      router.push("/login"); //Redirects to login page
    } catch (error) {
      alert("Error registering user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-96 p-6 border rounded">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border w-full mb-2" />
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="p-2 border w-full mb-2" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border w-full mb-2" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border w-full mb-2" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link href="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
}
