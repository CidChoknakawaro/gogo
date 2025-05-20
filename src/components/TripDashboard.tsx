import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Calendar,
  Map,
  Clock,
  Settings,
  ChevronRight,
} from "lucide-react";
import FlowchartVisualization, { Node as ItineraryNode } from "./FlowchartVisualization";

interface Trip {
  id: string;
  title: string;
  destination: string;
  dates: string;
  image: string;
  progress: number;
  itinerary: ItineraryNode[];
}

const sampleTrips: Trip[] = [
  {
    id: "trip1",
    title: "Japan Adventure",
    destination: "Tokyo, Kyoto, Osaka",
    dates: "Oct 15 – Oct 22, 2025",
    image:
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=400&q=80",
    progress: 100,
    itinerary: [
      { id: "1", label: "Tokyo Arrival",            type: "destination", time: "Day 1 · Morning",   imageSrc: "tokyo-arrival.jpg",        position: { x: 100, y:  50 } },
      { id: "2", label: "Sensoji Temple",           type: "activity",    time: "Day 1 · Afternoon", imageSrc: "sensoji.jpg",               position: { x: 300, y:  50 } },
      { id: "3", label: "Tokyo Skytree",            type: "activity",    time: "Day 1 · Evening",   imageSrc: "skytree.jpg",              position: { x: 500, y:  50 } },
      { id: "4", label: "Train to Kyoto",           type: "transport",   time: "Day 2 · Morning",   imageSrc: "train-kyoto.jpg",          position: { x: 100, y: 150 } },
      { id: "5", label: "Fushimi Inari Shrine",     type: "activity",    time: "Day 2 · Afternoon", imageSrc: "fushimi-inari.jpg",         position: { x: 300, y: 150 } },
      { id: "6", label: "Arashiyama Bamboo Grove",  type: "activity",    time: "Day 2 · Evening",   imageSrc: "arashiyama.jpg",            position: { x: 500, y: 150 } },
      { id: "7", label: "Osaka Day Trip",           type: "destination", time: "Day 3 · Full Day",  imageSrc: "osaka.jpg",                position: { x: 300, y: 250 } },
    ],
  },
  {
    id: "trip2",
    title: "Italian Getaway",
    destination: "Rome, Florence, Venice",
    dates: "May 5 – May 15, 2025",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80",
    progress: 75,
    itinerary: [
      { id: "1", label: "Colosseum Visit",         type: "destination", time: "Day 1 · Morning",   imageSrc: "/images/colosseum.jpg",            position: { x: 100, y:  50 } },
      { id: "2", label: "Vatican Museums",         type: "activity",    time: "Day 1 · Afternoon", imageSrc: "/images/vatican-museums.jpg",      position: { x: 300, y:  50 } },
      { id: "3", label: "Piazza Navona",           type: "activity",    time: "Day 1 · Evening",   imageSrc: "/images/piazza-navona.jpg",         position: { x: 500, y:  50 } },
      { id: "4", label: "Train to Florence",       type: "transport",   time: "Day 2 · Morning",   imageSrc: "/images/train-florence.jpg",       position: { x: 100, y: 150 } },
      { id: "5", label: "Uffizi Gallery",          type: "activity",    time: "Day 2 · Afternoon", imageSrc: "/images/uffizi.jpg",                position: { x: 300, y: 150 } },
      { id: "6", label: "Ponte Vecchio",           type: "activity",    time: "Day 2 · Evening",   imageSrc: "/images/ponte-vecchio.jpg",         position: { x: 500, y: 150 } },
      { id: "7", label: "Venice Day Trip",         type: "destination", time: "Day 3 · Full Day",  imageSrc: "/images/venice.jpg",               position: { x: 300, y: 250 } },
    ],
  },
  {
    id: "trip3",
    title: "New York Weekend",
    destination: "Manhattan & Brooklyn",
    dates: "Dec 10 – Dec 12, 2025",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80",
    progress: 90,
    itinerary: [
      { id: "1", label: "NYC Arrival",            type: "destination", time: "Day 1 · Morning",   imageSrc: "/images/nyc-arrival.jpg",           position: { x: 100, y:  50 } },
      { id: "2", label: "Central Park Stroll",    type: "activity",    time: "Day 1 · Afternoon", imageSrc: "/images/central-park.jpg",          position: { x: 300, y:  50 } },
      { id: "3", label: "Times Square",           type: "activity",    time: "Day 1 · Evening",   imageSrc: "/images/times-square.jpg",          position: { x: 500, y:  50 } },
      { id: "4", label: "Subway to Brooklyn",     type: "transport",   time: "Day 2 · Morning",   imageSrc: "/images/subway.jpg",                position: { x: 100, y: 150 } },
      { id: "5", label: "Brooklyn Bridge Park",   type: "activity",    time: "Day 2 · Afternoon", imageSrc: "/images/brooklyn-bridge-park.jpg",  position: { x: 300, y: 150 } },
      { id: "6", label: "Broadway Show",          type: "activity",    time: "Day 2 · Evening",   imageSrc: "/images/broadway-show.jpg",         position: { x: 500, y: 150 } },
      { id: "7", label: "Statue of Liberty Trip", type: "destination", time: "Day 3 · Full Day",  imageSrc: "/images/statue-of-liberty.jpg",    position: { x: 300, y: 250 } },
    ],
  },
];

const TripDashboard: React.FC = () => {
  const [selectedTrip, setSelectedTrip] = React.useState<Trip>(sampleTrips[0]);

  const handleNodeClick = (node: ItineraryNode) => {
    // TODO: show your “big-card” editor/modal here
    console.log("Edit node:", node);
  };

  return (
    <div className="min-h-screen bg-gogo-light1">
      <div className="container mx-auto px-4 py-8">
        {/* — HEADER — */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gogo-dark">My Trips</h1>
          <Button className="bg-gogo-blue hover:bg-gogo-blue/90">
            <Plus className="mr-2 h-4 w-4" /> Plan New Trip
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* — SIDEBAR — */}
          <div className="lg:col-span-1 space-y-6">
            {/* My Trips List */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gogo-dark">
                  My Trips
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gogo-blue hover:text-gogo-blue/90"
                >
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {sampleTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedTrip.id === trip.id
                        ? "bg-gogo-blue/10 border-l-4 border-gogo-blue"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedTrip(trip)}
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                        <img
                          src={trip.image}
                          alt={trip.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gogo-dark">
                          {trip.title}
                        </h3>
                        <p className="text-sm text-gray-500">{trip.dates}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-dashed border-gray-300 text-gray-500"
              >
                <Plus className="mr-2 h-4 w-4" /> Add New Trip
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gogo-dark mb-4">
                Quick Actions
              </h2>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:text-gogo-blue hover:bg-gogo-blue/5"
                >
                  <Calendar className="mr-2 h-5 w-5" /> Calendar View
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:text-gogo-blue hover:bg-gogo-blue/5"
                >
                  <Map className="mr-2 h-5 w-5" /> Map View
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:text-gogo-blue hover:bg-gogo-blue/5"
                >
                  <Clock className="mr-2 h-5 w-5" /> Recent Trips
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:text-gogo-blue hover:bg-gogo-blue/5"
                >
                  <Settings className="mr-2 h-5 w-5" /> Settings
                </Button>
              </div>
            </div>
          </div>

          {/* — MAIN CONTENT — */}
          <div className="lg:col-span-3">
            {/* Trip Banner */}
            {selectedTrip && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
              >
                <div className="h-48 relative">
                  <img
                    src={selectedTrip.image}
                    alt={selectedTrip.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h1 className="text-3xl font-bold">
                        {selectedTrip.title}
                      </h1>
                      <p className="text-lg opacity-90">
                        {selectedTrip.destination}
                      </p>
                      <p className="text-sm opacity-80">
                        {selectedTrip.dates}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              <Button className="bg-gogo-blue hover:bg-gogo-blue/90">
                Edit Trip
              </Button>
              <Button
                variant="outline"
                className="border-gogo-blue text-gogo-blue hover:bg-gogo-blue/10"
              >
                Share Trip
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Export
              </Button>
            </div>

            {/* Trip Itinerary */}
            <h2 className="text-xl font-semibold text-gogo-dark mb-4">
              Trip Itinerary
            </h2>
            <FlowchartVisualization
              nodes={selectedTrip.itinerary}
              interactive
              onNodeClick={handleNodeClick}
              className="mb-6"
            />

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Duration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-gogo-dark">
                    {/* You could compute this from dates */}
                    {Math.ceil(
                      (new Date(selectedTrip.dates.split(" - ")[1]).getTime() -
                        new Date(selectedTrip.dates.split(" - ")[0]).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    Days
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-gogo-dark">
                    {selectedTrip.itinerary.filter((n) => n.type !== "transport").length}{" "}
                    Places
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                      <div
                        className="bg-gogo-green h-2.5 rounded-full"
                        style={{ width: `${selectedTrip.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {selectedTrip.progress}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDashboard;
