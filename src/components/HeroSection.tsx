import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import FlowchartVisualization from "./FlowchartVisualization";

interface HeroSectionProps {
  onStartPlanning?: () => void;
  onSeeHowItWorks?: () => void;
}

const HeroSection = ({
  onStartPlanning = () => console.log("Start Planning clicked"),
  onSeeHowItWorks = () => console.log("See How It Works clicked"),
}: HeroSectionProps) => {
  // Sample flowchart data visualization placeholder
  const FlowchartPlaceholder = () => (
    <div className="w-full h-[400px] bg-white rounded-lg p-4">
      <div className="flex flex-col items-center h-full">
        <div className="text-lg font-medium text-gray-700 mb-4">
          Trip Itinerary Flowchart
        </div>
        <div className="relative w-full flex-1">
          {/* Tokyo Node */}
          <div className="absolute top-[20%] left-[10%] bg-blue-100 border border-blue-300 rounded-lg p-3 shadow-md">
            <div className="font-medium">Tokyo Skytree</div>
            <div className="text-sm text-gray-600">Evening</div>
          </div>

          {/* Kyoto Node */}
          <div className="absolute top-[40%] left-[40%] bg-green-100 border border-green-300 rounded-lg p-3 shadow-md">
            <div className="font-medium">Arashiyama Bamboo Grove</div>
            <div className="text-sm text-gray-600">Morning</div>
          </div>

          {/* Osaka Node */}
          <div className="absolute top-[60%] left-[70%] bg-amber-100 border border-amber-300 rounded-lg p-3 shadow-md">
            <div className="font-medium">Osaka Castle</div>
            <div className="text-sm text-gray-600">Afternoon</div>
          </div>

          {/* Connection lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: -1 }}
          >
            <line
              x1="18%"
              y1="25%"
              x2="38%"
              y2="45%"
              stroke="#CBD5E1"
              strokeWidth="2"
            />
            <line
              x1="48%"
              y1="45%"
              x2="68%"
              y2="65%"
              stroke="#CBD5E1"
              strokeWidth="2"
            />

            {/* Arrows */}
            <circle cx="28%" cy="35%" r="3" fill="#94A3B8" />
            <circle cx="58%" cy="55%" r="3" fill="#94A3B8" />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative w-full min-h-[800px] bg-gradient-to-b from-gogo-light2 to-gogo-light1 flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gogo-blue opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gogo-green opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Text content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gogo-dark leading-tight mb-6">
              Your Travel Ideas, <br />
              <span className="text-gogo-blue">Turned into a Visual Plan.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0">
              Gogo uses AI to create flexible trip itineraries in a flowchart
              format you can modify, drag, and shape to fit your perfect
              journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={onStartPlanning}
                className="text-base px-8 py-6 bg-gogo-blue hover:bg-gogo-blue/90"
              >
                Start Planning
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onSeeHowItWorks}
                className="text-base px-8 py-6 border-gogo-blue text-gogo-blue hover:bg-gogo-blue/10"
              >
                See How It Works
              </Button>
            </div>
          </motion.div>

          {/* Right side - Flowchart visualization */}
          <motion.div
            className="flex-1 w-full max-w-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-xl p-4 md:p-6 border border-gray-100">
              <FlowchartVisualization interactive={true} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative dots pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-20 opacity-10">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gogo-blue"></div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
