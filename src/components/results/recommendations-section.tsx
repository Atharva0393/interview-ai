"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Layers, FolderGit2, MessageSquare, RotateCcw } from "lucide-react";

export function RecommendationsSection() {
  const recommendations = [
    {
      priority: "Priority 1",
      title: "Practice Structured Answers",
      desc: "Use a consistent structure when answering technical and behavioral questions.",
      icon: Layers,
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    {
      priority: "Priority 2",
      title: "Strengthen Project Storytelling",
      desc: "Prepare clear explanations of the challenges, decisions, and outcomes from your projects.",
      icon: FolderGit2,
      color: "bg-violet-500/20 text-violet-400 border-violet-500/30",
    },
    {
      priority: "Priority 3",
      title: "Practice Technical Explanations",
      desc: "Explain complex concepts aloud using simple, structured language.",
      icon: MessageSquare,
      color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    },
    {
      priority: "Priority 4",
      title: "Run Another Mock Interview",
      desc: "Apply these insights in another simulated interview session and compare your progress.",
      icon: RotateCcw,
      color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      actionText: "Start Session",
      actionHref: "/interview/setup",
    },
  ];

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-xl space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-400 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Personalized AI Growth Roadmap</span>
        </div>
        <h3 className="text-xl font-extrabold text-white tracking-tight">Recommended Next Steps</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Focus on these prioritized areas before your next interview to maximize score improvement.
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          const Icon = rec.icon;
          return (
            <div
              key={rec.priority}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-blue-500/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border shrink-0 ${rec.color}`}>
                  {rec.priority}
                </span>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                    {rec.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{rec.desc}</p>
                </div>
              </div>

              {rec.actionHref && (
                <Link
                  href={rec.actionHref}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  <span>{rec.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
