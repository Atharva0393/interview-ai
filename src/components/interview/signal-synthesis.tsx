"use client";

import React from "react";
import { Cpu, ArrowRight, FileText, Mic, Eye, Smile, Award } from "lucide-react";

export function SignalSynthesis() {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-violet-950/40 border border-blue-500/20 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-blue-400" />
          Multimodal Signal Synthesis Architecture
        </h3>
        <span className="text-[10px] font-mono text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
          Visual System Map
        </span>
      </div>

      {/* Signal Flow Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center">
        {/* 4 Multimodal Inputs */}
        <div className="grid grid-cols-2 gap-2 text-left">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="text-[11px] font-semibold text-slate-300">Responses</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2">
            <Mic className="w-3.5 h-3.5 text-violet-400 shrink-0" />
            <span className="text-[11px] font-semibold text-slate-300">Voice & Speech</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-[11px] font-semibold text-slate-300">Eye Contact</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2">
            <Smile className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-[11px] font-semibold text-slate-300">Facial Signals</span>
          </div>
        </div>

        {/* AI Engine Center Node */}
        <div className="p-4 rounded-2xl bg-blue-600/20 border border-blue-500/40 space-y-1 my-2 md:my-0 shadow-lg">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
            <Cpu className="w-4 h-4 animate-pulse" />
          </div>
          <div className="text-xs font-extrabold text-white">AI Feedback Engine</div>
          <p className="text-[10px] text-blue-300">Multimodal Neural Fusion</p>
        </div>

        {/* Unified Report Node */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border border-violet-500/40 text-center space-y-1 shadow-lg">
          <div className="w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto text-violet-300">
            <Award className="w-4 h-4" />
          </div>
          <div className="text-xs font-extrabold text-white">Performance Report</div>
          <p className="text-[10px] text-violet-300">Personalized Insights</p>
        </div>
      </div>
    </div>
  );
}
