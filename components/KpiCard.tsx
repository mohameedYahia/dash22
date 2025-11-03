
import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  unit?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon, unit }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm flex items-center justify-between border border-gray-200">
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-3xl font-bold text-[#01579B]">
            {value}
            {unit && <span className="text-lg font-semibold text-gray-600 mr-1">{unit}</span>}
        </p>
      </div>
      <div className="bg-gray-100 p-3 rounded-full">
        {icon}
      </div>
    </div>
  );
};
