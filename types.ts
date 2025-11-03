
export interface Employee {
  id: string;
  name: string;
  gender: 'ذكر' | 'أنثى';
  age: number;
  department: string;
  jobTitle: string;
  employmentType: 'دائم' | 'عقد' | 'مؤقت';
  status: 'نشط' | 'في إجازة' | 'موقوف' | 'منتهية خدمته' | 'منتدب' | 'معار';
  hireDate: Date;
  terminationDate?: Date;
  performanceScore: number;
  salary: number;
  hasDisciplinaryAction: boolean;
  nationalId?: string;
  onMission: boolean;
  lateArrivals: number;
}

export type LeaveTypeName = 'مرضي' | 'اعتيادي' | 'عارضة' | 'بدون أجر' | 'وضع';

export interface Leave {
  employeeId: string;
  startDate: Date;
  endDate: Date;
  type: 'approved' | 'unapproved';
  leaveType: LeaveTypeName;
}

export type TrainingCourseType = 'فني' | 'مهارات ناعمة' | 'قيادة' | 'إلزامي';
export type TrainingStatus = 'مكتمل' | 'ملتحق';

export interface Training {
  id: string;
  employeeId: string;
  courseName: string;
  type: TrainingCourseType;
  status: TrainingStatus;
  enrollmentDate: Date;
  completionDate?: Date;
  evaluationScore?: number;
}

export interface Filters {
  department: string;
  employmentType: string;
  gender: string;
  status: string;
}

export interface DataQualityIndicator {
  category: string;
  indicator: string;
  value: number;
  threshold: number;
  unit: '%' | 'ms' | 'abs';
}

export interface WorkforceBudget {
    name: string;
    'الموازنة': number;
    'الفعلي': number;
}