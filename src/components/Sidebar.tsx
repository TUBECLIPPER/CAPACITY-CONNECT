import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  FolderCheck, 
  Award, 
  User as UserIcon, 
  Bell, 
  PlusCircle, 
  FileCheck, 
  BarChart3, 
  Users, 
  ShieldAlert, 
  Megaphone, 
  ChevronLeft, 
  ChevronRight,
  Compass,
  Headphones,
  GraduationCap
} from 'lucide-react';
import { User, UserRole } from '../types';

interface SidebarProps {
  currentRole?: UserRole;
  user?: User | null;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  collapsed?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse: () => void;
  unreadCount?: number;
  pendingApprovalsCount?: number;
  pendingReviewsCount?: number;
  pendingAssessmentsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  user,
  activeTab,
  onSelectTab,
  collapsed = false,
  isCollapsed,
  onToggleCollapse,
  unreadCount = 2,
  pendingApprovalsCount = 3,
  pendingReviewsCount = 2,
  pendingAssessmentsCount = 2
}) => {
  const isSidebarCollapsed = isCollapsed !== undefined ? isCollapsed : collapsed;
  const role = user?.role || currentRole || 'trainee';

  // Navigation items based on active role matching App.tsx tab ids
  const getNavItems = () => {
    switch (role) {
      case 'trainer':
        return [
          { id: 'trainer-studio', label: 'Trainer Command', icon: LayoutDashboard },
          { id: 'catalog', label: 'Course Catalog', icon: BookOpen },
          { id: 'assessments', label: 'Assessments & Grading', icon: FileCheck, badge: pendingReviewsCount },
          { id: 'certificates', label: 'Certificates', icon: Award },
          { id: 'notifications', label: 'Announcements', icon: Megaphone, badge: unreadCount },
        ];
      case 'admin':
        return [
          { id: 'admin-portal', label: 'Platform Admin', icon: LayoutDashboard },
          { id: 'catalog', label: 'Catalog Control', icon: BookOpen },
          { id: 'assessments', label: 'Evaluations Oversight', icon: ShieldAlert },
          { id: 'certificates', label: 'Credentials Audit', icon: Award },
          { id: 'notifications', label: 'Circular Broadcasts', icon: Megaphone, badge: unreadCount },
        ];
      case 'trainee':
      default:
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'catalog', label: 'Course Library', icon: BookOpen },
          { id: 'assessments', label: 'Assessments', icon: FolderCheck, badge: pendingAssessmentsCount },
          { id: 'certificates', label: 'Certificates', icon: Award },
          { id: 'profile', label: 'My Profile', icon: UserIcon },
          { id: 'notifications', label: 'Announcements', icon: Bell, badge: unreadCount },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside
      className={`bg-[#102A43] text-white rounded-2xl border border-[#1E3A5A] transition-all duration-300 flex flex-col justify-between shrink-0 select-none shadow-xl overflow-hidden ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}
      style={{ minHeight: 'calc(100vh - 8rem)' }}
    >
      <div className="flex flex-col">
        {/* Header Branding & Collapse Toggle */}
        <div className="p-5 flex items-center justify-between border-b border-white/10">
          {!isSidebarCollapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#2457C5] rounded-xl flex items-center justify-center shadow-lg shrink-0">
                <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin-slow"></div>
              </div>
              <div>
                <h1 className="text-white font-bold text-base leading-tight tracking-tight">CAPACITY</h1>
                <p className="text-[#12A594] text-[10px] font-bold tracking-[0.2em] uppercase">Connect</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-[#2457C5] rounded-xl flex items-center justify-center shadow-lg mx-auto">
              <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin-slow"></div>
            </div>
          )}

          <button
            onClick={onToggleCollapse}
            className={`p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors ${
              isSidebarCollapsed ? 'mx-auto mt-3' : ''
            }`}
            title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Workspace indicator pill */}
        {!isSidebarCollapsed && (
          <div className="px-5 pt-4 pb-1 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
              Workspace
            </span>
            <span className="text-[11px] font-semibold text-[#12A594] flex items-center gap-1.5 capitalize">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12A594] animate-pulse" />
              {role} Portal
            </span>
          </div>
        )}

        {/* Navigation list */}
        <nav className="p-3 space-y-1 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all group relative cursor-pointer ${
                  isActive
                    ? 'bg-white/10 text-white border-l-4 border-[#12A594] shadow-xs'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-[#12A594]' : 'text-white/60 group-hover:text-white'
                  }`}
                />
                {!isSidebarCollapsed && (
                  <span className="flex-1 text-left truncate font-medium">{item.label}</span>
                )}
                {!isSidebarCollapsed && item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-[#12A594] text-white' : 'bg-red-500/80 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {/* Collapsed active indicator bar */}
                {isSidebarCollapsed && isActive && (
                  <span className="absolute right-1 w-1.5 h-6 bg-[#12A594] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Support Card & CodeWalkers attribution */}
      <div className="p-4 mt-auto">
        {!isSidebarCollapsed ? (
          <div>
            <div className="bg-gradient-to-br from-[#2457C5] to-[#12A594] p-4 rounded-2xl text-white shadow-lg">
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">Support</p>
              <p className="text-xs mt-1 text-white/95 font-medium leading-relaxed">
                Need help with your learning path?
              </p>
              <button
                onClick={() => onSelectTab('announcements')}
                className="mt-3 w-full bg-white text-[#102A43] hover:bg-white/90 text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Contact Helpdesk
              </button>
            </div>
            <div className="mt-4 flex items-center space-x-2 px-2">
              <div className="w-2 h-2 rounded-full bg-[#12A594]"></div>
              <span className="text-[10px] text-white/40 tracking-tight">Designed by CodeWalkers</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => onSelectTab('announcements')}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2457C5] to-[#12A594] text-white flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
              title="Helpdesk"
            >
              <Headphones className="w-4 h-4" />
            </button>
            <span className="text-[9px] text-white/40 font-mono">CW</span>
          </div>
        )}
      </div>
    </aside>
  );
};
