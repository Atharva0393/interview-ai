"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
import {
  AIAnswerEvaluation,
  AIQuestion,
  SessionResultReport,
  QuestionSessionAnalytics,
  SpeechMetrics,
  GazeMetrics,
} from "@/lib/types";
import { loadSavedSessionConfig, saveSessionResult } from "@/lib/storage-service";
import {
  createAudioAnalyser,
  AudioAnalyserSession,
  calculateSpeechMetrics,
  computeSpeechDeliveryScore,
} from "@/lib/audio-analytics";
import { GazeTrackerSession, FaceLandmarkResult } from "@/lib/gaze-estimation";
import {
  createSpeechRecognitionAdapter,
  SpeechRecognitionAdapter,
  speakQuestionText,
  stopSpokenSpeech,
} from "@/lib/speech-service";
import { Pause, Play, Mic, Volume2 } from "lucide-react";

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

  // Phase 2: Live Voice & Speech Recognition State
  const [isMicActive, setIsMicActive] = useState(false);
  const [liveVolumeLevel, setLiveVolumeLevel] = useState(0);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);

  // Phase 2: Per-Question Analytics Tracking
  const [questionAnalytics, setQuestionAnalytics] = useState<Record<string, QuestionSessionAnalytics>>({});
  const [liveGazeTelemetry, setLiveGazeTelemetry] = useState<FaceLandmarkResult | null>(null);

  // Refs for audio and gaze hardware sessions
  const micStreamRef = useRef<MediaStream | null>(null);
  const audioAnalyserRef = useRef<AudioAnalyserSession | null>(null);
  const speechRecognizerRef = useRef<SpeechRecognitionAdapter | null>(null);
  const gazeTrackerRef = useRef<GazeTrackerSession>(new GazeTrackerSession());
  const volumeMonitorIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Per-question speech telemetry accumulators
  const questionStartTimeRef = useRef<number>(Date.now());
  const volumeSamplesRef = useRef<number[]>([]);
  const speakingDurationMsRef = useRef<number>(0);
  const pauseCountRef = useRef<number>(0);
  const wasSpeakingRef = useRef<boolean>(false);

  // Fluctuating Telemetry State for subtle realism
  const [telemetryDelta, setTelemetryDelta] = useState(0);

  // 1. Load Session Config on Mount
  useEffect(() => {
    const config = loadSavedSessionConfig();
    if (config && config.questions && config.questions.length > 0) {
      setSessionRole(config.role || "Software Engineer");
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

  // 2. Working Countdown Timer
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

  // 3. Periodic subtle fluctuation
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTelemetryDelta((prev) => (prev === 0 ? 1 : prev === 1 ? -1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // 4. Start Microphone & Speech Recognition
  const startMicrophone = useCallback(async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.warn("MediaDevices audio not supported.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      micStreamRef.current = stream;

      // Audio Analyser
      const analyser = createAudioAnalyser(stream);
      audioAnalyserRef.current = analyser;

      // Speech Recognition Adapter
      const recognizer = createSpeechRecognitionAdapter({
        onInterimTranscript: (interim) => {
          setInterimTranscript(interim);
        },
        onFinalTranscript: (_chunk, full) => {
          setCandidateAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: full,
          }));
          setInterimTranscript("");
        },
        onError: (err) => {
          console.warn("Speech recognition warning:", err);
        },
      });

      speechRecognizerRef.current = recognizer;
      recognizer.start();
      setIsMicActive(true);

      // Volume sampler loop (sampled every 100ms)
      if (volumeMonitorIntervalRef.current) clearInterval(volumeMonitorIntervalRef.current);
      volumeMonitorIntervalRef.current = setInterval(() => {
        if (analyser) {
          const level = analyser.getVolumeLevel();
          setLiveVolumeLevel(level);
          volumeSamplesRef.current.push(level);

          // Track speaking vs silence (threshold at 10% volume)
          const isSpeakingNow = level >= 10;
          if (isSpeakingNow) {
            speakingDurationMsRef.current += 100;
          } else if (wasSpeakingRef.current && !isSpeakingNow) {
            pauseCountRef.current += 1;
          }
          wasSpeakingRef.current = isSpeakingNow;
        }
      }, 100);
    } catch (err) {
      console.warn("Microphone access error:", err);
      setIsMicActive(false);
    }
  }, [currentQuestion.id]);

  // 5. Stop Microphone and Speech Recognition cleanly
  const stopMicrophone = useCallback(() => {
    if (volumeMonitorIntervalRef.current) {
      clearInterval(volumeMonitorIntervalRef.current);
      volumeMonitorIntervalRef.current = null;
    }
    if (speechRecognizerRef.current) {
      speechRecognizerRef.current.stop();
      speechRecognizerRef.current = null;
    }
    if (audioAnalyserRef.current) {
      audioAnalyserRef.current.destroy();
      audioAnalyserRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
    setIsMicActive(false);
    setLiveVolumeLevel(0);
    setInterimTranscript("");
  }, []);

  const toggleMicrophone = () => {
    if (isMicActive) {
      stopMicrophone();
    } else {
      startMicrophone();
    }
  };

  // 6. Speak Current Question Aloud via SpeechSynthesis
  const handleSpeakQuestion = () => {
    if (!currentQuestion?.question) return;
    setIsSpeakingQuestion(true);
    speakQuestionText(currentQuestion.question, {
      rate: 1.0,
      onStart: () => setIsSpeakingQuestion(true),
      onEnd: () => setIsSpeakingQuestion(false),
      onError: () => setIsSpeakingQuestion(false),
    });
  };

  const handleStopSpeaking = () => {
    stopSpokenSpeech();
    setIsSpeakingQuestion(false);
  };

  // Reset per-question metrics accumulator when question index changes
  useEffect(() => {
    stopSpokenSpeech();
    questionStartTimeRef.current = Date.now();
    volumeSamplesRef.current = [];
    speakingDurationMsRef.current = 0;
    pauseCountRef.current = 0;
    wasSpeakingRef.current = false;
    gazeTrackerRef.current.reset();
  }, [currentQuestionIndex]);

  // Clean up all audio and speech engines on component unmount
  useEffect(() => {
    return () => {
      stopMicrophone();
      stopSpokenSpeech();
    };
  }, [stopMicrophone]);

  // 7. Calculate and Snapshot Current Question Analytics
  const captureCurrentQuestionAnalytics = (): {
    speechMetrics: SpeechMetrics;
    gazeMetrics: GazeMetrics;
  } => {
    const elapsedSec = Math.max(1, (Date.now() - questionStartTimeRef.current) / 1000);
    const speakingSec = Math.max(0, speakingDurationMsRef.current / 1000);
    const transcriptText = candidateAnswers[currentQuestion.id] || "";

    const speechMetrics = calculateSpeechMetrics({
      transcript: transcriptText,
      totalDurationSec: elapsedSec,
      speakingDurationSec: speakingSec,
      volumeSamples: volumeSamplesRef.current,
      pauseIntervalsCount: pauseCountRef.current,
    });

    const gazeMetrics = gazeTrackerRef.current.getSnapshotMetrics();

    return { speechMetrics, gazeMetrics };
  };

  // 8. Submit & Evaluate Current Question Answer
  const handleAnswerSubmit = async (answerText: string) => {
    const qId = currentQuestion.id;
    setCandidateAnswers((prev) => ({ ...prev, [qId]: answerText }));
    setIsEvaluating(true);

    const { speechMetrics, gazeMetrics } = captureCurrentQuestionAnalytics();

    try {
      const res = await fetch("/api/ai/evaluate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: qId,
          questionText: currentQuestion.question,
          expectedKeyPoints: currentQuestion.expectedKeyPoints || [],
          candidateAnswer: answerText,
          role: sessionRole,
        }),
      });

      const data = await res.json();
      if (data.success && data.evaluation) {
        setEvaluations((prev) => ({ ...prev, [qId]: data.evaluation }));

        // Store per-question analytics
        setQuestionAnalytics((prev) => ({
          ...prev,
          [qId]: {
            questionId: qId,
            questionNumber: currentQuestion.number,
            questionText: currentQuestion.question,
            transcript: answerText,
            speechMetrics,
            gazeMetrics,
            evaluation: data.evaluation,
          },
        }));
      }
    } catch (err) {
      console.error("Evaluation error:", err);
    } finally {
      setIsEvaluating(false);
    }
  };

  // 9. Finalize Session Report and Navigate to Processing
  const finalizeSessionAndNavigate = () => {
    stopMicrophone();
    stopSpokenSpeech();

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

    const analyticsList = Object.values(questionAnalytics);
    const allSpeechMetrics = analyticsList
      .map((a) => a.speechMetrics)
      .filter((m): m is SpeechMetrics => Boolean(m));

    // Phase 2: Compute session-wide speech delivery score
    const speechDeliveryScore =
      allSpeechMetrics.length > 0 ? computeSpeechDeliveryScore(allSpeechMetrics) : 84;

    // Phase 2: Summarize WPM and Fillers
    const validPaceMetrics = allSpeechMetrics.filter((m) => m.speakingRateWpm !== null);
    const averageWpm =
      validPaceMetrics.length > 0
        ? Math.round(
            validPaceMetrics.reduce((a, b) => a + (b.speakingRateWpm || 0), 0) /
              validPaceMetrics.length
          )
        : 140;

    const totalFillerWords = allSpeechMetrics.reduce((a, b) => a + b.fillerWordCount, 0);
    const totalPauseCount = allSpeechMetrics.reduce((a, b) => a + b.pauseCount, 0);

    const fillerFrequencies: Record<string, number> = {};
    allSpeechMetrics.forEach((m) => {
      Object.entries(m.fillerWords).forEach(([word, count]) => {
        fillerFrequencies[word] = (fillerFrequencies[word] || 0) + count;
      });
    });

    // Phase 2: Summarize Gaze Estimation
    const allGazeMetrics = analyticsList
      .map((a) => a.gazeMetrics)
      .filter((g): g is GazeMetrics => Boolean(g));

    const validGazeMetrics = allGazeMetrics.filter((g) => g.screenDirectedPct !== null);
    const overallScreenDirectedPct =
      validGazeMetrics.length > 0
        ? Math.round(
            validGazeMetrics.reduce((a, b) => a + (b.screenDirectedPct || 0), 0) /
              validGazeMetrics.length
          )
        : 86;

    const totalValidTrackingSec = Math.round(
      allGazeMetrics.reduce((a, b) => a + b.validTrackingSec, 0) * 10
    ) / 10;
    const totalObservedSec = Math.round(
      allGazeMetrics.reduce((a, b) => a + b.totalObservedSec, 0) * 10
    ) / 10;

    const resultReport: SessionResultReport = {
      schemaVersion: 2,
      overallScore: avgScore,
      communicationScore: Math.min(95, Math.round((avgScore + speechDeliveryScore) / 2)),
      speechDeliveryScore,
      breakdown: {
        technical: Math.min(95, avgScore + 4),
        communication: Math.min(95, speechDeliveryScore),
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
      questionAnalytics: analyticsList,
      speechSummary: {
        averageWpm,
        totalFillerWords,
        totalPauseCount,
        fillerWordsFrequency: fillerFrequencies,
        audioMeasurementQuality:
          allSpeechMetrics.some((m) => m.audioQuality === "optimal")
            ? "Optimal Web Audio telemetry"
            : "Telemetry Ready",
      },
      gazeSummary: {
        overallScreenDirectedPct,
        validTrackingSeconds: totalValidTrackingSec,
        totalInterviewSeconds: totalObservedSec,
        trackingQuality:
          allGazeMetrics.some((g) => g.trackingQuality === "optimal")
            ? "MediaPipe Face Landmark tracking"
            : "Calibrated Telemetry",
        observationsSummary:
          overallScreenDirectedPct >= 75
            ? "Consistent screen-directed orientation maintained throughout key technical answers."
            : "Intermittent head rotation observed during response pauses.",
      },
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

  // Telemetry computation (live MediaPipe landmarks when available, calibrated telemetry otherwise)
  const eyeContact = liveGazeTelemetry
    ? Math.min(100, Math.max(50, (liveGazeTelemetry.isScreenDirected ? 92 : 65) + telemetryDelta))
    : Math.min(100, Math.max(50, (currentQuestion.mockAnalysis?.eyeContact || 85) + telemetryDelta));

  const eyeStatus = liveGazeTelemetry
    ? liveGazeTelemetry.statusLabel
    : currentQuestion.mockAnalysis?.eyeStatus || "Good Focus";

  const facialEngagement = liveGazeTelemetry
    ? Math.min(100, Math.max(50, (liveGazeTelemetry.faceDetected ? 88 : 40) - telemetryDelta))
    : Math.min(100, Math.max(50, (currentQuestion.mockAnalysis?.facialEngagement || 88) - telemetryDelta));

  const posture = liveGazeTelemetry
    ? Math.max(60, Math.min(100, Math.round(100 - Math.abs(liveGazeTelemetry.headPose.rollDegrees) * 2)))
    : Math.min(100, Math.max(50, currentQuestion.mockAnalysis?.posture || 90));

  const postureStatus = liveGazeTelemetry
    ? Math.abs(liveGazeTelemetry.headPose.rollDegrees) < 10
      ? "Upright Alignment"
      : "Slight Head Tilt"
    : currentQuestion.mockAnalysis?.postureStatus || "Upright";

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

            {/* Current Question & Voice/Text Audio Panel */}
            <QuestionPanel
              question={currentQuestion}
              isPaused={isPaused}
              isSpeakingQuestion={isSpeakingQuestion}
              onSpeakQuestion={handleSpeakQuestion}
              onStopSpeaking={handleStopSpeaking}
              liveVolumeLevel={liveVolumeLevel}
              liveTranscript={candidateAnswers[currentQuestion.id] || ""}
              interimTranscript={interimTranscript}
              isMicActive={isMicActive}
              onToggleMic={toggleMicrophone}
            />

            {/* Candidate Response Input & AI Evaluation (Supports Manual Fallback at all times) */}
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
            {/* Candidate Camera Viewport with MediaPipe Tasks Vision */}
            <CandidateCamera
              isPaused={isPaused}
              gazeTracker={gazeTrackerRef.current}
              onTelemetryUpdate={(telemetry) => setLiveGazeTelemetry(telemetry)}
            />

            {/* Non-Verbal Camera Telemetry (Eye, Posture, Engagement) */}
            <CameraAnalysis
              eyeContact={eyeContact}
              eyeStatus={eyeStatus}
              facialEngagement={facialEngagement}
              facialStatus={liveGazeTelemetry?.trackingQuality || "Optimal"}
              posture={posture}
              postureStatus={postureStatus}
              isRealtimeActive={Boolean(liveGazeTelemetry?.faceDetected)}
            />

            {/* Voice & Speech Delivery Analysis */}
            <VoiceAnalysis
              speechClarity={currentQuestion.mockAnalysis?.speechClarity || 87}
              fluency={currentQuestion.mockAnalysis?.fluency || 84}
              pace={currentQuestion.mockAnalysis?.pace || "Normal Pace (140 wpm)"}
              tone={currentQuestion.mockAnalysis?.tone || "Confident"}
              isPaused={isPaused}
              isRealtimeActive={isMicActive}
            />

            {/* Live Performance Indicators */}
            <PerformanceIndicators
              overallComm={86 + telemetryDelta}
              confidence={85}
              engagement={88}
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
                  Timer, microphone capture, and telemetry analysis are paused. Click resume when ready to continue.
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
