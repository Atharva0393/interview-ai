"use client";

import React from "react";
import { Sparkles, Flag, Award, TrendingUp, CheckCircle2 } from "lucide-react";

export function MilestoneTimeline() {
  const milestones = [
    {
      session: "Interview #1",
      date: "Aug 12",
      title: "Started Practice",
      desc: "Baseline technical session established.",
      score: "77%",
      icon: Flag,
    },
    {
      session: "Interview #3",
      date: "Aug 24",
      title: "Communication Improved",
      desc: "STAR answer structure adopted.",
      score: "78%",
      icon: TrendingUp,
    },
    {
      session: "Interview #5",
      date: "Sep 02",
      title: "Best Performance",
      desc: "Advanced Web Performance mastery.",
      score: "88%",
      icon: Award,
    },
    {
      session: "Interview #6",
      date: "Sep 05",
      title: "Latest Session",
      desc: "React 19 & RSC architecture depth.",
      score: "84%",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e5e3de] shadow-2xs space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-xs font-semibold text-violet-800 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-violet-600" />
          <span>Growth Milestones</span>
        </div>
        <h3 className="text-base font-bold text-slate-900">Your Interview Journey</h3>
        <p className="text-xs text-slate-500 font-normal">Key milestones achieved across your practice timeline</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {milestones.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.session}
              className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {m.session} • {m.date}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold border bg-violet-50 text-violet-800 border-violet-100">
                  {m.score}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Icon className="w-4 h-4 text-violet-600 shrink-0" />
                <span>{m.title}</span>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">{m.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
