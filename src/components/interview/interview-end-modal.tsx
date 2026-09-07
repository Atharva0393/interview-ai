"use client";

import React from "react";
import { AlertCircle, LogOut, X } from "lucide-react";

interface InterviewEndModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function InterviewEndModal({
  isOpen,
  onClose,
  onConfirm,
}: InterviewEndModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-white border border-[#e5e3de] text-center space-y-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-slate-900">End this interview?</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            Your current interview session will be completed and your performance report will be generated.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-white hover:bg-stone-50 text-slate-700 text-xs font-bold border border-stone-200 transition-colors cursor-pointer shadow-2xs"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>End Interview</span>
          </button>
        </div>
      </div>
    </div>
  );
}
