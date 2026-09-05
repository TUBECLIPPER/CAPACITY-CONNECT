import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Users, 
  BookOpen, 
  TrendingUp, 
  ShieldCheck, 
  CloudRain, 
  Radio, 
  Database, 
  Cpu, 
  Sparkles, 
  BarChart2, 
  Compass, 
  ExternalLink,
  ChevronRight,
  Target,
  FileCheck,
  Star,
  Activity,
  Layers,
  Clock,
  Wind
} from 'lucide-react';
import { Course, Announcement } from '../types';
import { LEARNING_PATHWAYS, TESTIMONIALS } from '../data/mockData';

interface LandingPageProps {
  onExploreCourses?: () => void;
  onStartLearning?: () => void;
  onCreateAccount?: () => void;
  onSelectCourse?: (course: Course) => void;
  featuredCourses?: Course[];
  announcements?: Announcement[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onExploreCourses = () => {},
  onStartLearning,
  onCreateAccount,
  onSelectCourse = (_course: Course) => {},
  featuredCourses = [],
  announcements = []
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const handleStart = onStartLearning || onCreateAccount || onExploreCourses;
  const safeFeaturedCourses = Array.isArray(featuredCourses) ? featuredCourses : [];
  const safeAnnouncements = Array.isArray(announcements) ? announcements : [];

  const competencySteps = [
    {
      title: 'Skills Need Identification',
      sub: 'Organizational Mandate',
      desc: 'Forecasters and researchers identify operational gaps in Radar, NWP, or Cyclone Warning aligned with WMO Competency Frameworks.',
      icon: Target,
      color: 'bg-blue-50 text-[#2457C5] border-blue-200'
    },
    {
      title: 'Structured Courses',
      sub: 'Hands-on Modular Learning',
      desc: 'Interactive lectures, high-resolution NetCDF/GRIB datasets, Py-ART notebooks, and synoptic chart analysis.',
      icon: BookOpen,
      color: 'bg-teal-50 text-teal-700 border-teal-200'
    },
    {
      title: 'Rigorous Assessments',
      sub: 'Simulations & Case Reviews',
      desc: 'Real-time severe squall line diagnostics, Dvorak satellite classifications, and trainer-evaluated operational viva.',
      icon: FileCheck,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      title: 'National Certification',
      sub: 'Verifiable Credentials',
      desc: 'Official digital certificates signed by MoES & IMD Directorate with tamper-proof QR verification and permanent registry.',
      icon: Award,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      title: 'Career & Duty Growth',
      sub: 'High-Impact Deployment',
      desc: 'Eligible for primary shift-in-charge roles at Cyclone Warning Centers, Aviation Met Offices, and Severe Weather Desks.',
      icon: TrendingUp,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    }
  ];

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-24 border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50 to-[#F8FAFC]">
        {/* Subtle background meteorological isobar & wave grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#2457C5_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#12A594] animate-ping" />
                <span className="text-xs font-bold text-[#102A43] tracking-wide">
                  Mission Karmayogi • IMD Capacity Building Portal
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-[#102A43] tracking-tight leading-[1.12]">
                Build Skills. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2457C5] via-[#12A594] to-[#102A43]">
                  Strengthen Capacity.
                </span> <br />
                Shape Tomorrow.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                A centralized learning and capacity-building platform for India Meteorological Department professionals. Empowering forecasters, researchers, and technical officers with high-impact meteorological training.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onExploreCourses}
                  className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#102A43] via-[#2457C5] to-[#102A43] hover:shadow-lg hover:shadow-blue-900/20 active:scale-[0.98] transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onCreateAccount}
                  className="px-6 py-3.5 rounded-xl text-sm font-bold text-[#102A43] bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98] shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Create Account</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Key Highlights */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-xl">
                <div>
                  <span className="block text-xl sm:text-2xl font-black text-[#102A43]">WMO-1209</span>
                  <span className="text-xs text-slate-500 font-medium">Standard Compliant</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-black text-[#2457C5]">36+ DWR</span>
                  <span className="text-xs text-slate-500 font-medium">Radar Stations Covered</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-black text-[#12A594]">100% Gov</span>
                  <span className="text-xs text-slate-500 font-medium">Official Accreditation</span>
                </div>
              </div>
            </div>

            {/* Right Dashboard Preview Illustration */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Card */}
                <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-xl border border-slate-200/80 relative z-10">
                  {/* Top Bar inside mockup */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2457C5] flex items-center justify-center font-bold text-xs">
                        <CloudRain className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#102A43]">IMD Operational Cockpit</p>
                        <p className="text-[10px] text-slate-400">Dr. Ananya Sharma • RMC Mumbai</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span> Active
                    </span>
                  </div>

                  {/* Course Progress Widget */}
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2457C5]">Current Module</span>
                        <h4 className="text-xs font-bold text-[#102A43] line-clamp-1">Dual-Pol Doppler Radar (DWR) Nowcasting</h4>
                      </div>
                      <span className="text-xs font-bold text-[#2457C5]">68%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#2457C5] to-[#12A594] rounded-full" style={{ width: '68%' }} />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2 flex items-center justify-between">
                      <span>Lesson: Hydrometeor Classification</span>
                      <span className="font-semibold text-slate-700">4 / 6 Modules</span>
                    </p>
                  </div>

                  {/* Weather Data Radar Sweep & Activity Snippet */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#102A43] to-[#1B3A5A] text-white">
                      <div className="flex items-center justify-between text-[10px] text-teal-300 font-semibold mb-1">
                        <span>Radar Reflectivity</span>
                        <Radio className="w-3 h-3 text-teal-400 animate-pulse" />
                      </div>
                      <div className="text-xl font-bold tracking-tight">52.4 dBZ</div>
                      <p className="text-[9px] text-slate-300 mt-1">Severe Convective Echo</p>
                      {/* Stylized waveform */}
                      <div className="h-6 flex items-end gap-1 mt-2">
                        {[40, 65, 80, 55, 95, 70, 85, 45].map((h, i) => (
                          <div key={i} className="flex-1 bg-teal-400/80 rounded-xs" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                        <span>Weekly Study</span>
                        <Clock className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="text-xl font-bold text-[#102A43]">18.4 hrs</div>
                      <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                        <TrendingUp className="w-3 h-3" />
                        <span>+22% this week</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges preview */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Earned Credentials:</span>
                    </div>
                    <div className="flex -space-x-1.5">
                      <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold shadow-xs ring-2 ring-white" title="NWP Specialist">
                        <Award className="w-3.5 h-3.5" />
                      </div>
                      <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs ring-2 ring-white" title="Dvorak Certified">
                        <Wind className="w-3.5 h-3.5" />
                      </div>
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs ring-2 ring-white" title="Radar Specialist">
                        <Radio className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Accent Card 1 */}
                <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-white p-3 rounded-xl shadow-lg border border-slate-200 items-center gap-3 z-20">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#102A43]">New Certificate Earned</p>
                    <p className="text-[10px] text-slate-500">Numerical Weather Prediction (WRF)</p>
                  </div>
                </div>

                {/* Floating Accent Card 2 */}
                <div className="hidden sm:flex absolute -top-4 -right-4 bg-white/90 backdrop-blur p-2.5 rounded-xl shadow-md border border-slate-200/80 items-center gap-2 z-20">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                  <span className="text-[11px] font-bold text-slate-700">1,500+ Forecasters Online</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section className="bg-[#102A43] py-4 border-y border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 text-xs font-medium tracking-wide text-slate-300 text-center">
            <div className="flex items-center gap-2">
              <span className="text-teal-400 font-bold">Ministry of Earth Sciences (MoES)</span>
              <span className="text-slate-600 hidden md:inline">|</span>
              <span className="text-white font-bold">India Meteorological Department (IMD)</span>
              <span className="text-slate-600 hidden md:inline">|</span>
              <span className="text-teal-300">Smart Education & Capacity Portal</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span className="bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">ISO 9001:2015</span>
              <span className="bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">WMO Recognized</span>
              <span className="bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">Mission Karmayogi</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PLATFORM AT A GLANCE (4 METRIC CARDS) */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2457C5]">National Scope & Operational Impact</span>
            <h2 className="text-3xl font-extrabold text-[#102A43] tracking-tight mt-1">
              Platform at a Glance
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Accelerating meteorological competence across 6 Regional Meteorological Centres (RMCs) and 26 Meteorological Centres nationwide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2457C5] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black text-[#102A43] tracking-tight">250+</div>
              <h4 className="text-sm font-bold text-slate-800 mt-1">Learning Courses</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Specialized curricula in synoptic analysis, radar nowcasting, agro-meteorology, and climate datasets.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 hover:border-teal-300 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black text-[#102A43] tracking-tight">1,500+</div>
              <h4 className="text-sm font-bold text-slate-800 mt-1">Active Learners</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Scientists, operational duty forecasters, observatory observers, and meteorological engineers.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 hover:border-indigo-300 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black text-[#102A43] tracking-tight">80+</div>
              <h4 className="text-sm font-bold text-slate-800 mt-1">Expert Trainers</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Distinguished faculty from CTI Pune, NCMRWF, IITM, INCOIS, and WMO expert panels.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 hover:border-amber-300 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black text-[#102A43] tracking-tight">92%</div>
              <h4 className="text-sm font-bold text-slate-800 mt-1">Course Completion</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                High engagement driven by practical simulator exams and direct promotion recognition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED LEARNING PATHWAYS */}
      <section className="py-16 bg-[#F1F5F9]/60 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2457C5]">Structured Professional Tracks</span>
              <h2 className="text-3xl font-extrabold text-[#102A43] tracking-tight mt-1">
                Featured Learning Pathways
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Curated competence roadmaps mapped directly to IMD operational duties.
              </p>
            </div>
            <button
              onClick={onExploreCourses}
              className="text-xs font-bold text-[#2457C5] hover:text-[#102A43] flex items-center gap-1.5 transition-colors self-start md:self-auto"
            >
              <span>View All 250+ Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEARNING_PATHWAYS.map((path) => (
              <div
                key={path.id}
                onClick={onExploreCourses}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-[#2457C5]/40 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                      {path.coursesCount} Courses • {path.duration}
                    </span>
                    <span className="text-[#2457C5] group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#102A43] group-hover:text-[#2457C5] transition-colors mb-2">
                    {path.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {path.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                    {path.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMPETENCY MAPPING SECTION WITH CLEAN VISUAL DIAGRAM */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#12A594]">Operational Excellence Model</span>
            <h2 className="text-3xl font-extrabold text-[#102A43] tracking-tight mt-1">
              End-to-End Competency Mapping
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              A systematic pipeline bridging theoretical scientific concepts with daily operational forecasting.
            </p>
          </div>

          {/* Visual Diagram: Skills → Courses → Assessments → Certification → Career Growth */}
          <div className="relative mb-12">
            {/* Connecting line on desktop */}
            <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
              {competencySteps.map((step, idx) => {
                const Icon = step.icon;
                const isSelected = activeStep === idx;

                return (
                  <div
                    key={step.title}
                    onClick={() => setActiveStep(idx)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-[#2457C5] shadow-lg ring-2 ring-[#2457C5]/20 scale-102'
                        : 'bg-[#F8FAFC] border-slate-200/90 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${step.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-black text-slate-400">0{idx + 1}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#102A43]">{step.title}</h4>
                      <p className="text-[10px] font-semibold text-[#2457C5] uppercase mt-0.5">{step.sub}</p>
                    </div>

                    <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Step Detail Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#102A43] to-[#1B3A5A] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">
                Step 0{activeStep + 1} in Action:
              </span>
              <h3 className="text-lg font-bold">{competencySteps[activeStep].title} — {competencySteps[activeStep].sub}</h3>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                {competencySteps[activeStep].desc}
              </p>
            </div>
            <button
              onClick={onExploreCourses}
              className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-[#102A43] font-bold text-xs shrink-0 transition-colors"
            >
              Browse Aligned Curriculum
            </button>
          </div>
        </div>
      </section>

      {/* 6. FEATURED COURSES SHOWCASE */}
      <section className="py-16 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2457C5]">Top Enrolled Curricula</span>
              <h2 className="text-3xl font-extrabold text-[#102A43] tracking-tight mt-1">
                Featured Flagship Courses
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Recommended by the Central Training Institute (CTI) Pune.
              </p>
            </div>
            <button
              onClick={onExploreCourses}
              className="text-xs font-bold text-[#2457C5] hover:underline"
            >
              Explore Full Library &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {safeFeaturedCourses.slice(0, 3).map((course) => (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-slate-300 hover:shadow-xl transition-all cursor-pointer group flex flex-col"
              >
                {/* Image */}
                <div className="h-44 relative overflow-hidden bg-slate-900">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur text-[#102A43]">
                    {course.category}
                  </span>
                  <span className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    course.level === 'Advanced' ? 'bg-amber-500 text-white' :
                    course.level === 'Intermediate' ? 'bg-blue-600 text-white' :
                    'bg-teal-600 text-white'
                  }`}>
                    {course.level}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <strong className="font-bold">{course.rating}</strong> ({course.ratingsCount})
                    </span>
                    <span className="text-[11px] font-medium text-slate-200">{course.duration}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#102A43] group-hover:text-[#2457C5] transition-colors line-clamp-2 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {course.skillsAcquired.slice(0, 2).map((s) => (
                        <span key={s} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Trainer & CTA */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={course.trainer.avatar}
                        alt={course.trainer.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <p className="text-[11px] font-bold text-slate-800 line-clamp-1">{course.trainer.name}</p>
                        <p className="text-[9px] text-slate-400">{course.enrolledCount} learners</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#2457C5] group-hover:bg-blue-50 transition-colors">
                      Details &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2457C5]">Operational Testimonials</span>
            <h2 className="text-3xl font-extrabold text-[#102A43] tracking-tight mt-1">
              Voices from the Forecaster Community
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              How Capacity Connect is empowering weather decision support systems across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-300"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#102A43]">{t.name}</h4>
                    <p className="text-[10px] font-medium text-[#2457C5]">{t.role}</p>
                    <p className="text-[9px] text-slate-400 line-clamp-1">{t.org}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. LATEST OFFICIAL ANNOUNCEMENTS STRIP */}
      <section className="py-12 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <h3 className="text-base font-bold text-[#102A43]">Official IMD Capacity Circulars &amp; Alerts</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safeAnnouncements.slice(0, 2).map((ann) => (
              <div key={ann.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 mt-0.5 ${
                  ann.category === 'Important' ? 'bg-red-50 text-red-600 border border-red-200' :
                  'bg-blue-50 text-blue-600 border border-blue-200'
                }`}>
                  {ann.category}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-[#102A43]">{ann.title}</h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed line-clamp-2">{ann.content}</p>
                  <p className="text-[10px] text-slate-400 mt-1.5">{ann.author} • {ann.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. READY TO ELEVATE SKILLS CTA */}
      <section className="py-16 bg-gradient-to-br from-[#102A43] via-[#153A5B] to-[#102A43] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-semibold border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Empower Your Meteorological Career</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Master Modern Weather Forecasting?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Join over 1,500 scientific officers and forecasters advancing national disaster resilience and accurate weather warning systems.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={onCreateAccount}
              className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-[#102A43] font-bold text-sm shadow-md transition-all"
            >
              Sign Up via IMD Parichay SSO
            </button>
            <button
              onClick={onExploreCourses}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Browse Course Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
