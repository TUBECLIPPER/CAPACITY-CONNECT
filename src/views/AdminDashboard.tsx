import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  TrendingUp, 
  Check, 
  X, 
  Search, 
  Megaphone, 
  Plus, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Building,
  BarChart3,
  Layers,
  Sparkles
} from 'lucide-react';
import { User, Course, UserApprovalItem, Announcement, UserRole } from '../types';
import { AnalyticsBarChart, RoleDonutChart } from '../components/common/Charts';
import { ADMIN_APPROVAL_QUEUE } from '../data/mockData';

interface AdminDashboardProps {
  adminUser: User;
  courses: Course[];
  onAddAnnouncement: (ann: Omit<Announcement, 'id' | 'timestamp'>) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminUser,
  courses = [],
  onAddAnnouncement
}) => {
  const [approvalQueue, setApprovalQueue] = useState<UserApprovalItem[]>(ADMIN_APPROVAL_QUEUE || []);
  const safeQueue = Array.isArray(approvalQueue) ? approvalQueue : [];
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  // Announcement Composer Modal
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annCategory, setAnnCategory] = useState<Announcement['category']>('Important');
  const [annTargetRole, setAnnTargetRole] = useState<'All' | 'trainee' | 'trainer'>('All');
  const [composerSuccess, setComposerSuccess] = useState(false);

  const handleApprove = (id: string) => {
    setApprovalQueue(approvalQueue.map(item => 
      item.id === id ? { ...item, status: 'approved' } : item
    ));
  };

  const handleReject = (id: string) => {
    setApprovalQueue(approvalQueue.map(item => 
      item.id === id ? { ...item, status: 'rejected' } : item
    ));
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    onAddAnnouncement({
      title: annTitle,
      content: annContent,
      category: annCategory,
      author: adminUser.name,
      authorRole: 'Director (MoES)',
      isRead: false,
      targetRole: annTargetRole
    });

    setComposerSuccess(true);
    setTimeout(() => {
      setComposerSuccess(false);
      setIsComposerOpen(false);
      setAnnTitle('');
      setAnnContent('');
    }, 1500);
  };

  const filteredQueue = safeQueue.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || item.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const pendingCount = safeQueue.filter(i => i.status === 'pending').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. ADMIN COMMAND HEADER */}
      <div className="rounded-2xl bg-gradient-to-r from-[#102A43] via-[#1A3D62] to-[#102A43] text-white p-6 sm:p-8 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-400 text-[#102A43]">
              <ShieldCheck className="w-3.5 h-3.5" /> Central MoES Administration
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">{adminUser.name}</h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {adminUser.designation} • {adminUser.department}
            </p>
            <p className="text-xs text-slate-400">
              Prithvi Bhavan HQ, New Delhi • Mission Karmayogi Capacity Cell
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsComposerOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#102A43] text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Megaphone className="w-4 h-4" />
              <span>Broadcast Announcement</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. PLATFORM METRIC TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Registered Users</span>
            <Users className="w-4 h-4 text-[#2457C5]" />
          </div>
          <div className="text-2xl font-black text-[#102A43]">1,595 Total</div>
          <span className="text-[11px] text-teal-700 font-medium mt-1 inline-block">1,500 Trainees • 80 Trainers • 15 Admins</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Pending Approvals</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-[#102A43]">{pendingCount} Applications</div>
          <span className="text-[11px] text-amber-700 font-bold mt-1 inline-block">Awaiting Gov identity verification</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Avg Course Completion</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-[#102A43]">92.4%</div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 inline-block">Exceeds annual MoES target</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">WMO Certifications Issued</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-[#102A43]">1,180 Badges</div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 inline-block">Digitally verified credentials</span>
        </div>
      </div>

      {/* 3. USER APPROVAL QUEUE TABLE */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <div>
            <h3 className="text-base font-bold text-[#102A43] flex items-center gap-2">
              <span>User Approval &amp; Verification Queue</span>
              {pendingCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                  {pendingCount} Pending Action
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-500">Review scientific credentials, employee IDs, and assigned station roles.</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search applicant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg w-44 focus:outline-none"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
            >
              <option value="all">All Roles</option>
              <option value="trainee">Trainees</option>
              <option value="trainer">Trainers</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Applicant Name</th>
                <th className="py-3 px-4">Role Requested</th>
                <th className="py-3 px-4">Department &amp; Station</th>
                <th className="py-3 px-4">Employee ID</th>
                <th className="py-3 px-4">Applied Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Verification Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQueue.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-bold text-[#102A43]">{item.name}</p>
                    <p className="text-[10px] text-slate-400">{item.email}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      item.role === 'trainee' ? 'bg-blue-50 text-blue-700' : 'bg-teal-50 text-teal-700'
                    }`}>
                      {item.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <p className="font-medium text-slate-700 truncate">{item.department}</p>
                    <p className="text-[10px] text-slate-400">{item.designation}</p>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-600">{item.employeeId}</td>
                  <td className="py-3 px-4 text-slate-500">{item.appliedDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      item.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      item.status === 'rejected' ? 'bg-red-50 text-red-700 border border-red-200' :
                      'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {item.status === 'pending' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                          title="Approve User"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleReject(item.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-colors"
                          title="Reject User"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. PLATFORM ANALYTICS: MONTHLY ENROLLMENTS & ROLE DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Enrollment Chart (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-[#102A43]">Monthly Scientific Enrollment Trends (2026)</h3>
              <p className="text-xs text-slate-500">Surges correspond to pre-monsoon and cyclone season refreshers</p>
            </div>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded">
              +38% vs 2025
            </span>
          </div>

          <AnalyticsBarChart
            labels={['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']}
            values={[140, 210, 340, 480, 520, 610, 580]}
            metricLabel="enrolled forecasters"
            color="linear-gradient(to top, #102A43, #2457C5)"
          />
        </div>

        {/* User Role Distribution (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#102A43] mb-1">User Role &amp; Personnel Distribution</h3>
            <p className="text-xs text-slate-500 mb-6">Proportion of active duty learners, certified faculty, and administrators</p>
            <div className="flex justify-center">
              <RoleDonutChart trainees={1500} trainers={80} admins={15} />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Data synced with NIC Parichay</span>
            <span className="text-[#2457C5] font-bold">100% MoES Staff</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ANNOUNCEMENT COMPOSER MODAL */}
      {/* ========================================================= */}
      {isComposerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden relative">
            <div className="bg-[#102A43] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider">
                  MoES Official Dissemination
                </span>
                <h3 className="text-base font-bold text-white">Compose National Announcement</h3>
              </div>
              <button
                onClick={() => setIsComposerOpen(false)}
                className="p-1 rounded-full text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {composerSuccess ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-[#102A43]">Circular Published!</h4>
                <p className="text-xs text-slate-600">
                  Notification broadcast successfully sent to all duty forecasters and faculty.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateAnnouncement} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Circular Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Mandatory Pre-Cyclone Season Refresher for East Coast Forecasters"
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457C5]/20"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Priority Tag</label>
                    <select
                      value={annCategory}
                      onChange={(e) => setAnnCategory(e.target.value as any)}
                      className="w-full px-2.5 py-2 border border-slate-200 rounded-xl text-slate-700"
                    >
                      <option value="Important">Important (Urgent Alert)</option>
                      <option value="Learning">Learning (New Course/Syllabus)</option>
                      <option value="Achievement">Achievement (Award/Milestone)</option>
                      <option value="Reminder">Reminder (System Maintenance)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Target Audience</label>
                    <select
                      value={annTargetRole}
                      onChange={(e) => setAnnTargetRole(e.target.value as any)}
                      className="w-full px-2.5 py-2 border border-slate-200 rounded-xl text-slate-700"
                    >
                      <option value="All">All Portal Users</option>
                      <option value="trainee">Trainees Only</option>
                      <option value="trainer">Trainers Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Announcement Body</label>
                  <textarea
                    rows={4}
                    placeholder="Full directives, target dates, participating RMCs, and instructions..."
                    value={annContent}
                    onChange={(e) => setAnnContent(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457C5]/20"
                    required
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsComposerOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-[#102A43] font-bold rounded-xl shadow-xs"
                  >
                    Broadcast to All
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
