// src/components/FlowchartVisualization.tsx

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export interface Node {
  id: string;
  label: string;
  type: "destination" | "activity" | "transport" | "accommodation";
  time?: string;
  imageSrc: string;
  position: { x: number; y: number };
}

export interface Edge {
  source: string;
  target: string;
}

export interface FlowchartVisualizationProps {
  nodes?: Node[];
  edges?: Edge[];
  interactive?: boolean;
  className?: string;
  onNodeClick?: (node: Node) => void;
}

// ─── Default data ─────────────────────────────────────────────────────
const defaultNodes: Node[] = [
  { id: "1",  label: "Tokyo Arrival",               type: "destination",   time: "09:00–11:00",       imageSrc: "/images/shibuya.jpg",      position: { x: 50,  y: 50  } },
  { id: "2",  label: "Airport → Hotel Bus",         type: "transport",     time: "11:00–11:30",       imageSrc: "/images/bus.jpg",          position: { x: 260, y: 50  } },
  { id: "3",  label: "Check-in: Asakusa Hotel",     type: "accommodation", time: "11:30–12:00",       imageSrc: "/images/hotel_tokyo.jpg",  position: { x: 470, y: 50  } },
  { id: "4",  label: "Sensoji Temple",              type: "activity",      time: "12:15–13:45",       imageSrc: "/images/inari.jpg",         position: { x: 50,  y: 200 } },
  { id: "5",  label: "Lunch at Nakamise",           type: "activity",      time: "14:00–15:00",       imageSrc: "/images/lunch.jpg",         position: { x: 260, y: 200 } },
  { id: "6",  label: "Tokyo Skytree",               type: "destination",   time: "15:30–17:30",       imageSrc: "/images/skytree.jpg",       position: { x: 470, y: 200 } },
  { id: "7",  label: "Shinkansen to Kyoto",         type: "transport",     time: "18:00–20:30",       imageSrc: "/images/shinkansen.jpg",    position: { x: 50,  y: 350 } },
];

const defaultEdges: Edge[] = [
  { source: "1",  target: "2" },
  { source: "2",  target: "3" },
  { source: "3",  target: "4" },
  { source: "4",  target: "5" },
  { source: "5",  target: "6" },
  { source: "6",  target: "7" },
];

// ─── Layout & Styling ─────────────────────────────────────────────────
const CARD_W = 150;
const CARD_H = 120;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;

const getBorderColor = (type: Node["type"]) => {
  switch (type) {
    case "destination":   return "border-gogo-blue";
    case "activity":      return "border-gogo-green";
    case "transport":     return "border-amber-600";
    case "accommodation": return "border-purple-600";
  }
};

// ─── Component ────────────────────────────────────────────────────────
const FlowchartVisualization: React.FC<FlowchartVisualizationProps> = ({
  nodes = defaultNodes,
  edges = defaultEdges,
  interactive = true,
  className = "",
  onNodeClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [nodeState, setNodeState] = useState<Node[]>(nodes);
  const [zoom, setZoom] = useState(1);
  // track which node is selected
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Measure container once
  useEffect(() => {
    const ct = containerRef.current;
    if (!ct) return;
    setSize({ width: ct.clientWidth, height: ct.clientHeight });
  }, []);

  // Wheel to zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.002;
    setZoom((z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z + delta)));
  };

  // Drag handler
  const handleDrag = (id: string) => (_: any, info: any) => {
    setNodeState((ns) =>
      ns.map((n) =>
        n.id === id
          ? { ...n, position: { x: n.position.x + info.delta.x, y: n.position.y + info.delta.y } }
          : n
      )
    );
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      className={`relative w-full h-[700px] bg-slate-50 rounded-lg border border-slate-200 overflow-auto ${className}`}
    >
      {/* scale wrapper */}
      <div style={{ transform: `scale(${zoom})`, transformOrigin: "0 0" }}>
        {/* SVG overlay */}
        <svg
          width={size.width}
          height={size.height}
          viewBox={`0 0 ${size.width} ${size.height}`}
          className="absolute inset-0 pointer-events-none"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="8"
              refX="8"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8" />
            </marker>
          </defs>
          {edges.map((e, i) => {
            const s = nodeState.find((n) => n.id === e.source)!;
            const t = nodeState.find((n) => n.id === e.target)!;
            const x1 = s.position.x + CARD_W / 2;
            const y1 = s.position.y + CARD_H / 2;
            const x2 = t.position.x + CARD_W / 2;
            const y2 = t.position.y + CARD_H / 2;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#94a3b8"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            );
          })}
        </svg>

        {/* Cards */}
        {nodeState.map((n) => (
          <motion.div
            key={n.id}
            drag={interactive}
            dragMomentum={false}
            onDrag={handleDrag(n.id)}
            onClick={() => {
              if (interactive) {
                setSelectedId(n.id);
                onNodeClick?.(n);
              }
            }}
            whileHover={interactive ? { scale: 1.05 } : {}}
            transition={{ type: "spring", stiffness: 300 }}
            className={`
              absolute 
              w-[${CARD_W}px] h-[${CARD_H}px]
              rounded-lg shadow-md border-2 bg-white
              ${getBorderColor(n.type)}
              ${selectedId === n.id ? "ring-4 ring-gogo-blue ring-offset-2 ring-offset-white" : ""}
              cursor-${interactive ? "move" : "default"}
            `}
            style={{
              left: n.position.x,
              top: n.position.y,
              zIndex: selectedId === n.id ? 10 : 2,
            }}
          >
            <img
              src={n.imageSrc}
              alt={n.label}
              className="w-full h-24 object-cover rounded-t-lg"
            />
            <div className="p-2">
              <div className="font-semibold text-gray-900 text-sm">{n.label}</div>
              {n.time && <div className="text-xs text-gray-600 mt-1">{n.time}</div>}
            </div>
          </motion.div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-3 right-3 bg-white bg-opacity-80 p-2 rounded-md text-xs space-y-1">
          <div className="flex items-center gap-2">
            <span className="block w-3 h-3 rounded-full bg-gogo-blue" /> ปลายทาง
          </div>
          <div className="flex items-center gap-2">
            <span className="block w-3 h-3 rounded-full bg-gogo-green" /> กิจกรรม
          </div>
          <div className="flex items-center gap-2">
            <span className="block w-3 h-3 rounded-full bg-amber-600" /> การเดินทาง
          </div>
          <div className="flex items-center gap-2">
            <span className="block w-3 h-3 rounded-full border-purple-600" /> ที่พัก
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowchartVisualization;
