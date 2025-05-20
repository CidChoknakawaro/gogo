import React from 'react';

export type ItineraryItem = {
  id: string;
  title: string;
  subtitle: string;
  type: 'destination' | 'activity' | 'transport';
  imageSrc: string;         // e.g. "/images/tokyo-arrival.jpg"
};

const typeColor = {
  destination: { bg: 'bg-blue-100', text: 'text-blue-800' },
  activity:    { bg: 'bg-green-100', text: 'text-green-800' },
  transport:   { bg: 'bg-yellow-100', text: 'text-yellow-800' },
};

export const ItineraryCard: React.FC<{ item: ItineraryItem; onClick?: () => void }> = ({ item, onClick }) => {
  const colors = typeColor[item.type];
  return (
    <div
      onClick={onClick}
      className="max-w-xs bg-white rounded-xl shadow hover:shadow-lg cursor-pointer overflow-hidden transition-shadow"
    >
      <img
        src={item.imageSrc}
        alt={item.title}
        className="w-full h-32 object-cover"
      />
      <div className="p-3">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-600">{item.subtitle}</p>
      </div>
    </div>
  );
};
