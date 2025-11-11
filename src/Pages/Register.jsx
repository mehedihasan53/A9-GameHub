import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../Provider/AuthProvider";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaImage,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    photoURL: "",
  });
  const [show, setShow] = useState({ pw: false, cpw: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signup, googleSignIn } = useAuth();
  const nav = useNavigate();

  const change = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (data.password !== data.confirm)
      return setError("Passwords don’t match.");
    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(data.password))
      return setError("6+ chars, 1 uppercase & 1 lowercase required.");

    setLoading(true);
    try {
      const u = await signup(data.email, data.password);
      await updateProfile(u.user, {
        displayName: data.name,
        photoURL: data.photoURL,
      });
      nav("/auth/login");
    } catch {
      setError("Couldn’t create account. Try again.");
    }
    setLoading(false);
  };

  const google = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      nav("/");
    } catch {
      setError("Google sign-up failed.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white my-9">
          Create an account
        </h2>

        <form
          onSubmit={submit}
          className="bg-gray-900/60 border border-gray-800 p-6 rounded-xl space-y-4 shadow-lg backdrop-blur mb-20"
        >
          {error && (
            <div className="bg-red-900/40 border border-red-800 text-red-300 p-3 rounded">
              {error}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-gray-300 mb-2">Full Name</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={change}
                required
                placeholder="Enter your full name"
                className="w-full pl-10 pr-3 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={change}
                required
                placeholder="Enter your email"
                className="w-full pl-10 pr-3 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-gray-300 mb-2">
              Profile Photo URL
            </label>
            <div className="relative">
              <FaImage className="absolute left-3 top-3 text-gray-400" />
              <input
                type="url"
                name="photoURL"
                value={data.photoURL}
                onChange={change}
                placeholder="Enter photo URL"
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
                type={show.pw ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={change}
                required
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 outline-none"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400"
                onClick={() => setShow({ ...show, pw: !show.pw })}
              >
                {show.pw ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-300 mb-2">Confirm Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={show.cpw ? "text" : "password"}
                name="confirm"
                value={data.confirm}
                onChange={change}
                required
                placeholder="Confirm your password"
                className="w-full pl-10 pr-12 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 outline-none"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400"
                onClick={() => setShow({ ...show, cpw: !show.cpw })}
              >
                {show.cpw ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <div className="flex items-center text-gray-600 text-sm">
            <span className="flex-1 border-t border-gray-800"></span>
            <span className="px-2">or</span>
            <span className="flex-1 border-t border-gray-800"></span>
          </div>

          {/* Google Sign-up */}
          <button
            onClick={google}
            type="button"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 border border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300 py-3 rounded-lg transition disabled:opacity-50"
          >
            <FcGoogle /> Continue with Google
          </button>

          <p className="text-center text-gray-400 mb-6">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-pink-400 hover:text-pink-300"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
