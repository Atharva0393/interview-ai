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
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-[#f4f3ef] border-r border-[#e5e3de] z-40 select-none">
      {/* Brand Logo Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-[#e5e3de]">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center shadow-sm text-white group-hover:bg-violet-700 transition-colors">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-slate-900 group-hover:text-violet-700 transition-colors">
                InterviewAI
              </span>
              <span className="px-1.5 py-0.2 text-[9px] font-bold bg-violet-100 text-violet-700 border border-violet-200 rounded">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-none mt-0.5">AI Interview Workspace</p>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <div className="flex-1 py-5 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Navigation
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href) && item.href !== "/dashboard");
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-all duration-150 group relative",
                isActive
                  ? "bg-violet-100/70 text-violet-900 border border-violet-200/80 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-stone-200/50"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-violet-600 rounded-r" />
              )}
              <div className="flex items-center gap-2.5">
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isActive ? "text-violet-700" : "text-slate-400 group-hover:text-slate-600"
                  )}
                />
                <span>{item.name}</span>
              </div>
              {item.badge ? (
                <span className="px-2 py-0.5 text-[9px] font-bold bg-violet-600 text-white rounded-full">
                  {item.badge}
                </span>
              ) : (
                <ChevronRight
                  className={cn(
                    "w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400",
                    isActive && "opacity-100 text-violet-600"
                  )}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* AI Assistant Quick Status Banner */}
      <div className="px-3 py-2.5">
        <div className="p-3 rounded-xl bg-white border border-[#e5e3de] shadow-2xs">
          <div className="flex items-center gap-1.5 mb-1">
            <Zap className="w-3.5 h-3.5 text-violet-600" />
            <span className="text-xs font-bold text-slate-800">AI Engine Ready</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed mb-2">
            Vocal delivery & speech clarity models loaded.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-semibold text-emerald-600">All systems online</span>
          </div>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-[#e5e3de]">
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-stone-200/40 transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center font-bold text-white text-xs shadow-xs">
              {MOCK_USER_PROFILE.name.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 leading-none mb-1">
                {MOCK_USER_PROFILE.name}
              </div>
              <div className="text-[10px] text-slate-500 leading-none font-medium">
                {MOCK_USER_PROFILE.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
