import { useMemo } from 'react';
import { Employee, Leave, Filters, DataQualityIndicator, WorkforceBudget, Training, TrainingStatus, TrainingCourseType, LeaveTypeName } from '../types';

const DEPARTMENTS = ['تكنولوجيا المعلومات', 'الموارد البشرية', 'المالية', 'العمليات', 'التسويق', 'الهندسة'];
const JOB_TITLES = ['مدير', 'محلل', 'مطور', 'مهندس', 'منسق', 'اخصائي'];
const EMPLOYMENT_TYPES: ('دائم' | 'عقد' | 'مؤقت')[] = ['دائم', 'عقد', 'مؤقت'];
const STATUSES: ('نشط' | 'في إجازة' | 'موقوف' | 'منتهية خدمته' | 'منتدب' | 'معار')[] = ['نشط', 'في إجازة', 'موقوف', 'منتهية خدمته', 'منتدب', 'معار'];
const NAMES_MALE = ['محمد', 'أحمد', 'علي', 'عمر', 'خالد', 'يوسف', 'سعيد', 'طارق', 'حسن', 'عبدالله'];
const NAMES_FEMALE = ['فاطمة', 'مريم', 'عائشة', 'سارة', 'نور', 'هدى', 'زينب', 'ليلى', 'حنان', 'إيمان'];
const LAST_NAMES = ['المصري', 'الشامي', 'العراقي', 'السيد', 'عبدالعزيز', 'الهاشمي', 'القحطاني', 'الغامدي'];

const TRAINING_COURSE_NAMES = ['مقدمة في الأمن السيبراني', 'التواصل الفعال', 'إدارة المشاريع الاحترافية', 'أساسيات التسويق الرقمي', 'البرمجة بلغة بايثون', 'القيادة التنفيذية'];
const TRAINING_TYPES: TrainingCourseType[] = ['فني', 'مهارات ناعمة', 'قيادة', 'إلزامي'];
const LEAVE_TYPES: LeaveTypeName[] = ['مرضي', 'اعتيادي', 'عارضة', 'بدون أجر', 'وضع'];


const generateEmployees = (count: number): Employee[] => {
  const employees: Employee[] = [];
  for (let i = 0; i < count; i++) {
    const gender = Math.random() > 0.4 ? 'ذكر' : 'أنثى';
    const firstName = gender === 'ذكر' ? NAMES_MALE[Math.floor(Math.random() * NAMES_MALE.length)] : NAMES_FEMALE[Math.floor(Math.random() * NAMES_FEMALE.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const hireDate = new Date(2015 + Math.random() * 8, Math.random() * 12, 1);
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    const hasNationalId = Math.random() > 0.03;

    employees.push({
      id: `EMP${1000 + i}`,
      name: `${firstName} ${lastName}`,
      gender,
      age: 25 + Math.floor(Math.random() * 35),
      department: DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)],
      jobTitle: JOB_TITLES[Math.floor(Math.random() * JOB_TITLES.length)],
      employmentType: EMPLOYMENT_TYPES[Math.floor(Math.random() * EMPLOYMENT_TYPES.length)],
      status: status,
      hireDate,
      terminationDate: status === 'منتهية خدمته' ? new Date(hireDate.getTime() + Math.random() * (new Date().getTime() - hireDate.getTime())) : undefined,
      performanceScore: 1 + Math.random() * 4,
      salary: 50000 + Math.random() * 100000,
      hasDisciplinaryAction: Math.random() < 0.15,
      nationalId: hasNationalId ? Math.floor(10000000000000 + Math.random() * 90000000000000).toString() : undefined,
      onMission: Math.random() < 0.1,
      lateArrivals: Math.floor(Math.random() * 10),
    });
  }
  return employees;
};

const generateLeaves = (employees: Employee[]): Leave[] => {
  const leaves: Leave[] = [];
  employees.forEach(emp => {
    if (Math.random() > 0.3) {
      for (let i = 0; i < Math.random() * 5; i++) {
        const startDate = new Date(new Date().getFullYear(), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
        const endDate = new Date(startDate.getTime() + (1 + Math.random() * 10) * 86400000);
        leaves.push({
          employeeId: emp.id,
          startDate,
          endDate,
          type: Math.random() > 0.15 ? 'approved' : 'unapproved',
          leaveType: LEAVE_TYPES[Math.floor(Math.random() * LEAVE_TYPES.length)],
        });
      }
    }
  });
  return leaves;
};

const generateTrainings = (employees: Employee[]): Training[] => {
  const trainings: Training[] = [];
  let trainingId = 0;
  employees.forEach(emp => {
    if (Math.random() > 0.4) { // 60% of employees have training
      const numCourses = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < numCourses; i++) {
        const status: TrainingStatus = Math.random() > 0.3 ? 'مكتمل' : 'ملتحق';
        const enrollmentDate = new Date(emp.hireDate.getTime() + Math.random() * (new Date().getTime() - emp.hireDate.getTime()));
        const completionDate = status === 'مكتمل' ? new Date(enrollmentDate.getTime() + (30 * 86400000 * Math.random())) : undefined;

        trainings.push({
          id: `TRN${100 + trainingId++}`,
          employeeId: emp.id,
          courseName: TRAINING_COURSE_NAMES[Math.floor(Math.random() * TRAINING_COURSE_NAMES.length)],
          type: TRAINING_TYPES[Math.floor(Math.random() * TRAINING_TYPES.length)],
          status,
          enrollmentDate,
          completionDate,
          evaluationScore: status === 'مكتمل' ? 2.5 + Math.random() * 2.5 : undefined,
        });
      }
    }
  });
  return trainings;
};


export const useMockData = () => {
  const employees = useMemo(() => generateEmployees(250), []);
  const leaves = useMemo(() => generateLeaves(employees), [employees]);
  const trainings = useMemo(() => generateTrainings(employees), [employees]);

  const getFilteredData = (filters: Filters): Employee[] => {
    return employees.filter(e => 
      (filters.department === 'all' || e.department === filters.department) &&
      (filters.employmentType === 'all' || e.employmentType === filters.employmentType) &&
      (filters.gender === 'all' || e.gender === filters.gender) &&
      (filters.status === 'all' || e.status === filters.status)
    );
  };
  
  const getGenderData = (data: Employee[]) => {
    const counts = data.reduce((acc, e) => {
      acc[e.gender] = (acc[e.gender] || 0) + 1;
      return acc;
    }, {} as Record<'ذكر' | 'أنثى', number>);
    return [{ name: 'ذكر', value: counts['ذكر'] || 0 }, { name: 'أنثى', value: counts['أنثى'] || 0 }];
  };

  const getEmploymentTypeData = (data: Employee[]) => {
    const counts = data.reduce((acc, e) => {
      acc[e.employmentType] = (acc[e.employmentType] || 0) + 1;
      return acc;
    }, {} as Record<'دائم' | 'عقد' | 'مؤقت', number>);
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const getLeaveTrendData = (data: Employee[]) => {
    const employeeIds = new Set(data.map(e => e.id));
    const relevantLeaves = leaves.filter(l => employeeIds.has(l.employeeId));
    
    const monthlyData: Record<string, { approved: number, unapproved: number }> = {};
    const monthNames = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

    for(let i=0; i<12; i++) {
        monthlyData[monthNames[i]] = { approved: 0, unapproved: 0 };
    }

    relevantLeaves.forEach(leave => {
        const month = leave.startDate.getMonth();
        const monthName = monthNames[month];
        if (leave.type === 'approved') {
            monthlyData[monthName].approved++;
        } else {
            monthlyData[monthName].unapproved++;
        }
    });

    return Object.entries(monthlyData).map(([month, values]) => ({
      month,
      'إجازات معتمدة': values.approved,
      'غياب غير معتمد': values.unapproved,
    }));
  };
  
  const getLeaveTypeData = (data: Employee[]) => {
    const employeeIds = new Set(data.map(e => e.id));
    const relevantLeaves = leaves.filter(l => employeeIds.has(l.employeeId) && l.type === 'approved');

    const counts = relevantLeaves.reduce((acc, l) => {
        acc[l.leaveType] = (acc[l.leaveType] || 0) + 1;
        return acc;
    }, {} as Record<LeaveTypeName, number>);
    
    return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);
  };

  const getPerformanceData = (data: Employee[]) => {
    const departmentScores = data.reduce((acc, e) => {
        if (!acc[e.department]) {
            acc[e.department] = { totalScore: 0, count: 0 };
        }
        acc[e.department].totalScore += e.performanceScore;
        acc[e.department].count++;
        return acc;
    }, {} as Record<string, { totalScore: number, count: number }>);

    return Object.entries(departmentScores).map(([department, scores]) => ({
        name: department,
        'متوسط التقييم': parseFloat((scores.totalScore / scores.count).toFixed(2)),
    })).sort((a, b) => b['متوسط التقييم'] - a['متوسط التقييم']);
  };

  const getDepartmentData = (data: Employee[]) => {
    const counts = data.reduce((acc, e) => {
        acc[e.department] = (acc[e.department] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(counts).map(([name, count]) => ({
        name,
        'عدد الموظفين': count,
    })).sort((a, b) => b['عدد الموظفين'] - a['عدد الموظفين']);
  };
  
  const getWorkforceBudgetData = (departmentData: {name: string, 'عدد الموظفين': number}[]): WorkforceBudget[] => {
      return departmentData.map(d => {
          const actual = d['عدد الموظفين'];
          const budgetVariance = 0.8 + Math.random() * 0.4; // between 80% and 120%
          // FIX: Explicitly convert `actual` to a number to prevent type errors during arithmetic operations.
          const budgeted = Math.round(Number(actual) * budgetVariance);
          return {
              name: d.name,
              'الموازنة': budgeted,
              'الفعلي': actual,
          }
      });
  }

  const getDataQualityIndicators = (): DataQualityIndicator[] => {
    const missingNatId = (employees.filter(e => !e.nationalId).length / employees.length) * 100;
    return [
      { category: 'الاكتمال', indicator: '% الرقم القومي مفقود', value: parseFloat(missingNatId.toFixed(1)), threshold: 2, unit: '%' },
      { category: 'الدقة', indicator: '% توظيف غير متطابق', value: 0.8, threshold: 1, unit: '%' },
      { category: 'الاتساق', indicator: 'موظف غير نشط براتب فعال', value: 0.4, threshold: 0, unit: '%' },
      { category: 'التوقيت', indicator: 'تأخير تحديث البيانات', value: 18, threshold: 24, unit: 'abs' },
    ];
  };
  
  const getRelevantTrainings = (filteredEmployees: Employee[]) => {
      const employeeIds = new Set(filteredEmployees.map(e => e.id));
      return trainings.filter(t => employeeIds.has(t.employeeId));
  }

  const getTrainingStatusData = (relevantTrainings: Training[]) => {
      const counts = relevantTrainings.reduce((acc, t) => {
          acc[t.status] = (acc[t.status] || 0) + 1;
          return acc;
      }, {} as Record<TrainingStatus, number>);
      return [{ name: 'مكتمل', value: counts['مكتمل'] || 0 }, { name: 'ملتحق', value: counts['ملتحق'] || 0 }];
  };

  const getTrainingTypeData = (relevantTrainings: Training[]) => {
      const counts = relevantTrainings.reduce((acc, t) => {
          acc[t.type] = (acc[t.type] || 0) + 1;
          return acc;
      }, {} as Record<TrainingCourseType, number>);
      return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const getTrainingEvaluationByDeptData = (filteredEmployees: Employee[]) => {
      const relevantTrainings = getRelevantTrainings(filteredEmployees).filter(t => t.status === 'مكتمل' && t.evaluationScore);
      
      const departmentScores: Record<string, { totalScore: number, count: number }> = {};

      filteredEmployees.forEach(emp => {
          if (!departmentScores[emp.department]) {
              departmentScores[emp.department] = { totalScore: 0, count: 0 };
          }
      });
      
      relevantTrainings.forEach(training => {
          const employee = employees.find(e => e.id === training.employeeId);
          if (employee && departmentScores[employee.department]) {
              departmentScores[employee.department].totalScore += training.evaluationScore!;
              departmentScores[employee.department].count++;
          }
      });
      
      return Object.entries(departmentScores).map(([department, scores]) => ({
          name: department,
          'متوسط تقييم التدريب': scores.count > 0 ? parseFloat((scores.totalScore / scores.count).toFixed(2)) : 0,
      })).sort((a, b) => b['متوسط تقييم التدريب'] - a['متوسط تقييم التدريب']);
  };


  return { 
    employees, 
    leaves, 
    trainings,
    departments: DEPARTMENTS,
    employmentTypes: EMPLOYMENT_TYPES,
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
  };
};