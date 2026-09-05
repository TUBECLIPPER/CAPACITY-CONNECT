import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  FileCheck, 
  PlusCircle, 
  Upload, 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Star, 
  Edit3, 
  X, 
  Check, 
  AlertCircle,
  FileText,
  Video,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { User, Course, TrainerSubmission } from '../types';
import { AnalyticsBarChart } from '../components/common/Charts';
import { TRAINER_SUBMISSIONS } from '../data/mockData';

interface TrainerDashboardProps {
  trainer: User;
  assignedCourses: Course[];
  onCreateCourse: (courseData: Partial<Course>) => void;
}

export const TrainerDashboard: React.FC<TrainerDashboardProps> = ({
  trainer,
  assignedCourses = [],
  onCreateCourse
}) => {
  const safeAssignedCourses = Array.isArray(assignedCourses) ? assignedCourses : [];
  const [submissions, setSubmissions] = useState<TrainerSubmission[]>(TRAINER_SUBMISSIONS || []);
  const safeSubmissions = Array.isArray(submissions) ? submissions : [];
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'upload' | 'analytics'>('overview');

  // Course Creator Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<Course['category']>('Remote Sensing & Radar');
  const [newLevel, setNewLevel] = useState<'Foundational' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [newDuration, setNewDuration] = useState('16 Hours (4 Weeks)');
  const [newSkills, setNewSkills] = useState('Dual-Pol Radar, Nowcasting Protocols, Doppler Spectrum');

  // Grading Modal State
  const [selectedSubmission, setSelectedSubmission] = useState<TrainerSubmission | null>(null);
  const [gradeScore, setGradeScore] = useState<number>(90);
  const [gradeFeedback, setGradeFeedback] = useState<string>('');

  // Material Upload State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCourse, setUploadCourse] = useState(safeAssignedCourses[0]?.title || '');
  const [uploadFileType, setUploadFileType] = useState<'pdf' | 'netcdf' | 'ppt' | 'video'>('pdf');
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState(false);

  const pendingSubmissionsCount = safeSubmissions.filter(s => s?.status === 'Pending Review').length;
  const totalLearnersCount = safeAssignedCourses.reduce((acc, c) => acc + (c?.enrolledCount || 0), 0);

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;

    setSubmissions(submissions.map(s => {
      if (s.id === selectedSubmission.id) {
        return {
          ...s,
          status: 'Graded',
          score: gradeScore,
          feedback: gradeFeedback || 'Well formulated analysis adhering to IMD standard operational manual.'
        };
      }
      return s;
    }));

    setSelectedSubmission(null);
    setGradeFeedback('');
  };

  const handleCreateCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onCreateCourse({
      title: newTitle,
      description: newDesc || 'Comprehensive operational meteorological training developed for IMD duty officers.',
      category: newCategory,
      level: newLevel,
      duration: newDuration,
      modulesCount: 4,
      lessonsCount: 12,
      skillsAcquired: newSkills.split(',').map(s => s.trim()),
      thumbnail: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=800&auto=format&fit=crop',
      badgeIcon: 'CloudRain',
      rating: 5.0,
      ratingsCount: 1,
      enrolledCount: 0,
      isEnrolled: false,
      progress: 0,
      syllabus: [],
      resources: []
    });

    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;
    setUploadSuccessMessage(true);
    setTimeout(() => {
      setUploadSuccessMessage(false);
      setUploadTitle('');
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. TRAINER PROFILE & WELCOME BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-[#102A43] via-[#0E355C] to-[#12A594] text-white p-6 sm:p-8 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={trainer.avatar}
              alt={trainer.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-md"
            />
            <div className="space-y-1">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-teal-400 text-[#102A43]">
                CTI Senior Faculty Command
              </span>
              <h1 className="text-2xl sm:text-3xl font-black">{trainer.name}</h1>
              <p className="text-xs sm:text-sm text-slate-200">{trainer.designation}</p>
              <p className="text-xs text-slate-300">{trainer.department} • {trainer.location}</p>
            </div>
          </div>

          {/* Quick Trainer Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-[#102A43] text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Course</span>
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Study Material</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Assigned Curricula</span>
            <BookOpen className="w-4 h-4 text-[#2457C5]" />
          </div>
          <div className="text-2xl font-black text-[#102A43]">{assignedCourses.length} Courses</div>
          <span className="text-[11px] text-teal-700 font-medium mt-1 inline-block">Active under CTI Pune</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Learner Participation</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-[#102A43]">{totalLearnersCount} Enrolled</div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 inline-block">+14% month-over-month</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Pending Submissions</span>
            <FileCheck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-[#102A43]">{pendingSubmissionsCount} Submissions</div>
          <span className="text-[11px] text-amber-700 font-bold mt-1 inline-block">Requires Faculty Review</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Faculty Rating</span>
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-[#102A43]">4.9 / 5.0</div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 inline-block">Across 850+ reviews</span>
        </div>
      </div>

      {/* 3. SUBMISSIONS REVIEW QUEUE */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
          <div>
            <h3 className="text-base font-bold text-[#102A43] flex items-center gap-2">
              <span>Trainee Assignment &amp; Simulator Submissions</span>
              {pendingSubmissionsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                  {pendingSubmissionsCount} Pending Review
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-500">Grade practical Doppler radar diagnostics, Dvorak T-number classifications, and WRF namelist configs.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Trainee</th>
                <th className="py-3 px-4">Course &amp; Assessment</th>
                <th className="py-3 px-4">Submitted At</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={sub.traineeAvatar}
                        alt={sub.traineeName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-bold text-[#102A43]">{sub.traineeName}</p>
                        <p className="text-[10px] text-slate-400">{sub.traineeDepartment}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <p className="font-semibold text-slate-800 truncate">{sub.assessmentTitle}</p>
                    <p className="text-[10px] text-slate-500 truncate">{sub.courseTitle}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{sub.submittedAt}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      sub.status === 'Graded' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-700">
                    {sub.score !== undefined ? `${sub.score}/${sub.maxScore}` : '—'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedSubmission(sub);
                        setGradeScore(sub.score || 90);
                        setGradeFeedback(sub.feedback || '');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#2457C5] hover:bg-blue-700 text-white font-bold text-[11px] shadow-xs transition-colors cursor-pointer"
                    >
                      {sub.status === 'Graded' ? 'Edit Feedback' : 'Review & Grade'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. TRAINEE PERFORMANCE ANALYTICS & ATTENDANCE CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trainee Performance Chart (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#102A43]">Average Assessment Scores by Module</h3>
              <p className="text-xs text-slate-500">Radar reflectivity, QPE algorithms, and squall line evaluations</p>
            </div>
            <span className="text-xs font-bold text-[#2457C5] bg-blue-50 px-2.5 py-1 rounded-lg">Avg: 88.4%</span>
          </div>

          <AnalyticsBarChart
            labels={['Mod 1', 'Mod 2', 'Mod 3', 'Mod 4', 'Mod 5', 'Mod 6']}
            values={[92, 85, 81, 94, 88, 90]}
            metricLabel="avg score"
            color="linear-gradient(to top, #2457C5, #12A594)"
          />
        </div>

        {/* Content Upload Quick Box (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#102A43]">Upload Lecture &amp; Dataset Assets</h3>
            <p className="text-xs text-slate-500 mb-4">Add PDF SOPs, radar volume scans, or MP4 lectures</p>

            {uploadSuccessMessage && (
              <div className="mb-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Resource successfully added and synchronized to student portals!</span>
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Resource Title</label>
                <input
                  type="text"
                  placeholder="e.g. DWR_NewDelhi_Hail_Spike_Case_2026.pdf"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457C5]/20"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Target Course</label>
                  <select
                    value={uploadCourse}
                    onChange={(e) => setUploadCourse(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl text-slate-700"
                  >
                    {assignedCourses.map(c => (
                      <option key={c.id} value={c.title}>{c.title.slice(0, 25)}...</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Asset Format</label>
                  <select
                    value={uploadFileType}
                    onChange={(e) => setUploadFileType(e.target.value as any)}
                    className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl text-slate-700"
                  >
                    <option value="pdf">PDF Document / SOP</option>
                    <option value="netcdf">NetCDF / GRIB Dataset</option>
                    <option value="video">MP4 Video Lecture</option>
                    <option value="ppt">Presentation Slides</option>
                  </select>
                </div>
              </div>

              <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl text-center bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                <span className="text-xs font-semibold text-slate-600 block">Click or drag file to attach</span>
                <span className="text-[10px] text-slate-400">Max size: 500 MB (Encrypted Gov Storage)</span>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#2457C5] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Publish to Course Library
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* GRADING & FEEDBACK MODAL */}
      {/* ========================================================= */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden relative">
            <div className="bg-[#102A43] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider">
                  CTI Faculty Evaluation
                </span>
                <h3 className="text-base font-bold text-white">Review Trainee Submission</h3>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-1 rounded-full text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGrade} className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#102A43]">{selectedSubmission.traineeName}</span>
                  <span className="text-slate-500">{selectedSubmission.traineeDepartment}</span>
                </div>
                <p className="font-semibold text-slate-700">{selectedSubmission.assessmentTitle}</p>
                <p className="text-[10px] text-slate-400 mt-1">Attachment: {selectedSubmission.fileAttachment}</p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Score awarded (out of {selectedSubmission.maxScore})
                </label>
                <input
                  type="number"
                  min="0"
                  max={selectedSubmission.maxScore}
                  value={gradeScore}
                  onChange={(e) => setGradeScore(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm font-bold border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457C5]/20"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Operational Feedback &amp; Suggestions
                </label>
                <textarea
                  rows={4}
                  placeholder="Note on Doppler velocity de-aliasing, radar beam refraction, or cyclone intensity determination..."
                  value={gradeFeedback}
                  onChange={(e) => setGradeFeedback(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457C5]/20"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSubmission(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow-xs"
                >
                  Save &amp; Issue Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* COURSE CREATOR MODAL */}
      {/* ========================================================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] overflow-y-auto relative">
            <div className="bg-[#102A43] text-white p-6 flex items-center justify-between sticky top-0 z-10">
              <div>
                <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider">
                  CTI Syllabus Authoring
                </span>
                <h3 className="text-lg font-bold text-white">Design New IMD Capacity Course</h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-full text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCourseSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Course Title</label>
                <input
                  type="text"
                  placeholder="e.g. S-Band Radar Volume Scanning & Convective Clutter Elimination"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457C5]/20"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Course Overview</label>
                <textarea
                  rows={3}
                  placeholder="Operational syllabus objectives and forecasting applications..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457C5]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Discipline Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-700"
                  >
                    <option value="Remote Sensing & Radar">Remote Sensing &amp; Radar</option>
                    <option value="Disaster Preparedness">Disaster Preparedness</option>
                    <option value="Numerical Weather Prediction">Numerical Weather Prediction</option>
                    <option value="Climate Data Analytics">Climate Data Analytics</option>
                    <option value="Hydrological Modelling">Hydrological Modelling</option>
                    <option value="AI & Satellite Tech">AI &amp; Satellite Tech</option>
                    <option value="Meteorology Fundamentals">Meteorology Fundamentals</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Proficiency Level</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-700"
                  >
                    <option value="Foundational">Foundational</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expected Course Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 24 Hours (6 Weeks)"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Key Skills (Comma-separated)</label>
                  <input
                    type="text"
                    placeholder="ZDR, Correlation Coeff, QPE"
                    value={newSkills}
                    onChange={(e) => setNewSkills(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2457C5] hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Publish Curriculum
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
