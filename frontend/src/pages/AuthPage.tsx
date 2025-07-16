import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-300">
          <button
            type="button"
            className={`flex-1 py-2 text-center font-semibold ${
              activeTab === "login"
                ? "border-b-2 border-amber-600 text-amber-600"
                : "text-gray-600 hover:text-amber-600"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-center font-semibold ${
              activeTab === "register"
                ? "border-b-2 border-amber-600 text-amber-600"
                : "text-gray-600 hover:text-amber-600"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {/* Show form based on active tab */}
        {activeTab === "login" ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default AuthPage;
