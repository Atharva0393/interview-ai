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
    <div className="lg:hidden sticky top-0 z-50 bg-[#121212] text-white border-b border-white/10 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Brand Header */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center shadow-xs">
            <Sparkles className="w-3.5 h-3.5 fill-current text-black" />
          </div>
          <span className="font-bold text-white text-sm tracking-tight">InterviewAI</span>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <Link
            href="/interview/setup"
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white text-black hover:bg-stone-200 transition-colors shadow-xs"
          >
            Start Mock
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Slide-out Menu Overlay */}
      {isOpen && (
        <div className="mt-3 pt-3 border-t border-white/10 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
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
                    ? "bg-white/10 text-white font-semibold"
                    : "text-stone-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-stone-400")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
