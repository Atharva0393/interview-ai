"use client";

import React from "react";
import { Mic } from "lucide-react";

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
}: VoiceAnalysisProps) {
  return (
    <div className="p-4 rounded-2xl bg-white border border-[#e5e3de] space-y-3 shadow-2xs">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
          <Mic className="w-3.5 h-3.5 text-violet-600" />
          Voice & Speech Analysis
        </span>
        <span className="text-[10px] text-slate-400 font-mono">Simulated Analysis</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 space-y-0.5">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">Clarity</span>
          <div className="text-sm font-extrabold text-slate-900">{speechClarity}%</div>
        </div>

        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 space-y-0.5">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">Fluency</span>
          <div className="text-sm font-extrabold text-slate-900">{fluency}%</div>
        </div>

        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 space-y-0.5">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">Pace</span>
          <div className="text-xs font-bold text-violet-700 truncate">{pace}</div>
        </div>

        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 space-y-0.5">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">Tone</span>
          <div className="text-xs font-bold text-slate-800 truncate">{tone}</div>
        </div>
      </div>
    </div>
  );
}
