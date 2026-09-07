"use client";

import React from "react";
import { Eye, Smile, Activity } from "lucide-react";

export function NonVerbalAnalysis() {
  return (
    <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-xl space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Eye className="w-4 h-4 text-emerald-400" />
          Non-Verbal Communication
        </h3>
        <span className="text-[10px] font-mono text-slate-400">Simulated Telemetry</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Eye Contact</span>
            <span className="text-emerald-400 font-bold text-[10px]">Strong</span>
          </div>
          <div className="text-xl font-extrabold text-white">86%</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Engagement</span>
            <span className="text-violet-400 font-bold text-[10px]">Engaged</span>
          </div>
          <div className="text-xl font-extrabold text-white">82%</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Posture</span>
            <span className="text-blue-400 font-bold text-[10px]">Stable</span>
          </div>
          <div className="text-xl font-extrabold text-white">88%</div>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
        <span className="font-semibold text-white">Non-Verbal Insight: </span>
        &ldquo;Your visual engagement remained consistent throughout the interview, with strong eye contact and stable posture.&rdquo;
      </div>
    </div>
  );
}
