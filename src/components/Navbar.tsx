import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  User as UserIcon, 
  ShieldCheck, 
  Compass, 
  BookOpen, 
  Award, 
  LogOut, 
  ChevronDown, 
  Menu, 
  X,
  CloudRain,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { User, UserRole, Announcement } from '../types';

interface NavbarProps {
  currentUser?: User | null;
  user?: User | null;
  currentRole?: UserRole;
  currentView?: string;
  activeTab?: string;
  onNavigate?: (view: string) => void;
  onRoleChange?: (role: UserRole) => void;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
  onLogout?: () => void;
  announcements?: Announcement[];
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  unreadNotificationsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  user,
  currentRole = 'trainee',
  currentView,
  activeTab,
  onNavigate = (_view: string) => {},
  onRoleChange = (_role: UserRole) => {},
  onOpenAuth = (_mode: 'login' | 'signup') => {},
  onLogout = () => {},
  announcements = [],
  searchQuery = '',
  onSearchChange = (_q: string) => {}
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const activeUser = currentUser || user || null;
  const activeCurrentView = currentView || activeTab || 'dashboard';
  const safeAnnouncements = Array.isArray(announcements) ? announcements : [];
  const unreadCount = safeAnnouncements.filter(a => !a?.isRead).length;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-[#D9E2EC] shadow-xs">
      {/* Top Gov Banner */}
      <div className="bg-[#102A43] text-white text-[11px] py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#12A594] animate-pulse"></span>
            <span className="font-semibold tracking-wide">भारत सरकार | Government of India</span>
            <span className="text-[#829AB1] hidden sm:inline">•</span>
            <span className="text-white/80 hidden sm:inline">Ministry of Earth Sciences (MoES)</span>
          </div>
          <div className="flex items-center gap-4 text-[#829AB1]">
            <span className="hidden md:inline font-mono text-[10px]">IMD PORTAL VER 2.6</span>
            <span className="hover:text-white transition-colors cursor-pointer text-[10px] uppercase font-bold text-[#12A594]">
              National Met Service
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none group"
          onClick={() => onNavigate('landing')}
        >
          <div className="w-10 h-10 bg-[#2457C5] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform text-white">
            <CloudRain className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-[#102A43]">
                CAPACITY <span className="text-[#2457C5]">CONNECT</span>
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-[#F0F4F8] text-[#12A594] border border-[#D9E2EC]">
                MoES • IMD
              </span>
            </div>
            <span className="text-[10px] text-[#829AB1] font-medium tracking-normal -mt-0.5 hidden sm:block">
              Digital Capacity Building & LMS Portal
            </span>
          </div>
        </div>

        {/* Desktop Global Search */}
        <div className="hidden lg:flex items-center flex-1 max-w-xs xl:max-w-sm relative">
          <Search className="w-4 h-4 text-[#829AB1] absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search meteorology courses..."
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              if (currentView !== 'courses') {
                onNavigate('courses');
              }
            }}
            className="w-full bg-[#F0F4F8] border-none rounded-xl py-2 pl-10 pr-4 text-xs text-[#102A43] placeholder-[#829AB1] focus:ring-2 focus:ring-[#2457C5] outline-none transition-all"
          />
        </div>

        {/* Center / Right Links */}
        <nav className="hidden md:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-[#486581]">
          <button
            onClick={() => onNavigate('landing')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeCurrentView === 'landing' ? 'text-[#2457C5] bg-[#F0F4F8] font-bold' : 'hover:text-[#102A43] hover:bg-[#F0F4F8]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('courses')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeCurrentView === 'courses' || activeCurrentView === 'catalog' ? 'text-[#2457C5] bg-[#F0F4F8] font-bold' : 'hover:text-[#102A43] hover:bg-[#F0F4F8]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Courses
          </button>
          
          {activeUser && (
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeCurrentView === 'dashboard' ? 'text-[#2457C5] bg-[#F0F4F8] font-bold' : 'hover:text-[#102A43] hover:bg-[#F0F4F8]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Dashboard
            </button>
          )}

          <button
            onClick={() => onNavigate('certificates')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeCurrentView === 'certificates' ? 'text-[#2457C5] bg-[#F0F4F8] font-bold' : 'hover:text-[#102A43] hover:bg-[#F0F4F8]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Certificates
          </button>

          <button
            onClick={() => onNavigate('announcements')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeCurrentView === 'announcements' ? 'text-[#2457C5] bg-[#F0F4F8] font-bold' : 'hover:text-[#102A43] hover:bg-[#F0F4F8]'
            }`}
          >
            Announcements
          </button>
        </nav>

        {/* Actions & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Role Switcher Pill for Prototype Testing */}
          {activeUser && (
            <div className="hidden sm:flex items-center bg-[#F0F4F8] p-1 rounded-xl border border-[#D9E2EC] text-[11px] font-medium">
              <span className="px-2 text-[#829AB1] font-bold text-[10px] uppercase">Role:</span>
              <button
                onClick={() => onRoleChange('trainee')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  currentRole === 'trainee'
                    ? 'bg-white text-[#2457C5] font-bold shadow-xs'
                    : 'text-[#486581] hover:text-[#102A43]'
                }`}
              >
                Trainee
              </button>
              <button
                onClick={() => onRoleChange('trainer')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  currentRole === 'trainer'
                    ? 'bg-white text-[#12A594] font-bold shadow-xs'
                    : 'text-[#486581] hover:text-[#102A43]'
                }`}
              >
                Trainer
              </button>
              <button
                onClick={() => onRoleChange('admin')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  currentRole === 'admin'
                    ? 'bg-white text-[#F59E0B] font-bold shadow-xs'
                    : 'text-[#486581] hover:text-[#102A43]'
                }`}
              >
                Admin
              </button>
            </div>
          )}

          {/* Department Tag / Divider */}
          <div className="hidden xl:flex flex-col text-right">
            <p className="text-[11px] text-[#486581] font-medium">Ministry of Earth Sciences</p>
            <p className="text-[10px] text-[#829AB1] uppercase tracking-widest font-semibold">India Meteorological Dept.</p>
          </div>
          <div className="hidden xl:block h-8 w-[1px] bg-[#D9E2EC]"></div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="w-9 h-9 rounded-xl border border-[#D9E2EC] flex items-center justify-center text-[#486581] hover:text-[#102A43] hover:bg-[#F0F4F8] transition-colors relative cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white ring-1 ring-red-400 animate-pulse" />
              )}
            </button>

            {/* Notifications Popover */}
            {notifDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#D9E2EC] p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setNotifDropdownOpen(false)}
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#D9E2EC]/60">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#102A43]">Notifications & Alerts</h4>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-50 text-red-600 font-bold">
                      {unreadCount} new
                    </span>
                  </div>
                  <button 
                    onClick={() => onNavigate('announcements')}
                    className="text-xs text-[#2457C5] hover:underline font-medium"
                  >
                    View All
                  </button>
                </div>
                <div className="divide-y divide-[#D9E2EC]/60 max-h-72 overflow-y-auto mt-2">
                  {safeAnnouncements.slice(0, 3).map((item) => (
                    <div 
                      key={item.id} 
                      className="py-2.5 hover:bg-[#F0F4F8] px-2 rounded-lg cursor-pointer transition-colors"
                      onClick={() => onNavigate('announcements')}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          item.category === 'Important' ? 'bg-red-50 text-red-600' :
                          item.category === 'Learning' ? 'bg-blue-50 text-blue-600' :
                          item.category === 'Achievement' ? 'bg-amber-50 text-amber-700' :
                          'bg-[#F0F4F8] text-[#486581]'
                        }`}>
                          {item.category}
                        </span>
                        <span className="text-[10px] text-[#829AB1]">{item.timestamp}</span>
                      </div>
                      <p className="text-xs font-semibold text-[#102A43] line-clamp-1">{item.title}</p>
                      <p className="text-[11px] text-[#486581] line-clamp-2 mt-0.5">{item.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile or Login CTA */}
          {activeUser ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl border border-[#D9E2EC] hover:border-[#2457C5] hover:bg-[#F0F4F8] transition-all cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={activeUser.avatar}
                    alt={activeUser.name}
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-[#D9E2EC]"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#12A594] rounded-full border-2 border-white"></div>
                </div>
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-xs font-bold text-[#102A43] truncate max-w-[110px]">
                    {activeUser.name}
                  </span>
                  <span className="text-[10px] text-[#829AB1] capitalize font-medium">
                    {activeUser.role}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#829AB1]" />
              </button>

              {userMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#D9E2EC] p-2 z-50 text-xs"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <div className="p-3 bg-[#F0F4F8] rounded-xl mb-1 border border-[#D9E2EC]">
                    <p className="font-bold text-sm text-[#102A43]">{activeUser.name}</p>
                    <p className="text-[11px] text-[#486581] truncate">{activeUser.email}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-[#486581] bg-white px-2 py-0.5 rounded border border-[#D9E2EC]">
                        {activeUser.employeeId}
                      </span>
                      <span className="text-[10px] font-bold text-[#12A594]">
                        Profile: {activeUser.profileCompletion}%
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('profile')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[#486581] hover:text-[#102A43] hover:bg-[#F0F4F8] rounded-lg transition-colors font-medium text-left cursor-pointer"
                  >
                    <UserIcon className="w-4 h-4 text-[#829AB1]" />
                    My Professional Profile
                  </button>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[#486581] hover:text-[#102A43] hover:bg-[#F0F4F8] rounded-lg transition-colors font-medium text-left cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-[#829AB1]" />
                    Role Dashboard ({activeUser.role})
                  </button>
                  <button
                    onClick={() => onNavigate('certificates')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[#486581] hover:text-[#102A43] hover:bg-[#F0F4F8] rounded-lg transition-colors font-medium text-left cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-[#829AB1]" />
                    My Certifications
                  </button>

                  <div className="border-t border-[#D9E2EC] my-1"></div>

                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="text-xs font-bold text-[#486581] hover:text-[#2457C5] px-3 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="text-xs font-bold text-white bg-gradient-to-r from-[#102A43] to-[#2457C5] hover:opacity-95 px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Create Account
              </button>
            </div>
          )}

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#486581] hover:bg-[#F0F4F8]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search courses, modules..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => { onNavigate('landing'); setMobileMenuOpen(false); }}
              className="p-2.5 text-left rounded-lg bg-slate-50 hover:bg-slate-100"
            >
              Home
            </button>
            <button
              onClick={() => { onNavigate('courses'); setMobileMenuOpen(false); }}
              className="p-2.5 text-left rounded-lg bg-slate-50 hover:bg-slate-100"
            >
              Course Library
            </button>
            <button
              onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}
              className="p-2.5 text-left rounded-lg bg-slate-50 hover:bg-slate-100"
            >
              Dashboard
            </button>
            <button
              onClick={() => { onNavigate('certificates'); setMobileMenuOpen(false); }}
              className="p-2.5 text-left rounded-lg bg-slate-50 hover:bg-slate-100"
            >
              Certificates
            </button>
            <button
              onClick={() => { onNavigate('announcements'); setMobileMenuOpen(false); }}
              className="p-2.5 text-left rounded-lg bg-slate-50 hover:bg-slate-100 col-span-2"
            >
              Announcements & Alerts
            </button>
          </div>

          {activeUser && (
            <div className="pt-2 border-t border-slate-100">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Switch Prototype Role</p>
              <div className="flex gap-2">
                <button
                  onClick={() => { onRoleChange('trainee'); setMobileMenuOpen(false); }}
                  className={`flex-1 py-1.5 text-xs rounded-lg font-bold border ${currentRole === 'trainee' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-slate-200'}`}
                >
                  Trainee
                </button>
                <button
                  onClick={() => { onRoleChange('trainer'); setMobileMenuOpen(false); }}
                  className={`flex-1 py-1.5 text-xs rounded-lg font-bold border ${currentRole === 'trainer' ? 'bg-teal-50 border-teal-300 text-teal-700' : 'bg-white border-slate-200'}`}
                >
                  Trainer
                </button>
                <button
                  onClick={() => { onRoleChange('admin'); setMobileMenuOpen(false); }}
                  className={`flex-1 py-1.5 text-xs rounded-lg font-bold border ${currentRole === 'admin' ? 'bg-amber-50 border-amber-300 text-amber-700' : 'bg-white border-slate-200'}`}
                >
                  Admin
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
