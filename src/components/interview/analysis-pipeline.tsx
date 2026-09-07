"use client";

import React from "react";
import { CheckCircle2, Loader2, Circle } from "lucide-react";

export interface PipelineStage {
  id: number;
  title: string;
  desc: string;
}

export const PROCESSING_STAGES: PipelineStage[] = [
  {
    id: 1,
    title: "1. Processing Interview Responses",
    desc: "Evaluating response relevance and answer structure",
  },
  {
    id: 2,
    title: "2. Analyzing Communication",
    desc: "Reviewing clarity, confidence, and fluency patterns",
  },
  {
    id: 3,
    title: "3. Evaluating Voice Signals",
    desc: "Processing simulated pace, tone, and speech consistency metrics",
  },
  {
    id: 4,
    title: "4. Analyzing Non-Verbal Signals",
    desc: "Processing simulated eye contact, engagement, and posture indicators",
  },
  {
    id: 5,
    title: "5. Generating Personalized Feedback",
    desc: "Combining interview signals into actionable insights",
  },
];

interface AnalysisPipelineProps {
  currentStageId: number;
}

export function AnalysisPipeline({ currentStageId }: AnalysisPipelineProps) {
  return (
    <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-xl space-y-4">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
        AI Evaluation Pipeline
      </h3>

      <div className="space-y-3">
        {PROCESSING_STAGES.map((stage) => {
          const isCompleted = stage.id < currentStageId;
          const isCurrent = stage.id === currentStageId;

          return (
            <div
              key={stage.id}
              className={`p-3.5 rounded-xl border transition-all duration-300 flex items-start gap-3.5 ${
                isCurrent
                  ? "bg-blue-600/10 border-blue-500/40 shadow-md shadow-blue-500/10"
                  : isCompleted
                  ? "bg-slate-900/60 border-slate-800"
                  : "bg-slate-950/40 border-slate-900 opacity-60"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-600" />
                )}
              </div>

              <div className="space-y-0.5">
                <div
                  className={`text-xs font-bold ${
                    isCurrent
                      ? "text-white"
                      : isCompleted
                      ? "text-slate-200"
                      : "text-slate-500"
                  }`}
                >
                  {stage.title}
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">{stage.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
