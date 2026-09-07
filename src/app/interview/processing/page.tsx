"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, CheckCircle2, Loader2, Cpu, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";

export default function InterviewProcessingPage() {
  const router = useRouter();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const timer1 = setTimeout(() => setCompletedSteps([0]), 800);
    const timer2 = setTimeout(() => setCompletedSteps([0, 1]), 1800);
    const timer3 = setTimeout(() => setCompletedSteps([0, 1, 2]), 2800);
    const timer4 = setTimeout(() => {
      setCompletedSteps([0, 1, 2, 3]);
      setTimeout(() => router.push("/results"), 1200);
    }, 3800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [router]);

  const steps = [
    "Transcribing vocal audio & response clarity...",
    "Evaluating STAR response structure & technical accuracy...",
    "Analyzing non-verbal eye gaze and posture metrics...",
    "Synthesizing personalized feedback and readiness score...",
  ];

  return (
    <AppShell>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center max-w-xl mx-auto space-y-8 animate-in fade-in duration-300">
        {/* Animated Processing Glow Orb */}
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 p-0.5 shadow-2xl shadow-blue-500/30 animate-pulse">
            <div className="w-full h-full rounded-[22px] bg-[#0b0f19] flex items-center justify-center">
              <Cpu className="w-10 h-10 text-blue-400 animate-bounce" />
            </div>
          </div>
          <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500 to-violet-500 rounded-full blur-2xl opacity-20 pointer-events-none" />
        </div>

        {/* Header Text */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Evaluation Engine in Progress</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Evaluating Your Interview Session
          </h1>
          <p className="text-xs text-slate-400">
            Please wait while our multimodal AI models analyze your vocal delivery, technical depth, and non-verbal signals.
          </p>
        </div>

        {/* Processing Steps Checklist */}
        <div className="w-full p-6 rounded-2xl bg-[#111827]/90 border border-[#1e293b] text-left space-y-4 shadow-xl">
          {steps.map((step, idx) => {
            const isDone = completedSteps.includes(idx);
            const isCurrent = completedSteps.length === idx;

            return (
              <div key={idx} className="flex items-center gap-3 text-xs font-medium">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                )}
                <span className={isDone ? "text-slate-200" : isCurrent ? "text-white font-bold" : "text-slate-500"}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* Manual Skip CTA */}
        <button
          onClick={() => router.push("/results")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
        >
          <span>Skip waiting and view report</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </AppShell>
  );
}
