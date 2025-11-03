import React from 'react';
import { Filters } from '../types';
import { SlidersHorizontal } from 'lucide-react';

interface SidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  departments: string[];
  employmentTypes: string[];
}

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="font-semibold text-white mb-2">{title}</h3>
    {children}
  </div>
);

export const Sidebar: React.FC<SidebarProps> = ({ filters, setFilters, departments, employmentTypes }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <aside className="fixed top-0 right-0 h-full bg-[#01579B] text-white w-64 p-5 shadow-lg z-10">
      <div className="flex items-center mb-8">
        <SlidersHorizontal className="w-8 h-8 text-[#FBC02D] ml-3" />
        <h2 className="text-2xl font-bold">الفلاتر</h2>
      </div>

      <FilterSection title="الإدارة / المديرية">
        <select
          name="department"
          value={filters.department}
          onChange={handleFilterChange}
          className="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#FBC02D]"
        >
          <option value="all">الكل</option>
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </FilterSection>

      <FilterSection title="نوع التوظيف">
        <select
          name="employmentType"
          value={filters.employmentType}
          onChange={handleFilterChange}
          className="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#FBC02D]"
        >
          <option value="all">الكل</option>
          {employmentTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </FilterSection>
      
      <FilterSection title="الجنس">
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
          className="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#FBC02D]"
        >
          <option value="all">الكل</option>
          <option value="ذكر">ذكر</option>
          <option value="أنثى">أنثى</option>
        </select>
      </FilterSection>

      <FilterSection title="الحالة الوظيفية">
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#FBC02D]"
        >
          <option value="all">الكل</option>
          <option value="نشط">نشط</option>
          <option value="في إجازة">في إجازة</option>
          <option value="موقوف">موقوف</option>
          <option value="منتهية خدمته">منتهية خدمته</option>
          <option value="منتدب">منتدب</option>
          <option value="معار">معار</option>
        </select>
      </FilterSection>
    </aside>
  );
};
