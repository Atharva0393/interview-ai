"use client";

import React from "react";
import { Sparkles, Bot, Cpu } from "lucide-react";

interface AIInterviewerProps {
  isPaused: boolean;
}

export function AIInterviewer({ isPaused }: AIInterviewerProps) {
  return (
    <div className="p-4 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-lg flex items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        {/* Abstract Animated AI Orb Visual */}
        <div className="relative">
          <div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 p-0.5 shadow-lg shadow-blue-500/20 ${
              !isPaused ? "animate-pulse" : ""
            }`}
          >
            <div className="w-full h-full rounded-[14px] bg-[#0b0f19] flex items-center justify-center relative overflow-hidden">
              {/* Inner generative wave grid lines */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 animate-pulse pointer-events-none" />
              <Cpu className="w-6 h-6 text-blue-400 z-10" />
            </div>
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#111827] shadow-sm" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-white tracking-tight">InterviewAI</span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-md">
              Evaluator Mode
            </span>
          </div>
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>AI Technical Interviewer • Real-time Active</span>
          </p>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
        <span>Vocal Audio Stream Online</span>
      </div>
    </div>
  );
}
