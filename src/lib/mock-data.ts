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
  name: "Atharva Kale",
  avatar: "/avatar.png",
  role: "Frontend Engineer",
  targetCompany: "Top Tech Scaleup",
  experienceLevel: "Fresher / Entry Level",
  resumeFileName: "Atharva_Kale_Resume.pdf",
  resumeLastUpdated: "Sep 05, 2026",
};

export const MOCK_OVERVIEW_METRICS: OverviewMetrics = {
  overallReadiness: 84,
  communicationScore: 84,
  confidenceScore: 81,
  interviewsCompleted: 6,
  readinessDelta: "+7% overall improvement",
  communicationDelta: "+8% from first session",
  confidenceDelta: "+9% growth trajectory",
  completedDelta: "6 mock sessions completed",
};

export const MOCK_SKILL_PROGRESS: SkillProgressItem[] = [
  {
    id: "comm",
    name: "Communication Skills",
    category: "Delivery",
    score: 84,
    target: 90,
    status: "Good",
    description: "Clear articulation with structured STAR framework delivery.",
  },
  {
    id: "eye",
    name: "Eye Contact",
    category: "Non-Verbal",
    score: 86,
    target: 90,
    status: "Good",
    description: "Maintains steady visual gaze during technical responses.",
  },
  {
    id: "struct",
    name: "Response Structure",
    category: "Methodology",
    score: 82,
    target: 88,
    status: "Good",
    description: "Apply STAR methodology consistently across behavioral prompts.",
  },
  {
    id: "tech",
    name: "Technical Depth",
    category: "Knowledge",
    score: 88,
    target: 92,
    status: "Excellent",
    description: "Strong grasp of React 19 internals, RSC, and state patterns.",
  },
];

export const MOCK_RECENT_INTERVIEWS: RecentInterview[] = [
  {
    id: "int-101",
    title: "Frontend Developer Interview",
    role: "Frontend Developer",
    score: 84,
    date: "2026-09-05",
    timeAgo: "Latest Session",
    duration: "20 mins",
    questionsCount: 10,
    status: "Completed",
    tags: ["React 19", "Next.js App Router", "State Management"],
    feedbackSummary: "Exceptional RSC explanation & structured STAR anecdotes; work on concise metrics.",
  },
  {
    id: "int-102",
    title: "Software Engineer Interview",
    role: "Full Stack Engineer",
    score: 88,
    date: "2026-09-02",
    timeAgo: "5 days ago",
    duration: "25 mins",
    questionsCount: 8,
    status: "Completed",
    tags: ["System Design", "Web Performance", "Core Web Vitals"],
    feedbackSummary: "Peak performance session with strong database and Web Performance benchmarks.",
  },
  {
    id: "int-103",
    title: "Product Analyst Interview",
    role: "Technical Product Specialist",
    score: 82,
    date: "2026-08-28",
    timeAgo: "1 week ago",
    duration: "20 mins",
    questionsCount: 8,
    status: "Completed",
    tags: ["Data Metrics", "User Funnel", "Problem Solving"],
    feedbackSummary: "Superb structured delivery with high confidence metrics throughout.",
  },
];

export const MOCK_PERFORMANCE_TRENDS: PerformanceHistoryPoint[] = [
  { session: "Session 1", date: "Aug 12", overall: 77, communication: 76, technical: 82, confidence: 72 },
  { session: "Session 2", date: "Aug 18", overall: 79, communication: 79, technical: 83, confidence: 74 },
  { session: "Session 3", date: "Aug 24", overall: 78, communication: 80, technical: 84, confidence: 75 },
  { session: "Session 4", date: "Aug 28", overall: 82, communication: 82, technical: 86, confidence: 78 },
  { session: "Session 5", date: "Sep 02", overall: 88, communication: 87, technical: 91, confidence: 85 },
  { session: "Session 6", date: "Sep 05", overall: 84, communication: 84, technical: 88, confidence: 81 },
];

export const MOCK_RESUME_ANALYSIS: ResumeAnalysisData = {
  fileName: "Atharva_Kale_Resume.pdf",
  uploadDate: "Sep 05, 2026",
  score: 86,
  targetRole: "Frontend Developer",
  workExperienceYears: 0,
  detectedSkills: [
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
  ],
  missingSkills: [
    "WebSockets & Real-time WebRTC",
    "CI/CD Pipeline Configuration",
    "GraphQL & REST API Caching",
  ],
  strengths: [
    "Clear project bullet points emphasizing latency reductions and UI performance.",
    "Strong technical coverage of modern React ecosystem and component architecture.",
    "Proven full-stack project portfolio (Chicago Yachts, Event Hub, Nutribowl).",
  ],
  recommendations: [
    "Highlight experience with WebSockets or streaming data UI components.",
    "Add quantified metric targets for STAR behavioral answers.",
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
