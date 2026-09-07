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
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-[#121212] text-stone-300 z-40 select-none border-r border-stone-800/80 p-4 flex-shrink-0">
      {/* Brand Logo Header */}
      <div className="pb-5 pt-2 px-2 flex items-center justify-between border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-105">
            <Sparkles className="w-4 h-4 text-black fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white group-hover:text-stone-300 transition-colors">
                InterviewAI
              </span>
              <span className="px-1.5 py-0.2 text-[9px] font-semibold bg-white/10 text-stone-300 border border-white/15 rounded">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-stone-400 font-normal leading-none mt-0.5">Workspace</p>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <div className="flex-1 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-stone-500">
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
                "flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-150 group relative",
                isActive
                  ? "bg-white/10 text-white shadow-2xs font-semibold"
                  : "text-stone-400 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <span className="absolute left-1 top-2.5 bottom-2.5 w-1 bg-white rounded-full" />
              )}
              <div className="flex items-center gap-3 pl-1">
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isActive ? "text-white" : "text-stone-400 group-hover:text-stone-200"
                  )}
                />
                <span>{item.name}</span>
              </div>
              {item.badge ? (
                <span className="px-2 py-0.5 text-[9px] font-bold bg-white text-black rounded-full">
                  {item.badge}
                </span>
              ) : (
                <ChevronRight
                  className={cn(
                    "w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-stone-400",
                    isActive && "opacity-100 text-white"
                  )}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* AI Assistant Quick Status Banner */}
      <div className="py-2">
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-semibold text-white">AI Engine Active</span>
          </div>
          <p className="text-[10px] text-stone-400 leading-relaxed font-normal">
            Real-time vocal & video telemetry ready.
          </p>
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-medium text-emerald-400">All systems online</span>
          </div>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="pt-3 border-t border-white/10">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-700 text-white flex items-center justify-center font-bold text-xs">
              {MOCK_USER_PROFILE.name.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-none mb-1">
                {MOCK_USER_PROFILE.name}
              </div>
              <div className="text-[10px] text-stone-400 leading-none font-normal">
                {MOCK_USER_PROFILE.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
