export interface HistoricalInterview {
  id: string;
  sessionNumber: number;
  date: string;
  role: string;
  type: "Technical" | "Behavioral" | "Mixed";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  questionsCount: number;
  overallScore: number;
  technicalKnowledge: number;
  communication: number;
  confidence: number;
  speechFluency: number;
  engagement: number;
  problemSolving: number;
  status: "Strong Performance" | "Best Performance" | "Good Progress" | "Baseline Session";
  topStrength: string;
  primaryImprovement: string;
  tags: string[];
}

export const MOCK_HISTORICAL_SESSIONS: HistoricalInterview[] = [
  {
    id: "sess-1",
    sessionNumber: 1,
    date: "Aug 12, 2026",
    role: "Frontend Developer",
    type: "Technical",
    difficulty: "Beginner",
    duration: "15 min",
    questionsCount: 5,
    overallScore: 77,
    technicalKnowledge: 82,
    communication: 76,
    confidence: 72,
    speechFluency: 78,
    engagement: 80,
    problemSolving: 74,
    status: "Baseline Session",
    topStrength: "Good fundamental understanding of HTML & basic JS.",
    primaryImprovement: "Vocal confidence and STAR answer structure.",
    tags: ["JavaScript", "HTML/CSS", "Baseline"],
  },
  {
    id: "sess-2",
    sessionNumber: 2,
    date: "Aug 18, 2026",
    role: "Frontend Developer",
    type: "Behavioral",
    difficulty: "Intermediate",
    duration: "20 min",
    questionsCount: 6,
    overallScore: 79,
    technicalKnowledge: 83,
    communication: 79,
    confidence: 74,
    speechFluency: 80,
    engagement: 81,
    problemSolving: 76,
    status: "Good Progress",
    topStrength: "Structured anecdotal responses using STAR method.",
    primaryImprovement: "Reduce hesitation pauses when formulating trade-offs.",
    tags: ["Behavioral", "STAR Framework"],
  },
  {
    id: "sess-3",
    sessionNumber: 3,
    date: "Aug 24, 2026",
    role: "Frontend Developer",
    type: "Mixed",
    difficulty: "Intermediate",
    duration: "20 min",
    questionsCount: 6,
    overallScore: 78,
    technicalKnowledge: 84,
    communication: 80,
    confidence: 75,
    speechFluency: 81,
    engagement: 82,
    problemSolving: 77,
    status: "Good Progress",
    topStrength: "Clear technical explanations of React hooks & state.",
    primaryImprovement: "Quantify project metrics in behavioral answers.",
    tags: ["React Hooks", "State Management"],
  },
  {
    id: "sess-4",
    sessionNumber: 4,
    date: "Aug 28, 2026",
    role: "Frontend Developer",
    type: "Mixed",
    difficulty: "Intermediate",
    duration: "20 min",
    questionsCount: 8,
    overallScore: 82,
    technicalKnowledge: 86,
    communication: 82,
    confidence: 78,
    speechFluency: 82,
    engagement: 84,
    problemSolving: 80,
    status: "Good Progress",
    topStrength: "Strong articulation of Next.js SSR vs CSR trade-offs.",
    primaryImprovement: "Maintain steady webcam gaze during complex architecture logic.",
    tags: ["Next.js", "SSR", "Hydration"],
  },
  {
    id: "sess-5",
    sessionNumber: 5,
    date: "Sep 02, 2026",
    role: "Frontend Developer",
    type: "Technical",
    difficulty: "Advanced",
    duration: "25 min",
    questionsCount: 8,
    overallScore: 88,
    technicalKnowledge: 91,
    communication: 87,
    confidence: 85,
    speechFluency: 87,
    engagement: 88,
    problemSolving: 85,
    status: "Best Performance",
    topStrength: "Deep mastery of Web Performance optimization & Core Web Vitals.",
    primaryImprovement: "Elaborate slightly more on error boundary fallback patterns.",
    tags: ["Web Performance", "Core Web Vitals", "Peak Score"],
  },
  {
    id: "sess-6",
    sessionNumber: 6,
    date: "Sep 05, 2026",
    role: "Frontend Developer",
    type: "Mixed",
    difficulty: "Intermediate",
    duration: "20 min",
    questionsCount: 10,
    overallScore: 84,
    technicalKnowledge: 88,
    communication: 84,
    confidence: 81,
    speechFluency: 84,
    engagement: 86,
    problemSolving: 82,
    status: "Strong Performance",
    topStrength: "Exceptional RSC explanation & structured STAR anecdotes.",
    primaryImprovement: "Quantify metrics in behavioral summaries & eye contact consistency.",
    tags: ["React 19", "App Router", "Latest Session"],
  },
];

export const MOCK_TREND_DATA = MOCK_HISTORICAL_SESSIONS.map((s) => ({
  session: `Session ${s.sessionNumber}`,
  date: s.date,
  overall: s.overallScore,
  technical: s.technicalKnowledge,
  communication: s.communication,
  confidence: s.confidence,
  problemSolving: s.problemSolving,
  engagement: s.engagement,
}));

export const MOCK_COMPARISON_DATA = [
  { metric: "Technical Knowledge", first: 82, latest: 88, change: "+6%" },
  { metric: "Communication", first: 76, latest: 84, change: "+8%" },
  { metric: "Confidence", first: 72, latest: 81, change: "+9%" },
  { metric: "Speech Fluency", first: 78, latest: 84, change: "+6%" },
  { metric: "Engagement", first: 80, latest: 86, change: "+6%" },
  { metric: "Problem Solving", first: 74, latest: 82, change: "+8%" },
];
