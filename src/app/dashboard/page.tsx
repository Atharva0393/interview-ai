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
  TrendingUp,
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
        <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/60 via-[#111827] to-violet-950/40 border border-blue-500/20 shadow-2xl">
          {/* Subtle glow accent background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Interview Readiness Hub</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Good morning, {MOCK_USER_PROFILE.name}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                Ready to sharpen your interview skills today? Your target role compatibility is up{" "}
                <span className="text-emerald-400 font-semibold">+5%</span> since your last session.
              </p>
            </div>

            {/* Primary Action CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link
                href="/interview/setup"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                <span>Start Mock Interview</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
            accentColor="blue"
            trend={MOCK_OVERVIEW_METRICS.readinessDelta}
          />
          <MetricCard
            title="Communication"
            value={`${MOCK_OVERVIEW_METRICS.communicationScore}%`}
            subtitle="Articulation clarity & answer structure"
            icon={MessageSquare}
            accentColor="violet"
            trend={MOCK_OVERVIEW_METRICS.communicationDelta}
          />
          <MetricCard
            title="Confidence"
            value={`${MOCK_OVERVIEW_METRICS.confidenceScore}%`}
            subtitle="Vocal pace, eye stability & posture"
            icon={Smile}
            accentColor="cyan"
            trend={MOCK_OVERVIEW_METRICS.confidenceDelta}
          />
          <MetricCard
            title="Interviews Completed"
            value={MOCK_OVERVIEW_METRICS.interviewsCompleted}
            subtitle="Completed mock sessions to date"
            icon={CheckCircle}
            accentColor="emerald"
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
          <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">AI Coach Recommendation</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Based on your last <span className="text-blue-400 font-semibold">Senior React Developer</span> mock session, your technical explanations are strong, but eye contact dropped during STAR response transitions.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-white">
                  <span>Target Improvement</span>
                  <span className="text-blue-400">Eye Contact +12%</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Maintain gaze directly at webcam focal point when delivering your situation summary.
                </p>
              </div>
            </div>

            <Link
              href="/resume"
              className="mt-6 flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white border border-slate-700/60 transition-colors"
            >
              <span>Review Resume Target Roles</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
            </Link>
          </div>
        </div>

        {/* Recent Interviews Grid Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-400" />
                Recent Interviews
              </h2>
              <p className="text-xs text-slate-400">Review detailed AI feedback and transcripts</p>
            </div>
            <Link
              href="/history"
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
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
