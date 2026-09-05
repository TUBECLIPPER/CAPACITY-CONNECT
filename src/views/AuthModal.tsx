import React, { useState } from 'react';
import { 
  X, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  User as UserIcon, 
  ShieldCheck, 
  GraduationCap, 
  Building, 
  Check, 
  ArrowRight,
  CloudRain,
  AlertCircle
} from 'lucide-react';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onLoginSuccess: (role: UserRole, email?: string, name?: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [role, setRole] = useState<UserRole>('trainee');
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [department, setDepartment] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [forgotPassSent, setForgotPassSent] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'login') {
      if (!email || !password) {
        setErrorMsg('Please provide your official email and password.');
        return;
      }
      onLoginSuccess(role, email);
    } else {
      if (!name || !email || !password) {
        setErrorMsg('Please complete all required fields.');
        return;
      }
      onLoginSuccess(role, email, name);
    }
  };

  const handleQuickDemo = (demoRole: UserRole) => {
    onLoginSuccess(demoRole);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden relative my-8">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#102A43] via-[#1A3F66] to-[#102A43] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-white/10 p-1 flex items-center justify-center border border-white/20">
              <CloudRain className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                MoES • India Meteorological Department
              </span>
              <h3 className="text-xl font-extrabold text-white">Capacity Connect</h3>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            {mode === 'login'
              ? 'Sign in to access your meteorological courses, certifications, and operational modules.'
              : 'Register your official profile for national meteorological capacity building.'}
          </p>
        </div>

        {/* Quick Demo Role Pill Selector for Instant Exploration */}
        <div className="bg-slate-100 p-3 border-b border-slate-200">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1.5 px-1">
            <span>QUICK DEMO ONE-CLICK SIGN-IN:</span>
            <span className="text-teal-700">Prototype Mode</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('trainee')}
              className="py-1.5 px-2 bg-white hover:bg-blue-50 text-[#2457C5] border border-blue-200 rounded-lg text-xs font-bold transition-all shadow-xs text-center"
            >
              Enter as Trainee
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('trainer')}
              className="py-1.5 px-2 bg-white hover:bg-teal-50 text-teal-700 border border-teal-200 rounded-lg text-xs font-bold transition-all shadow-xs text-center"
            >
              Enter as Trainer
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="py-1.5 px-2 bg-white hover:bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs font-bold transition-all shadow-xs text-center"
            >
              Enter as Admin
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {/* Parichay SSO Button */}
          <button
            type="button"
            onClick={() => handleQuickDemo('trainee')}
            className="w-full mb-5 py-2.5 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100/80 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-all shadow-2xs"
          >
            <ShieldCheck className="w-4 h-4 text-[#2457C5]" />
            <span>Sign In with Parichay (Gov.in SSO)</span>
          </button>

          <div className="relative flex py-1 items-center mb-5">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="shrink-0 mx-3 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Or use official credentials
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Role Selection (especially highlighted for sign up) */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Select Your Role Profile
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {/* Trainee */}
              <div
                onClick={() => setRole('trainee')}
                className={`p-3 rounded-xl border cursor-pointer transition-all text-center ${
                  role === 'trainee'
                    ? 'border-[#2457C5] bg-blue-50/60 ring-2 ring-[#2457C5]/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <GraduationCap className={`w-5 h-5 mx-auto mb-1 ${role === 'trainee' ? 'text-[#2457C5]' : 'text-slate-400'}`} />
                <span className="block text-xs font-bold text-slate-800">Trainee</span>
                <span className="text-[10px] text-slate-500">Forecaster / Scientist</span>
              </div>

              {/* Trainer */}
              <div
                onClick={() => setRole('trainer')}
                className={`p-3 rounded-xl border cursor-pointer transition-all text-center ${
                  role === 'trainer'
                    ? 'border-[#12A594] bg-teal-50/60 ring-2 ring-[#12A594]/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <UserIcon className={`w-5 h-5 mx-auto mb-1 ${role === 'trainer' ? 'text-teal-700' : 'text-slate-400'}`} />
                <span className="block text-xs font-bold text-slate-800">Trainer</span>
                <span className="text-[10px] text-slate-500">Faculty / Specialist</span>
              </div>

              {/* Admin */}
              <div
                onClick={() => setRole('admin')}
                className={`p-3 rounded-xl border cursor-pointer transition-all text-center ${
                  role === 'admin'
                    ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <Building className={`w-5 h-5 mx-auto mb-1 ${role === 'admin' ? 'text-amber-700' : 'text-slate-400'}`} />
                <span className="block text-xs font-bold text-slate-800">Admin</span>
                <span className="text-[10px] text-slate-500">MoES / IMD HQ</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name with Title</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="e.g. Dr. Ananya Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457C5]/20 focus:border-[#2457C5]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Employee / PPO ID</label>
                    <input
                      type="text"
                      placeholder="IMD-MUM-4428"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457C5]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Centre / Station</label>
                    <input
                      type="text"
                      placeholder="RMC Mumbai"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457C5]/20"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Official Email Address (@imd.gov.in / @moes.gov.in)</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  placeholder="name@imd.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457C5]/20 focus:border-[#2457C5]"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setShowForgot(!showForgot)}
                    className="text-[11px] text-[#2457C5] hover:underline font-semibold"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457C5]/20 focus:border-[#2457C5]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {showForgot && (
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-slate-700">
                {forgotPassSent ? (
                  <p className="text-teal-700 font-bold">A secure OTP reset link has been dispatched to your NIC registered email.</p>
                ) : (
                  <div className="flex items-center justify-between gap-2">
                    <span>Send password reset link to entered email?</span>
                    <button
                      type="button"
                      onClick={() => setForgotPassSent(true)}
                      className="px-2.5 py-1 bg-[#2457C5] text-white font-bold rounded text-[10px]"
                    >
                      Send Reset OTP
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#102A43] to-[#2457C5] hover:opacity-95 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{mode === 'login' ? 'Sign In to Capacity Connect' : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle Login / Signup */}
          <div className="mt-4 text-center">
            {mode === 'login' ? (
              <p className="text-xs text-slate-600">
                New scientific trainee or faculty member?{' '}
                <button
                  onClick={() => { setMode('signup'); setErrorMsg(''); }}
                  className="text-[#2457C5] font-bold hover:underline"
                >
                  Register Here
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-600">
                Already registered with IMD LMS?{' '}
                <button
                  onClick={() => { setMode('login'); setErrorMsg(''); }}
                  className="text-[#2457C5] font-bold hover:underline"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>

          {/* CodeWalkers Credit on Login Modal as requested */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span>IMD Security Gateway • Encrypted TLS 1.3</span>
            <span>Platform by <strong className="text-slate-600 font-bold">CodeWalkers</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
