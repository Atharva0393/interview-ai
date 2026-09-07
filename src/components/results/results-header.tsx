"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, Download, Calendar, Clock, Briefcase, Layers, Sliders } from "lucide-react";

export function ResultsHeader() {
  const [showToast, setShowToast] = useState(false);

  const handleDownloadClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-4 border-b border-[#1e293b] pb-6 relative">
      {/* Header Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Interview Analysis Complete</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
            Simulated Analysis • Frontend Prototype
          </span>
        </div>

        {/* Download Action with Toast */}
        <div className="relative">
          <button
            onClick={handleDownloadClick}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Download Report</span>
            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
              Soon
            </span>
          </button>

          {showToast && (
            <div className="absolute right-0 top-12 z-20 px-3.5 py-2 rounded-xl bg-blue-950 text-blue-200 border border-blue-500/40 text-xs font-medium shadow-xl whitespace-nowrap animate-in fade-in slide-in-from-top-1 duration-200">
              Report export will be available in a future version.
            </div>
          )}
        </div>
      </div>

      {/* Main Title */}
      <div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Your Interview Performance Report
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Here is a complete breakdown of your interview performance and personalized insights to help you improve.
        </p>
      </div>

      {/* Compact Context Metadata Row */}
      <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-slate-300">
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
          <Briefcase className="w-3.5 h-3.5 text-blue-400" />
          Frontend Developer
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
          <Layers className="w-3.5 h-3.5 text-violet-400" />
          Mixed Interview
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
          <Sliders className="w-3.5 h-3.5 text-emerald-400" />
          Intermediate
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          20 Minutes (10 Questions)
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
          <Calendar className="w-3.5 h-3.5" />
          Completed Today
        </span>
      </div>
    </div>
  );
}
