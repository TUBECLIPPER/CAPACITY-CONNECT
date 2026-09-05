import React, { useState } from 'react';
import { 
  Bell, 
  CheckCheck, 
  AlertCircle, 
  Award, 
  BookOpen, 
  Clock, 
  Calendar, 
  Check, 
  Filter, 
  Sparkles,
  Megaphone,
  Building
} from 'lucide-react';
import { Announcement } from '../types';

interface NotificationsViewProps {
  announcements: Announcement[];
  onMarkAllRead: () => void;
  onToggleRead: (id: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  announcements = [],
  onMarkAllRead,
  onToggleRead
}) => {
  const [filter, setFilter] = useState<string>('All');
  const safeAnnouncements = Array.isArray(announcements) ? announcements : [];

  const filteredAnnouncements = safeAnnouncements.filter((item) => {
    if (filter === 'All') return true;
    return item?.category === filter;
  });

  const unreadCount = safeAnnouncements.filter(a => !a?.isRead).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2457C5]">HQ Dissemination Feed</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
            Notifications &amp; Announcements
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Official operational circulars, CTI symposium deadlines, and system bulletins
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={onMarkAllRead}
            className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-[#2457C5] font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors self-start sm:self-center cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All as Read ({unreadCount})</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'Important', 'Learning', 'Achievement', 'Reminder'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
              filter === cat
                ? 'bg-[#102A43] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border transition-all ${
              item.isRead
                ? 'bg-white border-slate-200'
                : 'bg-gradient-to-r from-blue-50/60 via-white to-white border-blue-200 shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                {/* Category Icon */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  item.category === 'Important' ? 'bg-red-100 text-red-700' :
                  item.category === 'Learning' ? 'bg-blue-100 text-[#2457C5]' :
                  item.category === 'Achievement' ? 'bg-amber-100 text-amber-800' :
                  'bg-teal-100 text-teal-800'
                }`}>
                  {item.category === 'Important' ? <AlertCircle className="w-5 h-5" /> :
                   item.category === 'Learning' ? <BookOpen className="w-5 h-5" /> :
                   item.category === 'Achievement' ? <Award className="w-5 h-5" /> :
                   <Clock className="w-5 h-5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      item.category === 'Important' ? 'bg-red-100 text-red-800' :
                      item.category === 'Learning' ? 'bg-blue-100 text-[#2457C5]' :
                      item.category === 'Achievement' ? 'bg-amber-100 text-amber-900' :
                      'bg-teal-100 text-teal-900'
                    }`}>
                      {item.category}
                    </span>
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#2457C5]" />
                    )}
                    <span className="text-[11px] text-slate-400">• {item.timestamp}</span>
                    {item.targetRole && (
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                        Target: {item.targetRole}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-[#102A43] pt-0.5">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{item.content}</p>

                  <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>Issued by: <strong className="text-slate-700">{item.author}</strong> ({item.authorRole})</span>
                  </div>
                </div>
              </div>

              {/* Mark read button */}
              <button
                onClick={() => onToggleRead(item.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
                title={item.isRead ? 'Mark as Unread' : 'Mark as Read'}
              >
                <Check className={`w-4 h-4 ${item.isRead ? 'text-slate-400' : 'text-[#2457C5] font-bold'}`} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
