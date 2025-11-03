import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer } from './ChartContainer';

interface LeaveTypeChartProps {
  data: { name: string; value: number }[];
}

export const LeaveTypeChart: React.FC<LeaveTypeChartProps> = ({ data }) => {
  return (
    <ChartContainer title="توزيع الإجازات حسب النوع">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" allowDecimals={false} />
          <YAxis dataKey="name" type="category" width={80} tick={{ fill: '#333' }}/>
          <Tooltip cursor={{fill: 'rgba(234, 239, 244, 0.5)'}} formatter={(value) => [`${value} طلب`, 'العدد']} />
          <Legend />
          <Bar dataKey="value" name="عدد الطلبات" fill="#00838F" barSize={15} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};