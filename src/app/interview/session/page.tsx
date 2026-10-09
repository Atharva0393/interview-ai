"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { MOCK_INTERVIEW_QUESTIONS_10 } from "@/components/interview/mock-interview-questions";
import { InterviewHeader } from "@/components/interview/interview-header";
import { AIInterviewer } from "@/components/interview/ai-interviewer";
import { QuestionPanel } from "@/components/interview/question-panel";
import { QuestionProgress } from "@/components/interview/question-progress";
import { InterviewControls } from "@/components/interview/interview-controls";
import { CandidateCamera } from "@/components/interview/candidate-camera";
import { CameraAnalysis } from "@/components/interview/camera-analysis";
import { VoiceAnalysis } from "@/components/interview/voice-analysis";
import { PerformanceIndicators } from "@/components/interview/performance-indicators";
import { InterviewEndModal } from "@/components/interview/interview-end-modal";
import { TextAnswerInput } from "@/components/interview/text-answer-input";
import { AIAnswerEvaluation, AIQuestion, SessionResultReport } from "@/lib/types";
import { loadSavedSessionConfig, saveSessionResult } from "@/lib/storage-service";
import { Pause, Play } from "lucide-react";

export default function InterviewSessionPage() {
  const router = useRouter();

  // Navigation & Question State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(1200);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [sessionRole, setSessionRole] = useState("Frontend Developer");

  // Dynamic Session Questions from Setup
  const [activeQuestions, setActiveQuestions] = useState<any[]>(MOCK_INTERVIEW_QUESTIONS_10);

  // Candidate Answer State & AI Evaluations
  const [candidateAnswers, setCandidateAnswers] = useState<Record<string, string>>({});
  const [evaluations, setEvaluations] = useState<Record<string, AIAnswerEvaluation>>({});
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Fluctuating Telemetry State
  const [telemetryDelta, setTelemetryDelta] = useState(0);

  // Load Session Config on Mount
  useEffect(() => {
    const config = loadSavedSessionConfig();
    if (config && config.questions && config.questions.length > 0) {
      setSessionRole(config.role || "Software Engineer");
      // Map AIQuestions to page question schema
      const mapped = config.questions.map((q: AIQuestion, idx: number) => ({
        id: q.id || `q_${idx}`,
        number: idx + 1,
        category: q.category || "Technical",
        subcategory: q.competency || "Problem Solving",
        question: q.question,
        helperText: q.relevanceReason || "Answer using structured evidence.",
        simulatedTranscript: "Candidate answer pending...",
        expectedKeyPoints: q.expectedKeyPoints || [],
        mockAnalysis: {
          eyeContact: 85,
          eyeStatus: "Good Focus",
          facialEngagement: 88,
          facialStatus: "Attentive",
          posture: 92,
          postureStatus: "Upright",
          speechClarity: 87,
          fluency: 84,
          pace: "Normal Pace (140 wpm)",
          tone: "Confident",
          overallComm: 86,
          confidence: 85,
          engagement: "High",
        },
      }));
      setActiveQuestions(mapped);
    }
  }, []);

  const currentQuestion = activeQuestions[currentQuestionIndex] || MOCK_INTERVIEW_QUESTIONS_10[0];

  // Working Countdown Timer
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(interval);
        finalizeSessionAndNavigate();
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Periodic Telemetry Fluctuation (+1% / -1% every 3s)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTelemetryDelta((prev) => (prev === 0 ? 1 : prev === 1 ? -1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Submit & Evaluate Current Question Answer
  const handleAnswerSubmit = async (answerText: string) => {
    const qId = currentQuestion.id;
    setCandidateAnswers((prev) => ({ ...prev, [qId]: answerText }));
    setIsEvaluating(true);

    try {
      const res = await fetch("/api/ai/evaluate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestion.question,
          expectedKeyPoints: currentQuestion.expectedKeyPoints || [],
          candidateAnswer: answerText,
          role: sessionRole,
        }),
      });

      const data = await res.json();
      if (data.success && data.evaluation) {
        setEvaluations((prev) => ({ ...prev, [qId]: data.evaluation }));
      }
    } catch (err) {
      console.error("Evaluation error:", err);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Finalize Session Report and Navigate to Processing
  const finalizeSessionAndNavigate = () => {
    const evalList = Object.values(evaluations);
    const avgScore =
      evalList.length > 0
        ? Math.round(
            evalList.reduce(
              (acc, curr) => acc + (curr.overallScore || curr.score || 80),
              0
            ) / evalList.length
          )
        : 84;

    const strengthsList: string[] = evalList
      .flatMap((e) => e.strengths || [])
      .filter((s): s is string => Boolean(s));

    const improvementsList: string[] = evalList
      .flatMap((e) => e.improvements || [])
      .filter((i): i is string => Boolean(i));

    const resultReport: SessionResultReport = {
      overallScore: avgScore,
      breakdown: {
        technical: Math.min(95, avgScore + 4),
        communication: Math.min(95, avgScore),
        problemSolving: Math.min(95, avgScore + 2),
        behavioral: Math.min(95, avgScore - 2),
      },
      strengths:
        strengthsList.length > 0
          ? strengthsList
          : [
              "Structured technical explanations with clear reasoning",
              "Effective use of real-world project context",
            ],
      areasForImprovement:
        improvementsList.length > 0
          ? improvementsList
          : [
              "Quantify business and performance impacts more specifically",
              "Elaborate further on architectural trade-offs",
            ],
      questionEvaluations: evalList,
      completedAt: new Date().toISOString(),
    };

    saveSessionResult(resultReport);
    router.push("/interview/processing");
  };

  // Question Navigation Handlers
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finalizeSessionAndNavigate();
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleConfirmEnd = () => {
    setIsEndModalOpen(false);
    finalizeSessionAndNavigate();
  };

  // Base telemetry metrics with subtle periodic fluctuation
  const eyeContact = Math.min(
    100,
    Math.max(50, (currentQuestion.mockAnalysis?.eyeContact || 85) + telemetryDelta)
  );
  const facialEngagement = Math.min(
    100,
    Math.max(50, (currentQuestion.mockAnalysis?.facialEngagement || 88) - telemetryDelta)
  );
  const posture = Math.min(
    100,
    Math.max(50, currentQuestion.mockAnalysis?.posture || 90)
  );
  const overallComm = Math.min(
    100,
    Math.max(50, (currentQuestion.mockAnalysis?.overallComm || 86) + telemetryDelta)
  );
  const confidence = Math.min(
    100,
    Math.max(50, currentQuestion.mockAnalysis?.confidence || 85)
  );

  return (
    <AppShell>
      <div className="space-y-6 animate-in fade-in duration-300 relative">
        {/* Top Focused Header */}
        <InterviewHeader
          currentQuestionNumber={currentQuestion.number}
          totalQuestions={activeQuestions.length}
          timerSeconds={timerSeconds}
          isPaused={isPaused}
          onTogglePause={() => setIsPaused(!isPaused)}
          onOpenEndModal={() => setIsEndModalOpen(true)}
        />

        {/* Main Two-Column Interview Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT SIDE — AI Interviewer & Question Area (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* AI Interviewer Presence Card */}
            <AIInterviewer isPaused={isPaused} />

            {/* Current Question & Live Response Panel */}
            <QuestionPanel question={currentQuestion} isPaused={isPaused} />

            {/* Candidate Text Response Input & Real AI Evaluation */}
            <TextAnswerInput
              questionId={currentQuestion.id}
              onAnswerSubmit={handleAnswerSubmit}
              isEvaluating={isEvaluating}
              savedAnswer={candidateAnswers[currentQuestion.id] || ""}
              evaluation={evaluations[currentQuestion.id] || null}
            />

            {/* Question Progress Dots */}
            <QuestionProgress
              currentIndex={currentQuestionIndex}
              totalQuestions={activeQuestions.length}
            />

            {/* Question Navigation Controls */}
            <InterviewControls
              currentIndex={currentQuestionIndex}
              totalQuestions={activeQuestions.length}
              onPrevious={handlePrevious}
              onSkip={handleSkip}
              onNext={handleNext}
            />
          </div>

          {/* RIGHT SIDE — Candidate Camera & Live Telemetry (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Candidate Camera Preview Viewport */}
            <CandidateCamera isPaused={isPaused} />

            {/* Non-Verbal Camera Telemetry (Eye, Posture, Engagement) */}
            <CameraAnalysis
              eyeContact={eyeContact}
              eyeStatus={currentQuestion.mockAnalysis?.eyeStatus || "Good Focus"}
              facialEngagement={facialEngagement}
              facialStatus={currentQuestion.mockAnalysis?.facialStatus || "Attentive"}
              posture={posture}
              postureStatus={currentQuestion.mockAnalysis?.postureStatus || "Upright"}
            />

            {/* Voice & Speech Analysis */}
            <VoiceAnalysis
              speechClarity={currentQuestion.mockAnalysis?.speechClarity || 87}
              fluency={currentQuestion.mockAnalysis?.fluency || 84}
              pace={currentQuestion.mockAnalysis?.pace || "Normal Pace (140 wpm)"}
              tone={currentQuestion.mockAnalysis?.tone || "Confident"}
              isPaused={isPaused}
            />

            {/* Live Performance Indicators */}
            <PerformanceIndicators
              overallComm={overallComm}
              confidence={confidence}
              engagement={currentQuestion.mockAnalysis?.engagement || "High"}
            />
          </div>
        </div>

        {/* Interview Paused Overlay Banner */}
        {isPaused && (
          <div className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="p-6 rounded-3xl bg-[#121212] border border-white/10 text-center space-y-4 shadow-2xl max-w-sm w-full text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 text-stone-200 flex items-center justify-center mx-auto">
                <Pause className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-white">Interview Paused</h3>
                <p className="text-xs text-stone-300 font-normal">
                  Timer and telemetry analysis are paused. Click resume when ready to continue.
                </p>
              </div>
              <button
                onClick={() => setIsPaused(false)}
                className="w-full py-3 rounded-xl bg-white hover:bg-stone-200 text-black text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                <Play className="w-4 h-4 fill-current text-black" />
                <span>Resume Interview</span>
              </button>
            </div>
          </div>
        )}

        {/* End Interview Confirmation Modal */}
        <InterviewEndModal
          isOpen={isEndModalOpen}
          onClose={() => setIsEndModalOpen(false)}
          onConfirm={handleConfirmEnd}
        />
      </div>
    </AppShell>
  );
}
