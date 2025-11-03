
import React from 'react';

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ title, children }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm h-full border border-gray-200">
      <h3 className="text-md font-bold text-[#01579B] mb-4">{title}</h3>
      <div className="h-80">
        {children}
      </div>
    </div>
  );
};
