import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from './ChartContainer';

interface TrainingEvaluationChartProps {
  data: { name: string; 'متوسط تقييم التدريب': number }[];
}

export const TrainingEvaluationChart: React.FC<TrainingEvaluationChartProps> = ({ data }) => {
  return (
    <ChartContainer title="متوسط تقييم التدريب حسب الإدارة">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ angle: -20, textAnchor: 'end', fontSize: 12 }} height={60} />
          <YAxis domain={[0, 5]} />
          <Tooltip formatter={(value) => [value, 'المتوسط']} />
          <Legend />
          <Bar dataKey="متوسط تقييم التدريب" fill="#4527A0" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
