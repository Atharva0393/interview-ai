"use client";

import React from "react";
import { Mic, Activity } from "lucide-react";

interface VoiceAnalysisProps {
  speechClarity?: number;
  fluency?: number;
  pace?: string;
  tone?: string;
  isPaused?: boolean;
  wpm?: number | null;
  fillerCount?: number;
  pauseCount?: number;
  isRealtimeActive?: boolean;
}

export function VoiceAnalysis({
  speechClarity = 87,
  fluency = 84,
  pace = "Normal Pace (140 wpm)",
  tone = "Confident",
  wpm,
  fillerCount = 0,
  pauseCount = 0,
  isRealtimeActive = false,
}: VoiceAnalysisProps) {
  const displayPace = wpm ? `${wpm} WPM` : pace;

  return (
    <div className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-3 shadow-2xs">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
          <Mic className="w-3.5 h-3.5 text-slate-900" />
          <span>Speech Delivery & Audio Analytics</span>
        </span>
        <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded border ${
          isRealtimeActive
            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
            : "bg-stone-100 text-slate-600 border-stone-200"
        }`}>
          {isRealtimeActive ? "Live Web Audio" : "Telemetry Ready"}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        {/* Speaking Pace */}
        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 space-y-0.5">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">Speaking Pace</span>
          <div className="text-xs font-extrabold text-slate-900 truncate">{displayPace}</div>
        </div>

        {/* Filler Words */}
        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 space-y-0.5">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">Filler Words</span>
          <div className="text-sm font-extrabold text-slate-900">
            {fillerCount} <span className="text-[10px] text-slate-400 font-normal">detected</span>
          </div>
        </div>

        {/* Pauses */}
        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 space-y-0.5">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">Thoughtful Pauses</span>
          <div className="text-sm font-extrabold text-slate-900">{pauseCount}</div>
        </div>

        {/* Speech Fluency */}
        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 space-y-0.5">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">Fluency</span>
          <div className="text-sm font-extrabold text-slate-900">{fluency}%</div>
        </div>
      </div>
    </div>
  );
}
