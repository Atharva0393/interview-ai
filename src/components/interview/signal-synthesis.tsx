"use client";

import React from "react";
import { Cpu, FileText, Mic, Eye, Smile, Award } from "lucide-react";

export function SignalSynthesis() {
  return (
    <div className="p-6 rounded-2xl bg-white border border-[#e5e3de] shadow-2xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-violet-600" />
          Multimodal Signal Synthesis Architecture
        </h3>
        <span className="text-[10px] font-mono text-violet-800 bg-violet-50 px-2 py-0.5 rounded border border-violet-100 font-bold">
          Visual System Map
        </span>
      </div>

      {/* Signal Flow Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center">
        {/* 4 Multimodal Inputs */}
        <div className="grid grid-cols-2 gap-2 text-left">
          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-violet-600 shrink-0" />
            <span className="text-[11px] font-bold text-slate-800">Responses</span>
          </div>

          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2">
            <Mic className="w-3.5 h-3.5 text-violet-600 shrink-0" />
            <span className="text-[11px] font-bold text-slate-800">Voice & Speech</span>
          </div>

          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="text-[11px] font-bold text-slate-800">Eye Contact</span>
          </div>

          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2">
            <Smile className="w-3.5 h-3.5 text-slate-700 shrink-0" />
            <span className="text-[11px] font-bold text-slate-800">Facial Signals</span>
          </div>
        </div>

        {/* AI Engine Center Node */}
        <div className="p-4 rounded-2xl bg-violet-50 border border-violet-200 space-y-1 my-2 md:my-0 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center mx-auto text-white">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="text-xs font-extrabold text-slate-900">AI Feedback Engine</div>
          <p className="text-[10px] text-violet-800 font-bold">Multimodal Neural Fusion</p>
        </div>

        {/* Unified Report Node */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-1 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-700 font-bold">
            <Award className="w-4 h-4" />
          </div>
          <div className="text-xs font-extrabold text-slate-900">Performance Report</div>
          <p className="text-[10px] text-slate-500 font-medium">Personalized Insights</p>
        </div>
      </div>
    </div>
  );
}
