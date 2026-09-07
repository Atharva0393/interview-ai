"use client";

import React from "react";
import { TrendingUp, Award, Activity, BarChart2 } from "lucide-react";

export function PerformanceSnapshot() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Latest Score Card */}
      <div className="p-6 rounded-2xl bg-white border border-[#e5e3de] shadow-2xs space-y-3 relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-violet-800 uppercase tracking-wider">
            Current Overall Score
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-800 border border-violet-100 text-[10px] font-extrabold">
            Latest Session
          </span>
        </div>

        <div className="flex items-baseline justify-between">
          <div className="text-3xl sm:text-4xl font-black text-slate-900">84%</div>
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+7%</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
          Improvement since your first mock interview (77% → 84%)
        </p>
      </div>

      {/* Best Score */}
      <div className="p-6 rounded-2xl bg-white border border-[#e5e3de] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Best Score
          </span>
          <Award className="w-4 h-4 text-violet-600" />
        </div>
        <div className="text-3xl font-extrabold text-slate-900">88%</div>
        <p className="text-[11px] text-slate-500 font-normal">Achieved on Session #5 (Advanced Technical)</p>
      </div>

      {/* Average Score */}
      <div className="p-6 rounded-2xl bg-white border border-[#e5e3de] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Average Score
          </span>
          <Activity className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-3xl font-extrabold text-slate-900">81%</div>
        <p className="text-[11px] text-slate-500 font-normal">Mean readiness score across 6 sessions</p>
      </div>

      {/* Total Sessions */}
      <div className="p-6 rounded-2xl bg-white border border-[#e5e3de] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Total Interviews
          </span>
          <BarChart2 className="w-4 h-4 text-violet-600" />
        </div>
        <div className="text-3xl font-extrabold text-slate-900">6</div>
        <p className="text-[11px] text-slate-500 font-normal">Completed mock interview sessions</p>
      </div>
    </div>
  );
}
