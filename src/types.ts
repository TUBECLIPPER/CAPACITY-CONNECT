export type UserRole = 'trainee' | 'trainer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  designation: string;
  department: string;
  location: string;
  avatar: string;
  profileCompletion: number; // 0 - 100
  employeeId: string;
  joinedDate: string;
  qualifications: string[];
  skills: string[];
  interests: string[];
  bio: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'Meteorology Fundamentals' | 'Climate Data Analytics' | 'Disaster Preparedness' | 'Remote Sensing & Radar' | 'Hydrological Modelling' | 'Numerical Weather Prediction' | 'AI & Satellite Tech';
  level: 'Foundational' | 'Intermediate' | 'Advanced';
  duration: string;
  modulesCount: number;
  lessonsCount: number;
  trainer: {
    id: string;
    name: string;
    designation: string;
    avatar: string;
    rating: number;
  };
  rating: number;
  ratingsCount: number;
  enrolledCount: number;
  skillsAcquired: string[];
  thumbnail: string;
  badgeIcon: string;
  isEnrolled?: boolean;
  progress?: number; // 0 - 100
  lastAccessedLesson?: string;
  syllabus: CourseModule[];
  resources: CourseResource[];
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz' | 'dataset';
  duration: string;
  completed?: boolean;
}

export interface CourseResource {
  id: string;
  title: string;
  fileType: 'pdf' | 'netcdf' | 'grib' | 'ppt' | 'zip';
  size: string;
  downloadUrl?: string;
}

export interface Assessment {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  type: 'Quiz' | 'Assignment' | 'Practical Simulation';
  dueDate: string;
  totalMarks: number;
  duration: string;
  status: 'Pending' | 'Submitted' | 'Graded' | 'Overdue';
  score?: number;
  maxScore?: number;
  feedback?: string;
  questionsCount?: number;
}

export interface Certificate {
  id: string;
  verificationId: string;
  title: string;
  courseId: string;
  recipientName: string;
  recipientRole: string;
  recipientEmployeeId: string;
  issueDate: string;
  expiryDate?: string;
  grade: string;
  scorePercentage: number;
  issuer: string;
  department: string;
  skills: string[];
  signatureName: string;
  signatureTitle: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'Important' | 'Learning' | 'Achievement' | 'Reminder';
  timestamp: string;
  author: string;
  authorRole: string;
  isRead?: boolean;
  targetRole?: 'All' | 'trainee' | 'trainer' | 'admin';
}

export interface UserApprovalItem {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  designation: string;
  employeeId: string;
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface TrainerSubmission {
  id: string;
  assessmentId: string;
  assessmentTitle: string;
  courseTitle: string;
  traineeId: string;
  traineeName: string;
  traineeAvatar: string;
  traineeDepartment: string;
  submittedAt: string;
  status: 'Pending Review' | 'Graded';
  score?: number;
  maxScore: number;
  feedback?: string;
  fileAttachment?: string;
}

export interface CompetencyScore {
  subject: string;
  score: number;
  fullMark: number;
}
