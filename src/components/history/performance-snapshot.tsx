"use client";

import React from "react";
import { TrendingUp, Award, Activity, BarChart2, Zap } from "lucide-react";

export function PerformanceSnapshot() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Latest Score Card (Highlighted) */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/60 via-[#111827] to-violet-950/50 border border-blue-500/40 shadow-xl space-y-3 relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
            Current Overall Score
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-extrabold">
            Latest Session
          </span>
        </div>

        <div className="flex items-baseline justify-between">
          <div className="text-3xl sm:text-4xl font-black text-white">84%</div>
          <div className="flex items-center gap-1 text-xs font-extrabold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-1 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+7%</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-300">
          Improvement since your first mock interview (77% → 84%)
        </p>
      </div>

      {/* Best Score */}
      <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Best Score
          </span>
          <Award className="w-4 h-4 text-violet-400" />
        </div>
        <div className="text-3xl font-extrabold text-white">88%</div>
        <p className="text-[11px] text-slate-400">Achieved on Session #5 (Advanced Technical)</p>
      </div>

      {/* Average Score */}
      <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Average Score
          </span>
          <Activity className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-3xl font-extrabold text-white">81%</div>
        <p className="text-[11px] text-slate-400">Mean readiness score across 6 sessions</p>
      </div>

      {/* Total Sessions */}
      <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Interviews
          </span>
          <BarChart2 className="w-4 h-4 text-amber-400" />
        </div>
        <div className="text-3xl font-extrabold text-white">6</div>
        <p className="text-[11px] text-slate-400">Completed mock interview sessions</p>
      </div>
    </div>
  );
}
