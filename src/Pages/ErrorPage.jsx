// src/Pages/ErrorPage.jsx
import React from "react";
import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Oops!</h1>
      <p className="mb-2">Something went wrong.</p>
      {error?.status && <p>Status: {error.status}</p>}
      {error?.statusText && <p>{error.statusText}</p>}
      {error?.data && (
        <pre className="mt-2 text-sm">{JSON.stringify(error.data)}</pre>
      )}
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded text-white"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
