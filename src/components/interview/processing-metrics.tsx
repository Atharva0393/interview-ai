"use client";

import React from "react";

interface ProcessingMetricsProps {
  progress: number;
}

export function ProcessingMetrics({ progress }: ProcessingMetricsProps) {
  // Compute animated preview values based on overall progress percentage
  const responseRel = Math.min(87, Math.round((progress / 100) * 87));
  const speechFluency = Math.min(84, Math.round((progress / 100) * 84));
  const eyeContact = Math.min(86, Math.round((progress / 100) * 86));
  const confidence = Math.min(81, Math.round((progress / 100) * 81));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="p-4 rounded-2xl bg-[#111827]/80 border border-[#1e293b] text-center space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Response Relevance
        </span>
        <div className="text-xl sm:text-2xl font-extrabold text-blue-400">{responseRel}%</div>
      </div>

      <div className="p-4 rounded-2xl bg-[#111827]/80 border border-[#1e293b] text-center space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Speech Fluency
        </span>
        <div className="text-xl sm:text-2xl font-extrabold text-violet-400">{speechFluency}%</div>
      </div>

      <div className="p-4 rounded-2xl bg-[#111827]/80 border border-[#1e293b] text-center space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Eye Contact
        </span>
        <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">{eyeContact}%</div>
      </div>

      <div className="p-4 rounded-2xl bg-[#111827]/80 border border-[#1e293b] text-center space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Confidence
        </span>
        <div className="text-xl sm:text-2xl font-extrabold text-amber-400">{confidence}%</div>
      </div>
    </div>
  );
}
