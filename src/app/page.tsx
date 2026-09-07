"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Video, BarChart2, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white bg-grid-pattern relative flex flex-col justify-between">
      {/* Glow Orbs */}
      <div className="fixed top-0 left-1/3 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Landing Header Bar */}
      <header className="px-6 lg:px-16 py-6 flex items-center justify-between border-b border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-white">InterviewAI</span>
            <span className="ml-2 px-2 py-0.5 text-[10px] font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
              SaaS Platform
            </span>
          </div>
        </div>

        <Link
          href="/dashboard"
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-500/20 hover:scale-[1.02]"
        >
          Launch Platform
        </Link>
      </header>

      {/* Hero Body */}
      <main className="max-w-5xl mx-auto px-6 py-16 text-center space-y-8 flex-1 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/30 text-xs font-semibold text-blue-300 mx-auto">
          <Cpu className="w-4 h-4 text-violet-400" />
          <span>Next-Generation AI Engineering Interview Simulator</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Master Tech Interviews with <br />
          <span className="text-gradient-primary">Real-Time AI Coaching</span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
          Simulate high-stakes engineering interviews with AI vocal evaluation, speech pacing analysis, STAR response structuring, and personalized technical feedback.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white shadow-xl shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <span>Enter Dashboard Overview</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/interview/setup"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 transition-colors flex items-center justify-center gap-2"
          >
            <Video className="w-4 h-4 text-blue-400" />
            <span>Start Quick Session</span>
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 text-left">
          <div className="p-6 rounded-2xl bg-[#111827]/80 border border-[#1e293b]">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">AI Resume Parsing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Extract key skills and map candidate profile against target job role requirements.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111827]/80 border border-[#1e293b]">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-4">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Simulated Mock Room</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time video feed preview, vocal pacing waveforms, and adaptive technical questions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111827]/80 border border-[#1e293b]">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Deep Analytics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detailed performance metrics across communication, eye contact, and answer depth.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-8 border-t border-slate-800 text-center text-xs text-slate-500">
        InterviewAI • AI Driven Mock Interview Platform • Final Year Engineering Project
      </footer>
    </div>
  );
}
