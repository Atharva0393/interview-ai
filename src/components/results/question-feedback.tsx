"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, MessageSquare, Award, AlertCircle, Filter } from "lucide-react";
import { MOCK_DETAILED_RESULTS, DetailedQuestionResult } from "./results-mock-data";

export function QuestionFeedback() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>("q-1"); // Q1 expanded by default

  const filteredQuestions = MOCK_DETAILED_RESULTS.filter((q) => {
    if (selectedFilter === "All") return true;
    return q.category === selectedFilter;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-xl space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            Question-by-Question Detailed Feedback
          </h3>
          <p className="text-xs text-slate-400">Review evaluation breakdown across all 10 session questions</p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1.5 rounded-xl text-xs overflow-x-auto shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-0.5" />
          {["All", "Technical", "Project", "Behavioral"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                selectedFilter === cat
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((q) => {
          const isExpanded = expandedId === q.id;

          const scoreBadgeColor =
            q.score >= 85
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              : q.score >= 80
              ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
              : "bg-amber-500/10 text-amber-400 border-amber-500/30";

          return (
            <div
              key={q.id}
              className="rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all overflow-hidden"
            >
              {/* Accordion Header Bar */}
              <button
                onClick={() => toggleExpand(q.id)}
                className="w-full p-4 flex items-center justify-between gap-4 text-left cursor-pointer group select-none"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-slate-800 font-extrabold text-xs text-white flex items-center justify-center border border-slate-700 shrink-0">
                    {q.number}
                  </span>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-violet-500/10 text-violet-300 border border-violet-500/20">
                        {q.category}
                      </span>
                      <span className="text-[11px] text-slate-400 hidden sm:inline-block">
                        {q.subcategory}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                      {q.question}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className={`px-3 py-1 rounded-xl border text-xs font-extrabold ${scoreBadgeColor}`}>
                    {q.score}% Score
                  </div>

                  <div className="p-1 rounded-lg text-slate-400 group-hover:text-white">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Accordion Body Content */}
              {isExpanded && (
                <div className="p-5 pt-0 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-200">
                  {/* Full Question Text & Guidance */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Full Question Prompt
                    </span>
                    <p className="text-xs font-semibold text-white leading-relaxed">{q.question}</p>
                  </div>

                  {/* Simulated Response */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Your Simulated Response
                    </span>
                    <p className="text-xs font-mono text-slate-300 italic leading-relaxed">
                      &ldquo;{q.simulatedTranscript}&rdquo;
                    </p>
                  </div>

                  {/* Breakdown Scores Grid */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-semibold block">Relevance</span>
                      <span className="text-sm font-extrabold text-blue-400">{q.relevance}%</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-semibold block">Clarity</span>
                      <span className="text-sm font-extrabold text-violet-400">{q.clarity}%</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-semibold block">Confidence</span>
                      <span className="text-sm font-extrabold text-emerald-400">{q.confidenceScore}%</span>
                    </div>
                  </div>

                  {/* Feedback Notes */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-white block">AI Evaluator Feedback:</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{q.feedbackNote}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-semibold text-white">Key Strength</strong>
                          {q.strengthNote}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-semibold text-white">Target Improvement</strong>
                          {q.improvementNote}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
