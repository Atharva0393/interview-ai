"use client";

import React from "react";
import { CheckCircle2, Award, Code, MessageSquare, ShieldCheck, Zap } from "lucide-react";

export function StrengthsSection() {
  const strengths = [
    {
      title: "Strong Technical Foundation",
      desc: "You demonstrated a solid understanding of React, JavaScript, and frontend architecture.",
      icon: Code,
    },
    {
      title: "Clear Communication",
      desc: "Your explanations were generally structured and easy to follow.",
      icon: MessageSquare,
    },
    {
      title: "Relevant Responses",
      desc: "You stayed focused on the questions and provided contextually relevant answers.",
      icon: CheckCircle2,
    },
    {
      title: "Consistent Engagement",
      desc: "Your simulated interview engagement indicators remained stable throughout the session.",
      icon: Zap,
    },
  ];

  return (
    <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-xl space-y-4">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <Award className="w-4 h-4 text-emerald-400" />
        Your Key Strengths
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {strengths.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
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
