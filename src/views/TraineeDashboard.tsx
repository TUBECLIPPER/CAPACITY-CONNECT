import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  PlayCircle, 
  Sparkles, 
  FileText,
  Compass,
  ExternalLink,
  Target
} from 'lucide-react';
import { User, Course, Assessment, Certificate, Announcement, CompetencyScore } from '../types';
import { CircularProgress, CompetencyRadar, WeeklyActivityChart } from '../components/common/Charts';
import { WEEKLY_ACTIVITY, COMPETENCY_SCORES } from '../data/mockData';

interface TraineeDashboardProps {
  user: User;
  courses: Course[];
  assessments: Assessment[];
  certificates: Certificate[];
  announcements: Announcement[];
  onSelectCourse: (course: Course) => void;
  onNavigateTab: (tab: string) => void;
}

export const TraineeDashboard: React.FC<TraineeDashboardProps> = ({
  user,
  courses = [],
  assessments = [],
  certificates = [],
  announcements = [],
  onSelectCourse,
  onNavigateTab
}) => {
  const safeCourses = Array.isArray(courses) ? courses : [];
  const safeAssessments = Array.isArray(assessments) ? assessments : [];
  const safeCertificates = Array.isArray(certificates) ? certificates : [];
  const safeAnnouncements = Array.isArray(announcements) ? announcements : [];

  const enrolledCourses = safeCourses.filter(c => c?.isEnrolled);
  const activeCourse = enrolledCourses.find(c => c?.progress && c.progress > 0 && c.progress < 100) || enrolledCourses[0];
  const pendingAssessments = safeAssessments.filter(a => a?.status === 'Pending');

  // Overall calculations
  const totalCompletedCourses = enrolledCourses.filter(c => c?.progress === 100).length;
  const avgProgress = enrolledCourses.length 
    ? Math.round(enrolledCourses.reduce((acc, c) => acc + (c?.progress || 0), 0) / enrolledCourses.length) 
    : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. WELCOME BANNER */}
      <div className="bg-gradient-to-r from-[#102A43] to-[#2457C5] rounded-[24px] p-6 sm:p-8 text-white relative overflow-hidden shadow-xl"> 
        <div className="relative z-10 sm:w-3/5"> 
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-semibold border border-white/10 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#12A594] animate-pulse" />
            <span>Operational Trainee Cockpit</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">
            Build Skills. Strengthen Capacity.<br />Shape Tomorrow.
          </h2> 
          <p className="text-white/80 text-xs sm:text-sm mb-6 leading-relaxed">
            Welcome back, {user.name}. You have {pendingAssessments.length} assessments due this week and {certificates.length} verified certifications under the Ministry of Earth Sciences.
          </p> 
          <div className="flex flex-wrap gap-3"> 
            {activeCourse ? (
              <button 
                onClick={() => onSelectCourse(activeCourse)}
                className="bg-[#12A594] hover:bg-[#0f8c7d] text-white px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-[#12A594]/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Resume Learning</span>
              </button> 
            ) : (
              <button 
                onClick={() => onNavigateTab('catalog')}
                className="bg-[#12A594] hover:bg-[#0f8c7d] text-white px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-[#12A594]/20 transition-all cursor-pointer"
              >
                Browse Courses
              </button>
            )}
            <button 
              onClick={() => onNavigateTab('assessments')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              View Roadmap
            </button> 
          </div> 
        </div> 
        
        {/* Abstract SVG Pattern Background */}
        <div className="absolute right-[-20px] top-[-20px] w-80 h-80 opacity-10 pointer-events-none"> 
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"> 
            <path fill="#FFFFFF" d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.3,87,-15.7,86.6,-0.2C86.2,15.3,82.1,30.5,74.5,43.5C66.9,56.5,55.8,67.3,42.5,74.5C29.2,81.7,14.6,85.3,-0.2,85.7C-15,86,-29.9,83.1,-43.3,76.1C-56.7,69.1,-68.5,58,-76.2,44.5C-83.9,31,-87.4,15.5,-87,0.2C-86.6,-15.1,-82.3,-30.2,-74.3,-43.3C-66.3,-56.4,-54.6,-67.5,-41,-74.6C-27.4,-81.7,-13.7,-84.8,0.5,-85.6C14.7,-86.4,29.4,-84.9,44.7,-76.4Z" transform="translate(100 100)" /> 
          </svg> 
        </div> 

        {/* Weekly Activity Mini Card on Hero */}
        <div className="hidden lg:block absolute right-8 bottom-0 w-64 h-48 bg-white/10 backdrop-blur-xl border border-white/20 rounded-t-3xl p-5"> 
          <div className="flex items-center justify-between mb-3"> 
            <span className="text-xs font-bold tracking-wider text-white">WEEKLY ACTIVITY</span> 
            <span className="text-[10px] text-white/70 font-mono">22.3 HRS</span> 
          </div> 
          <div className="flex items-end space-x-3 h-20"> 
            <div className="flex-1 bg-white/20 h-1/2 rounded-t-sm" title="Mon: 3.5h"></div> 
            <div className="flex-1 bg-white/40 h-3/4 rounded-t-sm" title="Tue: 4.8h"></div> 
            <div className="flex-1 bg-white/20 h-1/3 rounded-t-sm" title="Wed: 2.1h"></div> 
            <div className="flex-1 bg-[#12A594] h-full rounded-t-sm shadow-sm" title="Thu: 6.0h"></div> 
            <div className="flex-1 bg-white/20 h-1/2 rounded-t-sm" title="Fri: 3.2h"></div> 
          </div> 
          <div className="mt-3 flex items-center justify-between text-[10px] text-white/80 border-t border-white/10 pt-2">
            <span>Profile: {user.profileCompletion}%</span>
            <span className="text-[#12A594] font-bold cursor-pointer hover:underline" onClick={() => onNavigateTab('profile')}>Edit &rarr;</span>
          </div>
        </div> 
      </div>

      {/* 2. STATS 4-COLUMN GRID FROM DESIGN */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"> 
        <div className="bg-white rounded-2xl p-5 border border-[#D9E2EC] shadow-xs hover:border-[#2457C5]/40 transition-all"> 
          <p className="text-[#829AB1] text-[10px] font-bold uppercase tracking-widest mb-1">Courses Enrolled</p> 
          <h3 className="text-2xl font-bold text-[#102A43]">{enrolledCourses.length}</h3> 
          <div className="flex items-center text-[#12A594] text-[10px] font-bold mt-2"> 
            <span className="mr-1">↑</span> <span>2 New this month</span> 
          </div> 
        </div> 
        <div className="bg-white rounded-2xl p-5 border border-[#D9E2EC] shadow-xs hover:border-[#2457C5]/40 transition-all"> 
          <p className="text-[#829AB1] text-[10px] font-bold uppercase tracking-widest mb-1">Hours Learned</p> 
          <h3 className="text-2xl font-bold text-[#102A43]">48.5</h3> 
          <div className="flex items-center text-[#2457C5] text-[10px] font-bold mt-2"> 
            <span className="mr-1">•</span> <span>Top 5% of Dept.</span> 
          </div> 
        </div> 
        <div className="bg-white rounded-2xl p-5 border border-[#D9E2EC] shadow-xs hover:border-[#2457C5]/40 transition-all"> 
          <p className="text-[#829AB1] text-[10px] font-bold uppercase tracking-widest mb-1">Avg. Score</p> 
          <h3 className="text-2xl font-bold text-[#102A43]">{avgProgress}%</h3> 
          <div className="flex items-center text-[#F59E0B] text-[10px] font-bold mt-2"> 
            <span className="mr-1">⭐</span> <span>Expert Level</span> 
          </div> 
        </div> 
        <div className="bg-white rounded-2xl p-5 border border-[#D9E2EC] shadow-xs hover:border-[#2457C5]/40 transition-all"> 
          <p className="text-[#829AB1] text-[10px] font-bold uppercase tracking-widest mb-1">Certificates</p> 
          <h3 className="text-2xl font-bold text-[#102A43]">{certificates.length > 9 ? certificates.length : `0${certificates.length}`}</h3> 
          <div className="flex items-center text-[#12A594] text-[10px] font-bold mt-2"> 
            <span className="mr-1">✓</span> <span>Verified ID</span> 
          </div> 
        </div> 
      </div> 

      {/* 3. CONTINUE LEARNING SPOTLIGHT CARD */}
      {activeCourse && (
        <div className="bg-white rounded-2xl p-6 border border-[#D9E2EC] shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-[#F0F4F8] text-[#2457C5] flex items-center justify-center shrink-0 border border-[#D9E2EC]">
                <PlayCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#F0F4F8] text-[#2457C5]">
                    In Progress • Module 2
                  </span>
                  <span className="text-xs text-[#829AB1]">• {activeCourse.category}</span>
                </div>
                <h3 className="text-lg font-bold text-[#102A43] hover:text-[#2457C5] cursor-pointer" onClick={() => onSelectCourse(activeCourse)}>
                  {activeCourse.title}
                </h3>
                <p className="text-xs text-[#486581] font-medium">
                  Next Up: <span className="text-[#102A43] font-bold">{activeCourse.lastAccessedLesson}</span>
                </p>
                <div className="w-full max-w-md pt-2">
                  <div className="flex items-center justify-between text-xs text-[#829AB1] mb-1">
                    <span>Overall Course Completion</span>
                    <span className="font-bold text-[#2457C5]">{activeCourse.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#F0F4F8] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#2457C5] to-[#12A594] rounded-full transition-all duration-700"
                      style={{ width: `${activeCourse.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectCourse(activeCourse)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2457C5] to-[#102A43] text-white text-xs font-bold shadow-md hover:opacity-95 transition-all flex items-center gap-2 self-start md:self-center shrink-0 cursor-pointer"
            >
              <span>Resume Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4. METRICS OVERVIEW & WEEKLY PROGRESS VISUALIZATION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Activity Hours Graph (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#D9E2EC] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#102A43] flex items-center gap-2">
                <span>Weekly Operational Learning Activity</span>
                <span className="px-2 py-0.5 text-[10px] bg-emerald-50 text-emerald-700 font-bold rounded">
                  Goal Exceeded
                </span>
              </h3>
              <p className="text-xs text-[#829AB1]">Track study time on radar cases, WRF simulations, and synoptic maps</p>
            </div>
            <span className="text-sm font-black text-[#102A43]">22.3 Total Hrs</span>
          </div>

          <WeeklyActivityChart data={WEEKLY_ACTIVITY} />
        </div>

        {/* Circular Progress Metrics & Stats (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#D9E2EC] shadow-xs flex flex-col justify-between space-y-6">
          <h3 className="text-sm font-bold text-[#102A43]">Curriculum Performance</h3>
          
          <div className="flex items-center justify-around py-2">
            <div className="text-center">
              <CircularProgress
                percentage={avgProgress}
                size={96}
                strokeWidth={8}
                color="#2457C5"
                label={`${avgProgress}%`}
                sublabel="Avg Enrolled"
              />
            </div>
            <div className="text-center">
              <CircularProgress
                percentage={Math.round((totalCompletedCourses / (enrolledCourses.length || 1)) * 100)}
                size={96}
                strokeWidth={8}
                color="#12A594"
                label={`${totalCompletedCourses}/${enrolledCourses.length}`}
                sublabel="Graduated"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#D9E2EC]/60 text-xs">
            <div className="flex items-center justify-between text-[#486581]">
              <span>Earned WMO Credentials</span>
              <strong className="text-[#102A43]">{certificates.length} Certificates</strong>
            </div>
            <div className="flex items-center justify-between text-[#486581]">
              <span>Upcoming Operational Quizzes</span>
              <strong className="text-[#2457C5]">{pendingAssessments.length} Tests</strong>
            </div>
          </div>
        </div>

      </div>

      {/* 5. COMPETENCY RADAR / SKILL MAP & UPCOMING ASSESSMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Competency Radar (6 Cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-[#D9E2EC] shadow-xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-[#102A43]">Meteorological Competency Map</h3>
              <p className="text-xs text-[#829AB1]">Evaluated against WMO Quality Management Standards</p>
            </div>
            <span className="text-xs font-bold text-[#12A594] bg-[#F0F4F8] px-2.5 py-1 rounded-lg border border-[#D9E2EC]">Overall: 84/100</span>
          </div>

          <CompetencyRadar data={COMPETENCY_SCORES} size={280} />

          <div className="w-full pt-4 border-t border-[#D9E2EC]/60 flex items-center justify-between text-[11px] text-[#486581]">
            <span>Strongest: <strong className="text-[#2457C5]">Numerical Models (94%)</strong></span>
            <span>Improvement Goal: <strong className="text-amber-700">Hydrometeorology (70%)</strong></span>
          </div>
        </div>

        {/* Upcoming Assessments & Deadlines (6 Cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-[#D9E2EC] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#102A43]">Assessments &amp; Practical Diagnostics</h3>
                <p className="text-xs text-[#829AB1]">Pending simulator reviews and graded quizzes</p>
              </div>
              <button
                onClick={() => onNavigateTab('assessments')}
                className="text-xs text-[#2457C5] font-bold hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {assessments.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-[#D9E2EC] hover:border-[#2457C5] bg-[#F0F4F8]/50 transition-all flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        item.type === 'Practical Simulation' ? 'bg-indigo-50 text-indigo-700' :
                        item.type === 'Quiz' ? 'bg-blue-50 text-blue-700' :
                        'bg-teal-50 text-teal-700'
                      }`}>
                        {item.type}
                      </span>
                      <span className="text-[10px] text-[#829AB1]">Due: {item.dueDate}</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#102A43] line-clamp-1">{item.title}</h4>
                    <p className="text-[11px] text-[#486581] line-clamp-1">{item.courseTitle}</p>
                  </div>

                  <div className="text-right shrink-0">
                    {item.status === 'Graded' ? (
                      <span className="inline-block px-2 py-1 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Score: {item.score}/{item.maxScore}
                      </span>
                    ) : (
                      <button
                        onClick={() => onNavigateTab('assessments')}
                        className="px-2.5 py-1 rounded bg-[#2457C5] text-white text-[10px] font-bold hover:bg-blue-700 transition-colors cursor-pointer"
                      >
                        Start Test
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#D9E2EC]/60 flex items-center justify-between text-xs text-[#829AB1]">
            <span>Mandatory minimum pass mark: 80%</span>
            <span className="text-[#12A594] font-semibold">Faculty feedback enabled</span>
          </div>
        </div>

      </div>

      {/* 6. ENROLLED COURSES ROW */}
      <div className="bg-white rounded-2xl p-6 border border-[#D9E2EC] shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-[#102A43]">My Enrolled Courses ({enrolledCourses.length})</h3>
            <p className="text-xs text-[#829AB1]">Active meteorological learning programs and certifications</p>
          </div>
          <button
            onClick={() => onNavigateTab('catalog')}
            className="text-xs font-bold text-[#2457C5] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Explore More Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => onSelectCourse(course)}
              className="rounded-2xl border border-[#D9E2EC] bg-white hover:border-[#2457C5] hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between overflow-hidden group"
            >
              <div className="h-2 w-full bg-[#12A594]"></div>
              <div className="h-36 relative overflow-hidden bg-slate-900">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-white/95 text-[#102A43]">
                  {course.category}
                </span>
                <span className="absolute bottom-2.5 right-2.5 text-xs text-white font-bold bg-black/60 px-2 py-0.5 rounded">
                  {course.progress}%
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#102A43] group-hover:text-[#2457C5] transition-colors line-clamp-2 mb-2">
                    {course.title}
                  </h4>
                  <div className="w-full h-1.5 bg-[#F0F4F8] rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-[#2457C5] to-[#12A594] rounded-full"
                      style={{ width: `${course.progress || 0}%` }}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D9E2EC]/60 flex items-center justify-between text-xs text-[#829AB1]">
                  <span>{course.modulesCount} Modules</span>
                  <span className="font-bold text-[#2457C5] group-hover:underline">
                    {course.progress === 100 ? 'Review Course' : 'Continue Learning'} &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. RECENT CERTIFICATES & RECOMMENDED COURSES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Certificates (6 Cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-[#D9E2EC] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#102A43]">Earned Official Certificates</h3>
                <p className="text-xs text-[#829AB1]">Verified credentials issued under Ministry of Earth Sciences</p>
              </div>
              <button
                onClick={() => onNavigateTab('certificates')}
                className="text-xs text-[#2457C5] font-bold hover:underline cursor-pointer"
              >
                All Certificates
              </button>
            </div>

            <div className="space-y-3">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-xl border border-[#D9E2EC] bg-white hover:border-[#2457C5]/40 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center shrink-0 border border-amber-200">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#102A43] line-clamp-1">{cert.title}</h4>
                      <p className="text-[10px] text-[#829AB1]">ID: {cert.verificationId} • Issued: {cert.issueDate}</p>
                      <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                        Grade: {cert.grade} ({cert.scorePercentage}%)
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateTab('certificates')}
                    className="px-3 py-1.5 rounded-lg border border-[#D9E2EC] hover:border-[#2457C5] text-[10px] font-bold text-[#486581] hover:text-[#102A43] bg-[#F0F4F8] transition-colors shrink-0 cursor-pointer"
                  >
                    View Card
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended for You (6 Cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-[#D9E2EC] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#102A43]">Recommended by Training Directorate</h3>
                <p className="text-xs text-[#829AB1]">Based on your coastal forecasting designation</p>
              </div>
              <button
                onClick={() => onNavigateTab('catalog')}
                className="text-xs text-[#2457C5] font-bold hover:underline cursor-pointer"
              >
                Browse All
              </button>
            </div>

            <div className="space-y-3">
              {safeCourses.filter(c => !c?.isEnrolled).slice(0, 2).map((course) => (
                <div
                  key={course.id}
                  onClick={() => onSelectCourse(course)}
                  className="p-3.5 rounded-xl border border-[#D9E2EC] hover:border-[#2457C5] bg-[#F0F4F8]/50 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div>
                    <span className="text-[9px] font-bold uppercase text-[#12A594] bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                      {course.category}
                    </span>
                    <h4 className="text-xs font-bold text-[#102A43] group-hover:text-[#2457C5] transition-colors mt-1 line-clamp-1">
                      {course.title}
                    </h4>
                    <p className="text-[10px] text-[#829AB1] mt-0.5">{course.duration} • {course.trainer.name}</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-[#2457C5] text-white text-[10px] font-bold hover:bg-[#102A43] transition-colors shrink-0 cursor-pointer">
                    Enroll
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
