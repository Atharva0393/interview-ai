"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  MessageSquare,
  AlertCircle,
  Filter,
  Mic,
  Eye,
} from "lucide-react";
import { loadSavedSessionResult } from "@/lib/storage-service";
import { MOCK_DETAILED_RESULTS } from "./results-mock-data";
import { SessionResultReport } from "@/lib/types";

export function QuestionFeedback() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sessionReport, setSessionReport] = useState<SessionResultReport | null>(null);

  useEffect(() => {
    const saved = loadSavedSessionResult();
    if (saved) {
      setSessionReport(saved);
      if (saved.questionAnalytics && saved.questionAnalytics.length > 0) {
        setExpandedId(saved.questionAnalytics[0].questionId);
      } else {
        setExpandedId("q-1");
      }
    } else {
      setExpandedId("q-1");
    }
  }, []);

  // Use real evaluated questions if present, or fallback to mock data
  const hasRealQuestions = Boolean(
    sessionReport?.questionAnalytics && sessionReport.questionAnalytics.length > 0
  );

  const displayQuestions = hasRealQuestions
    ? sessionReport!.questionAnalytics!.map((item) => ({
        id: item.questionId,
        number: item.questionNumber,
        category: (item.evaluation?.technicalScore ? "Technical" : "General") as string,
        subcategory: "Role Evaluation",
        question: item.questionText,
        transcript: item.transcript || "No transcript recorded.",
        score: item.evaluation?.score ?? 82,
        relevance: item.evaluation?.technicalScore ?? 84,
        clarity: item.evaluation?.communicationScore ?? 82,
        confidenceScore: item.evaluation?.confidenceScore ?? 80,
        feedbackNote: item.evaluation?.feedback || "Structured response delivered.",
        strengthNote: item.evaluation?.keyPointsCovered?.join("; ") || "Clear technical reasoning.",
        improvementNote: item.evaluation?.improvementTip || "Quantify metric outcomes with STAR.",
        speechMetrics: item.speechMetrics,
        gazeMetrics: item.gazeMetrics,
        isReal: true,
      }))
    : MOCK_DETAILED_RESULTS.map((q) => ({
        id: q.id,
        number: q.number,
        category: q.category,
        subcategory: q.subcategory,
        question: q.question,
        transcript: q.simulatedTranscript,
        score: q.score,
        relevance: q.relevance,
        clarity: q.clarity,
        confidenceScore: q.confidenceScore,
        feedbackNote: q.feedbackNote,
        strengthNote: q.strengthNote,
        improvementNote: q.improvementNote,
        speechMetrics: undefined,
        gazeMetrics: undefined,
        isReal: false,
      }));

  const filteredQuestions = displayQuestions.filter((q) => {
    if (selectedFilter === "All") return true;
    return q.category.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 shadow-2xs space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-slate-900" />
            Question-by-Question Detailed Feedback
          </h3>
          <p className="text-xs text-slate-500 font-normal">
            {hasRealQuestions
              ? `Review AI evaluation, speech pace, and gaze tracking across your ${displayQuestions.length} answered questions`
              : "Review evaluation breakdown across all session questions"}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 p-1.5 rounded-xl text-xs overflow-x-auto shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
          {["All", "Technical", "Behavioral"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                selectedFilter === cat
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
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
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : q.score >= 80
              ? "bg-stone-100 text-slate-900 border-stone-300"
              : "bg-amber-50 text-amber-800 border-amber-200";

          return (
            <div
              key={q.id}
              className="rounded-2xl bg-white border border-stone-200 hover:border-stone-300 transition-all overflow-hidden shadow-2xs"
            >
              {/* Accordion Header Bar */}
              <button
                onClick={() => toggleExpand(q.id)}
                className="w-full p-4 flex items-center justify-between gap-4 text-left cursor-pointer group select-none hover:bg-stone-50/50"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-stone-100 font-extrabold text-xs text-slate-800 flex items-center justify-center border border-stone-200 shrink-0">
                    {q.number}
                  </span>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-white">
                        {q.category}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium hidden sm:inline-block">
                        {q.subcategory}
                      </span>
                      {q.speechMetrics?.speakingRateWpm && (
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-mono hidden md:inline-flex items-center gap-1">
                          <Mic className="w-2.5 h-2.5" />
                          {q.speechMetrics.speakingRateWpm} WPM
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-black transition-colors line-clamp-1">
                      {q.question}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className={`px-3 py-1 rounded-xl border text-xs font-extrabold ${scoreBadgeColor}`}>
                    {q.score}% Score
                  </div>

                  <div className="p-1 rounded-lg text-slate-400 group-hover:text-slate-700">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Accordion Body Content */}
              {isExpanded && (
                <div className="p-5 pt-0 border-t border-stone-200/80 space-y-4 animate-in fade-in duration-200">
                  {/* Full Question Text */}
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Full Question Prompt
                    </span>
                    <p className="text-xs font-bold text-slate-900 leading-relaxed">{q.question}</p>
                  </div>

                  {/* Candidate Transcript Text */}
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Candidate Answer Transcript
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {q.isReal ? "Live Interview Response" : "Simulated Response"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal bg-white p-3 rounded-lg border border-stone-200">
                      &ldquo;{q.transcript}&rdquo;
                    </p>
                  </div>

                  {/* Phase 2: Speech & Gaze Telemetry Chips if available */}
                  {(q.speechMetrics || q.gazeMetrics) && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                      {q.speechMetrics?.speakingRateWpm && (
                        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                          <span className="text-[10px] text-slate-500 font-semibold block uppercase">
                            Speaking Pace
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            {q.speechMetrics.speakingRateWpm} WPM
                          </span>
                        </div>
                      )}
                      {q.speechMetrics !== undefined && (
                        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                          <span className="text-[10px] text-slate-500 font-semibold block uppercase">
                            Filler Words
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            {q.speechMetrics.fillerWordCount} detected
                          </span>
                        </div>
                      )}
                      {q.speechMetrics !== undefined && (
                        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                          <span className="text-[10px] text-slate-500 font-semibold block uppercase">
                            Speaking Time
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            {q.speechMetrics.speakingDurationSec}s
                          </span>
                        </div>
                      )}
                      {q.gazeMetrics?.screenDirectedPct !== undefined && (
                        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                          <span className="text-[10px] text-slate-500 font-semibold block uppercase">
                            Screen Gaze
                          </span>
                          <span className="text-xs font-bold text-emerald-700">
                            {q.gazeMetrics.screenDirectedPct !== null ? `${q.gazeMetrics.screenDirectedPct}%` : "N/A"}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Breakdown Scores Grid */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-2xs">
                      <span className="text-[10px] text-slate-500 font-semibold block">Relevance</span>
                      <span className="text-sm font-extrabold text-slate-900">{q.relevance}%</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-2xs">
                      <span className="text-[10px] text-slate-500 font-semibold block">Clarity</span>
                      <span className="text-sm font-extrabold text-slate-900">{q.clarity}%</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-2xs">
                      <span className="text-[10px] text-slate-500 font-semibold block">Confidence</span>
                      <span className="text-sm font-extrabold text-emerald-700">{q.confidenceScore}%</span>
                    </div>
                  </div>

                  {/* Feedback Notes */}
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                    <span className="text-xs font-bold text-slate-900 block">AI Evaluator Feedback:</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{q.feedbackNote}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2 font-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-bold text-slate-900">Key Strength / Covered Points</strong>
                          {q.strengthNote}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2 font-normal">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-bold text-slate-900">Target Improvement</strong>
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
