import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <div className="pt-12 pb-12 bg-gray-900">
      <div className="max-w-md mx-auto text-center px-4">
        <h3 className="text-4xl font-bold mb-4 text-white">
          Join Our Newsletter
        </h3>
        <p className="text-gray-400 mb-6">
          Subscribe to get notified about new game releases
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex shadow-lg rounded-lg overflow-hidden"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 text-gray-400 placeholder-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 font-medium transition-all duration-200"
          >
            Subscribe
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Newsletter;
