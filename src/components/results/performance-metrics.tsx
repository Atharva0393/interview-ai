"use client";

import React from "react";
import { Code, MessageSquare, Smile, CheckCircle, Activity, Brain } from "lucide-react";

export function PerformanceMetrics() {
  const metricCards = [
    {
      title: "Technical Knowledge",
      score: 88,
      insight: "Strong understanding of core frontend concepts.",
      icon: Code,
      color: "text-blue-400 border-blue-500/20 bg-blue-500/10",
      bar: "bg-blue-500",
    },
    {
      title: "Communication",
      score: 84,
      insight: "Clear explanations with good response structure.",
      icon: MessageSquare,
      color: "text-violet-400 border-violet-500/20 bg-violet-500/10",
      bar: "bg-violet-500",
    },
    {
      title: "Confidence",
      score: 81,
      insight: "Generally confident, with room for stronger delivery.",
      icon: Smile,
      color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
      bar: "bg-emerald-500",
    },
    {
      title: "Response Relevance",
      score: 87,
      insight: "Responses remained focused and relevant.",
      icon: CheckCircle,
      color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
      bar: "bg-cyan-500",
    },
    {
      title: "Speech Fluency",
      score: 84,
      insight: "Consistent pace with minimal hesitation.",
      icon: Activity,
      color: "text-amber-400 border-amber-500/20 bg-amber-500/10",
      bar: "bg-amber-500",
    },
    {
      title: "Problem Solving",
      score: 82,
      insight: "Good approach to breaking down technical challenges.",
      icon: Brain,
      color: "text-indigo-400 border-indigo-500/20 bg-indigo-500/10",
      bar: "bg-indigo-500",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
        Detailed Performance Breakdown
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricCards.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-5 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] hover:border-blue-500/30 transition-all duration-200 space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{item.title}</span>
                <div className={`p-2 rounded-xl border ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-extrabold text-white">{item.score}%</div>
                <span className="text-[10px] font-semibold text-slate-400">Benchmark: 80%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${item.bar}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>

              <p className="text-xs text-slate-400 leading-relaxed italic">
                &ldquo;{item.insight}&rdquo;
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
