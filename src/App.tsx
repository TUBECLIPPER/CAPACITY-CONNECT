import React, { useState } from 'react';
import { 
  CURRENT_TRAINEE_USER, 
  CURRENT_TRAINER_USER, 
  CURRENT_ADMIN_USER, 
  MOCK_COURSES, 
  MOCK_ASSESSMENTS, 
  MOCK_CERTIFICATES, 
  MOCK_ANNOUNCEMENTS 
} from './data/mockData';
import { User, Course, Assessment, Certificate, Announcement, UserRole } from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { LandingPage } from './views/LandingPage';
import { TraineeDashboard } from './views/TraineeDashboard';
import { CourseLibrary } from './views/CourseLibrary';
import { TrainerDashboard } from './views/TrainerDashboard';
import { AdminDashboard } from './views/AdminDashboard';
import { CertificatesView } from './views/CertificatesView';
import { ProfileView } from './views/ProfileView';
import { NotificationsView } from './views/NotificationsView';
import { AssessmentsView } from './views/AssessmentsView';
import { AuthModal } from './views/AuthModal';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Authentication & Current User State
  const [currentUser, setCurrentUser] = useState<User>(CURRENT_TRAINEE_USER);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // App Data Collections
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [assessments, setAssessments] = useState<Assessment[]>(MOCK_ASSESSMENTS);
  const [certificates, setCertificates] = useState<Certificate[]>(MOCK_CERTIFICATES);
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);

  // Detail Modal & Global Search State
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Role Switcher Handler (also accessible via Navbar prototype selector)
  const handleRoleChange = (newRole: UserRole) => {
    if (newRole === 'trainee') {
      setCurrentUser(CURRENT_TRAINEE_USER);
      setActiveTab('dashboard');
      showToast('Switched to Operational Trainee Profile (Dr. Ananya Sharma)');
    } else if (newRole === 'trainer') {
      setCurrentUser(CURRENT_TRAINER_USER);
      setActiveTab('trainer-studio');
      showToast('Switched to Senior Faculty / Trainer Profile (Dr. Rajeshwar Varma)');
    } else if (newRole === 'admin') {
      setCurrentUser(CURRENT_ADMIN_USER);
      setActiveTab('admin-portal');
      showToast('Switched to MoES Admin Command Profile (Shri Vivek Anand)');
    }
  };

  // Auth Handler
  const handleLoginSuccess = (role: UserRole, email?: string, name?: string) => {
    setIsAuthModalOpen(false);
    handleRoleChange(role);
    if (name) {
      setCurrentUser(prev => ({
        ...prev,
        name,
        email: email || prev.email
      }));
    }
  };

  const handleLogout = () => {
    setCurrentUser(null as any);
    setActiveTab('landing');
    showToast('Signed out of Capacity Connect session.');
  };

  // Course Enrollment Handler
  const handleEnrollCourse = (courseId: string) => {
    setCourses(courses.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          isEnrolled: true,
          progress: 0,
          enrolledCount: c.enrolledCount + 1,
          lastAccessedLesson: c.syllabus?.[0]?.lessons?.[0]?.title || 'Orientation'
        };
      }
      return c;
    }));
    showToast('Enrolled successfully! Course is now added to your learning cockpit.');
  };

  // Trainer creates a new course
  const handleCreateCourse = (courseData: Partial<Course>) => {
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: courseData.title || 'Advanced Mesoscale Analysis',
      description: courseData.description || 'Specialized training syllabus.',
      category: courseData.category || 'Remote Sensing & Radar',
      level: courseData.level || 'Intermediate',
      duration: courseData.duration || '20 Hours',
      modulesCount: 4,
      lessonsCount: 12,
      rating: 5.0,
      ratingsCount: 1,
      enrolledCount: 0,
      isEnrolled: false,
      progress: 0,
      skillsAcquired: courseData.skillsAcquired || ['Mesoscale Dynamics'],
      thumbnail: courseData.thumbnail || 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=800&auto=format&fit=crop',
      badgeIcon: 'CloudRain',
      trainer: {
        id: currentUser.id,
        name: currentUser.name,
        designation: currentUser.designation,
        avatar: currentUser.avatar,
        rating: 5.0
      },
      syllabus: [
        {
          id: 'mod-1',
          title: 'Module 1: Principles & Theoretical Foundations',
          duration: '5 Hours',
          lessons: [
            { id: 'l1', title: 'Atmospheric Stability & Thermodynamic Soundings', duration: '45 mins', type: 'video', completed: false },
            { id: 'l2', title: 'Radar Echo Morphology & Ingestion SOP', duration: '60 mins', type: 'reading', completed: false }
          ]
        }
      ],
      resources: []
    };

    setCourses([newCourse, ...courses]);
    showToast('New curriculum authored and published to the IMD National Repository!');
  };

  // Trainee completes assessment
  const handleCompleteAssessment = (assessmentId: string, score: number) => {
    setAssessments(assessments.map(a => {
      if (a.id === assessmentId) {
        return {
          ...a,
          status: 'Graded',
          score
        };
      }
      return a;
    }));
    showToast(`Assessment submitted! Score: ${score}/100 recorded.`);
  };

  // Add Announcement
  const handleAddAnnouncement = (ann: Omit<Announcement, 'id' | 'timestamp'>) => {
    const newAnn: Announcement = {
      ...ann,
      id: `ann-${Date.now()}`,
      timestamp: 'Just now'
    };
    setAnnouncements([newAnn, ...announcements]);
    showToast('Circular broadcasted across the National IMD Portal!');
  };

  // Mark all announcements read
  const handleMarkAllRead = () => {
    setAnnouncements(announcements.map(a => ({ ...a, isRead: true })));
    showToast('All announcements marked as read.');
  };

  // Toggle single announcement
  const handleToggleRead = (id: string) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, isRead: !a.isRead } : a
    ));
  };

  // Update profile
  const handleUpdateUser = (updated: Partial<User>) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updated
    }));
  };

  const handleNavigate = (tab: string) => {
    if (tab === 'courses') {
      setActiveTab('catalog');
    } else {
      setActiveTab(tab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to render the active view content cleanly
  const renderMainView = (isMobile = false) => {
    if (activeTab === 'landing') {
      return (
        <LandingPage
          onExploreCourses={() => handleNavigate('catalog')}
          onStartLearning={() => handleNavigate(currentUser?.role === 'trainer' ? 'trainer-studio' : currentUser?.role === 'admin' ? 'admin-portal' : 'dashboard')}
          onSelectCourse={(course) => {
            setSelectedCourse(course);
            setActiveTab('catalog');
          }}
          featuredCourses={(courses || []).slice(0, 3)}
          announcements={announcements || []}
          onCreateAccount={() => {
            setAuthModalMode('signup');
            setIsAuthModalOpen(true);
          }}
        />
      );
    }

    return (
      <div className={isMobile ? "space-y-5" : ""}>
        {activeTab === 'dashboard' && (
          <TraineeDashboard
            user={currentUser || CURRENT_TRAINEE_USER}
            courses={courses || []}
            assessments={assessments || []}
            certificates={certificates || []}
            announcements={announcements || []}
            onSelectCourse={(c) => {
              setSelectedCourse(c);
              setActiveTab('catalog');
            }}
            onNavigateTab={handleNavigate}
          />
        )}

        {activeTab === 'catalog' && (
          <CourseLibrary
            courses={courses || []}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onEnroll={handleEnrollCourse}
            selectedCourse={selectedCourse}
            onSelectCourse={setSelectedCourse}
          />
        )}

        {activeTab === 'assessments' && (
          <AssessmentsView
            assessments={assessments || []}
            onCompleteAssessment={handleCompleteAssessment}
          />
        )}

        {activeTab === 'certificates' && (
          <CertificatesView certificates={certificates || []} />
        )}

        {activeTab === 'trainer-studio' && (
          <TrainerDashboard
            trainer={currentUser?.role === 'trainer' ? currentUser : CURRENT_TRAINER_USER}
            assignedCourses={courses || []}
            onCreateCourse={handleCreateCourse}
          />
        )}

        {activeTab === 'admin-portal' && (
          <AdminDashboard
            adminUser={currentUser?.role === 'admin' ? currentUser : CURRENT_ADMIN_USER}
            courses={courses || []}
            onAddAnnouncement={handleAddAnnouncement}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            user={currentUser || CURRENT_TRAINEE_USER}
            onUpdateUser={handleUpdateUser}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'notifications' && (
          <NotificationsView
            announcements={announcements || []}
            onMarkAllRead={handleMarkAllRead}
            onToggleRead={handleToggleRead}
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#102A43] flex flex-col font-sans selection:bg-[#2457C5]/15 selection:text-[#102A43]">
      {/* Global Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        user={currentUser}
        currentRole={currentUser?.role || 'trainee'}
        currentView={activeTab}
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenAuth={(mode) => {
          setAuthModalMode(mode);
          setIsAuthModalOpen(true);
        }}
        onLogout={handleLogout}
        onRoleChange={handleRoleChange}
        announcements={announcements || []}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        unreadNotificationsCount={(announcements || []).filter(a => !a?.isRead).length}
      />

      {/* Main Container */}
      {activeTab === 'landing' ? (
        <main className="flex-1 w-full">
          {renderMainView(false)}
        </main>
      ) : (
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
          <div className="hidden lg:block shrink-0">
            <Sidebar
              user={currentUser}
              activeTab={activeTab}
              onSelectTab={handleNavigate}
              isCollapsed={isSidebarCollapsed}
              onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              unreadCount={(announcements || []).filter(a => !a?.isRead).length}
            />
          </div>
          <main className="flex-1 min-w-0">
            {renderMainView(false)}
          </main>
        </div>
      )}

      {/* Responsive Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200 max-w-sm">
          <div className="bg-[#091E3A] text-white px-4 py-3 rounded-2xl shadow-xl border border-cyan-800 flex items-center gap-3 text-xs">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="font-semibold leading-tight">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
