"use client";

import React from "react";
import { Mic, Sparkles, HelpCircle, FileText, CheckCircle2 } from "lucide-react";
import { MockQuestion } from "./mock-interview-questions";

interface QuestionPanelProps {
  question: MockQuestion;
  isPaused: boolean;
}

export function QuestionPanel({ question, isPaused }: QuestionPanelProps) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#111827]/90 backdrop-blur-md border border-[#1e293b] shadow-2xl space-y-6 flex flex-col justify-between">
      {/* Question Header & Category Badge */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold">
              Question {question.number}
            </span>
            <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 text-xs font-semibold">
              {question.category} • {question.subcategory}
            </span>
          </div>

          <span className="text-[11px] text-slate-500 font-mono">
            ID: {question.id}
          </span>
        </div>

        {/* Main Question Focal Point */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug tracking-tight">
          {question.question}
        </h2>

        {/* Contextual Guidance Tip */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-semibold text-white">Guidance Tip: </span>
            {question.helperText}
          </p>
        </div>
      </div>

      {/* Response Listening Waveform & Live Transcript Preview */}
      <div className="space-y-4 pt-4 border-t border-[#1e293b]">
        {/* Listening Status & Animated Waveform */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {isPaused ? "Capturing Paused" : "Listening to response..."}
              </span>
              <span className="text-[10px] text-slate-400">
                {isPaused ? "Interview currently paused" : "Microphone active • Simulated audio stream"}
              </span>
            </div>
          </div>

          {/* Animated Waveform Visualizer Bars */}
          <div className="flex items-end gap-1 h-6 px-3">
            {[45, 75, 30, 90, 60, 100, 40, 80, 50, 65, 35, 85].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-blue-500 to-violet-400 rounded-full transition-all duration-300"
                style={{
                  height: !isPaused ? `${h}%` : "15%",
                }}
              />
            ))}
          </div>
        </div>

        {/* Live Response Preview Box */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Live Response Preview</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Simulated Speech-to-Text</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 italic">
            &ldquo;{question.simulatedTranscript}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
