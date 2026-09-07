"use client";

import { usePathname } from "next/navigation";
import { Sparkles, Bell, Search, Command } from "lucide-react";
import { MOCK_USER_PROFILE } from "@/lib/mock-data";

const ROUTE_TITLES: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Welcome to InterviewAI", subtitle: "AI-Driven Mock Interview Platform" },
  "/dashboard": { title: "Dashboard Overview", subtitle: "Track your readiness, analytics, and recent sessions" },
  "/resume": { title: "Resume & AI Profile", subtitle: "Upload resume & manage target role skill matching" },
  "/interview/setup": { title: "Start Mock Interview", subtitle: "Configure role, technical stack & interview parameters" },
  "/interview/session": { title: "Live Mock Interview Room", subtitle: "Simulated webcam, audio analysis & dynamic AI questions" },
  "/interview/processing": { title: "Evaluating Session...", subtitle: "Synthesizing vocal delivery, eye contact & response depth" },
  "/results": { title: "Performance Analysis", subtitle: "Detailed breakdown of strengths, scores & improvement areas" },
  "/history": { title: "Interview History", subtitle: "Historical progress trends & previous interview logs" },
  "/settings": { title: "Platform Settings", subtitle: "Customize AI feedback preferences, persona & devices" },
};

export function PageHeader() {
  const pathname = usePathname();
  const meta = ROUTE_TITLES[pathname] || {
    title: "InterviewAI",
    subtitle: "AI-Driven Engineering Interview Prep",
  };

  return (
    <header className="hidden md:flex h-20 px-8 items-center justify-between border-b border-[#1e293b]/80 bg-[#0b0f19]/80 backdrop-blur-md sticky top-0 z-30">
      {/* Page Title & Breadcrumb */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          {meta.title}
        </h1>
        <p className="text-xs text-slate-400 font-medium mt-0.5">{meta.subtitle}</p>
      </div>

      {/* Top Header Utilities */}
      <div className="flex items-center gap-4">
        {/* Search Input Bar Placeholder */}
        <div className="relative w-64 hidden xl:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions, roles..."
            readOnly
            className="w-full bg-[#111827] border border-[#1e293b] rounded-xl pl-9 pr-8 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 cursor-pointer"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] font-mono text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </div>

        {/* AI Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/40 border border-blue-500/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-xs font-semibold text-blue-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-400" />
            AI Ready
          </span>
        </div>

        {/* Notifications Icon */}
        <button
          className="relative p-2 rounded-xl bg-[#111827] border border-[#1e293b] text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500"></span>
        </button>

        {/* User Mini Card */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#1e293b]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-xs font-bold text-white">
            {MOCK_USER_PROFILE.name.charAt(0)}
          </div>
          <span className="text-xs font-semibold text-slate-200 hidden lg:inline-block">
            {MOCK_USER_PROFILE.name}
          </span>
        </div>
      </div>
    </header>
  );
}
