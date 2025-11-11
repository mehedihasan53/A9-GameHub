import React, { useState, useEffect } from "react";
import { useAuth } from "../Provider/AuthProvider";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Login page থেকে email receive করা
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await resetPassword(email);
      setMessage("Password reset email sent! Check your inbox.");
      setResetSent(true);
    } catch (err) {
      console.error(err);
      setError("Failed to send reset email. Please check your email address.");
    }

    setLoading(false);
  };

  // Gmail-এ redirect করার function
  const redirectToGmail = () => {
    window.open("https://mail.google.com", "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => navigate("/auth/login")}
          className="flex items-center gap-2 text-pink-400 hover:text-pink-300 mb-6"
        >
          <FaArrowLeft /> Back to Login
        </button>

        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Reset Your Password
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Enter your email to receive a password reset link
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/60 border border-gray-800 p-6 rounded-xl space-y-4 shadow-lg backdrop-blur"
        >
          {error && (
            <div className="bg-red-900/40 border border-red-800 text-red-300 p-3 rounded">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-900/40 border border-green-800 text-green-300 p-3 rounded">
              {message}
            </div>
          )}

          {/* Email Input */}
          <div>
            <label className="block text-gray-300 mb-2">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
                className="w-full pl-10 pr-3 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 outline-none"
                disabled={resetSent} // Reset send হওয়ার পরে disable
              />
            </div>
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            disabled={loading || resetSent}
            className="w-full py-3 rounded-lg font-medium text-white transition disabled:opacity-50 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600"
          >
            {loading
              ? "Sending..."
              : resetSent
              ? "Email Sent!"
              : "Send Reset Link"}
          </button>

          {/* Gmail Button - শুধু reset send হওয়ার পরে show হবে */}
          {resetSent && (
            <button
              type="button"
              onClick={redirectToGmail}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              <FaExternalLinkAlt />
              Open Gmail
            </button>
          )}

          {/* Back to Login Link */}
          <p className="text-center text-gray-400 mt-4">
            Remember your password?{" "}
            <Link
              to="/auth/login"
              className="text-pink-400 hover:text-pink-300"
            >
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
