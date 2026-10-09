"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Target,
  Zap,
  Code,
  FolderGit2,
  Plus,
  X,
  Layers,
  Brain,
  RefreshCw,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { useToast } from "@/components/ui/toast";
import { DocumentUploader } from "@/components/documents/document-uploader";
import { DocumentList } from "@/components/documents/document-list";
import { DocumentPreviewModal } from "@/components/documents/document-preview-modal";
import { ProcessedDocument, CandidateProfileAnalysis } from "@/lib/types";
import {
  loadSavedDocuments,
  removeDocumentFromStorage,
  saveProfileAnalysis,
  loadSavedProfileAnalysis,
} from "@/lib/storage-service";

export default function ResumePage() {
  const { addToast } = useToast();
  const [documents, setDocuments] = useState<ProcessedDocument[]>([]);
  const [inspectDoc, setInspectDoc] = useState<ProcessedDocument | null>(null);
  const [analysis, setAnalysis] = useState<CandidateProfileAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Profile Skills State
  const [skills, setSkills] = useState<string[]>([
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
  ]);
  const [newSkillInput, setNewSkillInput] = useState("");
  const [showAddSkill, setShowAddSkill] = useState(false);

  useEffect(() => {
    const loadedDocs = loadSavedDocuments();
    setDocuments(loadedDocs);

    const savedAnalysis = loadSavedProfileAnalysis();
    if (savedAnalysis) {
      setAnalysis(savedAnalysis);
      if (savedAnalysis.detectedSkills?.length > 0) {
        setSkills(savedAnalysis.detectedSkills);
      }
    }
  }, []);

  const handleDocumentProcessed = async (doc: ProcessedDocument) => {
    const updated = loadSavedDocuments();
    setDocuments(updated);

    if (doc.role === "candidate_resume" && doc.extractedText) {
      triggerAiResumeAnalysis(doc.extractedText, doc.name);
    }
  };

  const triggerAiResumeAnalysis = async (resumeText: string, fileName: string) => {
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/ai/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, fileName }),
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysis(data.analysis);
        saveProfileAnalysis(data.analysis);
        if (data.analysis.detectedSkills?.length > 0) {
          setSkills(data.analysis.detectedSkills);
        }
        addToast("AI Profile Analysis complete!", "success");
      }
    } catch (err) {
      console.error("Resume analysis error:", err);
      addToast("Failed to analyze resume with AI", "error");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRemoveDoc = (docId: string) => {
    const updated = removeDocumentFromStorage(docId);
    setDocuments(updated);
    addToast("Document removed", "info");
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      const updated = [...skills, newSkillInput.trim()];
      setSkills(updated);
      if (analysis) {
        saveProfileAnalysis({ ...analysis, detectedSkills: updated });
      }
      addToast(`Added ${newSkillInput.trim()} to profile`, "success");
      setNewSkillInput("");
      setShowAddSkill(false);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = skills.filter((s) => s !== skillToRemove);
    setSkills(updated);
    if (analysis) {
      saveProfileAnalysis({ ...analysis, detectedSkills: updated });
    }
    addToast(`Removed ${skillToRemove}`, "info");
  };

  const resumeDoc = documents.find((d) => d.role === "candidate_resume");
  const isUploaded = Boolean(resumeDoc);

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-300">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 fill-current text-stone-200" />
              <span>Step 1: Multi-Role Document Upload & AI Analysis</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Build Your Candidate Profile & Knowledge Base
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Upload resumes, job descriptions, technical guidelines, and reference documents to power real-time AI RAG passage matching.
            </p>
          </div>

          {/* Quick Action Info Badge */}
          <div className="flex items-center gap-3 bg-white border border-stone-200 px-4 py-2.5 rounded-xl shrink-0 shadow-2xs">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-xs">
              <span className="text-slate-500 font-medium">Documents Indexed: </span>
              <span className="text-slate-900 font-bold">{documents.length} Files</span>
            </div>
          </div>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT SECTION — MULTI-ROLE DOCUMENT UPLOAD (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <DocumentUploader
              defaultRole="candidate_resume"
              onDocumentProcessed={handleDocumentProcessed}
            />

            {/* Document List Manager */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                <span>Active Documents ({documents.length})</span>
                {documents.length > 0 && (
                  <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    RAG Ready
                  </span>
                )}
              </h3>
              <DocumentList
                documents={documents}
                onRemove={handleRemoveDoc}
                onPreview={(doc) => setInspectDoc(doc)}
              />
            </div>
          </div>

          {/* RIGHT SECTION — REAL AI RESUME INSIGHTS (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* AI Profile Summary Card */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-900 text-white">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">AI Candidate Profile Analysis</h2>
                    <p className="text-xs text-slate-500 font-normal">
                      {isAnalyzing ? "Analyzing document with Gemini AI..." : "Extracted skills & experience details"}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-stone-100 text-slate-900 border border-stone-300 text-xs font-bold">
                  {analysis?.targetRole || "Frontend Developer"}
                </span>
              </div>

              {/* Extracted Profile Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Resume Match Score
                  </span>
                  <span className="text-base font-extrabold text-emerald-800">
                    {analysis?.score || 86}% High Match
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Primary Role
                  </span>
                  <span className="text-sm font-extrabold text-slate-900">
                    {analysis?.targetRole || "Frontend Engineer"}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Est. Experience
                  </span>
                  <span className="text-sm font-extrabold text-slate-800">
                    {analysis?.workExperienceYears ?? 2} Years
                  </span>
                </div>
              </div>

              {/* Core Technical Skills */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-slate-900" />
                    Detected Technical Skills ({skills.length})
                  </h3>

                  <button
                    onClick={() => setShowAddSkill(!showAddSkill)}
                    className="text-[11px] font-bold text-slate-900 hover:text-black flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Skill</span>
                  </button>
                </div>

                {/* Add Custom Skill Input Form */}
                {showAddSkill && (
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 border border-stone-300">
                    <input
                      type="text"
                      placeholder="e.g. Redux Toolkit, WebSockets..."
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                      className="flex-1 bg-transparent px-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                    />
                    <button
                      onClick={handleAddSkill}
                      className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-bold cursor-pointer"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowAddSkill(false)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 text-slate-900 border border-stone-300 text-xs font-semibold group hover:border-slate-500 transition-colors"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{skill}</span>
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity ml-1 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Strengths & Recommendations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5 text-emerald-600" />
                    AI Profile Strengths
                  </span>
                  <ul className="space-y-1 text-slate-600 font-normal">
                    {(analysis?.strengths || ["Strong technical coverage of modern React ecosystem"]).map((str, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-slate-900" />
                    Recommended Focus
                  </span>
                  <ul className="space-y-1 text-slate-600 font-normal">
                    {(analysis?.recommendations || ["Quantify STAR behavioral outcomes"]).map((rec, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-1.5">
                        <span className="text-slate-900">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text Inspection Modal */}
        <DocumentPreviewModal doc={inspectDoc} onClose={() => setInspectDoc(null)} />

        {/* Primary Action CTA Footer */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Candidate Profile & Knowledge Base Ready
            </h3>
            <p className="text-xs text-slate-500 font-normal">
              Proceed to generate personalized grounded questions and review pre-session interview plans.
            </p>
          </div>

          <Link
            href="/interview/setup"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-xs hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Continue to Question Generation & Setup</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}