
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from './ChartContainer';

interface LeaveTrendChartProps {
  data: { month: string; 'إجازات معتمدة': number; 'غياب غير معتمد': number }[];
}

export const LeaveTrendChart: React.FC<LeaveTrendChartProps> = ({ data }) => {
  return (
    <ChartContainer title="مؤشر الإجازات والغياب (شهري)">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="إجازات معتمدة" stroke="#2E7D32" strokeWidth={2} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="غياب غير معتمد" stroke="#C62828" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
