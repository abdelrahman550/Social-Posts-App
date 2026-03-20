import React from "react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-7xl font-extrabold text-blue-600">404</h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Page Not Found
      </h2>

      <p className="mt-2 text-gray-500">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <a
        href="/"
        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow hover:bg-blue-700 transition"
      >
        Go Back Home
      </a>
    </div>
  );
}