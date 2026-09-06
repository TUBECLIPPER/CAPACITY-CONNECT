import { User, Course, Assessment, Certificate, Announcement, UserApprovalItem, TrainerSubmission, CompetencyScore } from '../types';

export const INITIAL_USERS: Record<string, User> = {
  trainee: {
    id: 'usr-tr-101',
    name: 'Dr. Ananya Sharma',
    email: 'ananya.sharma@imd.gov.in',
    role: 'trainee',
    designation: 'Meteorologist Grade-I',
    department: 'Regional Meteorological Centre (RMC)',
    location: 'Colaba, Mumbai, Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop',
    profileCompletion: 85,
    employeeId: 'IMD-MUM-4428',
    joinedDate: '12 March 2021',
    qualifications: [
      'Ph.D. in Atmospheric Sciences — IIT Delhi (2020)',
      'M.Sc. in Physics (Specialization in Meteorology) — Pune University (2016)',
      'WMO Certified Forecaster Class I (2022)'
    ],
    skills: [
      'Doppler Weather Radar (DWR)',
      'Numerical Weather Prediction',
      'Tropical Cyclone Tracking',
      'Python for GeoSciences',
      'Nowcasting Protocols',
      'Satellite Imagery INSAT-3DR'
    ],
    interests: [
      'Arabian Sea Cyclogenesis',
      'Urban Cloudburst Warning',
      'Climate Extremes & Resiliency',
      'AI in Radar Precipitation Estimation'
    ],
    bio: 'Operational forecaster at RMC Mumbai focused on coastal cyclone alerts, monsoon depression tracking, and high-resolution urban flash flood advisories across the Konkan belt.'
  },
  trainer: {
    id: 'usr-fac-202',
    name: 'Dr. Rajeshwar Varma',
    email: 'r.varma@imd.gov.in',
    role: 'trainer',
    designation: 'Scientist "F" & Head of Training Division',
    department: 'Central Training Institute (CTI), IMD',
    location: 'Pashan, Pune, Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop',
    profileCompletion: 95,
    employeeId: 'IMD-PUN-1049',
    joinedDate: '18 August 2008',
    qualifications: [
      'Ph.D. in Numerical Modeling — IISc Bangalore (2006)',
      'Former Visiting Fellow at ECMWF, Reading, UK',
      'Senior Member, WMO Commission for Weather Services'
    ],
    skills: [
      'Atmospheric Thermodynamics',
      'Radar Meteorology & Dual-Pol DWR',
      'Mesoscale NWP (WRF/UM)',
      'Disaster Early Warning Systems',
      'Curriculum Design & Pedagogy'
    ],
    interests: ['Severe Convective Storms', 'Climate Modelling', 'Hydrometeorology'],
    bio: 'Lead faculty at IMD Central Training Institute with over 18 years of instructional experience training national and international meteorologists from SAARC & RIMES nations.'
  },
  admin: {
    id: 'usr-adm-303',
    name: 'Smt. Preeti Deshmukh',
    email: 'preeti.deshmukh@moes.gov.in',
    role: 'admin',
    designation: 'Director (Capacity Building & Human Resources)',
    department: 'Ministry of Earth Sciences (MoES), HQ',
    location: 'Prithvi Bhavan, Lodhi Road, New Delhi',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250&auto=format&fit=crop',
    profileCompletion: 100,
    employeeId: 'MOES-DEL-0081',
    joinedDate: '04 January 2014',
    qualifications: [
      'Master of Public Administration — IIPA New Delhi',
      'B.Tech in Computer Science — NIT Trichy',
      'Executive Leadership — IIM Ahmedabad'
    ],
    skills: ['Policy Frameworks', 'Personnel Administration', 'E-Governance', 'Capacity Mapping'],
    interests: ['Digital Learning Infrastructure', 'Scientific Workforce Upskilling'],
    bio: 'Administering talent development and digital capacity-building initiatives across MoES organizations including IMD, IITM, INCOIS, NCMRWF, and NIOT.'
  }
};

export const COURSES: Course[] = [
  {
    id: 'course-101',
    title: 'Advanced Doppler Weather Radar (DWR) Analysis & Nowcasting',
    description: 'Master dual-polarization Doppler radar products, reflectivity (Z), radial velocity (V), spectrum width (W), differential reflectivity (ZDR), and real-time severe convective storm tracking.',
    category: 'Remote Sensing & Radar',
    level: 'Advanced',
    duration: '24 Hours (6 Weeks)',
    modulesCount: 6,
    lessonsCount: 18,
    trainer: {
      id: 'usr-fac-202',
      name: 'Dr. Rajeshwar Varma',
      designation: 'Scientist "F", CTI Pune',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop',
      rating: 4.9
    },
    rating: 4.9,
    ratingsCount: 342,
    enrolledCount: 618,
    skillsAcquired: ['Dual-Pol Radar Products', 'Velocity Azimuth Display (VAD)', 'Hail & Microburst Signatures', 'Nowcast Issuance (0-3 hrs)'],
    thumbnail: 'https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?q=80&w=800&auto=format&fit=crop',
    badgeIcon: 'Radar',
    isEnrolled: true,
    progress: 68,
    lastAccessedLesson: 'Interpreting Hydrometeor Classification (HMC) Algorithms',
    syllabus: [
      {
        id: 'mod-1',
        title: 'Module 1: Principles of Radar Meteorology & Pulse Doppler Basics',
        duration: '3h 30m',
        lessons: [
          { id: 'les-1', title: 'Radar Equation, Beam Propagation, and Refractivity Anomalies', type: 'video', duration: '45m', completed: true },
          { id: 'les-2', title: 'Ground Clutter Filtering & Clear-Air Echo Recognition', type: 'reading', duration: '30m', completed: true },
          { id: 'les-3', title: 'Interactive Lab: Raw Doppler IQ Data Processing', type: 'dataset', duration: '1h 15m', completed: true }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Dual-Polarization Metrics & Hydro-meteor Classification',
        duration: '4h 15m',
        lessons: [
          { id: 'les-4', title: 'ZDR, Correlation Coefficient (ρHV), and Specific Differential Phase (KDP)', type: 'video', duration: '50m', completed: true },
          { id: 'les-5', title: 'Interpreting Hydrometeor Classification (HMC) Algorithms', type: 'video', duration: '1h 10m', completed: false },
          { id: 'les-6', title: 'Mid-Module Practical Simulation: Hail Spike Identification', type: 'quiz', duration: '45m', completed: false }
        ]
      },
      {
        id: 'mod-3',
        title: 'Module 3: Severe Convective Storms & Mesoscale Vortex Signatures',
        duration: '4h 45m',
        lessons: [
          { id: 'les-7', title: 'Mesocyclone Detection & Tornado Vortex Signatures (TVS)', type: 'video', duration: '55m', completed: false },
          { id: 'les-8', title: 'Squall Line Morphology, Bow Echoes & Rear Inflow Jets', type: 'video', duration: '1h 05m', completed: false },
          { id: 'les-9', title: 'Case Study: 2024 Delhi Dust Storm & Microburst Analysis', type: 'dataset', duration: '1h 30m', completed: false }
        ]
      },
      {
        id: 'mod-4',
        title: 'Module 4: Quantitative Precipitation Estimation (QPE)',
        duration: '3h 50m',
        lessons: [
          { id: 'les-10', title: 'R(Z), R(KDP), and Combined Polarimetric Rain Equations', type: 'video', duration: '45m', completed: false },
          { id: 'les-11', title: 'Gauge-Radar Merging Techniques for Urban Flood Inundation', type: 'reading', duration: '50m', completed: false }
        ]
      },
      {
        id: 'mod-5',
        title: 'Module 5: Operational Nowcasting Protocols & Standard Operating Procedures (SOPs)',
        duration: '4h 00m',
        lessons: [
          { id: 'les-12', title: 'Formulating 3-Hour Colour-Coded Impact Warnings (Red/Orange/Yellow)', type: 'video', duration: '1h 15m', completed: false },
          { id: 'les-13', title: 'Dissemination via Common Alerting Protocol (CAP-India)', type: 'reading', duration: '45m', completed: false }
        ]
      },
      {
        id: 'mod-6',
        title: 'Module 6: Capstone Assessment & Radar Certification Exam',
        duration: '3h 40m',
        lessons: [
          { id: 'les-14', title: 'Real-Time Radar Diagnostic Simulator Exam', type: 'quiz', duration: '2h 00m', completed: false },
          { id: 'les-15', title: 'Official Viva & Capstone Submission', type: 'quiz', duration: '1h 40m', completed: false }
        ]
      }
    ],
    resources: [
      { id: 'res-1', title: 'IMD Standard Operating Procedure for DWR Stations (Ver 4.2).pdf', fileType: 'pdf', size: '14.8 MB' },
      { id: 'res-2', title: 'Sample_NetCDF_DualPol_Radar_Volume_Scan.nc', fileType: 'netcdf', size: '124 MB' },
      { id: 'res-3', title: 'Py-ART Python Radar Processing Reference Notebooks.zip', fileType: 'zip', size: '32.1 MB' },
      { id: 'res-4', title: 'Dual-Polarization Hydrometeor Signatures Pocket Guide.pdf', fileType: 'pdf', size: '8.4 MB' }
    ]
  },
  {
    id: 'course-102',
    title: 'Tropical Cyclone Analysis, Track Prediction & Storm Surge Warning',
    description: 'Comprehensive operational manual on Dvorak technique, automated satellite vortex tracking, ensemble track cones, landfall estimation, and coastal evacuation mapping.',
    category: 'Disaster Preparedness',
    level: 'Advanced',
    duration: '30 Hours (8 Weeks)',
    modulesCount: 7,
    lessonsCount: 22,
    trainer: {
      id: 'usr-fac-203',
      name: 'Dr. Mrutyunjay Mohapatra',
      designation: 'Specialist Forecaster & RSMC New Delhi',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop',
      rating: 5.0
    },
    rating: 5.0,
    ratingsCount: 489,
    enrolledCount: 890,
    skillsAcquired: ['Enhanced Infrared Dvorak (EIR)', 'Ensemble Prediction System (EPS)', 'Storm Surge Numerical Modeling', 'Disaster Early Warning Alerts'],
    thumbnail: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?q=80&w=800&auto=format&fit=crop',
    badgeIcon: 'Wind',
    isEnrolled: true,
    progress: 42,
    lastAccessedLesson: 'T-Number Determination using Curved Band & Embedded Centre Patterns',
    syllabus: [
      {
        id: 'tc-mod-1',
        title: 'Module 1: Genesis of North Indian Ocean Cyclones (Arabian Sea & Bay of Bengal)',
        duration: '4h 00m',
        lessons: [
          { id: 'tc-1', title: 'Sea Surface Temperature (SST), Ocean Heat Content, and Low-Level Vorticity', type: 'video', duration: '50m', completed: true },
          { id: 'tc-2', title: 'Vertical Wind Shear & Madden-Julian Oscillation (MJO) Phase Coupling', type: 'video', duration: '1h 05m', completed: true }
        ]
      },
      {
        id: 'tc-mod-2',
        title: 'Module 2: Dvorak Technique & INSAT-3DR Satellite Analysis',
        duration: '5h 15m',
        lessons: [
          { id: 'tc-3', title: 'Visible & Enhanced IR Pattern Recognition', type: 'video', duration: '1h 10m', completed: true },
          { id: 'tc-4', title: 'T-Number Determination using Curved Band & Embedded Centre Patterns', type: 'video', duration: '1h 20m', completed: false },
          { id: 'tc-5', title: 'Dvorak Technique Practical Workshop', type: 'quiz', duration: '1h 00m', completed: false }
        ]
      }
    ],
    resources: [
      { id: 'res-tc-1', title: 'WMO TCP Report No 48: Tropical Cyclones of the North Indian Ocean.pdf', fileType: 'pdf', size: '28.4 MB' },
      { id: 'res-tc-2', title: 'Storm_Surge_IIT_Model_Configuration_Guide.pdf', fileType: 'pdf', size: '11.2 MB' }
    ]
  },
  {
    id: 'course-103',
    title: 'Numerical Weather Prediction: WRF Model Setup, Parameterization & Post-Processing',
    description: 'Hands-on operational setup of Weather Research and Forecasting (WRF) model. Learn domain nesting, boundary conditions, microphysics schemes, and post-processing in Python/GrADS.',
    category: 'Numerical Weather Prediction',
    level: 'Intermediate',
    duration: '20 Hours (5 Weeks)',
    modulesCount: 5,
    lessonsCount: 15,
    trainer: {
      id: 'usr-fac-204',
      name: 'Dr. Arvind Sen',
      designation: 'Scientist "E", NCMRWF Noida',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&auto=format&fit=crop',
      rating: 4.8
    },
    rating: 4.8,
    ratingsCount: 275,
    enrolledCount: 512,
    skillsAcquired: ['WPS Geogrid & Metgrid', 'Cumulus Parameterization Schemes', 'Ensemble Kalman Filter (EnKF)', 'GRIB2 Parsing with Python'],
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
    badgeIcon: 'Cpu',
    isEnrolled: true,
    progress: 100,
    lastAccessedLesson: 'Course Completed — Certificate Generated',
    syllabus: [
      {
        id: 'wrf-mod-1',
        title: 'Module 1: High Performance Computing & WRF Architecture',
        duration: '4h 00m',
        lessons: [
          { id: 'wrf-1', title: 'Architecture of ARW Dynamics Core', type: 'video', duration: '1h 00m', completed: true },
          { id: 'wrf-2', title: 'Linux HPC cluster job script compilation with OpenMPI', type: 'reading', duration: '45m', completed: true }
        ]
      }
    ],
    resources: [
      { id: 'res-wrf-1', title: 'WRF_namelist.input_operational_template.txt', fileType: 'zip', size: '4.2 MB' }
    ]
  },
  {
    id: 'course-104',
    title: 'Climate Data Analytics with Python, Xarray & CDO',
    description: 'Work with multi-terabyte climate datasets including CMIP6, ERA5 reanalysis, IMD High-Resolution Gridded Daily Rainfall (0.25° x 0.25°), and statistical trend detection.',
    category: 'Climate Data Analytics',
    level: 'Foundational',
    duration: '18 Hours (4 Weeks)',
    modulesCount: 4,
    lessonsCount: 14,
    trainer: {
      id: 'usr-fac-205',
      name: 'Dr. Sunita Rao',
      designation: 'Senior Scientist, IITM Pune',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&auto=format&fit=crop',
      rating: 4.9
    },
    rating: 4.9,
    ratingsCount: 390,
    enrolledCount: 740,
    skillsAcquired: ['Xarray & Dask Multi-Core Computations', 'Climate Data Operators (CDO)', 'Extreme Precipitation Indices (ETCCDI)', 'Mann-Kendall Trend Analysis'],
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    badgeIcon: 'BarChart2',
    isEnrolled: false,
    progress: 0,
    syllabus: [
      {
        id: 'cda-mod-1',
        title: 'Module 1: Geospatial NetCDF & GRIB2 Data Structures',
        duration: '4h 00m',
        lessons: [
          { id: 'cda-1', title: 'Exploring Coordinates, Dimensions, and Variable Attributes', type: 'video', duration: '45m', completed: false },
          { id: 'cda-2', title: 'Fast Subsetting & Area-Averaged Anomaly Computations', type: 'dataset', duration: '1h 15m', completed: false }
        ]
      }
    ],
    resources: [
      { id: 'res-cda-1', title: 'IMD_Gridded_Precipitation_1901_2024_Sample.nc', fileType: 'netcdf', size: '48.2 MB' }
    ]
  },
  {
    id: 'course-105',
    title: 'Flash Flood Guidance System (FFGS) & River Basin Inundation',
    description: 'Learn the principles of soil moisture accounting, runoff thresholds, mean areal precipitation (MAP), and issuing basin-scale flash flood advisories with CWC & NDMA.',
    category: 'Hydrological Modelling',
    level: 'Intermediate',
    duration: '16 Hours (4 Weeks)',
    modulesCount: 4,
    lessonsCount: 12,
    trainer: {
      id: 'usr-fac-202',
      name: 'Dr. Rajeshwar Varma',
      designation: 'Scientist "F", CTI Pune',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop',
      rating: 4.7
    },
    rating: 4.7,
    ratingsCount: 180,
    enrolledCount: 380,
    skillsAcquired: ['South Asia FFGS Operations', 'Flash Flood Threat (FFT) Calculation', 'Soil Water Deficit Index', 'Inter-Agency Coordination'],
    thumbnail: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=800&auto=format&fit=crop',
    badgeIcon: 'Droplets',
    isEnrolled: false,
    progress: 0,
    syllabus: [],
    resources: []
  },
  {
    id: 'course-106',
    title: 'AI & Machine Learning for Satellite Meteorology & Cloud Motion Vectors',
    description: 'Deploy deep convolutional neural networks and transformer vision models for cloud classification, rapid intensification detection, and optical flow wind derivation.',
    category: 'AI & Satellite Tech',
    level: 'Advanced',
    duration: '22 Hours (6 Weeks)',
    modulesCount: 5,
    lessonsCount: 16,
    trainer: {
      id: 'usr-fac-204',
      name: 'Dr. Arvind Sen',
      designation: 'Scientist "E", NCMRWF Noida',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&auto=format&fit=crop',
      rating: 4.95
    },
    rating: 4.95,
    ratingsCount: 220,
    enrolledCount: 460,
    skillsAcquired: ['Deep Learning for Satellite Imagery', 'UNet Precipitation Nowcasting', 'PyTorch for Meteorology', 'Cloud Motion Vector Extraction'],
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    badgeIcon: 'Sparkles',
    isEnrolled: false,
    progress: 0,
    syllabus: [],
    resources: []
  },
  {
    id: 'course-107',
    title: 'Synoptic Meteorology & Monsoon Dynamics of the Indian Subcontinent',
    description: 'Foundations of tropical weather systems, Monex experiments, low-level jet streams, monsoon trough oscillation, Western Disturbances, and depression life cycles.',
    category: 'Meteorology Fundamentals',
    level: 'Foundational',
    duration: '25 Hours (6 Weeks)',
    modulesCount: 6,
    lessonsCount: 20,
    trainer: {
      id: 'usr-fac-202',
      name: 'Dr. Rajeshwar Varma',
      designation: 'Scientist "F", CTI Pune',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop',
      rating: 4.9
    },
    rating: 4.9,
    ratingsCount: 512,
    enrolledCount: 1120,
    skillsAcquired: ['Surface Synoptic Chart Plotting', 'Tephigram & Skew-T Sounding Analysis', 'Quasi-Geostrophic Dynamics', 'Monsoon Break & Active Phases'],
    thumbnail: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=800&auto=format&fit=crop',
    badgeIcon: 'CloudRain',
    isEnrolled: true,
    progress: 100,
    lastAccessedLesson: 'Final Exam Completed',
    syllabus: [],
    resources: []
  }
];

export const UPCOMING_ASSESSMENTS: Assessment[] = [
  {
    id: 'ass-01',
    courseId: 'course-101',
    courseTitle: 'Advanced Doppler Weather Radar (DWR) Analysis',
    title: 'Practical Case Assessment: Microburst & Severe Squall Line Diagnostics',
    type: 'Practical Simulation',
    dueDate: '12 Sep 2026',
    totalMarks: 100,
    duration: '120 mins',
    status: 'Pending',
    questionsCount: 25
  },
  {
    id: 'ass-02',
    courseId: 'course-102',
    courseTitle: 'Tropical Cyclone Analysis & Storm Surge Warning',
    title: 'Mid-Term Dvorak Satellite Technique T-Number Evaluation Test',
    type: 'Quiz',
    dueDate: '18 Sep 2026',
    totalMarks: 50,
    duration: '60 mins',
    status: 'Pending',
    questionsCount: 30
  },
  {
    id: 'ass-03',
    courseId: 'course-103',
    courseTitle: 'Numerical Weather Prediction (WRF)',
    title: 'WPS Domain Nesting & Namelist.input Configuration Assignment',
    type: 'Assignment',
    dueDate: '25 Aug 2026',
    totalMarks: 100,
    duration: 'Take-home',
    status: 'Graded',
    score: 94,
    maxScore: 100,
    feedback: 'Excellent nesting configuration ratio and realistic CFL condition handling.'
  },
  {
    id: 'ass-04',
    courseId: 'course-107',
    courseTitle: 'Synoptic Meteorology & Monsoon Dynamics',
    title: 'Tephigram Atmospheric Instability Analysis & Convective Indices',
    type: 'Quiz',
    dueDate: '10 Aug 2026',
    totalMarks: 100,
    duration: '90 mins',
    status: 'Graded',
    score: 96,
    maxScore: 100,
    feedback: 'Accurate CAPE, CIN, and Lifted Index derivation from radiosonde soundings.'
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 'cert-01',
    verificationId: 'IMD-NWP-2026-9941',
    title: 'Advanced Specialist in Numerical Weather Prediction (WRF Core)',
    courseId: 'course-103',
    recipientName: 'Dr. Ananya Sharma',
    recipientRole: 'Meteorologist Grade-I',
    recipientEmployeeId: 'IMD-MUM-4428',
    issueDate: '28 August 2026',
    grade: 'Distinction (O)',
    scorePercentage: 94,
    issuer: 'Central Training Institute, India Meteorological Department',
    department: 'Ministry of Earth Sciences, Government of India',
    skills: ['WRF ARW Core', 'Microphysics Parameterization', 'Ensemble Kalman Filtering', 'GRIB2 Analytics'],
    signatureName: 'Dr. M. Ravichandran',
    signatureTitle: 'Secretary to Government of India, Ministry of Earth Sciences'
  },
  {
    id: 'cert-02',
    verificationId: 'IMD-SYN-2026-7812',
    title: 'Professional Certification in Synoptic Meteorology & Monsoon Systems',
    courseId: 'course-107',
    recipientName: 'Dr. Ananya Sharma',
    recipientRole: 'Meteorologist Grade-I',
    recipientEmployeeId: 'IMD-MUM-4428',
    issueDate: '15 August 2026',
    grade: 'Distinction (O)',
    scorePercentage: 96,
    issuer: 'Central Training Institute, India Meteorological Department',
    department: 'Ministry of Earth Sciences, Government of India',
    skills: ['Synoptic Surface Analysis', 'Tephigram Soundings', 'Tropical Cyclogenesis', 'Monsoon Teleconnections'],
    signatureName: 'Dr. Mrutyunjay Mohapatra',
    signatureTitle: 'Director General of Meteorology (DGM), IMD New Delhi'
  }
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Mandatory Winter Monsoon Pre-Season Capacity Building Refresher (2026)',
    content: 'All operational duty officers stationed across RMC Chennai, MC Thiruvananthapuram, and MC Bengaluru are required to complete the "Northeast Monsoon & Peninsular Rainfall Dynamics" module prior to 1st October 2026.',
    category: 'Important',
    timestamp: '2 hours ago',
    author: 'Dr. Preeti Deshmukh',
    authorRole: 'Director (Capacity Building), MoES',
    isRead: false
  },
  {
    id: 'ann-2',
    title: 'New Specialized Course: High-Resolution Dual-Pol Radar Quantitative Precipitation Estimation',
    content: 'Developed in collaboration with CTI Pune and DWR New Delhi, this newly added curriculum introduces modern hydrometeor classification algorithms directly connected to real-time IMD radar feeds.',
    category: 'Learning',
    timestamp: 'Yesterday at 3:30 PM',
    author: 'Dr. Rajeshwar Varma',
    authorRole: 'Scientist "F" & Head CTI',
    isRead: false
  },
  {
    id: 'ann-3',
    title: 'National Meteorological Achievement Award: 28 Forecasters Certified',
    content: 'Congratulations to the 2026 batch of WMO-Compliant Tropical Cyclone Specialists from regional centres who successfully earned credential badges with an average assessment score of 93.4%.',
    category: 'Achievement',
    timestamp: '3 days ago',
    author: 'IMD Media & Training Secretariat',
    authorRole: 'MoES Media Wing',
    isRead: true
  },
  {
    id: 'ann-4',
    title: 'Scheduled Portal Maintenance & Server Performance Upgrade',
    content: 'The Capacity Connect LMS database and interactive Jupyter-Hub environment will undergo scheduled maintenance on Saturday between 01:00 IST and 04:00 IST. Course downloads will remain cached.',
    category: 'Reminder',
    timestamp: '5 days ago',
    author: 'National IT Infrastructure Cell',
    authorRole: 'NIC-MoES Support',
    isRead: true
  }
];

export const COMPETENCY_SCORES: CompetencyScore[] = [
  { subject: 'Radar & Nowcasting', score: 88, fullMark: 100 },
  { subject: 'Numerical Models', score: 94, fullMark: 100 },
  { subject: 'Cyclone Tracking', score: 82, fullMark: 100 },
  { subject: 'Climate Analytics', score: 76, fullMark: 100 },
  { subject: 'Hydrometeorology', score: 70, fullMark: 100 },
  { subject: 'Satellite Products', score: 85, fullMark: 100 }
];

export const WEEKLY_ACTIVITY = [
  { day: 'Mon', hours: 2.8, target: 2.0 },
  { day: 'Tue', hours: 3.5, target: 2.0 },
  { day: 'Wed', hours: 1.5, target: 2.0 },
  { day: 'Thu', hours: 4.2, target: 2.0 },
  { day: 'Fri', hours: 3.1, target: 2.0 },
  { day: 'Sat', hours: 5.0, target: 2.0 },
  { day: 'Sun', hours: 2.2, target: 2.0 }
];

export const ADMIN_APPROVAL_QUEUE: UserApprovalItem[] = [
  {
    id: 'appr-01',
    name: 'Dr. Bhavesh Patel',
    email: 'bhavesh.patel@imd.gov.in',
    role: 'trainee',
    department: 'Meteorological Centre, Ahmedabad',
    designation: 'Meteorologist Grade-II',
    employeeId: 'IMD-AHM-9102',
    appliedDate: '04 Sep 2026',
    status: 'pending'
  },
  {
    id: 'appr-02',
    name: 'Dr. Shalini Mukhopadhyay',
    email: 's.mukhopadhyay@iitm.res.in',
    role: 'trainer',
    department: 'Indian Institute of Tropical Meteorology (IITM), Pune',
    designation: 'Scientist "D"',
    employeeId: 'IITM-PUN-3312',
    appliedDate: '03 Sep 2026',
    status: 'pending'
  },
  {
    id: 'appr-03',
    name: 'Vikramaditya Roy',
    email: 'vikram.roy@incois.gov.in',
    role: 'trainee',
    department: 'Indian National Centre for Ocean Information Services (INCOIS)',
    designation: 'Project Scientist "C"',
    employeeId: 'INC-HYD-5519',
    appliedDate: '02 Sep 2026',
    status: 'pending'
  },
  {
    id: 'appr-04',
    name: 'Kavita Nair',
    email: 'kavita.nair@imd.gov.in',
    role: 'trainee',
    department: 'Regional Meteorological Centre, Chennai',
    designation: 'Assistant Meteorologist',
    employeeId: 'IMD-CHE-7721',
    appliedDate: '01 Sep 2026',
    status: 'approved'
  }
];

export const TRAINER_SUBMISSIONS: TrainerSubmission[] = [
  {
    id: 'sub-01',
    assessmentId: 'ass-01',
    assessmentTitle: 'Practical Case Assessment: Microburst & Severe Squall Line Diagnostics',
    courseTitle: 'Advanced Doppler Weather Radar (DWR) Analysis & Nowcasting',
    traineeId: 'usr-tr-101',
    traineeName: 'Dr. Ananya Sharma',
    traineeAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop',
    traineeDepartment: 'RMC Mumbai',
    submittedAt: 'Today at 09:40 AM',
    status: 'Pending Review',
    maxScore: 100,
    fileAttachment: 'Ananya_Sharma_DWR_Microburst_Report.pdf'
  },
  {
    id: 'sub-02',
    assessmentId: 'ass-01',
    assessmentTitle: 'Practical Case Assessment: Microburst & Severe Squall Line Diagnostics',
    courseTitle: 'Advanced Doppler Weather Radar (DWR) Analysis & Nowcasting',
    traineeId: 'usr-tr-105',
    traineeName: 'Kishore Sengupta',
    traineeAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=250&auto=format&fit=crop',
    traineeDepartment: 'MC Kolkata',
    submittedAt: 'Yesterday at 5:15 PM',
    status: 'Graded',
    score: 88,
    maxScore: 100,
    feedback: 'Good analysis of Divergence signature on Doppler Velocity product.',
    fileAttachment: 'Kishore_Kolkata_DWR_Submission.pdf'
  },
  {
    id: 'sub-03',
    assessmentId: 'ass-02',
    assessmentTitle: 'Mid-Term Dvorak Satellite Technique Evaluation',
    courseTitle: 'Tropical Cyclone Analysis, Track Prediction & Storm Surge Warning',
    traineeId: 'usr-tr-108',
    traineeName: 'Meenakshi Sundaram',
    traineeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop',
    traineeDepartment: 'MC Bhubaneswar',
    submittedAt: '2 days ago',
    status: 'Pending Review',
    maxScore: 50,
    fileAttachment: 'Cyclone_TNumber_Classification.pdf'
  }
];

export const TESTIMONIALS = [
  {
    quote: 'Capacity Connect has revolutionized how our operational duty meteorologists transition from theoretical meteorology into real-world Doppler Radar and Cyclone early warning simulations.',
    name: 'Dr. Mrutyunjay Mohapatra',
    role: 'Director General of Meteorology (DGM)',
    org: 'India Meteorological Department, New Delhi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop'
  },
  {
    quote: 'The interactive course modules on WRF high-resolution numerical weather prediction and NetCDF datasets provide our regional forecasters with world-class computational training.',
    name: 'Dr. M. Ravichandran',
    role: 'Secretary',
    org: 'Ministry of Earth Sciences (MoES), Govt of India',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&auto=format&fit=crop'
  },
  {
    quote: 'As a field meteorologist at a coastal station, having self-paced, WMO-certified modules with direct trainer review gave me the confidence to issue timely cyclone nowcasts during the last monsoon.',
    name: 'Dr. Ananya Sharma',
    role: 'Meteorologist Grade-I',
    org: 'Regional Meteorological Centre (RMC), Mumbai',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop'
  }
];

export const LEARNING_PATHWAYS = [
  {
    id: 'path-1',
    title: 'Meteorology Fundamentals',
    description: 'Core synoptic principles, atmospheric dynamics, thermodynamic diagrams (Tephigram), and global circulation models.',
    coursesCount: 14,
    duration: '60 Hours',
    icon: 'CloudSun',
    color: 'from-blue-600 to-indigo-700',
    tags: ['Atmospheric Physics', 'Synoptic Charts', 'Monsoon Systems']
  },
  {
    id: 'path-2',
    title: 'Climate Data Analytics',
    description: 'Statistical downscaling, gridded observations processing with Python, NetCDF manipulation, and climate projections.',
    coursesCount: 18,
    duration: '80 Hours',
    icon: 'Database',
    color: 'from-teal-600 to-emerald-700',
    tags: ['Python Xarray', 'ERA5 Reanalysis', 'ETCCDI Indices']
  },
  {
    id: 'path-3',
    title: 'Disaster Preparedness & Warning',
    description: 'Cyclone landfall modeling, storm surge mitigation, flash flood guidance systems, and Common Alerting Protocol dissemination.',
    coursesCount: 22,
    duration: '95 Hours',
    icon: 'ShieldAlert',
    color: 'from-amber-600 to-orange-700',
    tags: ['SOP Protocols', 'Cyclone Warning', 'CAP Integration']
  },
  {
    id: 'path-4',
    title: 'Remote Sensing & Radar',
    description: 'S-band and C-band dual-polarization Doppler radar interpretation, INSAT-3DR rapid-scan satellite analysis, and Lidar data.',
    coursesCount: 16,
    duration: '72 Hours',
    icon: 'Radio',
    color: 'from-cyan-600 to-blue-700',
    tags: ['Dual-Pol DWR', 'INSAT Imagery', 'Nowcasting']
  },
  {
    id: 'path-5',
    title: 'Scientific Administration & Leadership',
    description: 'National scientific policy execution, observatory management, inter-ministry liaison, and disaster response leadership.',
    coursesCount: 10,
    duration: '45 Hours',
    icon: 'Award',
    color: 'from-indigo-600 to-purple-700',
    tags: ['MoES Directives', 'Scientific Ethics', 'Leadership']
  }
];

export const CURRENT_TRAINEE_USER = INITIAL_USERS.trainee;
export const CURRENT_TRAINER_USER = INITIAL_USERS.trainer;
export const CURRENT_ADMIN_USER = INITIAL_USERS.admin;
export const MOCK_COURSES = COURSES;
export const MOCK_ASSESSMENTS = UPCOMING_ASSESSMENTS;
export const MOCK_CERTIFICATES = CERTIFICATES;
export const MOCK_ANNOUNCEMENTS = ANNOUNCEMENTS;
