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

  const handleSeeHowItWorks = () => {
    // Scroll to the how it works section
    const howItWorksSection = document.getElementById("how-it-works");
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gogo-light1">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection
          onStartPlanning={handleStartPlanning}
          onSeeHowItWorks={handleSeeHowItWorks}
        />

        {/* How It Works Section (moved from ProcessSection) */}
        <section id="how-it-works" className="w-full py-24 bg-gogo-light2">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gogo-dark">
                How Gogo Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Transform your travel ideas into visual itineraries in just
                three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Step 1 */}
              <motion.div
                className="flex flex-col items-center bg-white p-8 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gogo-blue/20 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-gogo-blue">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gogo-dark">
                  Tell us your trip idea
                </h3>
                <div className="bg-gogo-light2 rounded-lg p-4 w-full mb-6">
                  <p className="text-gray-700 italic text-sm">
                    "I want to go to Japan for 6 days. Prefer nature. Must visit
                    Kyoto and Osaka. Avoid crowds."
                  </p>
                </div>
                <p className="text-gray-600 text-center">
                  Type freely in your own words. Add preferences like travel
                  style or budget with simple button selections.
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                className="flex flex-col items-center bg-white p-8 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gogo-blue/20 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-gogo-blue">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gogo-dark">
                  Gogo generates your trip
                </h3>
                <div className="bg-gogo-blue/5 rounded-lg p-4 w-full mb-6 flex items-center justify-center">
                  <div className="w-full h-32 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-gogo-blue border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <div className="grid grid-cols-3 gap-2 w-full">
                        {Array(9)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className="h-4 bg-gogo-blue/30 rounded"
                            ></div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-center">
                  Our AI combines your input with real-time travel data to
                  create a smart, structured itinerary.
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                className="flex flex-col items-center bg-white p-8 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gogo-green/20 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-gogo-green">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gogo-dark">
                  Your flowchart is born
                </h3>
                <div className="bg-gogo-light2 rounded-lg p-4 w-full mb-6">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                      <div className="w-24 h-10 bg-gogo-blue/20 rounded-md flex items-center justify-center text-xs text-gogo-blue font-medium">
                        Day 1: Kyoto
                      </div>
                      <svg
                        className="mx-2 text-gray-400"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="w-32 h-10 bg-gogo-green/20 rounded-md flex items-center justify-center text-xs text-gogo-green font-medium">
                        Arashiyama Bamboo
                      </div>
                    </div>
                    <div className="flex items-center pl-8">
                      <svg
                        className="rotate-90 text-gray-400"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center pl-8">
                      <div className="w-32 h-10 bg-amber-100 rounded-md flex items-center justify-center text-xs text-amber-700 font-medium">
                        Fushimi Inari
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-center">
                  Get a visual flowchart of your trip. Edit, drag to reorder, or
                  regenerate parts using natural language.
                </p>
              </motion.div>
            </div>

            <div className="mt-16 text-center">
              <button
                className="bg-gogo-blue hover:bg-gogo-blue/90 text-white font-medium py-3 px-8 rounded-full transition-colors"
                onClick={handleStartPlanning}
              >
                Start Planning Your Trip
              </button>
            </div>
          </div>
        </section>

        <FeaturesSection />

        <footer className="bg-gogo-dark py-12 px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to flow your next adventure?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <button
                className="bg-gogo-blue hover:bg-gogo-blue/90 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                onClick={handleStartPlanning}
              >
                Plan a Trip Now
              </button>
              <button className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-lg transition-colors">
                Preview a Sample Trip
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-8">
              © {new Date().getFullYear()} Gogo. All rights reserved.
            </p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};

export default Home;
