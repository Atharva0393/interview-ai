"use client";

import Link from "next/link";
import { Sparkles, BarChart2, Cpu, Video } from "lucide-react";
import { HowItWorks } from "@/components/ui/how-it-works";
import { AnalysisDimensions } from "@/components/ui/analysis-dimensions";
import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { GlowCard } from "@/components/ui/spotlight-card";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-[#f5f4f1] text-slate-900 flex flex-col justify-between selection:bg-stone-800 selection:text-white font-sans">
      {/* Landing Header Bar */}
      <header className="w-full px-6 md:px-10 lg:px-16 py-5 flex items-center justify-between border-b border-stone-200/80 bg-[#f5f4f1]/90 backdrop-blur-md sticky top-0 z-50">
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
          <ArrowFillButton
            btnText="Launch Workspace"
            href="/dashboard"
            bgColor="#111111"
            textColor="#ffffff"
            fillBgColor="#ffffff"
            fillTextColor="#111111"
          />
        </div>
      </header>

      {/* Hero Body */}
      <main className="w-full flex-1 flex flex-col justify-center px-6 md:px-10 lg:px-16 py-12 md:py-16 space-y-16">
        <div className="space-y-6 max-w-4xl mx-auto text-center">
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
            <ArrowFillButton
              btnText="Enter Dashboard Overview"
              href="/dashboard"
              bgColor="#111111"
              textColor="#ffffff"
              fillBgColor="#ffffff"
              fillTextColor="#111111"
            />
            <ArrowFillButton
              btnText="Start Quick Session"
              href="/interview/setup"
              bgColor="#ffffff"
              textColor="#111111"
              fillBgColor="#111111"
              fillTextColor="#ffffff"
            />
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <GlowCard customSize className="w-full h-full min-h-[200px]" glowColor="blue">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-2">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">01. Resume Context</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Extract core technical skills and map your candidate profile against target job role requirements.
              </p>
            </div>
          </GlowCard>

          <GlowCard customSize className="w-full h-full min-h-[200px]" glowColor="purple">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-2">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">02. Live Practice Room</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Webcam video feed preview, vocal pacing waveforms, and dynamic adaptive technical questions.
              </p>
            </div>
          </GlowCard>

          <GlowCard customSize className="w-full h-full min-h-[200px]" glowColor="green">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-2">
                <BarChart2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">03. Performance Reports</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Comprehensive performance metrics across communication, eye contact, and technical answer depth.
              </p>
            </div>
          </GlowCard>
        </div>

        {/* Integrated Product Feedback Loop Timeline */}
        <div className="max-w-6xl mx-auto w-full pt-8 border-t border-stone-200">
          <HowItWorks />
        </div>

        {/* Integrated 5 Evaluation Dimensions Showcase */}
        <div className="max-w-6xl mx-auto w-full pt-8 border-t border-stone-200">
          <AnalysisDimensions />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-6 md:px-10 lg:px-16 border-t border-stone-200 text-center text-xs text-slate-500 bg-[#f5f4f1]">
        InterviewAI • AI Driven Mock Interview Platform
      </footer>
    </div>
  );
}
