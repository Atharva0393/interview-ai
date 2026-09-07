"use client";

import React from "react";
import { AlertTriangle, Target, Layers, Sliders, TrendingUp } from "lucide-react";

export function ImprovementsSection() {
  const improvements = [
    {
      title: "Improve Answer Structure",
      desc: "Use a clearer structure such as Situation → Approach → Solution → Result.",
      icon: Layers,
    },
    {
      title: "Strengthen Confidence",
      desc: "Reduce hesitation when explaining unfamiliar or challenging concepts.",
      icon: TrendingUp,
    },
    {
      title: "Expand Technical Examples",
      desc: "Support answers with more real-world project examples.",
      icon: Target,
    },
    {
      title: "Improve Response Depth",
      desc: "Go deeper when explaining technical decisions and trade-offs.",
      icon: Sliders,
    },
  ];

  return (
    <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-xl space-y-4">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-400" />
        Areas to Improve
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {improvements.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{item.title}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
