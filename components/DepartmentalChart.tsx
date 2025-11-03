
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from './ChartContainer';

interface DepartmentalChartProps {
  data: { name: string; 'عدد الموظفين': number }[];
}

export const DepartmentalChart: React.FC<DepartmentalChartProps> = ({ data }) => {
  return (
    <ChartContainer title="توزيع الموظفين حسب الإدارة">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" allowDecimals={false} />
          <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#333' }}/>
          <Tooltip cursor={{fill: 'rgba(234, 239, 244, 0.5)'}} formatter={(value) => [`${value} موظف`, 'العدد']} />
          <Legend />
          <Bar dataKey="عدد الموظفين" fill="#01579B" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
