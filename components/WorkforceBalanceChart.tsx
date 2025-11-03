import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from './ChartContainer';
import { WorkforceBudget } from '../types';

interface WorkforceBalanceChartProps {
  data: WorkforceBudget[];
}

export const WorkforceBalanceChart: React.FC<WorkforceBalanceChartProps> = ({ data }) => {
  return (
    <ChartContainer title="موازنة الوظائف (المعتمد مقابل الفعلي)">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ angle: -20, textAnchor: 'end', fontSize: 12 }} height={60} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="الموازنة" fill="#8884d8" />
          <Bar dataKey="الفعلي" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
