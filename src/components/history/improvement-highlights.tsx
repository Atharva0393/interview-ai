"use client";

import React from "react";
import { Award, Smile, MessageSquare, Brain } from "lucide-react";

export function ImprovementHighlights() {
  const highlights = [
    {
      title: "Confidence",
      gain: "+9%",
      desc: "Your responses have become more confident and decisive.",
      icon: Smile,
    },
    {
      title: "Communication",
      gain: "+8%",
      desc: "Your explanations are becoming clearer and better structured.",
      icon: MessageSquare,
    },
    {
      title: "Problem Solving",
      gain: "+8%",
      desc: "You are showing stronger reasoning and solution structure.",
      icon: Brain,
    },
  ];

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#e5e3de] shadow-2xs space-y-4">
      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
        <Award className="w-4 h-4 text-emerald-600" />
        Your Biggest Improvements
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Icon className="w-4 h-4 text-slate-900 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold border bg-emerald-50 text-emerald-800 border-emerald-200">
                  {item.gain}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
