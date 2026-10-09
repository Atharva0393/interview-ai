"use client";

import React, { useState, useRef } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, X, FileCheck, Layers } from "lucide-react";
import { DocumentRole, ProcessedDocument } from "@/lib/types";
import { validateDocumentFile } from "@/lib/document-processing";
import { saveDocumentToStorage } from "@/lib/storage-service";
import { useToast } from "@/components/ui/toast";

interface DocumentUploaderProps {
  defaultRole?: DocumentRole;
  interviewId?: string;
  onDocumentProcessed?: (doc: ProcessedDocument) => void;
  className?: string;
}

const ROLE_LABELS: Record<DocumentRole, { label: string; desc: string }> = {
  candidate_resume: {
    label: "Candidate Resume",
    desc: "Primary candidate resume for skill extraction and background context",
  },
  job_description: {
    label: "Target Job Description",
    desc: "Job posting requirements, qualifications, and role responsibilities",
  },
  interviewer_background: {
    label: "Interviewer Profile",
    desc: "Interviewer background, role, or preferred technical domain",
  },
  technical_docs: {
    label: "Technical Architecture Specs",
    desc: "System design diagrams, RFCs, API docs, or code guidelines",
  },
  company_guidelines: {
    label: "Company Interview Rubric",
    desc: "Hiring criteria, STAR behavioral rubrics, or culture values",
  },
  knowledge_base: {
    label: "Knowledge Base Reference",
    desc: "Domain reference material, technical questions, or study notes",
  },
};

export function DocumentUploader({
  defaultRole = "candidate_resume",
  interviewId,
  onDocumentProcessed,
  className = "",
}: DocumentUploaderProps) {
  const [selectedRole, setSelectedRole] = useState<DocumentRole>(defaultRole);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  const handleFileSelect = (file: File) => {
    setErrorMsg(null);
    const validation = validateDocumentFile(file);
    if (!validation.valid) {
      setErrorMsg(validation.error || "Invalid file.");
      addToast(validation.error || "Invalid file.", "error");
      return;
    }
    setSelectedFile(file);
    uploadAndProcessFile(file);
  };

  const uploadAndProcessFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(25);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("role", selectedRole);
      if (interviewId) {
        formData.append("interviewId", interviewId);
      }

      setUploadProgress(60);
      const res = await fetch("/api/documents/parse", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setUploadProgress(100);

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to process document");
      }

      const doc: ProcessedDocument = data.document;
      saveDocumentToStorage(doc);

      if (doc.status === "requires_ocr") {
        addToast("PDF text minimal. Scanned PDF detected (requires OCR).", "warning");
      } else {
        addToast(`Successfully processed "${doc.name}" (${doc.wordCount} words extracted)`, "success");
      }

      if (onDocumentProcessed) {
        onDocumentProcessed(doc);
      }

      setSelectedFile(null);
    } catch (err: any) {
      console.error("Upload error:", err);
      setErrorMsg(err.message || "Error processing document");
      addToast(err.message || "Failed to process document", "error");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={`p-6 rounded-3xl bg-white border border-stone-200/80 shadow-2xs space-y-4 ${className}`}>
      {/* Role Selection Tabs */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-slate-700" />
          <span>Document Type / Role</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {(Object.keys(ROLE_LABELS) as DocumentRole[]).map((roleKey) => (
            <button
              key={roleKey}
              type="button"
              onClick={() => setSelectedRole(roleKey)}
              className={`p-2.5 rounded-xl border text-left transition-all text-xs font-medium cursor-pointer ${
                selectedRole === roleKey
                  ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                  : "bg-stone-50 text-slate-700 border-stone-200 hover:border-slate-400"
              }`}
            >
              <div className="font-bold truncate">{ROLE_LABELS[roleKey].label}</div>
            </button>
          ))}
        </div>
        <p className="text-[11px] text-slate-500 italic">
          {ROLE_LABELS[selectedRole].desc}
        </p>
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`p-8 rounded-2xl border-2 border-dashed text-center transition-all cursor-pointer space-y-3 ${
          isDragging
            ? "border-slate-900 bg-stone-100"
            : "border-stone-300 hover:border-slate-500 bg-stone-50/60"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt,.md"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileSelect(e.target.files[0]);
            }
          }}
        />

        <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200 text-slate-900 flex items-center justify-center mx-auto shadow-2xs">
          {isUploading ? (
            <Loader2 className="w-6 h-6 animate-spin text-slate-900" />
          ) : (
            <Upload className="w-6 h-6 text-slate-900" />
          )}
        </div>

        {isUploading ? (
          <div className="space-y-2 max-w-xs mx-auto">
            <p className="text-xs font-bold text-slate-900">
              Extracting text from &ldquo;{selectedFile?.name}&rdquo;...
            </p>
            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-900 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-900">
              Click to browse or drag & drop documents here
            </p>
            <p className="text-[11px] text-slate-500 font-normal">
              Supports PDF, DOCX, TXT, and Markdown (up to 10MB)
            </p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
