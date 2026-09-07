"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Video, BarChart2, Cpu } from "lucide-react";
import { HowItWorks } from "@/components/ui/how-it-works";
import { AnalysisDimensions } from "@/components/ui/analysis-dimensions";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f9f8f6] text-slate-900 flex flex-col justify-between selection:bg-violet-100 selection:text-violet-900">
      {/* Subtle ambient light warmth */}
      <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-violet-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-stone-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Landing Header Bar */}
      <header className="px-6 lg:px-16 py-5 flex items-center justify-between border-b border-[#e5e3de] bg-[#f9f8f6]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900">InterviewAI</span>
            <span className="ml-2 px-2 py-0.5 text-[10px] font-bold bg-violet-100 text-violet-700 border border-violet-200 rounded-md">
              Workspace
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-700 text-white transition-all shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:outline-none"
          >
            Launch Workspace
          </Link>
        </div>
      </header>

      {/* Hero Body */}
      <main className="max-w-6xl mx-auto px-6 py-16 text-center space-y-16 flex-1 flex flex-col justify-center">
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e5e3de] text-xs font-semibold text-violet-800 mx-auto shadow-2xs">
            <Cpu className="w-4 h-4 text-violet-600" />
            <span>AI-Driven Engineering Interview Simulator</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Practice Realistic Tech Interviews. <br />
            <span className="text-gradient-violet">Get Actionable AI Feedback.</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Simulate engineering mock interviews with vocal evaluation, speech pacing analysis, STAR response structuring, and personalized technical feedback.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs bg-violet-600 hover:bg-violet-700 text-white shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:outline-none"
            >
              <span>Enter Dashboard Overview</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/interview/setup"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs bg-white hover:bg-stone-50 text-slate-700 border border-[#e5e3de] transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:outline-none"
            >
              <Video className="w-4 h-4 text-violet-600" />
              <span>Start Quick Session</span>
            </Link>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-2xl bg-white border border-[#e5e3de] shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 mb-2">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">01. Resume Context</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Extract core technical skills and map your candidate profile against target job role requirements.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#e5e3de] shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 mb-2">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">02. Live Practice Room</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Webcam video feed preview, vocal pacing waveforms, and dynamic adaptive technical questions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#e5e3de] shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 mb-2">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">03. Performance Reports</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Comprehensive performance metrics across communication, eye contact, and technical answer depth.
            </p>
          </div>
        </div>

        {/* Integrated Product Feedback Loop Timeline */}
        <div className="pt-8 border-t border-[#e5e3de]">
          <HowItWorks />
        </div>

        {/* Integrated 5 Evaluation Dimensions Showcase */}
        <div className="pt-8 border-t border-[#e5e3de]">
          <AnalysisDimensions />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-8 border-t border-[#e5e3de] text-center text-xs text-slate-500">
        InterviewAI • AI Driven Mock Interview Platform
      </footer>
    </div>
  );
}

