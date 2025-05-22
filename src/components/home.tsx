import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";

const Home = () => {
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gogo-light1 flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-20"
      >
        <HeroSection onStartPlanning={handleStartPlanning} />

        <FeaturesSection />

        <footer className="bg-gogo-dark py-16 px-4 sm:px-6 lg:px-8 text-white mt-10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              พร้อมจะเริ่มวางแผนทริปของคุณหรือยัง
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <button
                className="bg-gogo-blue hover:bg-gogo-blue/90 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                onClick={handleStartPlanning}
              >
                แพลนตอนนี้เลย!
              </button>
              <button className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-lg transition-colors">
                ดูตัวอย่างทริป
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-6">
              © {new Date().getFullYear()} Gogo. All rights reserved.
            </p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};

export default Home;
