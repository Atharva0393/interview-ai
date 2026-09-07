"use client";

import React from "react";
import { Clock, Pause, Play, LogOut, Video } from "lucide-react";

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
  // Format seconds into MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#e5e3de] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Question Counter & Status */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-700 border border-violet-100 flex items-center justify-center font-bold shrink-0">
          <Video className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">
              Question {currentQuestionNumber} of {totalQuestions}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-violet-50 text-violet-800 border border-violet-200 rounded">
              Live Practice
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-normal">
            Frontend Developer • React & App Router
          </p>
        </div>
      </div>

      {/* Timer & Controls */}
      <div className="flex items-center gap-3">
        {/* Countdown Timer */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200">
          <Clock className="w-3.5 h-3.5 text-violet-600" />
          <span className="font-mono text-xs font-bold text-slate-900">
            {formatTime(timerSeconds)}
          </span>
        </div>

        {/* Pause / Resume Button */}
        <button
          onClick={onTogglePause}
          aria-label={isPaused ? "Resume interview timer" : "Pause interview timer"}
          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-stone-50 text-slate-700 text-xs font-bold border border-stone-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:outline-none active:scale-[0.98]"
        >
          {isPaused ? <Play className="w-3.5 h-3.5 text-violet-600 fill-current" /> : <Pause className="w-3.5 h-3.5 text-slate-500" />}
          <span>{isPaused ? "Resume" : "Pause"}</span>
        </button>

        {/* End Interview Button */}
        <button
          onClick={onOpenEndModal}
          aria-label="End session early and process results"
          className="px-3.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold border border-red-200 transition-all flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none active:scale-[0.98]"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>End Session</span>
        </button>
      </div>
    </div>
  );
}
