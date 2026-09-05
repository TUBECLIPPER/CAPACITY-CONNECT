import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Mail, 
  MapPin, 
  Building, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Save, 
  Sparkles, 
  Plus, 
  X,
  FileBadge
} from 'lucide-react';
import { User } from '../types';
import { CircularProgress } from '../components/common/Charts';

interface ProfileViewProps {
  user: User;
  onUpdateUser: (updated: Partial<User>) => void;
  onShowToast: (msg: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateUser,
  onShowToast
}) => {
  const [name, setName] = useState(user?.name || '');
  const [designation, setDesignation] = useState(user?.designation || '');
  const [department, setDepartment] = useState(user?.department || '');
  const [location, setLocation] = useState(user?.location || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [interests, setInterests] = useState<string[]>(user?.interests || []);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [newInterestInput, setNewInterestInput] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillInput.trim() || skills.includes(newSkillInput.trim())) return;
    setSkills([...skills, newSkillInput.trim()]);
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInterestInput.trim() || interests.includes(newInterestInput.trim())) return;
    setInterests([...interests, newInterestInput.trim()]);
    setNewInterestInput('');
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests(interests.filter(i => i !== interestToRemove));
  };

  const handleSave = () => {
    onUpdateUser({
      name,
      designation,
      department,
      location,
      bio,
      skills,
      interests,
      profileCompletion: 95 // boosted upon editing
    });
    onShowToast('Professional Profile updated successfully!');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 max-w-5xl mx-auto">
      
      {/* 1. PROFILE BANNER & COMPLETION PROGRESS */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#2457C5]/20 shadow-sm"
          />
          <div className="space-y-1">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-50 text-[#2457C5]">
              {user.role} Profile • IMD Intranet
            </span>
            <h1 className="text-2xl font-extrabold text-[#102A43]">{name}</h1>
            <p className="text-xs text-slate-600 font-medium">{designation} • {department}</p>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 shrink-0">
          <CircularProgress
            percentage={user.profileCompletion}
            size={70}
            strokeWidth={7}
            color="#12A594"
            label={`${user.profileCompletion}%`}
          />
          <div>
            <p className="text-xs font-bold text-[#102A43]">Profile Readiness</p>
            <span className="text-[11px] text-slate-500 block">WMO-compliant forecaster docket</span>
          </div>
        </div>
      </div>

      {/* 2. EDITABLE PROFILE FORM */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-[#102A43]">Official Information &amp; Bio</h3>
            <p className="text-xs text-slate-500">Government service record maintained for Mission Karmayogi</p>
          </div>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#102A43] to-[#2457C5] hover:opacity-95 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Updates</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457C5]/20"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Official Designation</label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457C5]/20"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Department / Division</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457C5]/20"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Station Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457C5]/20"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">Operational Duty Overview &amp; Research Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457C5]/20"
            />
          </div>
        </div>

        {/* Qualifications list */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Verified Academic &amp; WMO Qualifications
          </h4>
          <div className="space-y-2">
            {user.qualifications.map((q, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{q}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Tag Management */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Technical &amp; Operational Competencies
            </h4>
          </div>

          <form onSubmit={handleAddSkill} className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Add skill (e.g. GrADS, MetPy, Sounding Interpretation)..."
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#2457C5] text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-[#2457C5] border border-blue-200"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-red-500 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Research Interests */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Meteorological Research &amp; Operational Focus
          </h4>

          <form onSubmit={handleAddInterest} className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Add interest (e.g. Flash Flood Guidance, Monex teleconnections)..."
              value={newInterestInput}
              onChange={(e) => setNewInterestInput(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-teal-700 text-white text-xs font-bold rounded-lg hover:bg-teal-800 transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200"
              >
                {interest}
                <button
                  type="button"
                  onClick={() => handleRemoveInterest(interest)}
                  className="hover:text-red-500 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
