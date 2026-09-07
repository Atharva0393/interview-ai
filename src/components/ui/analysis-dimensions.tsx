"use client";

import React from "react";
import { Brain, MessageSquare, Mic, Eye, Target, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisDimensionsProps {
  className?: string;
  showSubtitle?: boolean;
}

export function AnalysisDimensions({ className, showSubtitle = true }: AnalysisDimensionsProps) {
  const dimensions = [
    {
      id: "content",
      title: "Response Content",
      subtitle: "Technical depth & problem solving",
      description: "Evaluates accuracy, architectural choices, and structured STAR methodology.",
      icon: Brain,
      color: "violet",
    },
    {
      id: "communication",
      title: "Communication Clarity",
      subtitle: "Articulation & logic",
      description: "Assesses structure, brevity, and trade-off explanations.",
      icon: MessageSquare,
      color: "violet",
    },
    {
      id: "voice",
      title: "Voice & Speech Signals",
      subtitle: "Fluency, pace & tone",
      description: "Tracks speaking pace (WPM), speech pauses, and vocal confidence.",
      icon: Mic,
      color: "emerald",
    },
    {
      id: "nonverbal",
      title: "Non-Verbal Signals",
      subtitle: "Eye contact & posture",
      description: "Monitors camera focal gaze, facial engagement, and posture stability.",
      icon: Eye,
      color: "emerald",
    },
    {
      id: "roadmap",
      title: "Actionable Roadmap",
      subtitle: "Strengths & priorities",
      description: "Synthesizes score cards with concrete recommendations for your next session.",
      icon: Target,
      color: "violet",
    },
  ];

  return (
    <div className={cn("space-y-6", className)}>
      {showSubtitle && (
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-xs font-semibold text-violet-800 shadow-2xs">
            <Cpu className="w-3.5 h-3.5 text-violet-600" />
            <span>Multi-Signal Evaluation Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            5 Core Evaluation Dimensions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
            Every mock session synthesizes technical knowledge and non-verbal telemetry into a holistic performance report.
          </p>
        </div>
      )}

      {/* Grid of 5 Dimensions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {dimensions.map((dim) => {
          const Icon = dim.icon;
          return (
            <div
              key={dim.id}
              className="p-5 rounded-2xl bg-white border border-[#e5e3de] shadow-2xs space-y-3 hover:border-violet-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-700">
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-900 mb-0.5">{dim.title}</h3>
                  <span className="text-[10px] font-mono text-violet-700 font-bold block mb-1.5">
                    {dim.subtitle}
                  </span>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                    {dim.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
