"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  Video,
  FileText,
  BarChart3,
  History,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOBILE_NAV_ITEMS = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Start Interview", href: "/interview/setup", icon: Video },
  { name: "Resume & Profile", href: "/resume", icon: FileText },
  { name: "Performance", href: "/results", icon: BarChart3 },
  { name: "Interview History", href: "/history", icon: History },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden sticky top-0 z-50 bg-[#f9f8f6]/95 backdrop-blur-md border-b border-[#e5e3de] px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Brand Header */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center shadow-xs text-white">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-slate-900 text-sm tracking-tight">InterviewAI</span>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <Link
            href="/interview/setup"
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors shadow-xs"
          >
            Start Mock
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-stone-200/60 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Slide-out Menu Overlay */}
      {isOpen && (
        <div className="mt-3 pt-3 border-t border-[#e5e3de] space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {MOBILE_NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href) && item.href !== "/dashboard");
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                  isActive
                    ? "bg-violet-100 text-violet-900 border border-violet-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-stone-100"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-violet-700" : "text-slate-400")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
