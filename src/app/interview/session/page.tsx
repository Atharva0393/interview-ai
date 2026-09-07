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
import { Pause, Play } from "lucide-react";

export default function InterviewSessionPage() {
  const router = useRouter();

  // Navigation & Question State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Start at Question 1
  const [isPaused, setIsPaused] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(1200); // 20:00 countdown
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);

  // Fluctuating Telemetry State
  const [telemetryDelta, setTelemetryDelta] = useState(0);

  const currentQuestion = MOCK_INTERVIEW_QUESTIONS_10[currentQuestionIndex];

  // Working Countdown Timer
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(interval);
        router.push("/interview/processing");
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, router]);

  // Periodic Telemetry Fluctuation (+1% / -1% every 3s)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTelemetryDelta((prev) => (prev === 0 ? 1 : prev === 1 ? -1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Question Navigation Handlers
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < MOCK_INTERVIEW_QUESTIONS_10.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      router.push("/interview/processing");
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < MOCK_INTERVIEW_QUESTIONS_10.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleConfirmEnd = () => {
    setIsEndModalOpen(false);
    router.push("/interview/processing");
  };

  // Base telemetry metrics with subtle periodic fluctuation
  const eyeContact = Math.min(100, Math.max(50, currentQuestion.mockAnalysis.eyeContact + telemetryDelta));
  const facialEngagement = Math.min(100, Math.max(50, currentQuestion.mockAnalysis.facialEngagement - telemetryDelta));
  const posture = Math.min(100, Math.max(50, currentQuestion.mockAnalysis.posture));
  const overallComm = Math.min(100, Math.max(50, currentQuestion.mockAnalysis.overallComm + telemetryDelta));
  const confidence = Math.min(100, Math.max(50, currentQuestion.mockAnalysis.confidence));

  return (
    <AppShell>
      <div className="space-y-6 animate-in fade-in duration-300 relative">
        {/* Top Focused Header */}
        <InterviewHeader
          currentQuestionNumber={currentQuestion.number}
          totalQuestions={MOCK_INTERVIEW_QUESTIONS_10.length}
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

            {/* Question Progress Dots */}
            <QuestionProgress
              currentIndex={currentQuestionIndex}
              totalQuestions={MOCK_INTERVIEW_QUESTIONS_10.length}
            />

            {/* Question Navigation Controls */}
            <InterviewControls
              currentIndex={currentQuestionIndex}
              totalQuestions={MOCK_INTERVIEW_QUESTIONS_10.length}
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
              eyeStatus={currentQuestion.mockAnalysis.eyeStatus}
              facialEngagement={facialEngagement}
              facialStatus={currentQuestion.mockAnalysis.facialStatus}
              posture={posture}
              postureStatus={currentQuestion.mockAnalysis.postureStatus}
            />

            {/* Voice & Speech Analysis */}
            <VoiceAnalysis
              speechClarity={currentQuestion.mockAnalysis.speechClarity}
              fluency={currentQuestion.mockAnalysis.fluency}
              pace={currentQuestion.mockAnalysis.pace}
              tone={currentQuestion.mockAnalysis.tone}
              isPaused={isPaused}
            />

            {/* Live Performance Indicators */}
            <PerformanceIndicators
              overallComm={overallComm}
              confidence={confidence}
              engagement={currentQuestion.mockAnalysis.engagement}
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
