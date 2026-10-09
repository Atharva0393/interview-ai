"use client";

import React, { useState } from "react";
import { FileText, Trash2, Eye, AlertCircle, CheckCircle2, Clock, HelpCircle, Layers } from "lucide-react";
import { ProcessedDocument, DocumentRole } from "@/lib/types";

interface DocumentListProps {
  documents: ProcessedDocument[];
  onRemove: (docId: string) => void;
  onPreview: (doc: ProcessedDocument) => void;
  className?: string;
}

const ROLE_BADGES: Record<DocumentRole, { label: string; bg: string }> = {
  candidate_resume: { label: "Resume", bg: "bg-slate-900 text-white border-slate-900" },
  job_description: { label: "Job Description", bg: "bg-stone-200 text-slate-900 border-stone-300" },
  interviewer_background: { label: "Interviewer", bg: "bg-stone-100 text-slate-800 border-stone-200" },
  technical_docs: { label: "Tech Spec", bg: "bg-emerald-50 text-emerald-900 border-emerald-200" },
  company_guidelines: { label: "Company Guidelines", bg: "bg-stone-100 text-slate-800 border-stone-200" },
  knowledge_base: { label: "Knowledge Base", bg: "bg-stone-100 text-slate-800 border-stone-200" },
};

export function DocumentList({ documents, onRemove, onPreview, className = "" }: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className={`p-6 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-2 ${className}`}>
        <FileText className="w-8 h-8 text-stone-400 mx-auto" />
        <p className="text-xs font-bold text-slate-700">No documents uploaded yet</p>
        <p className="text-[11px] text-slate-500 font-normal">
          Upload resumes, job descriptions, or technical docs to enable AI RAG context matching.
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {documents.map((doc) => {
        const badge = ROLE_BADGES[doc.role] || { label: doc.role, bg: "bg-stone-100 text-slate-800 border-stone-200" };
        const isError = doc.status === "error" || doc.status === "requires_ocr";

        return (
          <div
            key={doc.id}
            className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-400 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-slate-900 shrink-0">
                <FileText className="w-5 h-5 text-slate-900" />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 truncate max-w-xs">{doc.name}</h4>
                  <span className={`px-2 py-0.5 text-[9px] font-bold rounded-md border ${badge.bg}`}>
                    {badge.label}
                  </span>
                  {doc.status === "indexed" && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Indexed
                    </span>
                  )}
                  {doc.status === "requires_ocr" && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <AlertCircle className="w-3 h-3 text-amber-600" />
                      Requires OCR
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-normal">
                  <span>{(doc.size / 1024).toFixed(0)} KB</span>
                  <span>•</span>
                  <span>{doc.wordCount.toLocaleString()} words extracted</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {doc.uploadedAt}
                  </span>
                </div>

                {doc.errorMessage && (
                  <p className="text-[11px] text-amber-700 font-medium pt-0.5">{doc.errorMessage}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                type="button"
                onClick={() => onPreview(doc)}
                className="px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-slate-700" />
                <span>Inspect Text</span>
              </button>

              <button
                type="button"
                onClick={() => onRemove(doc.id)}
                className="p-1.5 rounded-xl border border-stone-200 bg-white hover:bg-red-50 text-slate-500 hover:text-red-700 transition-colors cursor-pointer"
                title="Remove document"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
