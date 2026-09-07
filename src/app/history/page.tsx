"use client";

import { useState } from "react";
import Link from "next/link";
import {
  History,
  TrendingUp,
  Calendar,
  Clock,
  ArrowUpRight,
  Filter,
  Search,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { AppShell } from "@/components/layout/app-shell";
import { MOCK_PERFORMANCE_TRENDS, MOCK_RECENT_INTERVIEWS } from "@/lib/mock-data";

export default function HistoryPage() {
  const [selectedTag, setSelectedTag] = useState("All");

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Session Analytics & Performance Progression</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Interview History & Trends</h1>
            <p className="text-xs text-slate-400">
              Track your score trajectory across mock interviews and review previous AI evaluations.
            </p>
          </div>
        </div>

        {/* Recharts Analytics Chart Card */}
        <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Readiness Score Trajectory
              </h2>
              <p className="text-xs text-slate-400">Past 6 mock interview sessions progression</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5 text-blue-400">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Overall Score</span>
              </div>
              <div className="flex items-center gap-1.5 text-violet-400">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                <span>Technical</span>
              </div>
            </div>
          </div>

          {/* Recharts Area Chart Container */}
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_PERFORMANCE_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTechnical" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="session" stroke="#64748b" fontSize={11} />
                <YAxis domain={[50, 100]} stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0b0f19",
                    borderColor: "#1e293b",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="overall"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorOverall)"
                />
                <Area
                  type="monotone"
                  dataKey="technical"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTechnical)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* History Sessions List */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <History className="w-5 h-5 text-blue-400" />
              Past Mock Interview Logs
            </h2>

            {/* Filter Tags */}
            <div className="flex items-center gap-2 text-xs">
              {["All", "React 19", "System Design", "Data Metrics"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    selectedTag === tag
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {MOCK_RECENT_INTERVIEWS.map((session) => (
              <div
                key={session.id}
                className="p-5 rounded-2xl bg-[#111827]/80 border border-[#1e293b] hover:border-blue-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {session.role}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {session.date}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                    {session.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                    {session.feedbackSummary}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Score</div>
                    <div className="text-xl font-extrabold text-white">{session.score} / 100</div>
                  </div>

                  <Link
                    href="/results"
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-700 hover:border-blue-500 transition-all"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
