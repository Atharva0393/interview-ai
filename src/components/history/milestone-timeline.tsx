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
      color: "border-slate-700 bg-slate-800 text-slate-300",
    },
    {
      session: "Interview #3",
      date: "Aug 24",
      title: "Communication Improved",
      desc: "STAR answer structure adopted.",
      score: "78%",
      icon: TrendingUp,
      color: "border-blue-500/40 bg-blue-500/10 text-blue-400",
    },
    {
      session: "Interview #5",
      date: "Sep 02",
      title: "Best Performance",
      desc: "Advanced Web Performance mastery.",
      score: "88%",
      icon: Award,
      color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
    },
    {
      session: "Interview #6",
      date: "Sep 05",
      title: "Latest Session",
      desc: "React 19 & RSC architecture depth.",
      score: "84%",
      icon: CheckCircle2,
      color: "border-violet-500/40 bg-violet-500/10 text-violet-300",
    },
  ];

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-xl space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-400 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Growth Milestones</span>
        </div>
        <h3 className="text-base font-bold text-white">Your Interview Journey</h3>
        <p className="text-xs text-slate-400">Key milestones achieved across your practice timeline</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {milestones.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={m.session}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {m.session} • {m.date}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${m.color}`}>
                  {m.score}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Icon className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{m.title}</span>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">{m.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
