import React from 'react';
import { CloudRain, ShieldCheck, ExternalLink, Mail, Phone, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC<{
  onNavigate?: (view: string) => void;
}> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#102A43] text-slate-300 border-t border-slate-800 text-xs">
      {/* Top Gov Accreditation Band */}
      <div className="border-b border-slate-800/80 py-4 px-4 sm:px-6 bg-[#0B1E30]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white font-bold text-xs">Certified National Capacity Building Framework</p>
              <p className="text-[11px] text-slate-400">Compliant with WMO-No. 1209 & Mission Karmayogi Guidelines</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <span>National Disaster Management Authority (NDMA)</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <span>World Meteorological Organization (WMO)</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Ministry Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2457C5] to-[#12A594] p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#102A43] rounded-[10px] flex items-center justify-center">
                  <CloudRain className="w-5 h-5 text-teal-400" />
                </div>
              </div>
              <div>
                <span className="text-base font-bold text-white tracking-tight">Capacity Connect</span>
                <p className="text-[11px] text-slate-400 font-medium">Digital Capacity Building & LMS Portal</p>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              An initiative under the Ministry of Earth Sciences (MoES), Government of India, dedicated to continuously upskilling scientific, forecasting, and technical personnel of the India Meteorological Department.
            </p>
            <div className="pt-1 space-y-1.5 text-slate-400 text-[11px]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Mausam Bhavan, Lodhi Road, New Delhi — 110003</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>capacity.connect@imd.gov.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>+91-11-24611060 / 24611792 (MoES Helpdesk)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Pathways */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Curriculum</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => onNavigate?.('courses')} className="hover:text-teal-300 transition-colors text-left">Synoptic Meteorology</button></li>
              <li><button onClick={() => onNavigate?.('courses')} className="hover:text-teal-300 transition-colors text-left">Dual-Pol Doppler Radar</button></li>
              <li><button onClick={() => onNavigate?.('courses')} className="hover:text-teal-300 transition-colors text-left">Numerical Weather Prediction</button></li>
              <li><button onClick={() => onNavigate?.('courses')} className="hover:text-teal-300 transition-colors text-left">Tropical Cyclone Tracking</button></li>
              <li><button onClick={() => onNavigate?.('courses')} className="hover:text-teal-300 transition-colors text-left">Flash Flood Guidance</button></li>
              <li><button onClick={() => onNavigate?.('courses')} className="hover:text-teal-300 transition-colors text-left">AI/ML in GeoSciences</button></li>
            </ul>
          </div>

          {/* Col 3: Portal Access */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Portal Navigation</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => onNavigate?.('landing')} className="hover:text-teal-300 transition-colors text-left">Overview & Vision</button></li>
              <li><button onClick={() => onNavigate?.('courses')} className="hover:text-teal-300 transition-colors text-left">All Course Catalog</button></li>
              <li><button onClick={() => onNavigate?.('dashboard')} className="hover:text-teal-300 transition-colors text-left">Learner Dashboard</button></li>
              <li><button onClick={() => onNavigate?.('certificates')} className="hover:text-teal-300 transition-colors text-left">Verification Registry</button></li>
              <li><button onClick={() => onNavigate?.('announcements')} className="hover:text-teal-300 transition-colors text-left">Official Notifications</button></li>
              <li><button onClick={() => onNavigate?.('profile')} className="hover:text-teal-300 transition-colors text-left">Professional Profile</button></li>
            </ul>
          </div>

          {/* Col 4: Gov & Support */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">MoES Institutions</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="https://mausam.imd.gov.in" target="_blank" rel="noreferrer" className="hover:text-teal-300 transition-colors flex items-center gap-1">IMD Official <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="https://www.tropmet.res.in" target="_blank" rel="noreferrer" className="hover:text-teal-300 transition-colors flex items-center gap-1">IITM Pune <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="https://incois.gov.in" target="_blank" rel="noreferrer" className="hover:text-teal-300 transition-colors flex items-center gap-1">INCOIS Hyderabad <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="https://www.ncmrwf.gov.in" target="_blank" rel="noreferrer" className="hover:text-teal-300 transition-colors flex items-center gap-1">NCMRWF Noida <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="https://moes.gov.in" target="_blank" rel="noreferrer" className="hover:text-teal-300 transition-colors flex items-center gap-1">Ministry HQ <ExternalLink className="w-2.5 h-2.5" /></a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & CodeWalkers Credit */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>© 2026 India Meteorological Department, Ministry of Earth Sciences. All Rights Reserved.</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="text-slate-400 hover:text-slate-300 cursor-pointer">Terms of Service & Privacy Policy</span>
          </div>

          {/* Requested Branding: Made by CodeWalkers & Designed & Developed by CodeWalkers */}
          <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-full">
            <span className="text-slate-400 text-[11px]">
              Designed &amp; Developed by <span className="text-teal-400 font-bold tracking-wide">CodeWalkers</span>
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-400"></span>
            <span className="text-slate-300 font-semibold text-[11px]">
              Made by <span className="text-white font-extrabold underline decoration-teal-400/60 underline-offset-2">CodeWalkers</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
