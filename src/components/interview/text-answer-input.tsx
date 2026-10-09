"use client";

import React, { useState, useEffect } from "react";
import { Send, Sparkles, MessageSquare, Loader2, CheckCircle2 } from "lucide-react";
import { AIAnswerEvaluation } from "@/lib/types";

interface TextAnswerInputProps {
  questionId?: string;
  onAnswerSubmit?: (answerText: string) => void;
  onSubmitAnswer?: (answerText: string) => void;
  isEvaluating?: boolean;
  isSubmitting?: boolean;
  savedAnswer?: string;
  evaluation?: AIAnswerEvaluation | null;
  className?: string;
}

export function TextAnswerInput({
  questionId,
  onAnswerSubmit,
  onSubmitAnswer,
  isEvaluating = false,
  isSubmitting = false,
  savedAnswer = "",
  evaluation = null,
  className = "",
}: TextAnswerInputProps) {
  const [text, setText] = useState(savedAnswer);

  useEffect(() => {
    setText(savedAnswer || "");
  }, [questionId, savedAnswer]);

  const activeIsSubmitting = isEvaluating || isSubmitting;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || activeIsSubmitting) return;

    if (onAnswerSubmit) {
      onAnswerSubmit(text.trim());
    } else if (onSubmitAnswer) {
      onSubmitAnswer(text.trim());
    }
  };

  const handleInsertStarTemplate = () => {
    const template = `Situation: 
Task: 
Action: 
Result: `;
    setText((prev) => (prev ? prev + "\n\n" + template : template));
  };

  return (
    <form onSubmit={handleSubmit} className={`p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-slate-800" />
          <span>Type Candidate Technical or STAR Answer</span>
        </label>

        <button
          type="button"
          onClick={handleInsertStarTemplate}
          className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-200 text-[10px] font-bold text-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Sparkles className="w-3 h-3 text-slate-800" />
          <span>Insert STAR Template</span>
        </button>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your response to this interview question... Explain architectural decisions, trade-offs, and measurable outcomes."
        rows={4}
        className="w-full p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-normal text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all leading-relaxed"
      />

      <div className="flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-normal">
          {text.trim().split(/\s+/).filter(Boolean).length} words
        </span>

        <button
          type="submit"
          disabled={!text.trim() || activeIsSubmitting}
          className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {activeIsSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Evaluating...</span>
            </>
          ) : (
            <>
              <span>Submit Answer & Evaluate</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Real AI Evaluation Feedback Card if available */}
      {evaluation && (
        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2 mt-2 animate-in fade-in duration-200 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              AI Answer Feedback & Score: {evaluation.score}/100
            </span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-white border border-emerald-200 px-2 py-0.5 rounded">
              Tech: {evaluation.technicalScore}% • Comm: {evaluation.communicationScore}%
            </span>
          </div>
          <p className="text-[11px] text-emerald-950 font-normal leading-relaxed">
            {evaluation.feedback}
          </p>
          <p className="text-[11px] text-emerald-800 font-semibold italic">
            Tip: {evaluation.improvementTip}
          </p>
        </div>
      )}
    </form>
  );
}
