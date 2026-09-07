"use client";

import Link from "next/link";
import {
  Sparkles,
  Play,
  Brain,
  MessageSquare,
  Smile,
  CheckCircle,
  ArrowRight,
  Award,
  Zap,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ProgressCard } from "@/components/dashboard/progress-card";
import { RecentInterviewCard } from "@/components/dashboard/recent-interview-card";
import {
  MOCK_USER_PROFILE,
  MOCK_OVERVIEW_METRICS,
  MOCK_SKILL_PROGRESS,
  MOCK_RECENT_INTERVIEWS,
} from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* Welcome / Hero Banner Section */}
        <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 shadow-2xs">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-white text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 fill-current text-stone-200" />
                <span>AI Interview Readiness Hub</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Good morning, {MOCK_USER_PROFILE.name}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                Ready to sharpen your interview skills today? Your target role compatibility is up{" "}
                <span className="text-emerald-700 font-semibold">+5%</span> since your last session.
              </p>
            </div>

            {/* Primary Action CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link
                href="/interview/setup"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs bg-slate-900 hover:bg-black text-white shadow-xs hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 group cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Mock Interview</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Top 4 KPI Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <MetricCard
            title="Overall Readiness"
            value={`${MOCK_OVERVIEW_METRICS.overallReadiness}%`}
            subtitle="Combined score across technical & non-verbal"
            icon={Brain}
            trend={MOCK_OVERVIEW_METRICS.readinessDelta}
          />
          <MetricCard
            title="Communication"
            value={`${MOCK_OVERVIEW_METRICS.communicationScore}%`}
            subtitle="Articulation clarity & answer structure"
            icon={MessageSquare}
            trend={MOCK_OVERVIEW_METRICS.communicationDelta}
          />
          <MetricCard
            title="Confidence"
            value={`${MOCK_OVERVIEW_METRICS.confidenceScore}%`}
            subtitle="Vocal pace, eye stability & posture"
            icon={Smile}
            trend={MOCK_OVERVIEW_METRICS.confidenceDelta}
          />
          <MetricCard
            title="Interviews Completed"
            value={MOCK_OVERVIEW_METRICS.interviewsCompleted}
            subtitle="Completed mock sessions to date"
            icon={CheckCircle}
            trend={MOCK_OVERVIEW_METRICS.completedDelta}
          />
        </div>

        {/* Main Dashboard Section: Continue Improving & AI Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Continue Improving Progress Bar Component (2 cols) */}
          <div className="lg:col-span-2">
            <ProgressCard items={MOCK_SKILL_PROGRESS} />
          </div>

          {/* AI Focus Recommendation Panel (1 col) */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl bg-slate-900 text-white">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">AI Coach Recommendation</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Based on your last <span className="text-slate-900 font-bold">Frontend Developer</span> mock session, your technical explanations are strong, but eye contact dropped during STAR response transitions.
              </p>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>Target Improvement</span>
                  <span className="text-emerald-700">Eye Contact +12%</span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                  Maintain gaze directly at webcam focal point when delivering your situation summary.
                </p>
              </div>
            </div>

            <Link
              href="/resume"
              className="mt-6 flex items-center justify-between px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200/60 text-xs font-bold text-slate-800 hover:text-black border border-stone-200 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
            >
              <span>Review Resume Target Roles</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-900" />
            </Link>
          </div>
        </div>

        {/* Recent Interviews Grid Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Award className="w-5 h-5 text-slate-900" />
                Recent Interviews
              </h2>
              <p className="text-xs text-slate-500 font-normal">Review detailed AI feedback and transcripts</p>
            </div>
            <Link
              href="/history"
              className="text-xs font-bold text-slate-900 hover:text-black flex items-center gap-1 transition-colors"
            >
              <span>View All History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_RECENT_INTERVIEWS.map((interview) => (
              <RecentInterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
