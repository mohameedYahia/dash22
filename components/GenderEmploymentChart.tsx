
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartContainer } from './ChartContainer';

interface ChartData {
  name: string;
  value: number;
}

interface GenderEmploymentChartProps {
  genderData: ChartData[];
  employmentData: ChartData[];
}

const GENDER_COLORS = ['#01579B', '#FBC02D'];
const EMPLOYMENT_COLORS = ['#2E7D32', '#01579B', '#C62828'];

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
        <Tooltip formatter={(value, name) => [`${value} (${((value as number / data.reduce((s, p) => s + p.value, 0)) * 100).toFixed(1)}%)`, name]} />
        <Legend iconType="circle" />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export const GenderEmploymentChart: React.FC<GenderEmploymentChartProps> = ({ genderData, employmentData }) => {
  return (
    <ChartContainer title="التركيبة السكانية والوظيفية">
      <div className="h-full flex flex-col">
        <CustomPieChart data={genderData} colors={GENDER_COLORS} title="التوزيع حسب الجنس" />
        <CustomPieChart data={employmentData} colors={EMPLOYMENT_COLORS} title="التوزيع حسب نوع التوظيف" />
      </div>
    </ChartContainer>
  );
};
