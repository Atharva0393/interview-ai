"use client";

import React from "react";
import { Mic, HelpCircle, FileText } from "lucide-react";
import { MockQuestion } from "./mock-interview-questions";

interface QuestionPanelProps {
  question: MockQuestion;
  isPaused: boolean;
}

export function QuestionPanel({ question, isPaused }: QuestionPanelProps) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e5e3de] shadow-2xs space-y-6 flex flex-col justify-between">
      {/* Question Header & Category Badge */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-violet-50 text-violet-800 border border-violet-200 text-xs font-bold">
              Question {question.number}
            </span>
            <span className="px-3 py-1 rounded-full bg-stone-100 text-slate-700 border border-stone-200 text-xs font-semibold">
              {question.category} • {question.subcategory}
            </span>
          </div>

          <span className="text-[11px] text-slate-400 font-mono">
            ID: {question.id}
          </span>
        </div>

        {/* Main Question Focal Point */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug tracking-tight">
          {question.question}
        </h2>

        {/* Contextual Guidance Tip */}
        <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-700 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-normal">
            <span className="font-bold text-slate-900">Guidance Tip: </span>
            {question.helperText}
          </p>
        </div>
      </div>

      {/* Response Listening Waveform & Live Transcript Preview */}
      <div className="space-y-4 pt-4 border-t border-[#f4f3ef]">
        {/* Listening Status & Animated Waveform */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                {isPaused ? "Capturing Paused" : "Listening to response..."}
              </span>
              <span className="text-[10px] text-slate-500 font-normal">
                {isPaused ? "Interview currently paused" : "Microphone active • Simulated audio stream"}
              </span>
            </div>
          </div>

          {/* Animated Waveform Visualizer Bars */}
          <div className="flex items-end gap-1 h-6 px-3">
            {[45, 75, 30, 90, 60, 100, 40, 80, 50, 65, 35, 85].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-violet-600 rounded-full transition-all duration-300"
                style={{
                  height: !isPaused ? `${h}%` : "15%",
                }}
              />
            ))}
          </div>
        </div>

        {/* Live Response Preview Box */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
              <FileText className="w-3.5 h-3.5 text-violet-600" />
              <span>Live Response Preview</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Simulated Speech-to-Text</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-mono bg-stone-50 p-3 rounded-xl border border-stone-200/80 italic font-normal">
            &ldquo;{question.simulatedTranscript}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
