"use client";

import React from "react";
import { FolderOpen, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon = FolderOpen,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-white border border-[#e5e3de] shadow-2xs",
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-slate-500 mb-4">
        <Icon className="w-6 h-6 text-slate-400" />
      </div>
      <h3 className="text-base font-bold text-slate-900 tracking-tight mb-1">{title}</h3>
      <p className="text-xs text-slate-500 max-w-md mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-700 text-white shadow-xs transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:outline-none"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
