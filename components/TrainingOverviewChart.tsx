import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartContainer } from './ChartContainer';
import { TrainingCourseType, TrainingStatus } from '../types';

interface ChartData {
  name: string;
  value: number;
}

interface TrainingOverviewChartProps {
  statusData: { name: TrainingStatus, value: number }[];
  typeData: { name: TrainingCourseType, value: number }[];
}

const STATUS_COLORS = ['#2E7D32', '#FBC02D'];
const TYPE_COLORS = ['#01579B', '#00838F', '#6A1B9A', '#AD1457'];

const CustomPieChart: React.FC<{ data: ChartData[]; colors: string[]; title: string }> = ({ data, colors, title }) => (
  <div className="flex flex-col items-center h-1/2">
    <h4 className="text-md font-semibold text-gray-600 mb-1">{title}</h4>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={70}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`${value} دورة`, name]} />
        <Legend iconType="circle" />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export const TrainingOverviewChart: React.FC<TrainingOverviewChartProps> = ({ statusData, typeData }) => {
  return (
    <ChartContainer title="نظرة عامة على التدريب">
      <div className="h-full flex flex-col">
        <CustomPieChart data={statusData} colors={STATUS_COLORS} title="حالة الدورات" />
        <CustomPieChart data={typeData} colors={TYPE_COLORS} title="أنواع الدورات" />
      </div>
    </ChartContainer>
  );
};
