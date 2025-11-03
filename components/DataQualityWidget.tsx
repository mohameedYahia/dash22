
import React from 'react';
import { ChartContainer } from './ChartContainer';
import { DataQualityIndicator } from '../types';

interface DataQualityWidgetProps {
  indicators: DataQualityIndicator[];
}

const getStatusColor = (value: number, threshold: number, category: string) => {
  if (category === 'التوقيت') {
     return value <= threshold ? 'bg-green-600' : 'bg-red-600';
  }
  return value <= threshold ? 'bg-green-600' : 'bg-red-600';
};

export const DataQualityWidget: React.FC<DataQualityWidgetProps> = ({ indicators }) => {
  return (
    <ChartContainer title="مؤشرات جودة البيانات">
      <div className="space-y-4 pt-2">
        {indicators.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1 text-sm">
              <span className="font-semibold text-gray-700">{item.indicator}</span>
              <span className={`font-bold ${getStatusColor(item.value, item.threshold, item.category) === 'bg-green-600' ? 'text-green-700' : 'text-red-700'}`}>
                {item.value}{item.unit !== 'abs' ? item.unit : ` / ${item.threshold}h`}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${getStatusColor(item.value, item.threshold, item.category)}`}
                style={{ width: `${Math.min((item.value / (item.threshold * 1.5)) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </ChartContainer>
  );
};
