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

export interface SpeechMetrics {
  totalDurationSec: number;
  speakingDurationSec: number;
  pauseDurationSec: number;
  pauseCount: number;
  wordCount: number;
  speakingRateWpm: number | null;
  fillerWordCount: number;
  fillerWords: Record<string, number>;
  averageVolumeRms: number | null;
  volumeConsistencyPct: number | null;
  audioQuality: "optimal" | "low_input" | "noisy" | "unavailable";
  isReliable: boolean;
  availabilityNotes?: string;
}

export interface GazeMetrics {
  totalObservedSec: number;
  validTrackingSec: number;
  screenDirectedSec: number;
  offScreenSec: number;
  screenDirectedPct: number | null;
  faceDetectedPct: number;
  headPose: {
    yawDegrees: number;
    pitchDegrees: number;
    rollDegrees: number;
  };
  trackingQuality: "optimal" | "partial" | "low_light" | "no_face" | "unavailable";
  statusLabel: "Face detected" | "Head oriented toward screen" | "Estimated screen-directed gaze" | "Tracking unavailable";
  isReliable: boolean;
  availabilityNotes?: string;
}

export interface QuestionSessionAnalytics {
  questionId: string;
  questionNumber: number;
  questionText: string;
  transcript: string;
  speechMetrics?: SpeechMetrics;
  gazeMetrics?: GazeMetrics;
  evaluation?: AIAnswerEvaluation;
}

export interface SessionResultReport {
  schemaVersion?: number; // 1 = Phase 1, 2 = Phase 2
  sessionId?: string;
  role?: string;
  date?: string;
  overallScore: number;
  communicationScore?: number;
  technicalScore?: number;
  confidenceScore?: number;
  speechDeliveryScore?: number; // Separate delivery score from technical score
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
  questionAnalytics?: QuestionSessionAnalytics[];
  speechSummary?: {
    averageWpm: number | null;
    totalFillerWords: number;
    totalPauseCount: number;
    fillerWordsFrequency: Record<string, number>;
    audioMeasurementQuality: string;
  };
  gazeSummary?: {
    overallScreenDirectedPct: number | null;
    validTrackingSeconds: number;
    totalInterviewSeconds: number;
    trackingQuality: string;
    observationsSummary: string;
  };
  summaryStrengths?: string[];
  summaryImprovements?: string[];
  recommendedTopics?: string[];
  completedAt?: string;
}
