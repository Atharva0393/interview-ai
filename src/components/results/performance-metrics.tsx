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
    },
    {
      title: "Communication",
      score: 84,
      insight: "Clear explanations with good response structure.",
      icon: MessageSquare,
    },
    {
      title: "Confidence",
      score: 81,
      insight: "Generally confident, with room for stronger delivery.",
      icon: Smile,
    },
    {
      title: "Response Relevance",
      score: 87,
      insight: "Responses remained focused and relevant.",
      icon: CheckCircle,
    },
    {
      title: "Speech Fluency",
      score: 84,
      insight: "Consistent pace with minimal hesitation.",
      icon: Activity,
    },
    {
      title: "Problem Solving",
      score: 82,
      insight: "Good approach to breaking down technical challenges.",
      icon: Brain,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
        Detailed Performance Breakdown
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricCards.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-5 rounded-2xl bg-white border border-stone-200/80 hover:border-slate-400 transition-all duration-200 space-y-3 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{item.title}</span>
                <div className="p-2 rounded-xl bg-slate-900 text-white">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-extrabold text-slate-900">{item.score}%</div>
                <span className="text-[10px] font-semibold text-slate-400">Benchmark: 80%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
                <div
                  className="h-full rounded-full bg-slate-900 transition-all duration-500"
                  style={{ width: `${item.score}%` }}
                />
              </div>

              <p className="text-xs text-slate-500 leading-relaxed italic font-normal">
                &ldquo;{item.insight}&rdquo;
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
