"use client";

import React from "react";
import { TrendingUp, Award, Smile, MessageSquare, Brain } from "lucide-react";

export function ImprovementHighlights() {
  const highlights = [
    {
      title: "Confidence",
      gain: "+9%",
      desc: "Your responses have become more confident and decisive.",
      icon: Smile,
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    },
    {
      title: "Communication",
      gain: "+8%",
      desc: "Your explanations are becoming clearer and better structured.",
      icon: MessageSquare,
      color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    },
    {
      title: "Problem Solving",
      gain: "+8%",
      desc: "You are showing stronger reasoning and solution structure.",
      icon: Brain,
      color: "text-violet-400 border-violet-500/30 bg-violet-500/10",
    },
  ];

  return (
    <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-xl space-y-4">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <Award className="w-4 h-4 text-emerald-400" />
        Your Biggest Improvements
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Icon className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${item.color}`}>
                  {item.gain}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
