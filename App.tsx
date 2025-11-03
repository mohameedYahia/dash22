import React, { useState, useMemo } from 'react';
import { useMockData } from './hooks/useMockData';
import { DepartmentalChart } from './components/DepartmentalChart';
import { GenderEmploymentChart } from './components/GenderEmploymentChart';
import { Header } from './components/Header';
import { KpiCard } from './components/KpiCard';
import { LeaveTrendChart } from './components/LeaveTrendChart';
import { PerformanceChart } from './components/PerformanceChart';
import { Sidebar } from './components/Sidebar';
import { DataQualityWidget } from './components/DataQualityWidget';
import { WorkforceBalanceChart } from './components/WorkforceBalanceChart';
import { TrainingOverviewChart } from './components/TrainingOverviewChart';
import { TrainingEvaluationChart } from './components/TrainingEvaluationChart';
import { LeaveTypeChart } from './components/LeaveTypeChart';
import { Filters } from './types';
import { Users, UserCheck, CalendarX2, Plane, ArrowLeftRight, ExternalLink, ShieldCheck, Clock, BookOpen, Star } from 'lucide-react';

const App: React.FC = () => {
  const { 
    employees, 
    leaves,
    trainings,
    departments, 
    employmentTypes, 
    getFilteredData,
    getGenderData,
    getEmploymentTypeData,
    getLeaveTrendData,
    getLeaveTypeData,
    getPerformanceData,
    getDepartmentData,
    getDataQualityIndicators,
    getWorkforceBudgetData,
    getRelevantTrainings,
    getTrainingStatusData,
    getTrainingTypeData,
    getTrainingEvaluationByDeptData,
  } = useMockData();
  
  const [filters, setFilters] = useState<Filters>({
    department: 'all',
    employmentType: 'all',
    gender: 'all',
    status: 'all',
  });

  const filteredData = useMemo(() => getFilteredData(filters), [filters, getFilteredData]);
  const relevantTrainings = useMemo(() => getRelevantTrainings(filteredData), [filteredData, getRelevantTrainings]);

  const kpis = useMemo(() => {
    const activeEmployees = filteredData.filter(e => e.status === 'نشط');
    const absences = leaves.filter(l => l.type === 'unapproved' && filteredData.find(e => e.id === l.employeeId)).length;
    const onMission = filteredData.filter(e => e.onMission).length;
    const seconded = filteredData.filter(e => e.status === 'منتدب').length;
    const loaned = filteredData.filter(e => e.status === 'معار').length;
    const permanentGrades = filteredData.filter(e => e.employmentType === 'دائم').length;
    const lateArrivals = filteredData.reduce((acc, e) => acc + e.lateArrivals, 0);

    const trainingParticipation = new Set(relevantTrainings.map(t => t.employeeId)).size;
    const trainingParticipationRate = filteredData.length > 0 ? (trainingParticipation / filteredData.length) * 100 : 0;
    const completedTrainings = relevantTrainings.filter(t => t.status === 'مكتمل' && t.evaluationScore);
    const avgTrainingScore = completedTrainings.length > 0
        ? completedTrainings.reduce((acc, t) => acc + (t.evaluationScore || 0), 0) / completedTrainings.length
        : 0;

    return { 
      totalEmployees: employees.length,
      activeEmployees: activeEmployees.length,
      absences,
      onMission,
      seconded,
      loaned,
      permanentGrades,
      lateArrivals,
      trainingParticipationRate: `${trainingParticipationRate.toFixed(0)}%`,
      avgTrainingScore: avgTrainingScore.toFixed(2),
    };
  }, [employees.length, filteredData, leaves, relevantTrainings]);


  const genderData = useMemo(() => getGenderData(filteredData), [filteredData, getGenderData]);
  const employmentTypeData = useMemo(() => getEmploymentTypeData(filteredData), [filteredData, getEmploymentTypeData]);
  const leaveTrendData = useMemo(() => getLeaveTrendData(filteredData), [filteredData, getLeaveTrendData]);
  const leaveTypeData = useMemo(() => getLeaveTypeData(filteredData), [filteredData, getLeaveTypeData]);
  const performanceData = useMemo(() => getPerformanceData(filteredData), [filteredData, getPerformanceData]);
  const departmentData = useMemo(() => getDepartmentData(filteredData), [filteredData, getDepartmentData]);
  const dataQualityIndicators = useMemo(() => getDataQualityIndicators(), [getDataQualityIndicators]);
  const workforceBudgetData = useMemo(() => getWorkforceBudgetData(getDepartmentData(employees)), [employees, getDepartmentData, getWorkforceBudgetData]);

  const trainingStatusData = useMemo(() => getTrainingStatusData(relevantTrainings), [relevantTrainings, getTrainingStatusData]);
  const trainingTypeData = useMemo(() => getTrainingTypeData(relevantTrainings), [relevantTrainings, getTrainingTypeData]);
  const trainingEvaluationData = useMemo(() => getTrainingEvaluationByDeptData(filteredData), [filteredData, getTrainingEvaluationByDeptData]);


  return (
    <div className="bg-[#EAEFF4] min-h-screen text-gray-800">
      <div className="flex">
        <Sidebar 
          filters={filters}
          setFilters={setFilters}
          departments={departments}
          employmentTypes={employmentTypes}
        />
        <main className="flex-1 transition-all duration-300 mr-64">
          <Header />
          <div className="p-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
              <KpiCard title="إجمالي الموظفين" value={kpis.totalEmployees} icon={<Users className="w-8 h-8 text-[#01579B]" />} />
              <KpiCard title="الموظفين النشطين" value={kpis.activeEmployees} icon={<UserCheck className="w-8 h-8 text-[#2E7D32]" />} />
              <KpiCard title="الغيابات" value={kpis.absences} icon={<CalendarX2 className="w-8 h-8 text-[#C62828]" />} />
              <KpiCard title="في مأمورية" value={kpis.onMission} icon={<Plane className="w-8 h-8 text-[#00838F]" />} />
              <KpiCard title="المنتدبون" value={kpis.seconded} icon={<ArrowLeftRight className="w-8 h-8 text-[#6A1B9A]" />} />
              <KpiCard title="المعارون" value={kpis.loaned} icon={<ExternalLink className="w-8 h-8 text-[#AD1457]" />} />
              <KpiCard title="الدرجات الدائمة" value={kpis.permanentGrades} icon={<ShieldCheck className="w-8 h-8 text-[#2E7D32]" />} />
               <KpiCard title="الحضور (تأخير)" value={kpis.lateArrivals} unit="ساعة" icon={<Clock className="w-8 h-8 text-[#FBC02D]" />} />
              <KpiCard title="مشاركة بالتدريب" value={kpis.trainingParticipationRate} icon={<BookOpen className="w-8 h-8 text-[#4527A0]" />} />
              <KpiCard title="متوسط تقييم التدريب" value={kpis.avgTrainingScore} icon={<Star className="w-8 h-8 text-[#FF8F00]" />} />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <DepartmentalChart data={departmentData} />
              </div>
              <GenderEmploymentChart genderData={genderData} employmentData={employmentTypeData} />
              <div className="lg:col-span-3">
                <LeaveTrendChart data={leaveTrendData} />
              </div>
              <div className="lg:col-span-2">
                 <WorkforceBalanceChart data={workforceBudgetData} />
              </div>
              <div className="lg:col-span-1">
                 <LeaveTypeChart data={leaveTypeData} />
              </div>
              <div className="lg:col-span-3">
                <PerformanceChart data={performanceData} />
              </div>
               <div className="lg:col-span-1">
                 <TrainingOverviewChart statusData={trainingStatusData} typeData={trainingTypeData} />
              </div>
              <div className="lg:col-span-2">
                <TrainingEvaluationChart data={trainingEvaluationData} />
              </div>
               <div className="lg:col-span-3">
                 <DataQualityWidget indicators={dataQualityIndicators}/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;