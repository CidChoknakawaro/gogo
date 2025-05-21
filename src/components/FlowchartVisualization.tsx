// src/components/FlowchartVisualization.tsx

import React from "react";
import { motion } from "framer-motion";

export interface Node {
  id: string;
  label: string;
  type: "destination" | "activity" | "transport";
  time?: string;          // เช่น "09:00 – 11:00"
  imageSrc: string;
  position?: { x: number; y: number };
}

interface Edge {
  source: string;
  target: string;
}

interface FlowchartVisualizationProps {
  nodes?: Node[];
  edges?: Edge[];
  interactive?: boolean;
  className?: string;
  onNodeClick?: (node: Node) => void;
}

// ค่าเริ่มต้นของโหนด (ถ้าต้องการ)
const defaultNodes: Node[] = [
  // …โหนดตัวอย่าง…
];

// ค่าเริ่มต้นของขอบเชื่อม
const defaultEdges: Edge[] = [
  { source: "1", target: "2" },
  { source: "2", target: "3" },
  { source: "3", target: "4" },
  { source: "4", target: "5" },
  { source: "5", target: "6" },
  { source: "6", target: "7" },
];

// เลือกสีขอบตามประเภทโหนด
const getBorderColor = (type: Node["type"]) => {
  switch (type) {
    case "destination": return "border-gogo-blue";
    case "activity":    return "border-gogo-green";
    case "transport":   return "border-amber-600";
  }
};

const CARD_W = 150;
const CARD_H = 120;
const DX = CARD_W + 50;
const DY = CARD_H + 50;

const FlowchartVisualization: React.FC<FlowchartVisualizationProps> = ({
  nodes = defaultNodes,
  edges = defaultEdges,
  interactive = false,
  className = "",
  onNodeClick,
}) => {
  // กำหนดตำแหน่งให้กับโหนดถ้ายังไม่มี
  const positioned = nodes.map((n, i) => ({
    ...n,
    position: n.position ?? {
      x: (i % 3) * DX + 50,
      y: Math.floor(i / 3) * DY + 50,
    },
  }));

  // วาดเส้นเชื่อมระหว่างโหนด
  const renderEdges = () =>
    edges.map((e, i) => {
      const s = positioned.find((n) => n.id === e.source);
      const t = positioned.find((n) => n.id === e.target);
      if (!s || !t) return null;
      const x1 = s.position!.x + CARD_W / 2;
      const y1 = s.position!.y + CARD_H / 2;
      const x2 = t.position!.x + CARD_W / 2;
      const y2 = t.position!.y + CARD_H / 2;
      return (
        <svg key={i} className="absolute inset-0 w-full h-full pointer-events-none">
          <line
            x1={x1} y1={y1}
            x2={x2} y2={y2}
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray={interactive ? "5,5" : undefined}
          />
          <circle cx={x2} cy={y2} r={4} fill="#94a3b8" />
        </svg>
      );
    });

  return (
    <div
      className={`relative w-full h-[700px] bg-slate-50 rounded-lg border border-slate-200 overflow-hidden py-10 ${className}`}
    >
      {renderEdges()}

      {positioned.map((node) => (
        <motion.div
          key={node.id}
          drag={interactive}
          dragMomentum={false}
          onClick={() => interactive && onNodeClick?.(node)}
          whileHover={interactive ? { scale: 1.05 } : {}}
          transition={{ type: "spring", stiffness: 300 }}
          className={`absolute w-[${CARD_W}px] h-[${CARD_H}px] rounded-lg shadow-md border-2 bg-white cursor-move ${getBorderColor(
            node.type
          )}`}
          style={{ left: node.position!.x, top: node.position!.y, zIndex: 2 }}
        >
          <img
            src={node.imageSrc}
            alt={node.label}
            className="w-full h-24 object-cover rounded-t-lg"
          />

          <div className="p-2">
            <div className="font-semibold text-gray-900 text-sm">
              {node.label}
            </div>
            {node.time && (
              <div className="text-xs text-gray-600 mt-1">
                {node.time}
              </div>
            )}
          </div>
        </motion.div>
      ))}

      {/* เค้าโครงคำอธิบายสี (Legend) */}
      <div className="absolute bottom-3 right-3 bg-white bg-opacity-80 p-2 rounded-md text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" /> ปลายทาง
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" /> กิจกรรม
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500" /> การเดินทาง
        </div>
      </div>
    </div>
  );
};

export default FlowchartVisualization;
