import { useState } from "react";
import { postData } from "../lib/api";
import { Link } from "react-router-dom";
import { AuthCard } from "./AuthCard";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = await postData<{ token: string; message: string }>(
        "/api/v1/auth/register",
        { email, password }
      );
      setToken(data.token);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <AuthCard>
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
        Create your account
      </h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="flex flex-col gap-3 min-h-[15svh]">
          <input
            type="email"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="w-full bg-purple-600 text-white p-3 rounded-md font-semibold hover:bg-purple-700 transition-colors"
          type="submit"
        >
          Register
        </button>
      </form>

      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      {token && (
        <div className="mt-4 text-sm break-words text-green-600 text-center">
          Token: <code>{token}</code>
        </div>
      )}

      <p className="mt-6 text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-purple-600 hover:underline">
          Login
        </Link>
      </p>
    </AuthCard>
  );
}
