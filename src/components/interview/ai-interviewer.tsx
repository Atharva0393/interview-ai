"use client";

import React from "react";
import { Sparkles, Cpu } from "lucide-react";

interface AIInterviewerProps {
  isPaused: boolean;
}

export function AIInterviewer({ isPaused }: AIInterviewerProps) {
  return (
    <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs flex items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        {/* Abstract AI Visual */}
        <div className="relative">
          <div
            className={`w-11 h-11 rounded-xl bg-slate-900 p-0.5 shadow-2xs ${
              !isPaused ? "animate-pulse" : ""
            }`}
          >
            <div className="w-full h-full rounded-[10px] bg-slate-900 flex items-center justify-center relative overflow-hidden text-white">
              <Cpu className="w-5 h-5 text-white z-10" />
            </div>
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-2xs" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900 tracking-tight">InterviewAI</span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-stone-900 text-white rounded-md">
              Evaluator Mode
            </span>
          </div>
          <p className="text-xs text-slate-500 font-normal flex items-center gap-1 mt-0.5">
            <Sparkles className="w-3 h-3 text-slate-900 fill-current" />
            <span>AI Technical Interviewer • Real-time Active</span>
          </p>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-slate-600">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span>Vocal Audio Stream Online</span>
      </div>
    </div>
  );
}
