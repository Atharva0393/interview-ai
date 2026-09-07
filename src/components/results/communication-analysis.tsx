"use client";

import React from "react";
import { Mic, Activity, Volume2 } from "lucide-react";

export function CommunicationAnalysis() {
  return (
    <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-xl space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Mic className="w-4 h-4 text-violet-400" />
          Communication & Speech Analysis
        </h3>
        <span className="text-[10px] font-mono text-slate-400">Simulated Verbal Analysis</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase">Speech Clarity</span>
          <div className="text-lg font-extrabold text-white">88%</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase">Fluency</span>
          <div className="text-lg font-extrabold text-white">84%</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase">Tone</span>
          <div className="text-xs font-bold text-violet-400">Confident</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase">Structure</span>
          <div className="text-xs font-bold text-emerald-400">Good (STAR)</div>
        </div>
      </div>

      {/* Speaking Pace Visual Gauge */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-300">Speaking Pace Gauge</span>
          <span className="text-blue-400 font-bold">Optimal (138 wpm)</span>
        </div>

        <div className="relative py-2">
          <div className="w-full h-2 rounded-full bg-slate-800 flex overflow-hidden">
            <div className="w-1/3 bg-amber-500/40" />
            <div className="w-1/3 bg-emerald-500/40" />
            <div className="w-1/3 bg-red-500/40" />
          </div>

          {/* Marker at center (Optimal zone) */}
          <div className="absolute top-0 left-[58%] -translate-x-1/2 flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-md shadow-blue-500/50" />
          </div>
        </div>

        <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-1">
          <span>Slow (&lt;110 wpm)</span>
          <span className="text-emerald-400 font-bold">Optimal (130–150 wpm)</span>
          <span>Fast (&gt;170 wpm)</span>
        </div>
      </div>
    </div>
  );
}
