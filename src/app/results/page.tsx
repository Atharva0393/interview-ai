"use client";

import Link from "next/link";
import {
  Award,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  History,
  Brain,
  MessageSquare,
  Smile,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";

export default function ResultsPage() {
  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* Top Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/60 via-[#111827] to-violet-950/50 border border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Evaluation Complete • Grade: Strong Hire</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Senior Frontend Developer Interview Report
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Completed on Sep 05, 2026 • Duration 25 Minutes • 5 Technical Questions
            </p>
          </div>

          {/* Big Score Pill */}
          <div className="flex items-center gap-4 bg-slate-900/90 border border-slate-700/80 px-6 py-4 rounded-2xl shrink-0">
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Overall Score</div>
              <div className="text-3xl font-extrabold text-white">82 / 100</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center font-extrabold text-white text-lg shadow-lg">
              82
            </div>
          </div>
        </div>

        {/* 4 Score Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-[#111827]/80 border border-[#1e293b]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Technical Depth</span>
              <Brain className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">85%</div>
            <p className="text-[11px] text-slate-400 mt-1">Deep RSC & hydration architecture grasp</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#111827]/80 border border-[#1e293b]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Communication</span>
              <MessageSquare className="w-4 h-4 text-violet-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">82%</div>
            <p className="text-[11px] text-slate-400 mt-1">Structured articulation & clear terms</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#111827]/80 border border-[#1e293b]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Confidence</span>
              <Smile className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">74%</div>
            <p className="text-[11px] text-slate-400 mt-1">Vocal pace 138wpm; minor eye gaze drift</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#111827]/80 border border-[#1e293b]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">STAR Compliance</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">80%</div>
            <p className="text-[11px] text-slate-400 mt-1">Good action points; clarify metrics</p>
          </div>
        </div>

        {/* Strengths & Improvements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Identified Strengths */}
          <div className="p-6 rounded-2xl bg-[#111827]/80 border border-[#1e293b] space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Verified Key Strengths
            </h3>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-white block mb-0.5">Exceptional RSC Explanation</span>
                Correctly identified zero-bundle-size server boundaries and data waterfall reductions.
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-white block mb-0.5">Steady Vocal Delivery</span>
                Maintained consistent cadence without long hesitation pauses during technical questions.
              </div>
            </div>
          </div>

          {/* Areas for Growth */}
          <div className="p-6 rounded-2xl bg-[#111827]/80 border border-[#1e293b] space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Target Improvement Focus
            </h3>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-white block mb-0.5">Quantified STAR Impact</span>
                Include specific metrics (e.g., % latency reduction or page load speedup) in behavioral summaries.
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-white block mb-0.5">Webcam Alignment</span>
                Eye contact dropped to 68% during complex architecture trade-off explanations.
              </div>
            </div>
          </div>
        </div>

        {/* Question by Question Feedback Log */}
        <div className="p-6 rounded-2xl bg-[#111827]/80 border border-[#1e293b] space-y-4">
          <h3 className="text-base font-bold text-white">Question Response Breakdown</h3>
          <div className="space-y-3">
            {[
              {
                q: "1. Explain React Server Components (RSC) vs Client-side Rendering (CSR)",
                score: "88/100",
                feedback: "Thorough explanation of server boundaries and bundle size savings.",
              },
              {
                q: "2. How do you optimize Next.js LCP and INP Core Web Vitals?",
                score: "82/100",
                feedback: "Good coverage of image preloading and long-task decomposition.",
              },
              {
                q: "3. Tell me about a time you resolved an architectural conflict with backend engineers.",
                score: "76/100",
                feedback: "Good situation narrative; add more quantified resolution metrics.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="text-xs font-bold text-white mb-1">{item.q}</div>
                  <p className="text-[11px] text-slate-400">{item.feedback}</p>
                </div>
                <span className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold shrink-0">
                  {item.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1e293b]">
          <Link
            href="/history"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <History className="w-4 h-4" />
            <span>View All Previous Sessions in History</span>
          </Link>

          <Link
            href="/interview/setup"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start Another Practice Session</span>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
