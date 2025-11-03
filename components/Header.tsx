
import React from 'react';
import { UserCircle } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b-2 border-gray-200 p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-[#01579B]">لوحة معلومات الموارد البشرية</h1>
      <div className="flex items-center space-x-2 space-x-reverse">
        <span className="text-gray-600">مدير الموارد البشرية</span>
        <UserCircle className="w-8 h-8 text-gray-400" />
      </div>
    </header>
  );
};
