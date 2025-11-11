import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../Provider/AuthProvider";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

function Login() {
  useDocumentTitle("Login-Page");

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const from = useLocation().state?.from?.pathname || "/";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch {
      setError("Login failed. Check your credentials.");
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await googleSignIn();
      navigate(from, { replace: true });
    } catch {
      setError("Google login failed.");
    }
    setLoading(false);
  };

  const handleForgotPassword = () => {
    navigate("/auth/forgot-password", {
      state: { email: form.email },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Sign in to your account
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/60 border border-gray-800 p-6 rounded-xl space-y-4 shadow-lg backdrop-blur"
        >
          {error && (
            <div className="bg-red-900/40 border border-red-800 text-red-300 p-3 rounded">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full pl-10 pr-3 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 outline-none"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-300">
              <input type="checkbox" className="w-4 h-4 accent-pink-500" />
              Remember me
            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-pink-400 hover:text-pink-300"
            >
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-medium text-white transition disabled:opacity-50 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="flex items-center text-gray-600 text-sm">
            <span className="flex-1 border-t border-gray-800"></span>
            <span className="px-2">or</span>
            <span className="flex-1 border-t border-gray-800"></span>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 border border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300 py-3 rounded-lg transition disabled:opacity-50"
          >
            <FcGoogle /> Continue with Google
          </button>

          <p className="text-center text-gray-400 mt-4">
            New here?{" "}
            <Link
              to="/auth/register"
              className="text-pink-400 hover:text-pink-300"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
