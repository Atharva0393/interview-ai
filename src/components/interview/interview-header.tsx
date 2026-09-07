"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Clock, Pause, Play, LogOut } from "lucide-react";

interface InterviewHeaderProps {
  currentQuestionNumber: number;
  totalQuestions: number;
  timerSeconds: number;
  isPaused: boolean;
  onTogglePause: () => void;
  onOpenEndModal: () => void;
}

export function InterviewHeader({
  currentQuestionNumber,
  totalQuestions,
  timerSeconds,
  isPaused,
  onTogglePause,
  onOpenEndModal,
}: InterviewHeaderProps) {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <header className="px-4 sm:px-6 py-3.5 rounded-2xl bg-[#111827]/90 backdrop-blur-md border border-[#1e293b] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
      {/* Left Section: Brand & Interview Title */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-white text-sm tracking-tight hidden sm:inline-block">
            InterviewAI
          </span>
        </Link>

        <div className="h-4 w-px bg-slate-800 hidden sm:block" />

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xs sm:text-sm font-bold text-white tracking-tight">
              Frontend Developer Mock Interview
            </h1>
            <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AI Active
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden sm:block">
            Simulated multimodal vocal & eye engagement room
          </p>
        </div>
      </div>

      {/* Right Section: Stepper Counter, Timer, Pause & End Interview */}
      <div className="flex items-center gap-3 justify-between md:justify-end">
        {/* Question Counter */}
        <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
          Question <span className="text-blue-400 font-bold">{currentQuestionNumber}</span> of {totalQuestions}
        </div>

        {/* Working Timer Badge */}
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span>{formatTime(timerSeconds)}</span>
        </div>

        {/* Pause/Resume Action */}
        <button
          onClick={onTogglePause}
          className={`p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
            isPaused
              ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
              : "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800"
          }`}
          title={isPaused ? "Resume Interview" : "Pause Interview"}
        >
          {isPaused ? <Play className="w-4 h-4 fill-current text-amber-400" /> : <Pause className="w-4 h-4 text-slate-400" />}
        </button>

        {/* End Interview Action */}
        <button
          onClick={onOpenEndModal}
          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-300 border border-slate-700 hover:border-red-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <LogOut className="w-3.5 h-3.5 text-slate-400" />
          <span>End Interview</span>
        </button>
      </div>
    </header>
  );
}
