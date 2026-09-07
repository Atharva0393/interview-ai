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
    },
    {
      priority: "Priority 2",
      title: "Strengthen Project Storytelling",
      desc: "Prepare clear explanations of the challenges, decisions, and outcomes from your projects.",
      icon: FolderGit2,
    },
    {
      priority: "Priority 3",
      title: "Practice Technical Explanations",
      desc: "Explain complex concepts aloud using simple, structured language.",
      icon: MessageSquare,
    },
    {
      priority: "Priority 4",
      title: "Run Another Mock Interview",
      desc: "Apply these insights in another simulated interview session and compare your progress.",
      icon: RotateCcw,
      actionText: "Start Session",
      actionHref: "/interview/setup",
    },
  ];

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 shadow-2xs space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 fill-current text-stone-200" />
          <span>Personalized AI Growth Roadmap</span>
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Recommended Next Steps</h3>
        <p className="text-xs text-slate-500 font-normal mt-0.5">
          Focus on these prioritized areas before your next interview to maximize score improvement.
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          const Icon = rec.icon;
          return (
            <div
              key={rec.priority}
              className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-slate-400 transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold border shrink-0 bg-stone-900 text-white border-slate-900">
                  {rec.priority}
                </span>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-black transition-colors flex items-center gap-2">
                    <Icon className="w-4 h-4 text-slate-900 shrink-0" />
                    {rec.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal max-w-2xl">{rec.desc}</p>
                </div>
              </div>

              {rec.actionHref && (
                <Link
                  href={rec.actionHref}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
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
