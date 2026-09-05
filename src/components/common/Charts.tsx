import React from 'react';
import { CompetencyScore } from '../../types';

// Circular Progress Gauge
export const CircularProgress: React.FC<{
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  label?: string;
  sublabel?: string;
}> = ({
  percentage,
  size = 120,
  strokeWidth = 10,
  color = '#2457C5',
  bgColor = '#E2E8F0',
  label,
  sublabel
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
        <span className="text-xl font-bold text-[#102A43]">
          {label ?? `${percentage}%`}
        </span>
        {sublabel && (
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};

// Radar Competency Chart (SVG based)
export const CompetencyRadar: React.FC<{
  data: CompetencyScore[];
  size?: number;
}> = ({ data, size = 300 }) => {
  const center = size / 2;
  const radius = center - 40;
  const totalSides = data.length;

  // Generate polygon points for a given ratio (0 to 1)
  const getCoordinates = (index: number, ratio: number) => {
    const angle = (Math.PI * 2 / totalSides) * index - Math.PI / 2;
    const x = center + radius * ratio * Math.cos(angle);
    const y = center + radius * ratio * Math.sin(angle);
    return { x, y };
  };

  const levelRatios = [0.25, 0.5, 0.75, 1.0];

  // Data polygon points
  const points = data
    .map((item, i) => {
      const ratio = Math.min(item.score / item.fullMark, 1);
      const { x, y } = getCoordinates(i, ratio);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="relative flex items-center justify-center p-2">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background concentric polygons */}
        {levelRatios.map((ratio, rIdx) => {
          const gridPoints = Array.from({ length: totalSides })
            .map((_, i) => {
              const { x, y } = getCoordinates(i, ratio);
              return `${x},${y}`;
            })
            .join(' ');
          return (
            <polygon
              key={`ring-${rIdx}`}
              points={gridPoints}
              fill={rIdx === levelRatios.length - 1 ? '#F8FAFC' : 'transparent'}
              stroke="#E2E8F0"
              strokeWidth="1"
              strokeDasharray={rIdx < levelRatios.length - 1 ? '2 2' : undefined}
            />
          );
        })}

        {/* Axis lines */}
        {data.map((_, i) => {
          const { x, y } = getCoordinates(i, 1);
          return (
            <line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#CBD5E1"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon with gradient fill */}
        <defs>
          <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2457C5" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#12A594" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <polygon
          points={points}
          fill="url(#radarGrad)"
          stroke="#2457C5"
          strokeWidth="2.5"
          className="transition-all duration-700 ease-out"
        />

        {/* Value dots and labels */}
        {data.map((item, i) => {
          const ratio = Math.min(item.score / item.fullMark, 1);
          const { x, y } = getCoordinates(i, ratio);
          const labelCoord = getCoordinates(i, 1.25);
          return (
            <g key={`point-${i}`}>
              <circle
                cx={x}
                cy={y}
                r="4.5"
                fill="#12A594"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <text
                x={labelCoord.x}
                y={labelCoord.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[11px] font-medium fill-[#334E68] select-none"
              >
                {item.subject}
              </text>
              <text
                x={labelCoord.x}
                y={labelCoord.y + 12}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[10px] font-bold fill-[#2457C5] select-none"
              >
                {item.score}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// Weekly Learning Activity Chart
export const WeeklyActivityChart: React.FC<{
  data: { day: string; hours: number; target: number }[];
}> = ({ data }) => {
  const maxHours = 6;
  const height = 150;

  return (
    <div className="w-full">
      <div className="flex items-end justify-between h-36 gap-2 pt-6 pb-2 border-b border-slate-100">
        {data.map((item) => {
          const barHeight = Math.min((item.hours / maxHours) * height, height);
          const isAboveTarget = item.hours >= item.target;

          return (
            <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group relative">
              {/* Tooltip on hover */}
              <div className="absolute -top-8 bg-[#102A43] text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none shadow-md">
                {item.hours} hrs ({isAboveTarget ? 'Target met' : 'Below target'})
              </div>
              <div className="w-full max-w-[28px] h-28 bg-slate-100 rounded-t-lg relative flex items-end overflow-hidden">
                {/* Target line */}
                <div
                  className="absolute w-full border-t border-dashed border-amber-400 z-10"
                  style={{ bottom: `${(item.target / maxHours) * 100}%` }}
                />
                {/* Filled bar */}
                <div
                  className={`w-full transition-all duration-700 rounded-t-md ${
                    isAboveTarget
                      ? 'bg-gradient-to-t from-[#2457C5] to-[#12A594]'
                      : 'bg-gradient-to-t from-slate-400 to-slate-300'
                  }`}
                  style={{ height: `${barHeight}px` }}
                />
              </div>
              <span className="text-xs font-medium text-slate-500">{item.day}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#2457C5] to-[#12A594]" />
          <span>Active Learning Hours</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 border-t-2 border-dashed border-amber-400 inline-block" />
          <span>Daily Goal (2.0 hrs)</span>
        </div>
      </div>
    </div>
  );
};

// Bar Chart for Analytics (Monthly Enrollments or Course Popularity)
export const AnalyticsBarChart: React.FC<{
  labels: string[];
  values: number[];
  metricLabel: string;
  color?: string;
}> = ({ labels, values, metricLabel, color = '#2457C5' }) => {
  const maxValue = Math.max(...values, 10);

  return (
    <div className="w-full">
      <div className="flex items-end justify-between h-40 gap-3 pt-6 pb-2 border-b border-slate-100">
        {labels.map((label, idx) => {
          const val = values[idx];
          const barHeight = (val / maxValue) * 120;

          return (
            <div key={label} className="flex-1 flex flex-col items-center gap-2 group relative">
              <div className="absolute -top-7 bg-[#102A43] text-white text-[11px] font-semibold py-0.5 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none shadow-md">
                {val} {metricLabel}
              </div>
              <div className="w-full max-w-[36px] h-32 bg-slate-100 rounded-t-lg relative flex items-end overflow-hidden">
                <div
                  className="w-full rounded-t-lg transition-all duration-700"
                  style={{
                    height: `${barHeight}px`,
                    background: color
                  }}
                />
              </div>
              <span className="text-xs font-medium text-slate-600 truncate max-w-[50px]">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Donut Chart for User Roles
export const RoleDonutChart: React.FC<{
  trainees: number;
  trainers: number;
  admins: number;
}> = ({ trainees, trainers, admins }) => {
  const total = trainees + trainers + admins;
  const pTrainee = (trainees / total) * 100;
  const pTrainer = (trainers / total) * 100;
  const pAdmin = (admins / total) * 100;

  const size = 160;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const offsetTrainee = circumference;
  const offsetTrainer = offsetTrainee - (pTrainee / 100) * circumference;
  const offsetAdmin = offsetTrainer - (pTrainer / 100) * circumference;

  return (
    <div className="flex items-center gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Trainee arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#2457C5"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (pTrainee / 100) * circumference}
          />
          {/* Trainer arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#12A594"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (pTrainer / 100) * circumference}
            style={{
              transformOrigin: '50% 50%',
              transform: `rotate(${(pTrainee / 100) * 360}deg)`
            }}
          />
          {/* Admin arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#D97706"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (pAdmin / 100) * circumference}
            style={{
              transformOrigin: '50% 50%',
              transform: `rotate(${((pTrainee + pTrainer) / 100) * 360}deg)`
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-xl font-bold text-[#102A43]">{total}</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Total Users</span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[#2457C5]" />
          <span className="text-slate-600 font-medium">Trainees ({pTrainee.toFixed(0)}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[#12A594]" />
          <span className="text-slate-600 font-medium">Trainers ({pTrainer.toFixed(0)}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[#D97706]" />
          <span className="text-slate-600 font-medium">Admins ({pAdmin.toFixed(0)}%)</span>
        </div>
      </div>
    </div>
  );
};
