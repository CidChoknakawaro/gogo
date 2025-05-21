import React from "react";
import { motion } from "framer-motion";

interface Node {
  id: string;
  label: string;
  type: "destination" | "activity" | "transport";
  time?: string;
  imageSrc: string;                     // ← new
  position: { x: number; y: number };
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

const defaultNodes: Node[] = [
  {
    id: "1",
    label: "Tokyo Arrival",
    type: "destination",
    time: "Day 1 · Morning",
    imageSrc: "/images/tokyo-arrival.jpg",  // placeholder
    position: { x: 100, y: 50 },
  },
  {
    id: "2",
    label: "Sensoji Temple",
    type: "activity",
    time: "Day 1 · Afternoon",
    imageSrc: "/images/sensoji.jpg",
    position: { x: 300, y: 50 },
  },
  {
    id: "3",
    label: "Tokyo Skytree",
    type: "activity",
    time: "Day 1 · Evening",
    imageSrc: "/images/skytree.jpg",
    position: { x: 500, y: 50 },
  },
  {
    id: "4",
    label: "Train to Kyoto",
    type: "transport",
    time: "Day 2 · Morning",
    imageSrc: "/images/train-kyoto.jpg",
    position: { x: 100, y: 150 },
  },
  {
    id: "5",
    label: "Fushimi Inari",
    type: "activity",
    time: "Day 2 · Afternoon",
    imageSrc: "/images/fushimi-inari.jpg",
    position: { x: 300, y: 150 },
  },
  {
    id: "6",
    label: "Arashiyama Bamboo Grove",
    type: "activity",
    time: "Day 2 · Evening",
    imageSrc: "/images/arashiyama.jpg",
    position: { x: 500, y: 150 },
  },
  {
    id: "7",
    label: "Osaka Day Trip",
    type: "destination",
    time: "Day 3 · Full Day",
    imageSrc: "/images/osaka.jpg",
    position: { x: 300, y: 250 },
  },
];

const defaultEdges: Edge[] = [
  { source: "1", target: "2" },
  { source: "2", target: "3" },
  { source: "3", target: "4" },
  { source: "4", target: "5" },
  { source: "5", target: "6" },
  { source: "6", target: "7" },
];

const FlowchartVisualization: React.FC<FlowchartVisualizationProps> = ({
  nodes = defaultNodes,
  edges = defaultEdges,
  interactive = false,
  className = "",
  onNodeClick,
}) => {
  const getBorderColor = (type: Node["type"]) => {
    switch (type) {
      case "destination": return "border-gogo-blue";
      case "activity":    return "border-gogo-green";
      case "transport":   return "border-amber-600";
    }
  };

  const renderEdges = () =>
    edges.map((edge, i) => {
      const src = nodes.find(n => n.id === edge.source);
      const tgt = nodes.find(n => n.id === edge.target);
      if (!src || !tgt) return null;

      const x1 = src.position.x + 75;
      const y1 = src.position.y + 40;
      const x2 = tgt.position.x + 75;
      const y2 = tgt.position.y + 40;

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
    <div className={`relative w-full h-[700px] bg-slate-50 rounded-lg border border-slate-200 overflow-hidden py-10 ${className}`}>
      {renderEdges()}

      {nodes.map(node => (
        <motion.div
  key={node.id}
  drag={interactive}
  dragMomentum={false}
  onClick={() => interactive && onNodeClick?.(node)}
  whileHover={interactive ? { scale: 1.05 } : {}}
  transition={{ type: "spring", stiffness: 300 }}
  className={`absolute w-[150px] rounded-lg shadow-md border-2 bg-white cursor-move ${getBorderColor(node.type)}`}
  style={{ left: node.position.x * 1.5, top: node.position.y * 1.5, zIndex: 2 }}
>
          <img
            src={node.imageSrc}
            alt={node.label}
            className="w-full h-24 object-cover rounded-t-lg"
          />
          <div className="p-2">
            <div className="font-semibold text-gray-900 text-sm">{node.label}</div>
            {node.time && (
              <div className="text-xs text-gray-600 mt-1">{node.time}</div>
            )}
          </div>
        </motion.div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-3 right-3 bg-white bg-opacity-80 p-2 rounded-md text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" /> Destination
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" /> Activity
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500" /> Transport
        </div>
      </div>
    </div>
  );
};

export default FlowchartVisualization;
