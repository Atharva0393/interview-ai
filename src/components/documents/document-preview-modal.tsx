"use client";

import React from "react";
import { X, FileText, CheckCircle2, Copy, AlertCircle } from "lucide-react";
import { ProcessedDocument } from "@/lib/types";
import { useToast } from "@/components/ui/toast";

interface DocumentPreviewModalProps {
  doc: ProcessedDocument | null;
  onClose: () => void;
}

export function DocumentPreviewModal({ doc, onClose }: DocumentPreviewModalProps) {
  const { addToast } = useToast();

  if (!doc) return null;

  const handleCopyText = () => {
    if (doc.extractedText) {
      navigator.clipboard.writeText(doc.extractedText);
      addToast("Extracted text copied to clipboard", "success");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 selection:bg-stone-800 selection:text-white">
      <div className="bg-white border border-stone-200 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{doc.name}</h3>
              <p className="text-[11px] text-slate-500 font-normal">
                {doc.role.replace("_", " ").toUpperCase()} • {doc.wordCount} words extracted
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5 text-slate-700" />
              <span>Copy Text</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {doc.status === "requires_ocr" && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Scanned PDF detected. This document contains minimal extractable text and requires OCR processing.
              </span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-900 block">Extracted Text Content</label>
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-slate-800 font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
              {doc.extractedText || "No text extracted."}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-slate-500">
          <span>Role: {doc.role}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-black transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
