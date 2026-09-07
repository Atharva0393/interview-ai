"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Video,
  Mic,
  MicOff,
  Sparkles,
  Clock,
  Eye,
  Activity,
  Smile,
  CheckCircle,
  HelpCircle,
  Play,
  Square,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { MOCK_INTERVIEW_QUESTIONS } from "@/lib/mock-data";

export default function InterviewSessionPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(124); // 2:04 elapsed
  const [audioLevel, setAudioLevel] = useState(45);

  const currentQuestion = MOCK_INTERVIEW_QUESTIONS[currentQuestionIndex];

  // Timer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Audio wave simulation
  useEffect(() => {
    if (!isRecording) return;
    const interval = setInterval(() => {
      setAudioLevel(Math.floor(Math.random() * 60) + 35);
    }, 200);
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < MOCK_INTERVIEW_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsRecording(false);
    } else {
      router.push("/interview/processing");
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Top Room Banner Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#111827]/90 border border-[#1e293b]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-white">Live AI Interview Room</h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md">
                  Active Session
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Senior React Developer • Technical & Architecture</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Session Elapsed Timer */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{formatTimer(timerSeconds)}</span>
            </div>

            <button
              onClick={() => router.push("/dashboard")}
              className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold transition-colors"
            >
              End Early
            </button>
          </div>
        </div>

        {/* Main Grid: Video Room Feed (Left) & AI Prompt/Signals (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Simulated Webcam & Audio Feed Panel (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Video Viewport Container */}
            <div className="relative aspect-video rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-4 shadow-2xl group">
              {/* Simulated Camera Overlay Grid */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />

              {/* Simulated User Camera Feed Canvas Mock */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600/30 to-violet-600/30 border border-blue-500/30 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center font-bold text-2xl text-white shadow-lg">
                    A
                  </div>
                </div>
              </div>

              {/* Top Video Status Overlay */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-[11px] text-slate-200">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Simulated Webcam Preview</span>
                </div>

                <div className="px-2.5 py-1 rounded-full bg-blue-950/80 backdrop-blur-md border border-blue-500/40 text-[10px] font-mono text-blue-300">
                  1080p • 60 FPS
                </div>
              </div>

              {/* Bottom Vocal Waveform Overlay */}
              <div className="relative z-10 flex items-end justify-between gap-4">
                {/* Audio Level Waveform Bars */}
                <div className="flex items-end gap-1 h-8 bg-slate-900/80 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl">
                  {[40, 65, 30, 80, 55, 90, 45, 70, 35, 60].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-gradient-to-t from-blue-500 to-violet-400 rounded-full transition-all duration-150"
                      style={{
                        height: isRecording ? `${(h * audioLevel) / 100}%` : "20%",
                      }}
                    />
                  ))}
                </div>

                {/* Micro Control Actions */}
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer ${
                    isRecording
                      ? "bg-red-600 hover:bg-red-500 text-white shadow-red-500/20"
                      : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20"
                  }`}
                >
                  {isRecording ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Pause Audio</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5" />
                      <span>Start Speaking</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Live Signals & Telemetry Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#111827]/80 border border-[#1e293b]">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span>Eye Contact</span>
                </div>
                <div className="text-base font-bold text-white">88% (Good)</div>
              </div>

              <div className="p-3 rounded-xl bg-[#111827]/80 border border-[#1e293b]">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                  <Activity className="w-3.5 h-3.5 text-violet-400" />
                  <span>Speech Pace</span>
                </div>
                <div className="text-base font-bold text-white">138 wpm</div>
              </div>

              <div className="p-3 rounded-xl bg-[#111827]/80 border border-[#1e293b]">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                  <Smile className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Posture Score</span>
                </div>
                <div className="text-base font-bold text-white">Centered</div>
              </div>
            </div>
          </div>

          {/* AI Interviewer Question Prompt Container (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] flex flex-col justify-between space-y-6">
            <div>
              {/* Stepper Progress */}
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-3">
                <span className="text-blue-400">
                  Question {currentQuestion.number} of {MOCK_INTERVIEW_QUESTIONS.length}
                </span>
                <span>Topic: {currentQuestion.topic}</span>
              </div>

              <h2 className="text-lg font-bold text-white leading-snug mb-4">
                {currentQuestion.question}
              </h2>

              {/* Key Evaluation Criteria Pills */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  AI Evaluator Key Points:
                </span>
                <div className="space-y-2">
                  {currentQuestion.expectedKeyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hint Callout Box */}
              <div className="mt-6 p-3.5 rounded-xl bg-violet-950/30 border border-violet-500/20 text-xs text-violet-300 flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block mb-0.5">Response Tip</span>
                  {currentQuestion.hint}
                </div>
              </div>
            </div>

            {/* Submit / Next Controls */}
            <div className="pt-4 border-t border-[#1e293b] flex items-center justify-between">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                {isRecording ? "Listening to response..." : "Click microphone to answer"}
              </button>

              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
              >
                <span>
                  {currentQuestionIndex < MOCK_INTERVIEW_QUESTIONS.length - 1
                    ? "Next Question"
                    : "Complete & Evaluate"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
