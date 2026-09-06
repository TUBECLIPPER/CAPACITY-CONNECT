import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Star, 
  User, 
  Award, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  FileText, 
  Download, 
  MessageSquare, 
  X, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Radio,
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';
import { Course, CourseModule, CourseLesson } from '../types';

interface CourseLibraryProps {
  courses: Course[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onEnroll: (courseId: string) => void;
  selectedCourse: Course | null;
  onSelectCourse: (course: Course | null) => void;
}

export const CourseLibrary: React.FC<CourseLibraryProps> = ({
  courses = [],
  searchQuery = '',
  onSearchChange,
  onEnroll,
  selectedCourse,
  onSelectCourse
}) => {
  const safeCourses = Array.isArray(courses) ? courses : [];
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [expandedModule, setExpandedModule] = useState<string | null>('mod-1');
  const [activeTab, setActiveTab] = useState<'syllabus' | 'resources' | 'discussions' | 'instructor'>('syllabus');

  // Interactive Lesson Player inside Course Detail Modal
  const [activeLesson, setActiveLesson] = useState<CourseLesson | null>(null);
  const [discussionInput, setDiscussionInput] = useState('');
  const [discussions, setDiscussions] = useState<{ author: string; time: string; text: string }[]>([
    {
      author: 'Kavita Nair (RMC Chennai)',
      time: '1 day ago',
      text: 'In dual-pol radar, what is the best threshold of Correlation Coefficient (ρHV) to filter out non-meteorological ground clutter in heavy sea-breeze regimes?'
    },
    {
      author: 'Dr. Rajeshwar Varma (Trainer)',
      time: '18 hours ago',
      text: 'For coastal sea breeze fronts, values of ρHV below 0.85 accompanied by low ZDR generally denote clear-air returns and sea-spray. Use a 0.90 cutoff before running hydrometeor classification.'
    }
  ]);

  const categories = [
    'All',
    'Remote Sensing & Radar',
    'Disaster Preparedness',
    'Numerical Weather Prediction',
    'Climate Data Analytics',
    'Hydrological Modelling',
    'AI & Satellite Tech',
    'Meteorology Fundamentals'
  ];

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return safeCourses.filter((course) => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.trainer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.skillsAcquired || []).some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesLvl = selectedLevel === 'All' || course.level === selectedLevel;
      const matchesStatus = 
        selectedStatus === 'All' || 
        (selectedStatus === 'Enrolled' && course.isEnrolled) ||
        (selectedStatus === 'Available' && !course.isEnrolled);

      return matchesSearch && matchesCat && matchesLvl && matchesStatus;
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel, selectedStatus]);

  const handlePostDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discussionInput.trim()) return;
    setDiscussions([
      ...discussions,
      {
        author: 'Dr. Ananya Sharma (You)',
        time: 'Just now',
        text: discussionInput.trim()
      }
    ]);
    setDiscussionInput('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2457C5]">National Curriculum Repository</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
            IMD Course Library &amp; Certifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Explore peer-reviewed operational modules created by the Central Training Institute (CTI) Pune, NCMRWF, and WMO panels.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by topic (e.g., Radar, Dvorak, Python, WRF, Nowcasting)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457C5]/20 focus:border-[#2457C5]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none"
            >
              <option value="All">All Difficulty Levels</option>
              <option value="Foundational">Foundational</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Enrolled">Enrolled Courses</option>
              <option value="Available">Available to Enroll</option>
            </select>
          </div>
        </div>

        {/* Category Chips Scroll */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#102A43] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course Count / Active Filters Status */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-[#102A43]">{filteredCourses.length}</strong> meteorological courses
        </span>
        {(selectedCategory !== 'All' || selectedLevel !== 'All' || selectedStatus !== 'All' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedLevel('All');
              setSelectedStatus('All');
              onSearchChange('');
            }}
            className="text-[#2457C5] hover:underline font-bold"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#102A43]">No courses matching your criteria</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or resetting category and difficulty filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-[#2457C5]/50 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              {/* Thumbnail header */}
              <div 
                className="h-44 relative overflow-hidden bg-slate-900 cursor-pointer"
                onClick={() => onSelectCourse(course)}
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Category & Level Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-[#102A43] shadow-xs">
                    {course.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    course.level === 'Advanced' ? 'bg-amber-500 text-white' :
                    course.level === 'Intermediate' ? 'bg-blue-600 text-white' :
                    'bg-teal-600 text-white'
                  }`}>
                    {course.level}
                  </span>
                </div>

                {/* Progress bar if enrolled */}
                {course.isEnrolled && (
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
                    <div
                      className="h-full bg-teal-400"
                      style={{ width: `${course.progress || 0}%` }}
                    />
                  </div>
                )}

                {/* Bottom stats overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="flex items-center gap-1 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {course.rating} <span className="text-slate-300 font-normal">({course.ratingsCount})</span>
                  </span>
                  <span className="text-[11px] text-slate-200 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => onSelectCourse(course)}
                    className="text-base font-bold text-[#102A43] group-hover:text-[#2457C5] transition-colors line-clamp-2 cursor-pointer mb-2"
                  >
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {course.description}
                  </p>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {course.skillsAcquired.slice(0, 2).map((s) => (
                      <span key={s} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                    {course.skillsAcquired.length > 2 && (
                      <span className="text-[10px] text-slate-400 font-bold self-center">
                        +{course.skillsAcquired.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Trainer & Action CTA */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={course.trainer.avatar}
                      alt={course.trainer.name}
                      className="w-7 h-7 rounded-full object-cover shrink-0"
                    />
                    <div className="text-left min-w-0">
                      <p className="text-[11px] font-bold text-slate-800 truncate">{course.trainer.name}</p>
                      <p className="text-[9px] text-slate-400">{course.enrolledCount} enrolled</p>
                    </div>
                  </div>

                  {course.isEnrolled ? (
                    <button
                      onClick={() => onSelectCourse(course)}
                      className="px-3.5 py-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-700 text-xs font-bold transition-colors cursor-pointer shrink-0"
                    >
                      {course.progress === 100 ? 'Review' : 'Continue'}
                    </button>
                  ) : (
                    <button
                      onClick={() => onEnroll(course.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer shrink-0"
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. COURSE DETAIL MODAL & INTERACTIVE LESSON VIEWER */}
      {/* ========================================================= */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden relative my-auto">
            
            {/* Modal Header */}
            <div className="bg-[#091E3A] text-white p-5 sm:p-6 relative shrink-0 border-b border-cyan-900/60">
              <button
                onClick={() => {
                  onSelectCourse(null);
                  setActiveLesson(null);
                }}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-400 text-slate-950">
                  {selectedCourse.category}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/15 text-slate-200 uppercase">
                  {selectedCourse.level} Level
                </span>
                <span className="text-xs text-cyan-200">• {selectedCourse.duration}</span>
              </div>

              <h2 className="text-lg sm:text-2xl font-black tracking-tight text-white pr-8">
                {selectedCourse.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                {selectedCourse.description}
              </p>

              {/* Action Ribbon inside header */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-700/60">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedCourse.trainer.avatar}
                    alt={selectedCourse.trainer.name}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-white/30 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-bold text-white">{selectedCourse.trainer.name}</p>
                    <p className="text-[10px] text-cyan-200">{selectedCourse.trainer.designation}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {selectedCourse.isEnrolled ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-cyan-300">Enrolled: {selectedCourse.progress}% Completed</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => onEnroll(selectedCourse.id)}
                      className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      Enroll in Course
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Tabs - responsive scroll */}
            <div className="border-b border-slate-200 bg-slate-50 px-4 sm:px-6 flex items-center gap-4 sm:gap-6 text-xs font-bold shrink-0 overflow-x-auto scrollbar-none whitespace-nowrap">
              <button
                onClick={() => setActiveTab('syllabus')}
                className={`py-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'syllabus' ? 'border-cyan-600 text-cyan-700' : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Curriculum Syllabus ({selectedCourse.syllabus?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`py-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'resources' ? 'border-cyan-600 text-cyan-700' : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Study Materials &amp; Datasets ({selectedCourse.resources?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('discussions')}
                className={`py-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'discussions' ? 'border-cyan-600 text-cyan-700' : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Duty Forecaster Forum
              </button>
              <button
                onClick={() => setActiveTab('instructor')}
                className={`py-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'instructor' ? 'border-cyan-600 text-cyan-700' : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Faculty Profile
              </button>
            </div>

            {/* Modal Body with Tab Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">

              {/* TAB 1: SYLLABUS & LESSON LAUNCHER */}
              {activeTab === 'syllabus' && (
                <div className="space-y-4">
                  {/* Interactive Active Lesson simulation player */}
                  {activeLesson && (
                    <div className="p-4 rounded-2xl bg-[#102A43] text-white border border-slate-700 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
                            Now Streaming Interactive Lesson
                          </span>
                        </div>
                        <button
                          onClick={() => setActiveLesson(null)}
                          className="text-xs text-slate-300 hover:text-white"
                        >
                          Close Player
                        </button>
                      </div>
                      <h4 className="text-base font-bold">{activeLesson.title}</h4>
                      
                      {/* Video / Simulator Mock Screen */}
                      <div className="h-56 rounded-xl bg-slate-950 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden border border-slate-800">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#12A594_1px,transparent_1px)] [background-size:16px_16px]" />
                        <Radio className="w-12 h-12 text-teal-400 mb-2 animate-bounce" />
                        <p className="text-sm font-bold text-white">IMD Dual-Polarization Doppler Radar Stream</p>
                        <p className="text-xs text-slate-400 mt-1 max-w-md">
                          Live Volume Coverage Pattern (VCP 212) • Reflectivity 0.5° Elevation Scan
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                          <span className="px-3 py-1 rounded bg-teal-500/20 text-teal-300 text-xs font-mono">
                            Time: 12:45 / {activeLesson.duration}
                          </span>
                          <span className="px-3 py-1 rounded bg-white/10 text-white text-xs font-bold">
                            HD 1080p IMD-CDN
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Modules Accordion */}
                  <div className="space-y-3">
                    {selectedCourse.syllabus && selectedCourse.syllabus.length > 0 ? (
                      selectedCourse.syllabus.map((module) => {
                        const isExpanded = expandedModule === module.id;

                        return (
                          <div
                            key={module.id}
                            className="rounded-xl border border-slate-200 overflow-hidden bg-white"
                          >
                            <div
                              onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                              className="p-4 bg-slate-50 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-md bg-[#102A43] text-white flex items-center justify-center text-xs font-bold">
                                  {module.id.replace('mod-', '').replace('tc-mod-', '').replace('wrf-mod-', '').replace('cda-mod-', '')}
                                </span>
                                <div>
                                  <h4 className="text-xs font-bold text-[#102A43]">{module.title}</h4>
                                  <span className="text-[10px] text-slate-500">{module.duration} • {module.lessons.length} lessons</span>
                                </div>
                              </div>
                              {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                            </div>

                            {isExpanded && (
                              <div className="p-3 divide-y divide-slate-100 bg-white">
                                {module.lessons.map((lesson) => (
                                  <div
                                    key={lesson.id}
                                    className="py-2.5 px-3 hover:bg-slate-50 rounded-lg flex items-center justify-between gap-4 transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                      {lesson.completed ? (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                      ) : (
                                        <Play className="w-4 h-4 text-[#2457C5] shrink-0" />
                                      )}
                                      <div>
                                        <p className="text-xs font-semibold text-slate-800">{lesson.title}</p>
                                        <span className="text-[10px] text-slate-400 capitalize">{lesson.type} • {lesson.duration}</span>
                                      </div>
                                    </div>

                                    <button
                                      onClick={() => setActiveLesson(lesson)}
                                      className="px-2.5 py-1 text-[10px] font-bold text-[#2457C5] hover:bg-blue-50 rounded border border-blue-200 transition-colors shrink-0"
                                    >
                                      {lesson.completed ? 'Re-watch' : 'Start Lesson'}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-8 text-center bg-slate-50 rounded-xl">
                        <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-xs text-slate-600">Complete curriculum syllabus is active under CTI LMS registry.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: RESOURCES & DOWNLOADS */}
              {activeTab === 'resources' && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200/80 text-xs text-slate-700">
                    <p className="font-bold text-[#102A43]">Operational Geo-Data &amp; SOP Guidelines</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      All datasets are configured for ingestion into Py-ART, MetPy, Xarray, or standard GrADS visualizers.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {selectedCourse.resources && selectedCourse.resources.length > 0 ? (
                      selectedCourse.resources.map((res) => (
                        <div
                          key={res.id}
                          className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white flex items-center justify-between gap-3 shadow-2xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-[10px] uppercase">
                              {res.fileType}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800 line-clamp-1">{res.title}</p>
                              <span className="text-[10px] text-slate-400">{res.size} • Verified MoES Resource</span>
                            </div>
                          </div>

                          <button
                            onClick={() => alert(`Downloading ${res.title}...`)}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
                          >
                            <Download className="w-3.5 h-3.5 text-teal-600" />
                            <span>Download</span>
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 italic">No supplemental datasets uploaded for this introductory syllabus.</p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: DISCUSSIONS */}
              {activeTab === 'discussions' && (
                <div className="space-y-4">
                  {/* Post comment */}
                  <form onSubmit={handlePostDiscussion} className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700">Ask a Question to Faculty &amp; Peers</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type question regarding radar equations, WRF namelist, or cyclone patterns..."
                        value={discussionInput}
                        onChange={(e) => setDiscussionInput(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457C5]/20"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#2457C5] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                      >
                        Post
                      </button>
                    </div>
                  </form>

                  {/* Comment thread */}
                  <div className="space-y-3 pt-2">
                    {discussions.map((disc, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-[#102A43]">{disc.author}</span>
                          <span className="text-slate-400">{disc.time}</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">{disc.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: INSTRUCTOR */}
              {activeTab === 'instructor' && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={selectedCourse.trainer.avatar}
                      alt={selectedCourse.trainer.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white shadow-xs"
                    />
                    <div>
                      <h4 className="text-base font-bold text-[#102A43]">{selectedCourse.trainer.name}</h4>
                      <p className="text-xs font-semibold text-[#2457C5]">{selectedCourse.trainer.designation}</p>
                      <p className="text-[11px] text-slate-500 mt-1">Specialist in Radar Meteorology &amp; Mesoscale Models</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Senior faculty member with extensive operational and training background at the India Meteorological Department. Spearheading modernization of Doppler Weather Radar algorithms and regional nowcast issuance.
                  </p>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0 text-xs">
              <span className="text-slate-500">
                Course ID: <strong className="text-slate-700">{selectedCourse.id}</strong>
              </span>
              <button
                onClick={() => {
                  onSelectCourse(null);
                  setActiveLesson(null);
                }}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
