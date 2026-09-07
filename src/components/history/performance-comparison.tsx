"use client";

import React from "react";
import { ArrowRight, TrendingUp, Award } from "lucide-react";
import { MOCK_COMPARISON_DATA } from "./history-mock-data";

export function PerformanceComparison() {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            Latest vs First Interview Comparison
          </h3>
          <p className="text-xs text-slate-400">Direct score delta comparison between Session #1 and Session #6</p>
        </div>

        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
          Positive Trajectory Across All Metrics
        </span>
      </div>

      {/* Comparison Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_COMPARISON_DATA.map((item) => (
          <div
            key={item.metric}
            className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 hover:border-blue-500/30 transition-colors"
          >
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>{item.metric}</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-extrabold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {item.change}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-center">
                <span className="text-[10px] text-slate-500 font-semibold block">First Session</span>
                <span className="text-base font-bold text-slate-400">{item.first}%</span>
              </div>

              <ArrowRight className="w-4 h-4 text-blue-400" />

              <div className="text-center">
                <span className="text-[10px] text-blue-400 font-semibold block">Latest Session</span>
                <span className="text-lg font-extrabold text-white">{item.latest}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
