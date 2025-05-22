// src/components/TripDashboard.tsx

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FlowchartVisualization, { Node as ItineraryNode } from "./FlowchartVisualization";
import {
  Plus,
  Settings,
  ChevronRight,
  Undo as UndoIcon,
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

export const sampleTrips: Trip[] = [
  {
  id: "trip1",
  title: "Bangkok Day Trip",
  destination: "Bangkok",
  dates: "Mar 10 – Mar 10, 2025",
  image: "bangkok-banner.jpeg",
  progress: 0,
  itinerary: [
    {
      id: "1",
      label: "Bangkok Arrival",
      type: "destination",
      time: "08:00–10:00",
      imageSrc: "bangkok-arrival.jpg",
      position: { x: 100, y: 50 }
    },
    {
      id: "2",
      label: "Airport Rail Link",
      type: "transport",
      time: "10:00–10:30",
      imageSrc: "airport-rail.jpg",
      position: { x: 300, y: 50 }
    },
    {
      id: "3",
      label: "Check-in: Riverside Hotel",
      type: "accommodation",
      time: "10:30–11:00",
      imageSrc: "riverside-hotel.jpg",
      position: { x: 500, y: 50 }
    },
    {
      id: "4",
      label: "Grand Palace",
      type: "activity",
      time: "11:30–13:00",
      imageSrc: "grand-palace.jpg",
      position: { x: 100, y: 150 }
    },
    {
      id: "5",
      label: "Wat Pho",
      type: "activity",
      time: "13:30–15:00",
      imageSrc: "wat-pho.jpg",
      position: { x: 300, y: 150 }
    },
    {
      id: "6",
      label: "River Boat Tour",
      type: "transport",
      time: "15:15–16:00",
      imageSrc: "river-boat.jpg",
      position: { x: 500, y: 150 }
    },
    {
      id: "7",
      label: "ICONSIAM Shopping",
      type: "activity",
      time: "16:15–18:00",
      imageSrc: "iconsiam.jpg",
      position: { x: 300, y: 250 }
    },
    {
      id: "8",
      label: "Chinatown Dinner",
      type: "activity",
      time: "18:30–20:00",
      imageSrc: "chinatown-dinner.jpg",
      position: { x: 500, y: 250 }
    },
  ],
},
  {
    id: "trip2",
    title: "Chiang Mai Gateaway",
    destination: "Rome, Florence, Venice",
    dates: "May 5 – May 15, 2025",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80",
    progress: 75,
    itinerary: [
      { id: "1", label: "Colosseum Visit",   type: "destination", time: "09:00 – 11:00", imageSrc: "colosseum.jpg",       position: { x: 100, y:  50 } },
      { id: "2", label: "Vatican Museums",   type: "activity",    time: "11:30 – 13:30", imageSrc: "vatican-museums.jpg", position: { x: 300, y:  50 } },
      { id: "3", label: "Piazza Navona",     type: "activity",    time: "14:00 – 15:00", imageSrc: "piazza-navona.jpg",   position: { x: 500, y:  50 } },
      { id: "4", label: "Train to Florence", type: "transport",   time: "16:00 – 18:00", imageSrc: "italian-train.jpg",   position: { x: 100, y: 150 } },
      { id: "5", label: "Uffizi Gallery",    type: "activity",    time: "18:30 – 20:00", imageSrc: "uffizi-gallery.jpg",  position: { x: 300, y: 150 } },
      { id: "6", label: "Ponte Vecchio",     type: "activity",    time: "20:30 – 21:30", imageSrc: "ponte-vecchio.jpg",   position: { x: 500, y: 150 } },
      { id: "7", label: "Venice Day Trip",   type: "destination", time: "10:00 – 18:00", imageSrc: "venice-canals.jpg",   position: { x: 300, y: 250 } },
    ],
  },
  {
    id: "trip3",
    title: "Lam Pang Weekend",
    destination: "Manhattan & Brooklyn",
    dates: "Dec 10 – Dec 12, 2025",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80",
    progress: 90,
    itinerary: [
      { id: "1", label: "NYC Arrival",            type: "destination", time: "09:00 – 11:00", imageSrc: "nyc-arrival.jpg",          position: { x: 100, y:  50 } },
      { id: "2", label: "Central Park Stroll",    type: "activity",    time: "11:30 – 13:00", imageSrc: "central-park.jpg",        position: { x: 300, y:  50 } },
      { id: "3", label: "Times Square",           type: "activity",    time: "14:00 – 15:00", imageSrc: "times-square.jpg",        position: { x: 500, y:  50 } },
      { id: "4", label: "Subway to Brooklyn",     type: "transport",   time: "16:00 – 16:30", imageSrc: "ny-subway.jpg",           position: { x: 100, y: 150 } },
      { id: "5", label: "Brooklyn Bridge Park",   type: "activity",    time: "17:00 – 18:30", imageSrc: "brooklyn-bridge-park.jpg",position: { x: 300, y: 150 } },
      { id: "6", label: "Broadway Show",          type: "activity",    time: "19:00 – 21:00", imageSrc: "broadway-show.jpg",       position: { x: 500, y: 150 } },
      { id: "7", label: "Statue of Liberty Trip", type: "destination", time: "10:00 – 13:00", imageSrc: "statue-of-liberty.jpg",   position: { x: 300, y: 250 } },
    ],
  },
];
export default function TripDashboard() {
  const [selectedTrip, setSelectedTrip] = React.useState<Trip>(sampleTrips[0]);
  const [editingNode, setEditingNode] = React.useState<ItineraryNode | null>(null);
  const [suggestions] = React.useState<string[]>([
    "Central World",
    "Siam Paragon",
    "Siam Center",
  ]);

  // คำนวณจำนวนวัน
  const calculateDays = () => {
    const [start, end] = selectedTrip.dates.split(" – ");
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.ceil((new Date(end).getTime() - new Date(start).getTime()) / msPerDay);
  };
  // นับจำนวนสถานที่ (ไม่รวมขนส่ง)
  const calculateActivities = () =>
    selectedTrip.itinerary.filter((n) => n.type !== "transport").length;

  const invitePeople = () => alert("เชิญเข้าร่วมทริป — ยังไม่รองรับ");
  const openSettings = () => alert("ไปที่การตั้งค่า — ยังไม่รองรับ");
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

  const SEMI_CIRCLE_WIDTH = 192;  // w-48 = 192px
const SEMI_CIRCLE_HEIGHT = 96;  // h-24 = 96px
const LOGO_WIDTH = 128;         // w-32 = 128px

  return (
    <div className="min-h-screen bg-[#dfe0eb] overflow-hidden">
      <div className="container mx-auto px-4 py-6 max-w-screen-xl">
       {/* HEADER */}
        <div className="relative flex items-center justify-between mb-6 bg-[#2381c8] px-6 py-4">
          {/* Page Title */}
          <h1 className="text-2xl font-bold text-white">ทริปของฉัน</h1>

          {/* Logo  Semi-circle */}
          <div className="relative flex-1 flex justify-center">
            {/* white semi-circle behind the logo */}
            <div className="absolute -bottom-8 w-48 h-24 bg-white rounded-b-full"></div>
            <img
              src="/gogo_logo_new.png"
              alt="Logo"
              className="relative z-10 w-32 h-auto"
            />
          </div>

          {/* Settings Button */}
          <Button
            onClick={openSettings}
            variant="outline"
            className="border-white text-black hover:bg-white/50 text-sm px-4 py-2"
          >
            <Settings className="mr-1 h-4 w-4 text-black" /> การตั้งค่า
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 items-stretch h-[calc(100vh-144px)]">
          {/* LEFT SIDEBAR */}
<aside className="xl:col-span-1 flex flex-col h-full sticky top-0 pr-2 overflow-y-auto space-y-4">
  {/* Trips List Card */}
  <div className="bg-white rounded-lg shadow p-4">
    <div className="flex justify-between items-center mb-3">
      <h2 className="text-base font-semibold text-gogo-dark">ทริปของฉัน</h2>
      <Button
        variant="ghost"
        size="sm"
        className="text-gogo-blue hover:text-gogo-blue/90 text-xs"
      >
        ดูทั้งหมด
      </Button>
    </div>
    <div className="space-y-2 mb-3">
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
              <img
                src={trip.image}
                alt={trip.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gogo-dark truncate">
                {trip.title}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {trip.dates}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      ))}
    </div>
    <Button
      variant="outline"
      className="w-full border-dashed border-gray-300 text-gray-500 text-sm"
    >
      + เพิ่มทริปใหม่
    </Button>
  </div>

  {/* Checklist Card */}
  <div className="bg-white rounded-lg shadow p-4 mt-6">
<div className="mt-3 space-y-4 max-h-200 overflow-y-auto text-[14px]">
        {/* คำถามหลัก */}
<div>
  <h4 className="font-bold text-gogo-blue mb-1">คำถามหลัก</h4>
  <ul className="list-disc list-inside text-gogo-dark space-y-1">
    <li>คุณว่างช่วงไหน: <strong>10/03/2025</strong></li>
    <li>คุณวางแผนว่าจะผ่านที่ไหนบ้าง: <strong>พระบรมมหาราชวัง, วัดโพธิ์</strong></li>
    <li>เมืองหรือภูมิภาคที่จะไป: <strong>กรุงเทพฯ</strong></li>
    <li>ไปทริปกี่วัน: <strong>1 วัน</strong></li>
  </ul>
</div>

{/* สไตล์และความชอบ */}
<div>
  <h4 className="font-bold text-gogo-blue mb-1">สไตล์และความชอบ</h4>
  <ul className="list-disc list-inside text-gogo-dark space-y-1">
    <li>จุดประสงค์: <strong>พักผ่อน & ชมเมือง</strong></li>
    <li>ประสบการณ์: <strong>อาหารท้องถิ่น, ช้อปปิ้ง</strong></li>
    <li>จังหวะทริป: <strong>สมดุล</strong></li>
    <li>ทัวร์: <strong>เที่ยวเอง</strong></li>
  </ul>
</div>

{/* การเดินทาง */}
<div>
  <h4 className="font-bold text-gogo-blue mb-1">การเดินทาง</h4>
  <ul className="list-disc list-inside text-gogo-dark space-y-1">
    <li>ขนส่ง: <strong>BTS / MRT</strong></li>
  </ul>
</div>

{/* กลุ่มการเดินทาง */}
<div>
  <h4 className="font-bold text-gogo-blue mb-1">กลุ่มการเดินทาง</h4>
  <ul className="list-disc list-inside text-gogo-dark space-y-1">
    <li>คุณเดินทาง: <strong>คนเดียว</strong></li>
    <li>จำนวนคน: <strong>1 คน</strong></li>
    <li>มีเด็กหรือผู้สูงอายุ: <strong>ไม่มี</strong></li>
  </ul>
</div>
      </div>
  </div>
</aside>

          {/* MAIN CONTENT */}
          <main className="xl:col-span-3 h-screen sticky top-0 overflow-y-auto bg-[#f7f5f5] rounded-lg">
            {/* Banner */}
            {selectedTrip && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-[#f7f5f5] rounded-lg shadow overflow-hidden mb-4"
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

            {/* Action Buttons */}
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
              >
                Export
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 text-sm px-4 py-2"
              >
                ระยะเวลา: 1 วัน
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 text-sm px-4 py-2"
              >
                สถานที่: {calculateActivities()} แห่ง
              </Button>
              <Button
            onClick={invitePeople}
            className="bg-gogo-blue hover:bg-gogo-blue/90 text-sm px-4 py-2"
          >
            <Plus className="mr-1 h-4 w-4" /> เชิญเข้าร่วมทริป
          </Button>
            </div>

            {/* Trip Itinerary */}
            <h2 className="text-xl font-semibold text-gogo-dark mb-3 text-center">แผนการเดินทาง</h2>
            <FlowchartVisualization
              nodes={selectedTrip.itinerary}
              interactive
              onNodeClick={handleNodeClick}
              className="mb-4"
            />
          </main>

          {/* EDIT PANEL */}
          <aside className="xl:col-span-1 h-screen sticky top-0 bg-[#f7f5f5] rounded-lg shadow p-4">
            

            {editingNode ? (
              
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-gogo-dark mb-3">รีวิว</h3>
            <ul className="list-disc list-inside space-y-2 text-gogo-dark">
      <li>
        <a
          href="https://example.com/review1"
          target="_blank"
          rel="noopener"
          className="text-gogo-blue hover:underline"
        >
          cntraveler
        </a>
      </li>
      <li>
        <a
          href="https://example.com/review2"
          target="_blank"
          rel="noopener"
          className="text-gogo-blue hover:underline"
        >
          wongnai
        </a>
      </li>
      <li>
        <a
          href="https://example.com/review3"
          target="_blank"
          rel="noopener"
          className="text-gogo-blue hover:underline"
        >
          tripadvisor
        </a>
      </li>
      <li>
        <a
          href="https://example.com/review4"
          target="_blank"
          rel="noopener"
          className="text-gogo-blue hover:underline"
        >
          pantip
        </a>
      </li>
      <li>
        <a
          href="https://example.com/review5"
          target="_blank"
          rel="noopener"
          className="text-gogo-blue hover:underline"
        >
          cleverthai
        </a>
      </li>
    </ul>
    <br/>
    <h3 className="text-base font-semibold text-gogo-dark mb-3">แก้ไขกิจกรรม</h3>
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    สนใจ<b>สถานที่แบบไหน</b> เช่น<br/>
                    อยากได้บรรยากาศธรรมชาติมากกว่า<br/>
                    หรือบอก<b>ชื่อสถานที่</b>เลย เช่น<br/>
                    อยากไปที่วัดพระแก้ว
                  </label>
                  <input
                    value={editingNode.label}
                    onChange={(e) => updateEditingField("label", e.target.value)}
                    className="w-full mt-1 border rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">ระยะเวลา (ชม.)</label>
                  <input
                    type="text"
                    value={editingNode.time}
                    onChange={(e) => updateEditingField("time", e.target.value)}
                    className="w-full mt-1 border rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">ข้อเสนอทางเลือก</label>
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
                <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 text-sm px-4 py-2"
                onClick={confirmChanges}
              >
                ยืนยันการแก้ไข
              </Button>
              </div>
              
            ) : (
              <p className="text-sm text-gray-500">คลิกที่การ์ดเพื่อดูริวิวหรือแก้ไข</p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}