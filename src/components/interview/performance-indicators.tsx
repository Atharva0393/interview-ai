"use client";

import React from "react";
import { Award, Zap } from "lucide-react";

interface PerformanceIndicatorsProps {
  overallComm: number;
  confidence: number;
  engagement: number;
}

export function PerformanceIndicators({
  overallComm,
  confidence,
  engagement,
}: PerformanceIndicatorsProps) {
  const metrics = [
    { label: "Communication", value: overallComm, color: "bg-blue-500" },
    { label: "Confidence", value: confidence, color: "bg-violet-500" },
    { label: "Engagement", value: engagement, color: "bg-emerald-500" },
  ];

  return (
    <div className="p-4 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] space-y-3 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-white flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-emerald-400" />
          Live Performance Readiness
        </span>
        <span className="text-[10px] text-slate-400 font-mono">Multimodal Score</span>
      </div>

      <div className="space-y-2.5">
        {metrics.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <span className="text-slate-300">{item.label}</span>
              <span className="text-white font-extrabold">{item.value}%</span>
            </div>

            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
