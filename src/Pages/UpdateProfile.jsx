import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import {
  FaCheck,
  FaUser,
  FaImage,
  FaCamera,
  FaEnvelope,
  FaShieldAlt,
  FaSync,
  FaStar,
  FaTrashAlt,
  FaUpload,
  FaArrowLeft,
  FaSave,
} from "react-icons/fa";

const UpdateProfile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Initialize form data from user or localStorage
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("profileDraft");
    if (savedData) {
      return JSON.parse(savedData);
    }
    // Set initial state from user or localStorage, preferring user data for Firebase fields
    return {
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
      bio: localStorage.getItem("userBio") || "",
      phoneNumber: localStorage.getItem("userPhone") || "",
      location: localStorage.getItem("userLocation") || "",
      gamingStyle: localStorage.getItem("gamingStyle") || "Casual",
      favoriteGenre: localStorage.getItem("favoriteGenre") || "Action",
    };
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [previewImage, setPreviewImage] = useState(
    formData.photoURL || user?.photoURL || ""
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDirty, setIsDirty] = useState(false);

  // --- Utility Data ---
  const gamingStyles = [
    "Casual",
    "Competitive",
    "Hardcore",
    "Social",
    "Explorer",
  ];
  const gameGenres = [
    "Action",
    "Adventure",
    "RPG",
    "Strategy",
    "Sports",
    "Racing",
    "Puzzle",
  ];

  // --- Effects ---

  // Save draft to localStorage when form changes
  useEffect(() => {
    if (isDirty) {
      localStorage.setItem("profileDraft", JSON.stringify(formData));
    }
  }, [formData, isDirty]);

  // --- Handlers ---

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsDirty(true);

    if (name === "photoURL") {
      setPreviewImage(value);
    }
  };

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsDirty(true);
    // Removed redundant localStorage.setItem here; it will be saved on form submission or draft save.
  };

  // Handle file upload: ***FIXED AND RESTRUCTURED***
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage({
        type: "error",
        text: "Image size should be less than 5MB.",
      });
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage({
        type: "error",
        text: "Please upload an image file.",
      });
      return;
    }

    // Start simulation of upload progress
    setUploadProgress(0);
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => (prev >= 90 ? 90 : prev + 10)); // Max progress before actual read completes
    }, 100);

    const reader = new FileReader();
    reader.onload = () => {
      clearInterval(progressInterval); // Stop the simulation
      setUploadProgress(100); // Set to 100% on completion
      const base64String = reader.result;

      // Update state with Base64 string for preview and form data
      setPreviewImage(base64String);
      setFormData((prev) => ({ ...prev, photoURL: base64String }));
      setMessage({
        type: "success",
        text: "Image preview updated. Don't forget to save!",
      });
      setIsDirty(true);

      // Clear progress bar after a delay
      setTimeout(() => setUploadProgress(0), 1000);
    };

    reader.onerror = (error) => {
      clearInterval(progressInterval);
      setUploadProgress(0);
      setMessage({
        type: "error",
        text: "Failed to read file.",
      });
      console.error("File Read Error:", error);
    };

    reader.readAsDataURL(file);

    // Clear the file input value so the same file can be selected again
    e.target.value = "";
  };

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Remove profile image
  const removeProfileImage = () => {
    setPreviewImage("");
    setFormData((prev) => ({ ...prev, photoURL: "" }));
    setMessage({ type: "info", text: "Image removed" });
    setIsDirty(true);
  };

  // Save as draft
  const saveDraft = useCallback(() => {
    localStorage.setItem("profileDraft", JSON.stringify(formData));
    localStorage.setItem("userBio", formData.bio);
    localStorage.setItem("userPhone", formData.phoneNumber);
    localStorage.setItem("userLocation", formData.location);
    localStorage.setItem("gamingStyle", formData.gamingStyle);
    localStorage.setItem("favoriteGenre", formData.favoriteGenre);

    setMessage({
      type: "info",
      text: "Draft saved successfully!",
    });
    setIsDirty(false);
  }, [formData]);

  // Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // 1. Update Firebase profile (displayName, photoURL)
      await updateUser({
        displayName: formData.displayName,
        // The photoURL will be the new Base64 string if a file was uploaded,
        // which most Firebase SDKs will accept for profile updates.
        photoURL: formData.photoURL,
      });

      // 2. Save additional data to localStorage
      localStorage.setItem("userBio", formData.bio);
      localStorage.setItem("userPhone", formData.phoneNumber);
      localStorage.setItem("userLocation", formData.location);
      localStorage.setItem("gamingStyle", formData.gamingStyle);
      localStorage.setItem("favoriteGenre", formData.favoriteGenre);

      // 3. Clear draft
      localStorage.removeItem("profileDraft");

      setMessage({
        type: "success",
        text: "Profile updated successfully! Redirecting...",
      });
      setIsDirty(false); // Mark clean after successful save

      // Redirect after delay
      setTimeout(() => {
        navigate("/user-info/my-profile");
      }, 1500);
    } catch (err) {
      setMessage({
        type: "error",
        text: "Failed to update profile. Please ensure your display name is valid and try again.",
      });
      console.error("Update error:", err);
      setLoading(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
      bio: localStorage.getItem("userBio") || "",
      phoneNumber: localStorage.getItem("userPhone") || "",
      location: localStorage.getItem("userLocation") || "",
      gamingStyle: localStorage.getItem("gamingStyle") || "Casual",
      favoriteGenre: localStorage.getItem("favoriteGenre") || "Action",
    });
    setPreviewImage(user?.photoURL || "");
    localStorage.removeItem("profileDraft");
    setMessage({ type: "info", text: "Form reset to original values" });
    setIsDirty(false);
  };

  // Check if form is valid
  const isFormValid = formData.displayName.trim().length >= 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-gray-800/50 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/user-info/my-profile")}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                title="Go Back"
              >
                <FaArrowLeft className="text-white" />
              </button>
              <div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                  <FaUser className="text-pink-400" />
                  Update Profile
                </h2>
                <p className="text-gray-300 mt-1">
                  Customize your gaming identity
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <FaShieldAlt className="text-green-400" />
              <span>Secure & Encrypted</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 p-6">
          {/* Left Column - Profile Preview (Live View) */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-gray-800/70 rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FaCamera />
                Profile Preview
              </h3>

              <div className="flex flex-col items-center">
                {/* Profile Image (Live Preview: previewImage state) */}
                <div className="relative group mb-4">
                  <div className="w-40 h-40 rounded-full border-4 border-pink-500/30 overflow-hidden shadow-lg">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                        <FaUser className="text-5xl text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Upload Progress */}
                  {uploadProgress > 0 && uploadProgress <= 100 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                      <div className="text-white text-sm">
                        {uploadProgress}%
                      </div>
                    </div>
                  )}

                  {/* Image Upload Buttons */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110"
                      title="Upload Image"
                      disabled={loading}
                    >
                      <FaUpload size={14} />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={loading}
                    />
                    {previewImage && (
                      <button
                        type="button"
                        onClick={removeProfileImage}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110"
                        title="Remove Image"
                        disabled={loading}
                      >
                        <FaTrashAlt size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* User Info Preview (Live Preview: formData state) */}
                <div className="text-center w-full">
                  <h4 className="text-xl font-bold text-white mb-1 truncate">
                    {/* Live update of Display Name */}
                    {formData.displayName || "Your Name"}
                  </h4>
                  <p className="text-gray-300 text-sm mb-3 flex items-center justify-center gap-1 truncate">
                    <FaEnvelope className="text-gray-400 flex-shrink-0" />
                    {user?.email || "user@example.com"}
                  </p>

                  {/* Live update of Bio */}
                  {formData.bio && (
                    <p className="text-gray-400 text-sm italic mb-3 px-2 line-clamp-2">
                      "{formData.bio}"
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400">
                    {/* Live update of Gaming Style */}
                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-700/50 rounded-full">
                      <FaStar className="text-yellow-400" />
                      <span>{formData.gamingStyle}</span>
                    </div>
                    {/* Live update of Location */}
                    {formData.location && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-gray-700/50 rounded-full">
                        <span>📍</span>
                        <span>{formData.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Upload Info */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="text-pink-400 hover:text-pink-300 text-sm transition-colors"
                  disabled={loading}
                >
                  Click to upload or paste URL
                </button>
                <p className="text-gray-500 text-xs mt-1">
                  Supports JPG, PNG up to 5MB
                </p>
              </div>
            </div>

            {/* Gaming Preferences (Live Preview: formData state) */}
            <div className="bg-gray-800/70 rounded-2xl p-5 border border-gray-700/50">
              <h4 className="text-lg font-semibold text-white mb-3">
                Gaming Preferences
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Gaming Style
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {gamingStyles.map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => handleSelectChange("gamingStyle", style)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          formData.gamingStyle === style
                            ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white"
                            : "bg-gray-700/50 text-gray-400 hover:text-white"
                        }`}
                        disabled={loading}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Favorite Genre
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {gameGenres.map((genre) => (
                      <button
                        key={genre}
                        type="button"
                        onClick={() =>
                          handleSelectChange("favoriteGenre", genre)
                        }
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          formData.favoriteGenre === genre
                            ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                            : "bg-gray-700/50 text-gray-400 hover:text-white"
                        }`}
                        disabled={loading}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="md:col-span-2">
            {/* Messages */}
            {message.text && (
              <div
                className={`mb-6 p-4 rounded-xl border ${
                  message.type === "success"
                    ? "bg-green-900/30 border-green-500 text-green-300"
                    : message.type === "error"
                    ? "bg-red-900/30 border-red-500 text-red-300"
                    : "bg-blue-900/30 border-blue-500 text-blue-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  {message.type === "success" && (
                    <FaCheck className="text-green-400" />
                  )}
                  {message.type === "error" && (
                    <FaTrashAlt className="text-red-400" />
                  )}
                  {message.type === "info" && (
                    <FaSave className="text-blue-400" />
                  )}
                  <span>{message.text}</span>
                </div>
              </div>
            )}

            {/* Update Form */}
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Display Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Display Name *
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all disabled:opacity-50"
                      placeholder="Enter your gaming name"
                      required
                      minLength="2"
                      maxLength="30"
                      disabled={loading}
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    {formData.displayName.length}/30 characters
                  </div>
                </div>

                {/* Photo URL */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Photo URL
                  </label>
                  <div className="relative">
                    <FaImage className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="url"
                      name="photoURL"
                      value={formData.photoURL}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all disabled:opacity-50"
                      placeholder="Or paste image URL"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all h-32 resize-none disabled:opacity-50"
                    placeholder="Tell us about your gaming journey, favorite games, achievements..."
                    disabled={loading}
                    maxLength={200}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Share your gaming story</span>
                    <span>{formData.bio.length}/200 characters</span>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all disabled:opacity-50"
                    placeholder="+1 (123) 456-7890"
                    pattern="^\+?[\d\s\-\(\)]+$"
                    disabled={loading}
                  />
                  <div className="text-xs text-gray-500">
                    Optional - For account recovery
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all disabled:opacity-50"
                    placeholder="City, Country"
                    disabled={loading}
                  />
                  <div className="text-xs text-gray-500">
                    Connect with local gamers
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-700/50">
                <button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="flex-1 min-w-[200px] py-3 px-6 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-pink-500/25"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <FaCheck />
                      Update Profile
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={saveDraft}
                  disabled={loading || !isDirty}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <FaSave />
                  Save Draft
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={loading}
                  className="px-6 py-3 bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300"
                >
                  <FaSync />
                  Reset
                </button>
              </div>
            </form>

            {/* Current User Info */}
            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                Account Information
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-gray-500">Email</p>
                  <p
                    className="text-white font-medium truncate"
                    title={user?.email}
                  >
                    {user?.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">Joined</p>
                  <p className="text-white font-medium">
                    {user?.metadata?.creationTime
                      ? new Date(
                          user.metadata.creationTime
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">Last Login</p>
                  <p className="text-white font-medium">
                    {user?.metadata?.lastSignInTime
                      ? new Date(
                          user.metadata.lastSignInTime
                        ).toLocaleDateString()
                      : "Just now"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">Verified</p>
                  <p
                    className={`font-medium ${
                      user?.emailVerified ? "text-green-400" : "text-yellow-400"
                    }`}
                  >
                    {user?.emailVerified ? "Verified ✓" : "Pending"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
