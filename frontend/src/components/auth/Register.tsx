import { useState } from "react";
import { postData } from "../../lib/api";
import { Link } from "react-router-dom";
import { AuthCard } from "./AuthCard";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = await postData<{ token: string; message: string }>(
        "/api/v1/auth/register",
        { email, password }
      );

      // Save token to localStorage
      localStorage.setItem("token", data.token);

      // TODO: Redirect or update state (e.g. navigate to dashboard)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
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
        <div className="flex flex-col gap-3">
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

        {/* Error message space */}
        <div className="min-h-[1.5rem] text-center">
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>

        <button
          className="w-full bg-purple-600 text-white p-3 rounded-md font-semibold hover:bg-purple-700 transition-colors"
          type="submit"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-purple-600 hover:underline">
          Login
        </Link>
      </p>
    </AuthCard>
  );
}
