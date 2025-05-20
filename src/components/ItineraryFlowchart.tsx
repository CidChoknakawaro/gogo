import React from 'react';
import { ItineraryCard, ItineraryItem } from './ItineraryCard';

type Props = {
  items: ItineraryItem[];
  onItemClick: (item: ItineraryItem) => void;
};

export const ItineraryFlowchart: React.FC<Props> = ({ items, onItemClick }) => {
  return (
    <div className="relative p-6 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-3 gap-6">
        {items.map(item => (
          <ItineraryCard
            key={item.id}
            item={item}
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>
      {/* TODO: re-draw your dashed connection lines here,
         you can absolutely position SVG <line>s or use a lib like react-flow */}
    </div>
  );
};
