import { MOCK_INTERVIEW_QUESTIONS_10, MockQuestion } from "../interview/mock-interview-questions";

export interface DetailedQuestionResult extends MockQuestion {
  score: number;
  scoreStatus: "Excellent" | "Good" | "Needs Work";
  relevance: number;
  clarity: number;
  confidenceScore: number;
  feedbackNote: string;
  strengthNote: string;
  improvementNote: string;
}

export const MOCK_DETAILED_RESULTS: DetailedQuestionResult[] = [
  {
    ...MOCK_INTERVIEW_QUESTIONS_10[0],
    score: 82,
    scoreStatus: "Good",
    relevance: 88,
    clarity: 82,
    confidenceScore: 78,
    feedbackNote: "Your response provided a clear overview of your background. Adding a stronger connection between your past projects and the specific requirements of the target role would make the answer more impactful.",
    strengthNote: "Clear articulation of your engineering journey and framework focus.",
    improvementNote: "End with a concise statement explaining why you are a strong fit for the target position.",
  },
  {
    ...MOCK_INTERVIEW_QUESTIONS_10[1],
    score: 88,
    scoreStatus: "Excellent",
    relevance: 90,
    clarity: 88,
    confidenceScore: 86,
    feedbackNote: "Excellent technical breakdown of variable scoping and hoisting mechanics. You clearly articulated the differences between function and block scoping.",
    strengthNote: "Accurate distinction between let, const, and var hoisting behaviors.",
    improvementNote: "Mention temporal dead zone (TDZ) explicitly for a complete senior answer.",
  },
  {
    ...MOCK_INTERVIEW_QUESTIONS_10[2],
    score: 86,
    scoreStatus: "Excellent",
    relevance: 89,
    clarity: 86,
    confidenceScore: 84,
    feedbackNote: "Strong explanation of server rendering vs client bundles. You correctly highlighted initial LCP benefits and hydration trade-offs.",
    strengthNote: "Comprehensive coverage of server vs client hydration boundaries.",
    improvementNote: "Elaborate slightly on dynamic data caching strategies in Next.js App Router.",
  },
  {
    ...MOCK_INTERVIEW_QUESTIONS_10[3],
    score: 80,
    scoreStatus: "Good",
    relevance: 84,
    clarity: 80,
    confidenceScore: 76,
    feedbackNote: "Good overview of the Virtual DOM diffing process. Explaining how React batches updates would add even greater technical depth.",
    strengthNote: "Good core concept summary of in-memory DOM representation.",
    improvementNote: "Explain how React Fiber and batching optimize rendering performance.",
  },
  {
    ...MOCK_INTERVIEW_QUESTIONS_10[4],
    score: 85,
    scoreStatus: "Excellent",
    relevance: 88,
    clarity: 85,
    confidenceScore: 82,
    feedbackNote: "Great use of the STAR methodology when discussing the Chicago Yachts project. Quantifying your LCP speedup metric was very effective.",
    strengthNote: "Effective STAR structure with a 45% LCP metric improvement.",
    improvementNote: "Briefly detail team coordination or code review feedback during that refactor.",
  },
  {
    ...MOCK_INTERVIEW_QUESTIONS_10[5],
    score: 84,
    scoreStatus: "Good",
    relevance: 86,
    clarity: 84,
    confidenceScore: 82,
    feedbackNote: "Solid performance optimization strategy combining Lighthouse profiling, dynamic imports, and memoization.",
    strengthNote: "Structured approach starting with DevTools profiling before refactoring.",
    improvementNote: "Include INP (Interaction to Next Paint) long task breakdown techniques.",
  },
  {
    ...MOCK_INTERVIEW_QUESTIONS_10[6],
    score: 89,
    scoreStatus: "Excellent",
    relevance: 92,
    clarity: 88,
    confidenceScore: 87,
    feedbackNote: "Superb answer highlighting compile-time type safety, IDE autocompletion, and refactoring velocity advantages.",
    strengthNote: "Clear contrast between static compile-time safety and dynamic runtime checks.",
    improvementNote: "Mention generic types or utility types like Partial/Record briefly.",
  },
  {
    ...MOCK_INTERVIEW_QUESTIONS_10[7],
    score: 87,
    scoreStatus: "Excellent",
    relevance: 89,
    clarity: 86,
    confidenceScore: 86,
    feedbackNote: "Compelling narrative detailing how you mastered WebSockets for Event Hub within 48 hours.",
    strengthNote: "High enthusiasm and structured sandbox prototyping strategy.",
    improvementNote: "Mention how you evaluated edge-case failure modes or reconnection logic.",
  },
  {
    ...MOCK_INTERVIEW_QUESTIONS_10[8],
    score: 83,
    scoreStatus: "Good",
    relevance: 85,
    clarity: 83,
    confidenceScore: 81,
    feedbackNote: "Good explanation of decoupling presentational components from container state logic.",
    strengthNote: "Solid design token and Tailwind utility abstraction approach.",
    improvementNote: "Discuss component documentation tools like Storybook or API prop testing.",
  },
  {
    ...MOCK_INTERVIEW_QUESTIONS_10[9],
    score: 79,
    scoreStatus: "Good",
    relevance: 82,
    clarity: 78,
    confidenceScore: 76,
    feedbackNote: "Mature approach to conflict resolution. Emphasizing data-backed benchmarks before committing to team consensus was strong.",
    strengthNote: "Collaborative mindset prioritizing team alignment and data evidence.",
    improvementNote: "Give a concrete real-world anecdote of a specific technical debate you navigated.",
  },
];

export const MOCK_RADAR_DATA = [
  { subject: "Technical", value: 88, fullMark: 100 },
  { subject: "Communication", value: 84, fullMark: 100 },
  { subject: "Confidence", value: 81, fullMark: 100 },
  { subject: "Problem Solving", value: 82, fullMark: 100 },
  { subject: "Speech Fluency", value: 84, fullMark: 100 },
  { subject: "Engagement", value: 86, fullMark: 100 },
];
