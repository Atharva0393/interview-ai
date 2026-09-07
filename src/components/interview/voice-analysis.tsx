"use client";

import React from "react";
import { Mic, Volume2, Activity } from "lucide-react";

interface VoiceAnalysisProps {
  speechClarity: number;
  fluency: number;
  pace: string;
  tone: string;
  isPaused: boolean;
}

export function VoiceAnalysis({
  speechClarity,
  fluency,
  pace,
  tone,
  isPaused,
}: VoiceAnalysisProps) {
  return (
    <div className="p-4 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] space-y-3 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-white flex items-center gap-1.5">
          <Mic className="w-3.5 h-3.5 text-violet-400" />
          Voice & Speech Analysis
        </span>
        <span className="text-[10px] text-slate-400 font-mono">Simulated Analysis</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Clarity</span>
          <div className="text-sm font-extrabold text-white">{speechClarity}%</div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Fluency</span>
          <div className="text-sm font-extrabold text-white">{fluency}%</div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Pace</span>
          <div className="text-xs font-bold text-blue-400 truncate">{pace}</div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Tone</span>
          <div className="text-xs font-bold text-violet-400 truncate">{tone}</div>
        </div>
      </div>
    </div>
  );
}
