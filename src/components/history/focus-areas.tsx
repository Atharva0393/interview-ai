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
    <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-xl space-y-4">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <Target className="w-4 h-4 text-amber-400" />
        Keep Working On
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {areas.map((item) => {
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
