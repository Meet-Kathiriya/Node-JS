import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-lg">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome — you're logged in (demo).</p>
        <Link to="/register" className="text-blue-500 underline">Go to Register</Link>
      </div>
    </div>
  );
}
