import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ProcessSection = () => {
  return (
    <section className="w-full py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            How Gogo Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Transform your travel ideas into visual itineraries in just three
            simple steps
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
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-slate-900">
              Tell us your trip idea
            </h3>
            <div className="bg-slate-100 rounded-lg p-4 w-full mb-6">
              <p className="text-slate-700 italic text-sm">
                "I want to go to Japan for 6 days. Prefer nature. Must visit
                Kyoto and Osaka. Avoid crowds."
              </p>
            </div>
            <p className="text-slate-600 text-center">
              Type freely in your own words. Add preferences like travel style
              or budget with simple button selections.
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
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl font-bold text-purple-600">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-slate-900">
              Gogo generates your trip
            </h3>
            <div className="bg-purple-50 rounded-lg p-4 w-full mb-6 flex items-center justify-center">
              <div className="w-full h-32 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="grid grid-cols-3 gap-2 w-full">
                    {Array(9)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="h-4 bg-purple-200 rounded"
                        ></div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-slate-600 text-center">
              Our AI combines your input with real-time travel data to create a
              smart, structured itinerary.
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
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl font-bold text-green-600">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-slate-900">
              Your flowchart is born
            </h3>
            <div className="bg-slate-100 rounded-lg p-4 w-full mb-6">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <div className="w-24 h-10 bg-blue-100 rounded-md flex items-center justify-center text-xs text-blue-700 font-medium">
                    Day 1: Kyoto
                  </div>
                  <ArrowRight className="mx-2 text-slate-400" size={16} />
                  <div className="w-32 h-10 bg-green-100 rounded-md flex items-center justify-center text-xs text-green-700 font-medium">
                    Arashiyama Bamboo
                  </div>
                </div>
                <div className="flex items-center pl-8">
                  <ArrowRight className="rotate-90 text-slate-400" size={16} />
                </div>
                <div className="flex items-center pl-8">
                  <div className="w-32 h-10 bg-amber-100 rounded-md flex items-center justify-center text-xs text-amber-700 font-medium">
                    Fushimi Inari
                  </div>
                </div>
              </div>
            </div>
            <p className="text-slate-600 text-center">
              Get a visual flowchart of your trip. Edit, drag to reorder, or
              regenerate parts using natural language.
            </p>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors">
            Start Planning Your Trip
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
