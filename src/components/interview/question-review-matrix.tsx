"use client";

import React, { useState } from "react";
import { Sparkles, Edit3, Trash2, CheckCircle, RefreshCw, Plus, HelpCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { AIQuestion } from "@/lib/types";

interface QuestionReviewMatrixProps {
  questions: AIQuestion[];
  onQuestionsChange: (updated: AIQuestion[]) => void;
  onRegenerateAll?: () => void;
  isGenerating?: boolean;
  isLoading?: boolean;
  className?: string;
}

export function QuestionReviewMatrix({
  questions,
  onQuestionsChange,
  onRegenerateAll,
  isGenerating = false,
  isLoading = false,
  className = "",
}: QuestionReviewMatrixProps) {
  const activeLoading = isGenerating || isLoading;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(questions[0]?.id || null);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const handleToggleApprove = (id: string) => {
    const updated = questions.map((q) =>
      q.id === id ? { ...q, isApproved: !q.isApproved } : q
    );
    onQuestionsChange(updated);
  };

  const handleRemoveQuestion = (id: string) => {
    const updated = questions.filter((q) => q.id !== id);
    onQuestionsChange(updated);
  };

  const handleStartEdit = (q: AIQuestion) => {
    setEditingId(q.id);
    setEditText(q.question);
  };

  const handleSaveEdit = (id: string) => {
    const updated = questions.map((q) =>
      q.id === id ? { ...q, question: editText } : q
    );
    onQuestionsChange(updated);
    setEditingId(null);
    setEditText("");
  };

  const handleAddCustomQuestion = () => {
    if (!newQuestionText.trim()) return;

    const newQ: AIQuestion = {
      id: `custom_${Date.now()}`,
      number: questions.length + 1,
      question: newQuestionText.trim(),
      category: "Technical",
      difficulty: "Medium",
      competency: "Custom Candidate Skill Evaluation",
      relevanceReason: "Custom question added by interviewer.",
      evidence: "User-added competency test",
      expectedKeyPoints: ["Clear answer structure", "Relevant domain implementation"],
      suggestedFollowUps: ["Can you elaborate on trade-offs?"],
      isApproved: true,
      isCustom: true,
    };

    onQuestionsChange([...questions, newQ]);
    setNewQuestionText("");
    setShowAddModal(false);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Matrix Header Controls */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-slate-900">Personalized Question Plan</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold">
              {questions.filter((q) => q.isApproved !== false).length} Approved
            </span>
          </div>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Grounded in uploaded resume, target job description, and knowledge passages. Review, edit, or add custom questions before starting.
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          {onRegenerateAll && (
            <button
              type="button"
              onClick={onRegenerateAll}
              disabled={isGenerating}
              className="px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-700 ${isGenerating ? "animate-spin" : ""}`} />
              <span>Regenerate AI Questions</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Question</span>
          </button>
        </div>
      </div>

      {/* Add Custom Question Form Modal */}
      {showAddModal && (
        <div className="p-4 rounded-2xl bg-stone-100 border border-stone-300 space-y-3">
          <h4 className="text-xs font-bold text-slate-900">Add Custom Interview Question</h4>
          <textarea
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            placeholder="Type your custom question here..."
            className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 min-h-[80px]"
          />
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-3 py-1.5 rounded-xl border border-stone-300 bg-white text-slate-700 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddCustomQuestion}
              className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-black cursor-pointer"
            >
              Save Question
            </button>
          </div>
        </div>
      )}

      {/* Questions Accordion Matrix */}
      <div className="space-y-3">
        {questions.map((q, idx) => {
          const isExpanded = expandedId === q.id;
          const isApproved = q.isApproved !== false;

          return (
            <div
              key={q.id}
              className={`rounded-2xl border transition-all ${
                isApproved
                  ? "bg-white border-stone-200/80 shadow-2xs"
                  : "bg-stone-100/60 border-stone-200 opacity-60"
              }`}
            >
              {/* Question Item Header */}
              <div className="p-4 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-stone-100 border border-stone-200 text-slate-900 font-mono text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>

                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-slate-900 text-white">
                        {q.category}
                      </span>
                      <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-stone-200 text-slate-800 border border-stone-300">
                        {q.difficulty}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-600 truncate">
                        Target: {q.competency}
                      </span>
                      {q.isCustom && (
                        <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Custom Question
                        </span>
                      )}
                    </div>

                    {editingId === q.id ? (
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-xl border border-slate-900 text-xs font-medium text-slate-900 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(q.id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">{q.question}</h4>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleApprove(q.id)}
                    className={`px-2.5 py-1 rounded-xl border text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                      isApproved
                        ? "bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100"
                        : "bg-stone-200 text-slate-700 border-stone-300 hover:bg-stone-300"
                    }`}
                  >
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>{isApproved ? "Approved" : "Disabled"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStartEdit(q)}
                    className="p-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-slate-600 transition-colors cursor-pointer"
                    title="Edit question text"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(q.id)}
                    className="p-1.5 rounded-xl border border-stone-200 bg-white hover:bg-red-50 text-slate-500 hover:text-red-700 transition-colors cursor-pointer"
                    title="Remove question"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="p-1.5 rounded-xl border border-stone-200 bg-white text-slate-600 cursor-pointer"
                  >
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Accordion Evidence & Rubric Details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-stone-100 bg-stone-50/50 rounded-b-2xl space-y-3 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-white border border-stone-200 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Why Relevant
                      </span>
                      <p className="text-xs text-slate-800 font-normal">{q.relevanceReason}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-stone-200 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Evidence Citation
                      </span>
                      <p className="text-xs text-slate-800 font-normal italic">&ldquo;{q.evidence}&rdquo;</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-stone-200 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Expected Key Answer Elements
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {q.expectedKeyPoints.map((point, pIdx) => (
                        <span
                          key={pIdx}
                          className="px-2 py-1 rounded-md bg-stone-100 border border-stone-200 text-[11px] text-slate-800 font-medium"
                        >
                          • {point}
                        </span>
                      ))}
                    </div>
                  </div>

                  {q.suggestedFollowUps && q.suggestedFollowUps.length > 0 && (
                    <div className="p-3 rounded-xl bg-white border border-stone-200 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Suggested Follow-Up Prompts
                      </span>
                      <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5 font-normal">
                        {q.suggestedFollowUps.map((fu, fIdx) => (
                          <li key={fIdx}>{fu}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
