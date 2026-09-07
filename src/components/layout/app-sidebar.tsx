"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  FileText,
  BarChart3,
  History,
  Settings,
  Sparkles,
  Zap,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_USER_PROFILE } from "@/lib/mock-data";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Start Interview", href: "/interview/setup", icon: Video, badge: "New" },
  { name: "Resume & Profile", href: "/resume", icon: FileText },
  { name: "Performance", href: "/results", icon: BarChart3 },
  { name: "Interview History", href: "/history", icon: History },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-[#0d121f]/90 backdrop-blur-xl border-r border-[#1e293b] z-40 select-none">
      {/* Brand / Logo Area */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-[#1e293b]/70">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/35 transition-all duration-300">
            <Sparkles className="w-5 h-5 text-white animate-pulse-glow" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-blue-400 transition-colors">
                InterviewAI
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-gradient-to-r from-blue-500/20 to-violet-500/20 border border-blue-500/30 text-blue-400 rounded-md">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">AI Mock Interview Platform</p>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Navigation
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href) && item.href !== "/dashboard");
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative",
                isActive
                  ? "bg-gradient-to-r from-blue-600/20 to-violet-600/10 text-white border border-blue-500/30 shadow-md shadow-blue-500/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 hover:border hover:border-slate-700/40"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-blue-500 to-violet-500 rounded-r-full shadow-sm shadow-blue-500" />
              )}
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isActive ? "text-blue-400" : "text-slate-400 group-hover:text-slate-200"
                  )}
                />
                <span>{item.name}</span>
              </div>
              {item.badge ? (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full">
                  {item.badge}
                </span>
              ) : (
                <ChevronRight
                  className={cn(
                    "w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400",
                    isActive && "opacity-100 text-blue-400"
                  )}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* AI Assistant Quick Status Banner */}
      <div className="px-4 py-3">
        <div className="p-3 rounded-xl bg-gradient-to-r from-blue-950/40 to-violet-950/40 border border-blue-500/20">
          <div className="flex items-center gap-2 mb-1.5">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold text-white">AI Engine v2.4 Active</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
            Real-time vocal & clarity analytics ready for next session.
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-medium text-emerald-400">All systems online</span>
          </div>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-[#1e293b]">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/40 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center font-bold text-white text-sm shadow-md">
              {MOCK_USER_PROFILE.name.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-semibold text-white leading-none mb-1">
                {MOCK_USER_PROFILE.name}
              </div>
              <div className="text-[11px] text-slate-400 leading-none">
                {MOCK_USER_PROFILE.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
