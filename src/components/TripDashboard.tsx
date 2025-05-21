// src/components/TripDashboard.tsx

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FlowchartVisualization, { Node as ItineraryNode } from "./FlowchartVisualization";
import { 
  Plus, Calendar, Map, Clock, Settings, ChevronRight, Undo as UndoIcon 
} from "lucide-react";

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
      { id: "1", label: "Tokyo Arrival",           type: "destination", time: "09:00 – 11:00",   imageSrc: "tokyo-arrival.jpg",       position: { x: 100, y:  50 } },
      { id: "2", label: "Sensoji Temple",          type: "activity",    time: "11:30 – 13:30", imageSrc: "sensoji.jpg",              position: { x: 300, y:  50 } },
      { id: "3", label: "Tokyo Skytree",           type: "activity",    time: "14:00 – 16:00", imageSrc: "skytree.jpg",             position: { x: 500, y:  50 } },
      { id: "4", label: "Train to Kyoto",          type: "transport",   time: "07:00 – 09:00", imageSrc: "train-kyoto.jpg",         position: { x: 100, y: 150 } },
      { id: "5", label: "Fushimi Inari Shrine",    type: "activity",    time: "10:00 – 12:00", imageSrc: "fushimi-inari.jpg",        position: { x: 300, y: 150 } },
      { id: "6", label: "Arashiyama Bamboo Grove", type: "activity",    time: "13:30 – 15:30", imageSrc: "arashiyama.jpg",           position: { x: 500, y: 150 } },
      { id: "7", label: "Osaka Day Trip",          type: "destination", time: "10:00 – 18:00", imageSrc: "osaka.jpg",                position: { x: 300, y: 250 } },
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
      { id: "1", label: "Colosseum Visit",   type: "destination", time: "09:00 – 11:00", imageSrc: "/images/colosseum.jpg",       position: { x: 100, y:  50 } },
      { id: "2", label: "Vatican Museums",   type: "activity",    time: "11:30 – 13:30", imageSrc: "/images/vatican-museums.jpg", position: { x: 300, y:  50 } },
      { id: "3", label: "Piazza Navona",     type: "activity",    time: "14:00 – 15:00", imageSrc: "/images/piazza-navona.jpg",    position: { x: 500, y:  50 } },
      { id: "4", label: "Train to Florence", type: "transport",   time: "07:00 – 09:00", imageSrc: "/images/train-florence.jpg",   position: { x: 100, y: 150 } },
      { id: "5", label: "Uffizi Gallery",    type: "activity",    time: "10:00 – 12:00", imageSrc: "/images/uffizi.jpg",           position: { x: 300, y: 150 } },
      { id: "6", label: "Ponte Vecchio",     type: "activity",    time: "13:00 – 14:00", imageSrc: "/images/ponte-vecchio.jpg",    position: { x: 500, y: 150 } },
      { id: "7", label: "Venice Day Trip",   type: "destination", time: "10:00 – 18:00", imageSrc: "/images/venice.jpg",           position: { x: 300, y: 250 } },
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
      { id: "1", label: "NYC Arrival",            type: "destination", time: "09:00 – 11:00", imageSrc: "/images/nyc-arrival.jpg",         position: { x: 100, y:  50 } },
      { id: "2", label: "Central Park Stroll",    type: "activity",    time: "11:30 – 13:00", imageSrc: "/images/central-park.jpg",        position: { x: 300, y:  50 } },
      { id: "3", label: "Times Square",           type: "activity",    time: "14:00 – 15:00", imageSrc: "/images/times-square.jpg",        position: { x: 500, y:  50 } },
      { id: "4", label: "Subway to Brooklyn",     type: "transport",   time: "07:00 – 08:00", imageSrc: "/images/subway.jpg",              position: { x: 100, y: 150 } },
      { id: "5", label: "Brooklyn Bridge Park",   type: "activity",    time: "09:00 – 11:00", imageSrc: "/images/brooklyn-bridge-park.jpg",position: { x: 300, y: 150 } },
      { id: "6", label: "Broadway Show",          type: "activity",    time: "19:00 – 21:00", imageSrc: "/images/broadway-show.jpg",       position: { x: 500, y: 150 } },
      { id: "7", label: "Statue of Liberty Trip", type: "destination", time: "10:00 – 13:00", imageSrc: "/images/statue-of-liberty.jpg",    position: { x: 300, y: 250 } },
    ],
  },
];

export default function TripDashboard() {
  const [selectedTrip, setSelectedTrip] = React.useState<Trip>(sampleTrips[0]);
  const [editingNode, setEditingNode] = React.useState<ItineraryNode | null>(null);
  const [suggestions] = React.useState<string[]>([
    "Shibuya Crossing",
    "Tokyo Tower",
    "Odaiba Beach",
  ]);

  // คำนวณจำนวนวัน
  const calculateDays = () => {
    const [start, end] = selectedTrip.dates.split(" – ");
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.ceil((new Date(end).getTime() - new Date(start).getTime()) / msPerDay);
  };
  // นับสถานที่ (ไม่รวมขนส่ง)
  const calculateActivities = () =>
    selectedTrip.itinerary.filter((n) => n.type !== "transport").length;

  const invitePeople = () => alert("เชิญเข้าร่วมทริป — ยังไม่รองรับ");
  const handleNodeClick = (node: ItineraryNode) => setEditingNode(node);

  const undoEdit = () => {
    if (!editingNode) return;
    const orig = selectedTrip.itinerary.find((n) => n.id === editingNode.id);
    if (orig) setEditingNode(orig);
  };
  const confirmChanges = () => {
    if (!editingNode) return;
    setSelectedTrip((trip) => ({
      ...trip,
      itinerary: trip.itinerary.map((n) =>
        n.id === editingNode.id ? editingNode : n
      ),
    }));
    setEditingNode(null);
  };

  const updateEditingField = (field: "label" | "time", val: string) => {
    if (!editingNode) return;
    setEditingNode({ ...editingNode, [field]: val });
  };

  return (
    <div className="min-h-screen bg-gogo-light1 overflow-hidden">
      <div className="container mx-auto px-4 py-6 max-w-screen-xl">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gogo-dark">ทริปของฉัน</h1>
          <Button
            onClick={invitePeople}
            className="bg-gogo-blue hover:bg-gogo-blue/90 text-sm px-4 py-2"
          >
            <Plus className="mr-1 h-4 w-4" /> เชิญเข้าร่วมทริป
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
          {/* SIDEBAR */}
          <aside className="xl:col-span-1 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)] pr-2">
            {/* ทริปของฉัน */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-base font-semibold text-gogo-dark">ทริปของฉัน</h2>
                <Button variant="ghost" size="sm" className="text-gogo-blue hover:text-gogo-blue/90 text-xs">
                  ดูทั้งหมด
                </Button>
              </div>
              <div className="space-y-2">
                {sampleTrips.map((trip) => (
                  <div
                    key={trip.id}
                    onClick={() => setSelectedTrip(trip)}
                    className={`p-2 rounded-lg cursor-pointer transition-colors text-sm ${
                      selectedTrip.id === trip.id
                        ? "bg-gogo-blue/10 border-l-4 border-gogo-blue"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-md overflow-hidden mr-2">
                        <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
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
              <Button variant="outline" className="w-full mt-3 border-dashed border-gray-300 text-gray-500 text-sm">
                <Plus className="mr-2 h-4 w-4" /> เพิ่มทริปใหม่
              </Button>
            </div>

            {/* ระยะเวลา & สถานที่ */}
            <div className="grid grid-cols-1 gap-3">
              <Card>
                <CardHeader className="pb-1">
                  <CardTitle className="text-xs font-medium text-gray-500">ระยะเวลา</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold text-gogo-dark">
                    {calculateDays()} วัน
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-1">
                  <CardTitle className="text-xs font-medium text-gray-500">สถานที่</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold text-gogo-dark">
                    {calculateActivities()} แห่ง
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* การดำเนินการด่วน */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-base font-semibold text-gogo-dark mb-2">การดำเนินการด่วน</h2>
              <div className="space-y-2">
                {[
                  { label: "ดูปฏิทิน", Icon: Calendar },
                  { label: "ดูแผนที่", Icon: Map },
                  { label: "ทริปล่าสุด", Icon: Clock },
                  { label: "การตั้งค่า", Icon: Settings },
                ].map(({ label, Icon }) => (
                  <Button
                    key={label}
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:text-gogo-blue hover:bg-gogo-blue/5 text-sm"
                  >
                    <Icon className="mr-2 h-4 w-4" /> {label}
                  </Button>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <main className="xl:col-span-3 overflow-y-auto max-h-[calc(100vh-120px)]">
            {selectedTrip && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow overflow-hidden mb-4"
              >
                <div className="h-36 relative">
                  <img
                    src={selectedTrip.image}
                    alt={selectedTrip.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h1 className="text-2xl font-bold">{selectedTrip.title}</h1>
                      <p className="text-base opacity-90">{selectedTrip.destination}</p>
                      <p className="text-xs opacity-80">{selectedTrip.dates}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div className="flex flex-wrap gap-3 mb-4">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 text-sm px-4 py-2"
                onClick={undoEdit}
              >
                <UndoIcon className="mr-1 h-4 w-4" /> เลิกทำ
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 text-sm px-4 py-2"
                onClick={confirmChanges}
              >
                ยืนยัน
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 text-sm px-4 py-2">
                ส่งออก
              </Button>
            </div>

            <h2 className="text-xl font-semibold text-gogo-dark mb-3">แผนการเดินทาง</h2>
            <FlowchartVisualization
              nodes={selectedTrip.itinerary}
              interactive
              onNodeClick={handleNodeClick}
              className="mb-4"
            />
          </main>

          {/* EDIT PANEL */}
          <aside className="xl:col-span-1 bg-white rounded-lg shadow p-4">
            <h3 className="text-base font-semibold text-gogo-dark mb-3">แก้ไขกิจกรรม</h3>
            {editingNode ? (
              <div className="space-y-4">
                {/* Place */}
                <div>
                  <label className="text-xs font-medium text-gray-500">สนใจสถานที่แบบไหน 
                    <br/>ตัวอย่าง: อยากเห็นธรรมชาติ</label>
                  <input
                    value={editingNode.label}
                    onChange={(e) => updateEditingField("label", e.target.value)}
                    className="w-full mt-1 border rounded px-2 py-1 text-sm"
                  />
                </div>
                {/* Duration */}
                <div>
                  <label className="text-xs font-medium text-gray-500">ระยะเวลา (ชม.)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={editingNode.time}
                    onChange={(e) => updateEditingField("time", e.target.value)}
                    className="w-full mt-1 border rounded px-2 py-1 text-sm"
                  />
                </div>
                {/* Alternatives */}
                <div>
                  <label className="text-xs font-medium text-gray-500">ข้อเสนอแนะทางเลือก</label>
                  <ul className="mt-1 space-y-1 text-sm">
                    {suggestions.map((s, i) => (
                      <li
                        key={i}
                        className="text-gogo-blue hover:underline cursor-pointer"
                        onClick={() => updateEditingField("label", s)}
                      >
                        • {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">คลิกที่การ์ดเพื่อแก้ไข</p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
