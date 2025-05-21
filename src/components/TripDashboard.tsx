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
    image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=400&q=80",
    progress: 100,
    itinerary: [
      { id: "1", label: "Tokyo Arrival", type: "destination", time: "Day 1 · Morning", imageSrc: "tokyo-arrival.jpg", position: { x: 100, y: 50 } },
      { id: "2", label: "Sensoji Temple", type: "activity", time: "Day 1 · Afternoon", imageSrc: "sensoji.jpg", position: { x: 300, y: 50 } },
      { id: "3", label: "Tokyo Skytree", type: "activity", time: "Day 1 · Evening", imageSrc: "skytree.jpg", position: { x: 500, y: 50 } },
      { id: "4", label: "Train to Kyoto", type: "transport", time: "Day 2 · Morning", imageSrc: "train-kyoto.jpg", position: { x: 100, y: 150 } },
      { id: "5", label: "Fushimi Inari Shrine", type: "activity", time: "Day 2 · Afternoon", imageSrc: "fushimi-inari.jpg", position: { x: 300, y: 150 } },
      { id: "6", label: "Arashiyama Bamboo Grove", type: "activity", time: "Day 2 · Evening", imageSrc: "arashiyama.jpg", position: { x: 500, y: 150 } },
      { id: "7", label: "Osaka Day Trip", type: "destination", time: "Day 3 · Full Day", imageSrc: "osaka.jpg", position: { x: 300, y: 250 } },
    ],
  },
  {
    id: "trip2",
    title: "Italian Getaway",
    destination: "Rome, Florence, Venice",
    dates: "May 5 – May 15, 2025",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80",
    progress: 75,
    itinerary: [
      { id: "1", label: "Colosseum Visit", type: "destination", time: "Day 1 · Morning", imageSrc: "/images/colosseum.jpg", position: { x: 100, y: 50 } },
      { id: "2", label: "Vatican Museums", type: "activity", time: "Day 1 · Afternoon", imageSrc: "/images/vatican-museums.jpg", position: { x: 300, y: 50 } },
      { id: "3", label: "Piazza Navona", type: "activity", time: "Day 1 · Evening", imageSrc: "/images/piazza-navona.jpg", position: { x: 500, y: 50 } },
      { id: "4", label: "Train to Florence", type: "transport", time: "Day 2 · Morning", imageSrc: "/images/train-florence.jpg", position: { x: 100, y: 150 } },
      { id: "5", label: "Uffizi Gallery", type: "activity", time: "Day 2 · Afternoon", imageSrc: "/images/uffizi.jpg", position: { x: 300, y: 150 } },
      { id: "6", label: "Ponte Vecchio", type: "activity", time: "Day 2 · Evening", imageSrc: "/images/ponte-vecchio.jpg", position: { x: 500, y: 150 } },
      { id: "7", label: "Venice Day Trip", type: "destination", time: "Day 3 · Full Day", imageSrc: "/images/venice.jpg", position: { x: 300, y: 250 } },
    ],
  },
  {
    id: "trip3",
    title: "New York Weekend",
    destination: "Manhattan & Brooklyn",
    dates: "Dec 10 – Dec 12, 2025",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80",
    progress: 90,
    itinerary: [
      { id: "1", label: "NYC Arrival", type: "destination", time: "Day 1 · Morning", imageSrc: "/images/nyc-arrival.jpg", position: { x: 100, y: 50 } },
      { id: "2", label: "Central Park Stroll", type: "activity", time: "Day 1 · Afternoon", imageSrc: "/images/central-park.jpg", position: { x: 300, y: 50 } },
      { id: "3", label: "Times Square", type: "activity", time: "Day 1 · Evening", imageSrc: "/images/times-square.jpg", position: { x: 500, y: 50 } },
      { id: "4", label: "Subway to Brooklyn", type: "transport", time: "Day 2 · Morning", imageSrc: "/images/subway.jpg", position: { x: 100, y: 150 } },
      { id: "5", label: "Brooklyn Bridge Park", type: "activity", time: "Day 2 · Afternoon", imageSrc: "/images/brooklyn-bridge-park.jpg", position: { x: 300, y: 150 } },
      { id: "6", label: "Broadway Show", type: "activity", time: "Day 2 · Evening", imageSrc: "/images/broadway-show.jpg", position: { x: 500, y: 150 } },
      { id: "7", label: "Statue of Liberty Trip", type: "destination", time: "Day 3 · Full Day", imageSrc: "/images/statue-of-liberty.jpg", position: { x: 300, y: 250 } },
    ],
  },
];

const TripDashboard: React.FC = () => {
  const [selectedTrip, setSelectedTrip] = React.useState<Trip | null>(sampleTrips.length > 0 ? sampleTrips[0] : null);
  const [editingNode, setEditingNode] = React.useState<ItineraryNode | null>(null);
  const [suggestions] = React.useState<string[]>(["Shibuya Crossing", "Tokyo Tower", "Odaiba Beach"]);

  const handleNodeClick = (node: ItineraryNode) => {
    setEditingNode(node);
  };

  return (
    <div className="min-h-screen bg-gogo-light1 overflow-hidden">
      <div className="container mx-auto px-2 py-4 max-w-screen-xl">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gogo-dark">My Trips</h1>
          <Button className="bg-gogo-blue hover:bg-gogo-blue/90 text-sm px-4 py-2">
            <Plus className="mr-1 h-4 w-4" /> Plan New Trip
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
          {/* SIDEBAR */}
          <div className="xl:col-span-1 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)] pr-1">
            {/* My Trips List */}
            <div className="bg-white rounded-lg shadow p-3">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-base font-semibold text-gogo-dark">My Trips</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gogo-blue hover:text-gogo-blue/90 text-xs"
                >
                  View All
                </Button>
              </div>
              <div className="space-y-2">
                {sampleTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className={`p-2 rounded-lg cursor-pointer transition-colors text-sm ${
                      selectedTrip?.id === trip.id
                        ? "bg-gogo-blue/10 border-l-4 border-gogo-blue"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedTrip(trip)}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-md overflow-hidden mr-2">
                        <img
                          src={trip.image}
                          alt={trip.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gogo-dark truncate">{trip.title}</h3>
                        <p className="text-xs text-gray-500 truncate">{trip.dates}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-3 border-dashed border-gray-300 text-gray-500 text-sm"
              >
                <Plus className="mr-2 h-4 w-4" /> Add New Trip
              </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-2">
              {["Duration", "Activities", "Status"].map((title, i) => (
                <Card key={title} className="text-sm">
                  <CardHeader className="pb-1">
                    <CardTitle className="text-xs font-medium text-gray-500">{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {i === 0 && (
                      <p className="text-xl font-bold text-gogo-dark">
                        3 Days
                      </p>
                    )}
                    {i === 1 && (
                      <p className="text-xl font-bold text-gogo-dark">
                        {selectedTrip ? selectedTrip.itinerary.filter((n) => n.type !== "transport").length : "-"} Places
                      </p>
                    )}
                    {i === 2 && (
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div
                            className="bg-gogo-green h-2.5 rounded-full"
                            style={{ width: `${selectedTrip?.progress ?? 0}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-700">{selectedTrip?.progress ?? 0}%</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-3">
              <h2 className="text-base font-semibold text-gogo-dark mb-3">Quick Actions</h2>
              <div className="space-y-1">
                {["Calendar View", "Map View", "Recent Trips", "Settings"].map((label, i) => {
                  const icons = [Calendar, Map, Clock, Settings];
                  const Icon = icons[i];
                  return (
                    <Button
                      key={label}
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:text-gogo-blue hover:bg-gogo-blue/5 text-sm"
                    >
                      <Icon className="mr-2 h-4 w-4" /> {label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="xl:col-span-3 overflow-y-auto max-h-[calc(100vh-120px)]">
            {selectedTrip && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow overflow-hidden mb-4"
              >
                <div className="h-36 relative">
                  <img
  src={selectedTrip?.image ?? ""}
  alt={selectedTrip?.title ?? ""}
  className="w-full h-full object-cover"
/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h1 className="text-2xl font-bold">{selectedTrip?.title ?? ""}</h1>
                      <p className="text-base opacity-90">{selectedTrip?.destination ?? ""}</p>
                      <p className="text-xs opacity-80">{selectedTrip?.dates ?? ""}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-4">
              <Button className="bg-gogo-blue hover:bg-gogo-blue/90 text-sm px-4 py-2">Edit Trip</Button>
              <Button
                variant="outline"
                className="border-gogo-blue text-gogo-blue hover:bg-gogo-blue/10 text-sm px-4 py-2"
              >
                Share Trip
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 text-sm px-4 py-2"
              >
                Export
              </Button>
            </div>

            {/* Trip Itinerary */}
            <h2 className="text-lg font-semibold text-gogo-dark mb-3">Trip Itinerary</h2>
            <FlowchartVisualization
              nodes={selectedTrip?.itinerary ?? []}
              interactive
              onNodeClick={handleNodeClick}
              className="mb-4"
            />
          </div>

          {/* EDITING PANEL */}
          <div className="xl:col-span-1 bg-white rounded-lg shadow p-4 h-fit">
            <h3 className="text-base font-semibold mb-3 text-gogo-dark">Edit Activity</h3>
            {editingNode ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500">Label</label>
                  <input
                    value={editingNode.label}
                    readOnly
                    className="w-full mt-1 border rounded px-2 py-1 text-sm bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Time</label>
                  <input
                    value={editingNode.time || ""}
                    readOnly
                    className="w-full mt-1 border rounded px-2 py-1 text-sm bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Suggested Alternatives</label>
                  <ul className="mt-1 space-y-1 text-sm">
                    {suggestions.map((s, idx) => (
                      <li key={idx} className="text-gray-600">• {s}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-xs text-gray-400 pt-2">
                  This panel is a placeholder. Editing functionality is not yet implemented.
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Click a card to start editing.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDashboard;
