"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Video, BarChart2, Cpu } from "lucide-react";
import { HowItWorks } from "@/components/ui/how-it-works";
import { AnalysisDimensions } from "@/components/ui/analysis-dimensions";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-slate-900 flex flex-col justify-between p-0 lg:p-4 selection:bg-stone-800 selection:text-white font-sans">
      {/* Soft atmospheric background ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none -z-10" />

      {/* Main Presentation Surface Canvas */}
      <div className="flex-1 max-w-7xl w-full mx-auto bg-[#f5f4f1] lg:rounded-[36px] border-t lg:border border-stone-200/50 shadow-2xl overflow-hidden flex flex-col justify-between my-0 lg:my-2">
        {/* Landing Header Bar */}
        <header className="px-6 lg:px-12 py-5 flex items-center justify-between border-b border-stone-200/80 bg-[#f5f4f1]/90 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 fill-current text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900">InterviewAI</span>
              <span className="ml-2 px-2 py-0.5 text-[10px] font-bold bg-stone-200 text-slate-800 border border-stone-300 rounded-md">
                Workspace
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-black text-white transition-all shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
            >
              Launch Workspace
            </Link>
          </div>
        </header>

        {/* Hero Body */}
        <main className="max-w-6xl mx-auto px-6 py-16 text-center space-y-16 flex-1 flex flex-col justify-center">
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-semibold text-slate-900 mx-auto shadow-2xs">
              <Cpu className="w-4 h-4 text-slate-700" />
              <span>AI-Driven Engineering Interview Simulator</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Practice Realistic Tech Interviews. <br />
              <span className="text-slate-900">Get Actionable AI Feedback.</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
              Simulate engineering mock interviews with vocal evaluation, speech pacing analysis, STAR response structuring, and personalized technical feedback.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs bg-slate-900 hover:bg-black text-white shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
              >
                <span>Enter Dashboard Overview</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/interview/setup"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs bg-white hover:bg-stone-100 text-slate-800 border border-stone-200 transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
              >
                <Video className="w-4 h-4 text-slate-900" />
                <span>Start Quick Session</span>
              </Link>
            </div>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-2">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">01. Resume Context</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Extract core technical skills and map your candidate profile against target job role requirements.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-2">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">02. Live Practice Room</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Webcam video feed preview, vocal pacing waveforms, and dynamic adaptive technical questions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-2">
                <BarChart2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">03. Performance Reports</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Comprehensive performance metrics across communication, eye contact, and technical answer depth.
              </p>
            </div>
          </div>

          {/* Integrated Product Feedback Loop Timeline */}
          <div className="pt-8 border-t border-stone-200">
            <HowItWorks />
          </div>

          {/* Integrated 5 Evaluation Dimensions Showcase */}
          <div className="pt-8 border-t border-stone-200">
            <AnalysisDimensions />
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-8 border-t border-stone-200 text-center text-xs text-slate-500 bg-[#f5f4f1]">
          InterviewAI • AI Driven Mock Interview Platform
        </footer>
      </div>
    </div>
  );
}
