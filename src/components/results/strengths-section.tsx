"use client";

import React from "react";
import { CheckCircle2, Award, Code, MessageSquare, Zap } from "lucide-react";

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
    <div className="p-6 rounded-2xl bg-white border border-[#e5e3de] shadow-2xs space-y-4">
      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
        <Award className="w-4 h-4 text-emerald-600" />
        Your Key Strengths
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {strengths.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Icon className="w-4 h-4 text-emerald-600 shrink-0" />
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
