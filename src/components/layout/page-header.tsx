"use client";

import { usePathname } from "next/navigation";
import { Sparkles, Bell, Search, Command } from "lucide-react";
import { MOCK_USER_PROFILE } from "@/lib/mock-data";
import { useToast } from "@/components/ui/toast";

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
  const { showToast } = useToast();
  const meta = ROUTE_TITLES[pathname] || {
    title: "InterviewAI",
    subtitle: "AI-Driven Engineering Interview Prep",
  };

  const handleSearchClick = () => {
    showToast("Global Search", "Press Cmd + K anytime to filter questions & sessions", "info");
  };

  const handleBellClick = () => {
    showToast("Notifications", "You have 2 completed interview reports ready to review", "info");
  };

  return (
    <header className="hidden md:flex h-16 px-8 items-center justify-between border-b border-[#e5e3de] bg-[#f9f8f6]/80 backdrop-blur-md sticky top-0 z-30">
      {/* Page Title & Breadcrumb */}
      <div>
        <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
          {meta.title}
        </h1>
        <p className="text-xs text-slate-500 font-normal mt-0.5">{meta.subtitle}</p>
      </div>

      {/* Top Header Utilities */}
      <div className="flex items-center gap-4">
        {/* Search Input Bar */}
        <div className="relative w-60 hidden xl:block" onClick={handleSearchClick}>
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions, roles..."
            readOnly
            aria-label="Search questions and roles"
            className="w-full bg-white border border-[#e5e3de] rounded-xl pl-9 pr-8 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer shadow-2xs transition-all hover:border-slate-300"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[9px] font-mono text-slate-400 bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200 pointer-events-none">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </div>

        {/* AI Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-600"></span>
          </span>
          <span className="text-xs font-semibold text-violet-800 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-violet-600" />
            AI Ready
          </span>
        </div>

        {/* Notifications Icon */}
        <button
          onClick={handleBellClick}
          className="relative p-2 rounded-xl bg-white border border-[#e5e3de] text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-2xs focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:outline-none cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-600"></span>
        </button>

        {/* User Mini Card */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#e5e3de]">
          <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-xs font-bold text-white shadow-2xs">
            {MOCK_USER_PROFILE.name.charAt(0)}
          </div>
          <span className="text-xs font-bold text-slate-800 hidden lg:inline-block">
            {MOCK_USER_PROFILE.name}
          </span>
        </div>
      </div>
    </header>
  );
}

