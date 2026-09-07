export interface MockQuestion {
  id: string;
  number: number;
  category: "Technical" | "Behavioral" | "Project";
  subcategory: string;
  question: string;
  helperText: string;
  simulatedTranscript: string;
  mockAnalysis: {
    eyeContact: number;
    eyeStatus: string;
    facialEngagement: number;
    facialStatus: string;
    posture: number;
    postureStatus: string;
    speechClarity: number;
    fluency: number;
    pace: string;
    tone: string;
    overallComm: number;
    confidence: number;
    engagement: number;
  };
}

export const MOCK_INTERVIEW_QUESTIONS_10: MockQuestion[] = [
  {
    id: "q-1",
    number: 1,
    category: "Behavioral",
    subcategory: "Introduction & Background",
    question: "Tell me about yourself and your journey into frontend development.",
    helperText: "Focus on your technical passion, core framework experience, and key engineering projects.",
    simulatedTranscript:
      "I started my engineering journey building interactive web UIs. Over the past few years, I've specialized in React, Next.js, and TypeScript, focusing on web performance and component modularity...",
    mockAnalysis: {
      eyeContact: 88,
      eyeStatus: "Good",
      facialEngagement: 85,
      facialStatus: "Engaged",
      posture: 90,
      postureStatus: "Stable",
      speechClarity: 89,
      fluency: 86,
      pace: "135 wpm (Optimal)",
      tone: "Confident & Friendly",
      overallComm: 86,
      confidence: 84,
      engagement: 88,
    },
  },
  {
    id: "q-2",
    number: 2,
    category: "Technical",
    subcategory: "JavaScript Fundamentals",
    question: "What is the difference between var, let, and const in JavaScript?",
    helperText: "Discuss scope (function vs block), hoisting behaviors, and re-assignment constraints.",
    simulatedTranscript:
      "var is function-scoped and subject to variable hoisting, whereas let and const were introduced in ES6 with block scoping. const prevents re-assignment of the variable binding...",
    mockAnalysis: {
      eyeContact: 85,
      eyeStatus: "Good",
      facialEngagement: 82,
      facialStatus: "Focused",
      posture: 88,
      postureStatus: "Stable",
      speechClarity: 90,
      fluency: 84,
      pace: "140 wpm (Clear)",
      tone: "Articulate",
      overallComm: 85,
      confidence: 82,
      engagement: 84,
    },
  },
  {
    id: "q-3",
    number: 3,
    category: "Technical",
    subcategory: "React & Next.js Rendering",
    question: "Can you explain the difference between server-side rendering and client-side rendering?",
    helperText: "Explain initial HTML payload, hydration, SEO impact, and server vs browser processing.",
    simulatedTranscript:
      "Client-side rendering generates DOM nodes directly in the browser after downloading JS bundles. Server-side rendering renders complete HTML on the server per request, reducing LCP page loads...",
    mockAnalysis: {
      eyeContact: 86,
      eyeStatus: "Good",
      facialEngagement: 84,
      facialStatus: "Engaged",
      posture: 87,
      postureStatus: "Stable",
      speechClarity: 92,
      fluency: 87,
      pace: "138 wpm (Optimal)",
      tone: "Technical & Structured",
      overallComm: 88,
      confidence: 85,
      engagement: 86,
    },
  },
  {
    id: "q-4",
    number: 4,
    category: "Technical",
    subcategory: "React Architecture",
    question: "What is React's Virtual DOM and why is it useful?",
    helperText: "Explain reconciliation, diffing algorithm, and batching DOM updates efficiently.",
    simulatedTranscript:
      "The Virtual DOM is a lightweight in-memory representation of the actual DOM. React uses it to perform diffing calculations, minimizing expensive direct DOM mutations...",
    mockAnalysis: {
      eyeContact: 84,
      eyeStatus: "Good",
      facialEngagement: 81,
      facialStatus: "Focused",
      posture: 86,
      postureStatus: "Stable",
      speechClarity: 88,
      fluency: 85,
      pace: "142 wpm (Steady)",
      tone: "Clear & Knowledgeable",
      overallComm: 84,
      confidence: 81,
      engagement: 83,
    },
  },
  {
    id: "q-5",
    number: 5,
    category: "Project",
    subcategory: "Technical Problem Solving",
    question: "Tell me about a challenging problem you faced while working on one of your projects.",
    helperText: "Structure your response using Situation, Task, Action, and Measurable Result (STAR).",
    simulatedTranscript:
      "While building Chicago Yachts, we ran into initial page load bottlenecks due to large media assets. I implemented dynamic lazy loading and image optimization, cutting LCP by 45%...",
    mockAnalysis: {
      eyeContact: 87,
      eyeStatus: "Good",
      facialEngagement: 86,
      facialStatus: "Engaged",
      posture: 89,
      postureStatus: "Stable",
      speechClarity: 91,
      fluency: 88,
      pace: "136 wpm (Optimal)",
      tone: "Enthusiastic & Metric-Driven",
      overallComm: 89,
      confidence: 86,
      engagement: 88,
    },
  },
  {
    id: "q-6",
    number: 6,
    category: "Technical",
    subcategory: "Web Performance Optimization",
    question: "How would you optimize the performance of a slow frontend application?",
    helperText: "Mention bundle splitting, memoization, Core Web Vitals (LCP, INP, CLS), and assets caching.",
    simulatedTranscript:
      "I start by profiling using Chrome Lighthouse to identify main-thread blocking long tasks. Then I apply code-splitting via dynamic imports, asset compression, and memoization...",
    mockAnalysis: {
      eyeContact: 85,
      eyeStatus: "Good",
      facialEngagement: 83,
      facialStatus: "Focused",
      posture: 87,
      postureStatus: "Stable",
      speechClarity: 89,
      fluency: 86,
      pace: "139 wpm (Clear)",
      tone: "Analytical",
      overallComm: 86,
      confidence: 83,
      engagement: 85,
    },
  },
  {
    id: "q-7",
    number: 7,
    category: "Technical",
    subcategory: "Type Systems & Safety",
    question: "What is the difference between TypeScript and JavaScript, and why would you use TypeScript?",
    helperText: "Highlight compile-time type checking, refactoring safety, interfaces, and developer velocity.",
    simulatedTranscript:
      "TypeScript adds static type definitions on top of JavaScript. It catches type mismatch bugs during compilation before code ever hits production environments...",
    mockAnalysis: {
      eyeContact: 86,
      eyeStatus: "Good",
      facialEngagement: 84,
      facialStatus: "Engaged",
      posture: 88,
      postureStatus: "Stable",
      speechClarity: 90,
      fluency: 87,
      pace: "137 wpm (Optimal)",
      tone: "Precise",
      overallComm: 87,
      confidence: 84,
      engagement: 86,
    },
  },
  {
    id: "q-8",
    number: 8,
    category: "Behavioral",
    subcategory: "Adaptability & Growth",
    question: "Describe a situation where you had to learn a new technology quickly.",
    helperText: "Share your learning strategy, documentation usage, rapid prototyping, and delivery outcome.",
    simulatedTranscript:
      "When building Event Hub, I needed to integrate WebSocket real-time updates within 48 hours. I studied official documentation, created a mini sandbox proof of concept, and deployed it on schedule...",
    mockAnalysis: {
      eyeContact: 89,
      eyeStatus: "Excellent",
      facialEngagement: 87,
      facialStatus: "Engaged",
      posture: 91,
      postureStatus: "Stable",
      speechClarity: 92,
      fluency: 89,
      pace: "134 wpm (Optimal)",
      tone: "Confident & Agile",
      overallComm: 90,
      confidence: 88,
      engagement: 89,
    },
  },
  {
    id: "q-9",
    number: 9,
    category: "Technical",
    subcategory: "Design Systems & Architecture",
    question: "How do you approach building a reusable component architecture?",
    helperText: "Discuss props API design, single responsibility principle, composition, and Tailwind token design.",
    simulatedTranscript:
      "I approach component design by separating stateful container logic from pure presentational UI, ensuring consistent props interfaces and design token usage...",
    mockAnalysis: {
      eyeContact: 87,
      eyeStatus: "Good",
      facialEngagement: 85,
      facialStatus: "Engaged",
      posture: 89,
      postureStatus: "Stable",
      speechClarity: 91,
      fluency: 88,
      pace: "136 wpm (Optimal)",
      tone: "Structured & Professional",
      overallComm: 88,
      confidence: 86,
      engagement: 87,
    },
  },
  {
    id: "q-10",
    number: 10,
    category: "Behavioral",
    subcategory: "Collaboration & Conflict",
    question: "What would you do if you disagreed with a technical decision made by your team?",
    helperText: "Emphasize data-backed arguments, respectful discussion, empathy, and aligning with final consensus.",
    simulatedTranscript:
      "I present objective benchmarks and technical trade-offs to explain my perspective. If the team reaches a consensus on another path, I fully commit to executing that decision...",
    mockAnalysis: {
      eyeContact: 90,
      eyeStatus: "Excellent",
      facialEngagement: 88,
      facialStatus: "Engaged",
      posture: 92,
      postureStatus: "Stable",
      speechClarity: 93,
      fluency: 90,
      pace: "133 wpm (Optimal)",
      tone: "Collaborative & Mature",
      overallComm: 91,
      confidence: 89,
      engagement: 90,
    },
  },
];
