"use client";

import React from "react";
import { Eye } from "lucide-react";

export function NonVerbalAnalysis() {
  return (
    <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Eye className="w-4 h-4 text-slate-900" />
          Non-Verbal Communication
        </h3>
        <span className="text-[10px] font-mono text-slate-400">Simulated Telemetry</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-semibold uppercase text-[10px]">Eye Contact</span>
            <span className="text-emerald-700 font-bold text-[10px]">Strong</span>
          </div>
          <div className="text-xl font-extrabold text-slate-900">86%</div>
        </div>

        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-semibold uppercase text-[10px]">Engagement</span>
            <span className="text-slate-900 font-bold text-[10px]">Engaged</span>
          </div>
          <div className="text-xl font-extrabold text-slate-900">82%</div>
        </div>

        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-semibold uppercase text-[10px]">Posture</span>
            <span className="text-slate-700 font-bold text-[10px]">Stable</span>
          </div>
          <div className="text-xl font-extrabold text-slate-900">88%</div>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-600 leading-relaxed font-normal">
        <span className="font-bold text-slate-900">Non-Verbal Insight: </span>
        &ldquo;Your visual engagement remained consistent throughout the interview, with strong eye contact and stable posture.&rdquo;
      </div>
    </div>
  );
}
