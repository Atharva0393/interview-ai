export interface UserProfile {
  name: string;
  avatar: string;
  role: string;
  targetCompany: string;
  experienceLevel: string;
  resumeFileName: string;
  resumeLastUpdated: string;
}

export interface OverviewMetrics {
  overallReadiness: number;
  communicationScore: number;
  confidenceScore: number;
  interviewsCompleted: number;
  readinessDelta: string;
  communicationDelta: string;
  confidenceDelta: string;
  completedDelta: string;
}

export interface SkillProgressItem {
  id: string;
  name: string;
  category: string;
  score: number;
  target: number;
  status: "Needs Work" | "Good" | "Excellent";
  description: string;
}

export interface RecentInterview {
  id: string;
  title: string;
  role: string;
  score: number;
  date: string;
  timeAgo: string;
  duration: string;
  questionsCount: number;
  status: "Completed" | "In Progress";
  tags: string[];
  feedbackSummary: string;
}

export interface PerformanceHistoryPoint {
  session: string;
  date: string;
  overall: number;
  communication: number;
  technical: number;
  confidence: number;
}

export interface ResumeAnalysisData {
  fileName: string;
  uploadDate: string;
  score: number;
  targetRole: string;
  detectedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  recommendations: string[];
  workExperienceYears: number;
}

export const MOCK_USER_PROFILE: UserProfile = {
  name: "Atharva",
  avatar: "/avatar.png",
  role: "Frontend Engineer",
  targetCompany: "Top Tech Scaleup",
  experienceLevel: "Senior (4+ Years)",
  resumeFileName: "Atharva_Resume_Frontend_2026.pdf",
  resumeLastUpdated: "Sep 02, 2026",
};

export const MOCK_OVERVIEW_METRICS: OverviewMetrics = {
  overallReadiness: 78,
  communicationScore: 82,
  confidenceScore: 74,
  interviewsCompleted: 12,
  readinessDelta: "+5% from last week",
  communicationDelta: "+3% improvement",
  confidenceDelta: "+8% this month",
  completedDelta: "3 mock sessions this week",
};

export const MOCK_SKILL_PROGRESS: SkillProgressItem[] = [
  {
    id: "comm",
    name: "Communication Skills",
    category: "Delivery",
    score: 82,
    target: 90,
    status: "Good",
    description: "Clear articulation with structured delivery.",
  },
  {
    id: "eye",
    name: "Eye Contact",
    category: "Non-Verbal",
    score: 68,
    target: 85,
    status: "Needs Work",
    description: "Maintain direct gaze at camera during key responses.",
  },
  {
    id: "struct",
    name: "Response Structure",
    category: "Methodology",
    score: 74,
    target: 88,
    status: "Good",
    description: "Apply STAR framework more consistently for behavioral prompts.",
  },
  {
    id: "tech",
    name: "Technical Depth",
    category: "Knowledge",
    score: 85,
    target: 90,
    status: "Excellent",
    description: "Strong grasp of React internals, hydration, and state patterns.",
  },
];

export const MOCK_RECENT_INTERVIEWS: RecentInterview[] = [
  {
    id: "int-101",
    title: "Frontend Developer Interview",
    role: "Senior React Developer",
    score: 82,
    date: "2026-09-05",
    timeAgo: "2 days ago",
    duration: "25 mins",
    questionsCount: 5,
    status: "Completed",
    tags: ["React 19", "Next.js App Router", "State Management"],
    feedbackSummary: "Excellent architectural breakdown; work on concise STAR transitions for trade-off questions.",
  },
  {
    id: "int-102",
    title: "Software Engineer Interview",
    role: "Full Stack Engineer",
    score: 76,
    date: "2026-09-02",
    timeAgo: "5 days ago",
    duration: "30 mins",
    questionsCount: 6,
    status: "Completed",
    tags: ["System Design", "API Design", "Database Indexing"],
    feedbackSummary: "Good database concepts, but eye contact drifted during complex architecture explanations.",
  },
  {
    id: "int-103",
    title: "Product Analyst Interview",
    role: "Technical Product Specialist",
    score: 88,
    date: "2026-08-31",
    timeAgo: "1 week ago",
    duration: "20 mins",
    questionsCount: 4,
    status: "Completed",
    tags: ["Data Metrics", "User Funnel", "Problem Solving"],
    feedbackSummary: "Superb structured delivery with high confidence metrics throughout.",
  },
];

export const MOCK_PERFORMANCE_TRENDS: PerformanceHistoryPoint[] = [
  { session: "Session 1", date: "Aug 12", overall: 62, communication: 65, technical: 70, confidence: 58 },
  { session: "Session 2", date: "Aug 18", overall: 68, communication: 72, technical: 74, confidence: 62 },
  { session: "Session 3", date: "Aug 24", overall: 71, communication: 75, technical: 78, confidence: 66 },
  { session: "Session 4", date: "Aug 28", overall: 76, communication: 79, technical: 82, confidence: 70 },
  { session: "Session 5", date: "Sep 02", overall: 76, communication: 78, technical: 80, confidence: 72 },
  { session: "Session 6", date: "Sep 05", overall: 82, communication: 82, technical: 85, confidence: 74 },
];

export const MOCK_RESUME_ANALYSIS: ResumeAnalysisData = {
  fileName: "Atharva_Resume_Frontend_2026.pdf",
  uploadDate: "Sep 02, 2026",
  score: 86,
  targetRole: "Senior Frontend Engineer",
  workExperienceYears: 4,
  detectedSkills: [
    "TypeScript",
    "React / Next.js",
    "Tailwind CSS",
    "State Management (Zustand/Redux)",
    "Web Performance Optimization",
    "GraphQL & REST APIs",
    "Jest & Cypress Testing",
    "System Design & Micro-frontends",
  ],
  missingSkills: [
    "WebSockets & Real-time WebRTC",
    "CI/CD Pipeline Configuration",
    "WebAssembly / Rust Integration",
  ],
  strengths: [
    "Strong technical impact metrics mentioned across recent projects.",
    "Comprehensive coverage of modern React ecosystem and state architecture.",
    "Clear project bullet points emphasizing latency reductions and UI performance.",
  ],
  recommendations: [
    "Highlight experience with WebSockets or streaming data UI components.",
    "Add quantified metric targets for team leadership and code reviews.",
    "Prepare concise anecdotes around cross-functional product design decisions.",
  ],
};

export const MOCK_INTERVIEW_QUESTIONS = [
  {
    id: "q1",
    number: 1,
    topic: "React Server Components & Hydration",
    question: "Can you explain how React Server Components (RSC) differ from traditional Client-side Rendering (CSR), and when you would choose one over the other?",
    expectedKeyPoints: ["Server vs Client boundary", "Zero-bundle-size components", "Data fetching at component level", "Interactivity trade-offs"],
    hint: "Think about network waterfall reduction and initial page load metrics.",
  },
  {
    id: "q2",
    number: 2,
    topic: "Web Performance & Core Web Vitals",
    question: "How do you diagnose and optimize Next.js app performance when INP (Interaction to Next Paint) or LCP (Largest Contentful Paint) scores degrade?",
    expectedKeyPoints: ["LCP image preloading", "Code splitting & dynamic imports", "Minimizing main-thread blocking JS", "INP long task breakdown"],
    hint: "Focus on browser rendering lifecycle and Chrome DevTools profiling.",
  },
  {
    id: "q3",
    number: 3,
    topic: "Behavioral & Conflict Resolution",
    question: "Tell me about a time you had a fundamental architectural disagreement with a senior backend engineer. How did you resolve it?",
    expectedKeyPoints: ["STAR methodology", "Data-backed evidence", "Empathy & compromise", "Outcome metrics"],
    hint: "Structure your answer with Situation, Task, Action, and Measurable Result.",
  },
];
