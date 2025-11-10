import React from "react";
import { Link } from "react-router-dom";
import {
  FaGamepad,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaDiscord,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";

const Footer = () => {
  const social = [FaTwitter, FaFacebook, FaInstagram, FaDiscord];
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "All Games", path: "/games" },
    { name: "Developers", path: "/developers" },
    { name: "My Profile", path: "/my-profile" },
  ];
  const supportLinks = [
    "Help Center",
    "Contact Us",
    "Privacy Policy",
    "Terms of Service",
  ];

  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center space-x-2 mb-4">
            <FaGamepad className="text-3xl text-purple-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              GameHub
            </span>
          </Link>
          <p className="text-gray-300 mb-4 leading-relaxed">
            Discover the best indie games and support talented developers. Your
            ultimate gaming library for mobile adventures.
          </p>
          <div className="flex space-x-4">
            {social.map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                {<Icon className="text-xl" />}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.path}
                  className="text-gray-300 hover:text-purple-400 transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            {supportLinks.map((name, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="text-gray-300 hover:text-purple-400 transition"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Download App</h3>
          <p className="text-gray-300 mb-4">
            Get GameHub on your mobile device
          </p>
          <div className="space-y-3">
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition">
              <FaGooglePlay className="text-xl" /> <span>Google Play</span>
            </button>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition">
              <FaApple className="text-xl" /> <span>App Store</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
          &copy; 2025 GameHub. All rights reserved. Made with ❤️ for gamers.
        </p>
        <div className="flex space-x-6 text-sm justify-center md:justify-start">
          <a
            href="#"
            className="text-gray-400 hover:text-purple-400 transition"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-purple-400 transition"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-purple-400 transition"
          >
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
