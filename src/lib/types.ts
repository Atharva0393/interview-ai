export type DocumentRole =
  | "candidate_resume"
  | "job_description"
  | "interviewer_background"
  | "technical_docs"
  | "company_guidelines"
  | "knowledge_base";

export type DocumentStatus =
  | "uploading"
  | "processing"
  | "indexed"
  | "requires_ocr"
  | "error";

export interface ProcessedDocument {
  id: string;
  name: string;
  role: DocumentRole;
  mimeType: string;
  size: number;
  extractedText: string;
  wordCount: number;
  status: DocumentStatus;
  errorMessage?: string;
  uploadedAt: string;
  interviewId?: string;
  isExplicit?: boolean; // True if from user resume/doc, false if inferred by AI
}

export interface DocumentPassage {
  id: string;
  docId: string;
  docName: string;
  docRole: DocumentRole;
  content: string;
  passageIndex: number;
}

export interface CandidateProfileAnalysis {
  fileName: string;
  uploadDate: string;
  score: number;
  targetRole: string;
  detectedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  recommendations: string[];
  workExperienceYears: number;
  education?: string[];
  projects?: Array<{ title: string; tech: string[]; description: string }>;
  potentialFollowUpAreas?: string[];
  inferredDetails?: string[];
  isAiGenerated?: boolean;
  source?: "gemini" | "fallback";
}

export interface AIQuestion {
  id: string;
  number: number;
  question: string;
  category: "Technical" | "Behavioral" | "System Design" | "Domain Specific";
  difficulty: "Easy" | "Medium" | "Hard";
  competency: string;
  relevanceReason: string;
  evidence: string;
  expectedKeyPoints: string[];
  suggestedFollowUps: string[];
  isApproved?: boolean;
  isCustom?: boolean;
  isAiGenerated?: boolean;
  source?: "gemini" | "fallback";
}

export interface AIAnswerEvaluation {
  questionId: string;
  questionText: string;
  candidateAnswer: string;
  score: number; // 0 - 100
  overallScore?: number;
  communicationScore: number;
  technicalScore: number;
  confidenceScore: number;
  keyPointsCovered: string[];
  keyPointsMissed: string[];
  starEvaluation: {
    situation: boolean;
    task: boolean;
    action: boolean;
    result: boolean;
  };
  feedback: string;
  improvementTip: string;
  strengths?: string[];
  improvements?: string[];
  isAiGenerated?: boolean;
  source?: "gemini" | "fallback";
}

export interface InterviewSessionConfig {
  id?: string;
  role: string;
  type?: string;
  category?: string;
  difficulty: string;
  duration?: string;
  durationMinutes?: number;
  focusAreas: string[];
  knowledgeBaseDocIds?: string[];
  candidateResumeId?: string;
  jobDescriptionId?: string;
  createdAt?: string;
  createdDate?: string;
  questions: AIQuestion[];
  cameraAnalysis?: boolean;
  voiceAnalysis?: boolean;
}

export interface SessionResultReport {
  sessionId?: string;
  role?: string;
  date?: string;
  overallScore: number;
  communicationScore?: number;
  technicalScore?: number;
  confidenceScore?: number;
  breakdown?: {
    technical: number;
    communication: number;
    problemSolving: number;
    behavioral: number;
  };
  strengths?: string[];
  areasForImprovement?: string[];
  evaluations?: AIAnswerEvaluation[];
  questionEvaluations?: AIAnswerEvaluation[];
  summaryStrengths?: string[];
  summaryImprovements?: string[];
  recommendedTopics?: string[];
  completedAt?: string;
}
