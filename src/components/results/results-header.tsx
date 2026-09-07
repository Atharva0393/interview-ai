"use client";

import React, { useState } from "react";
import { CheckCircle2, Download, Calendar, Clock, Briefcase, Layers, Sliders } from "lucide-react";

export function ResultsHeader() {
  const [showToast, setShowToast] = useState(false);

  const handleDownloadClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-4 border-b border-[#e5e3de] pb-6 relative">
      {/* Header Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interview Analysis Complete</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-[10px] font-mono text-slate-500">
            Simulated Analysis • Frontend Prototype
          </span>
        </div>

        {/* Download Action with Toast */}
        <div className="relative">
          <button
            onClick={handleDownloadClick}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-slate-700 border border-stone-200 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-violet-600" />
            <span>Download Report</span>
            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-violet-50 text-violet-800 rounded border border-violet-100">
              Soon
            </span>
          </button>

          {showToast && (
            <div className="absolute right-0 top-12 z-20 px-3.5 py-2 rounded-xl bg-slate-900 text-white border border-slate-800 text-xs font-medium shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-top-1 duration-200">
              Report export will be available in a future version.
            </div>
          )}
        </div>
      </div>

      {/* Main Title */}
      <div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Your Interview Performance Report
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
          Here is a complete breakdown of your interview performance and personalized insights to help you improve.
        </p>
      </div>

      {/* Compact Context Metadata Row */}
      <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-bold text-slate-800">
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <Briefcase className="w-3.5 h-3.5 text-violet-600" />
          Frontend Developer
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <Layers className="w-3.5 h-3.5 text-violet-600" />
          Mixed Interview
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <Sliders className="w-3.5 h-3.5 text-violet-600" />
          Intermediate
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-violet-600" />
          20 Minutes (10 Questions)
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-slate-500 font-medium shadow-2xs">
          <Calendar className="w-3.5 h-3.5" />
          Completed Today
        </span>
      </div>
    </div>
  );
}
