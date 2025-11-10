import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaPlay } from "react-icons/fa";
import ff from "../../assets/ff.png";
import pubg from "../../assets/pubg.png";
import coc from "../../assets/coc.png";

const slides = [
  {
    image: ff,
    title: "Free Fire",
    subtitle: "Survival Shooter",
    description: "10-minute battle royale matches.",
    buttonText: "Play Now",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    image: pubg,
    title: "PUBG Mobile",
    subtitle: "Battle Royale Masterpiece",
    description: "Realistic graphics and intense gameplay.",
    buttonText: "Download Now",
    gradient: "from-green-500 to-cyan-500",
  },
  {
    image: coc,
    title: "Clash of Clans",
    subtitle: "Build Your Empire",
    description: "Create your village and compete in epic Clan Wars!",
    buttonText: "Start Building",
    gradient: "from-orange-500 to-red-500",
  },
];

const variants = {
  enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const changeSlide = (newDirection) => {
    setDirection(newDirection);
    if (newDirection === 1) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-84 md:h-[350px] lg:h-[450px] overflow-hidden bg-gray-900">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          className="absolute inset-0 w-full h-full"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
        >
          {/* Image Layer */}
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-brightness-50"></div>

          {/* 3. Content Layer */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-2xl text-left">
                <motion.h1
                  className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-3 tracking-tight"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.h2
                  className={`text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r ${slides[currentSlide].gradient} mb-4 font-extrabold`}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {slides[currentSlide].subtitle}
                </motion.h2>

                <motion.p
                  className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center space-x-2 shadow-xl shadow-purple-900/50"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <FaPlay className="text-sm" />
                  <span>{slides[currentSlide].buttonText}</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => changeSlide(-1)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 z-20 focus:outline-none focus:ring-4 focus:ring-purple-400"
      >
        <FaArrowLeft className="text-xl" />
      </button>

      <button
        onClick={() => changeSlide(1)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 z-20 focus:outline-none focus:ring-4 focus:ring-purple-400"
      >
        <FaArrowRight className="text-xl" />
      </button>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-purple-500 w-8"
                : "bg-gray-400 hover:bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
