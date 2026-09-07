"use client";

import React from "react";
import { Target, Brain, Code, Layers } from "lucide-react";

export function FocusAreas() {
  const areas = [
    {
      title: "Problem Solving",
      desc: "Practice explaining your reasoning step by step.",
      icon: Brain,
    },
    {
      title: "Technical Depth",
      desc: "Go deeper into trade-offs and real-world implementation decisions.",
      icon: Code,
    },
    {
      title: "Answer Structure",
      desc: "Continue using structured frameworks when answering behavioral questions.",
      icon: Layers,
    },
  ];

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#e5e3de] shadow-2xs space-y-4">
      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
        <Target className="w-4 h-4 text-violet-600" />
        Keep Working On
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {areas.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Icon className="w-4 h-4 text-violet-600 shrink-0" />
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
