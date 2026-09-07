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
    <div className="p-6 rounded-2xl bg-white border border-[#e5e3de] shadow-2xs space-y-4">
      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600" />
        Areas to Improve
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {improvements.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Icon className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{item.title}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
