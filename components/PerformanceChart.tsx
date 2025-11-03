
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from './ChartContainer';

interface PerformanceChartProps {
  data: { name: string; 'متوسط التقييم': number }[];
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  return (
    <ChartContainer title="متوسط تقييم الأداء حسب الإدارة">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ angle: -20, textAnchor: 'end', fontSize: 12 }} height={60} />
          <YAxis domain={[0, 5]} />
          <Tooltip formatter={(value) => [value, 'المتوسط']} />
          <Legend />
          <Bar dataKey="متوسط التقييم" fill="#FBC02D" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
