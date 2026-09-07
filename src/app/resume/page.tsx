"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  ArrowRight,
  Target,
  Trash2,
  FileCheck,
  Zap,
  Code,
  FolderGit2,
  Plus,
  X,
  Cpu,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { useToast } from "@/components/ui/toast";

export default function ResumePage() {
  const { showToast } = useToast();
  // Upload States
  const [isUploaded, setIsUploaded] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

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

  // Hidden File Input Ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Analysis Loading Steps
  const analysisSteps = [
    "Extracting text structure & headers...",
    "Detecting core technical stack & frameworks...",
    "Evaluating project complexity & impact...",
    "Calibrating target interview difficulty...",
  ];

  // Trigger Simulated Upload & Analysis
  const simulateUploadProcess = () => {
    setIsAnalyzing(true);
    setAnalysisStep(0);

    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setIsUploaded(true);
            showToast("Resume Parsed", "Extracted technical skills and project details successfully.", "success");
          }, 600);
          return prev;
        }
      });
    }, 450);
  };

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    simulateUploadProcess();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      simulateUploadProcess();
    }
  };

  const handleRemoveFile = () => {
    setIsUploaded(false);
    showToast("Resume Removed", "Upload a new resume to re-calibrate your AI candidate profile.", "info");
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()]);
      showToast("Skill Added", `Added ${newSkillInput.trim()} to core technical profile.`, "success");
      setNewSkillInput("");
      setShowAddSkill(false);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
    showToast("Skill Removed", `Removed ${skillToRemove} from technical profile.`, "info");
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-300">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e3de] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-xs font-semibold text-violet-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              <span>Step 1: Resume Analysis & Profile Setup</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Build Your Interview Profile
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Upload your resume and let AI prepare a personalized interview experience.
            </p>
          </div>

          {/* Quick Action Info Badge */}
          <div className="flex items-center gap-3 bg-white border border-[#e5e3de] px-4 py-2.5 rounded-xl shrink-0 shadow-2xs">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-xs">
              <span className="text-slate-500 font-medium">Profile Readiness: </span>
              <span className="text-emerald-700 font-bold">{isUploaded ? "85% Ready" : "40% Incomplete"}</span>
            </div>
          </div>
        </div>

        {/* Hidden HTML File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".pdf,.docx"
          className="hidden"
        />

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT SECTION — RESUME UPLOAD (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-[#e5e3de] shadow-2xs flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-violet-600" />
                    Resume Document
                  </h2>
                  <span className="text-[11px] font-semibold text-slate-500 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200">
                    PDF, DOCX
                  </span>
                </div>

                {/* Simulated Analysis Loading State */}
                {isAnalyzing ? (
                  <div className="p-8 rounded-2xl border border-violet-200 bg-violet-50/50 text-center space-y-6 animate-pulse">
                    <div className="w-14 h-14 rounded-2xl bg-violet-600 p-0.5 mx-auto flex items-center justify-center shadow-xs">
                      <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center">
                        <Cpu className="w-7 h-7 text-violet-600 animate-spin" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-slate-900">Analyzing Resume Content...</h3>
                      <p className="text-xs text-violet-700 font-mono">
                        {analysisSteps[analysisStep]}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden p-0.5 border border-violet-100">
                      <div
                        className="h-full bg-violet-600 rounded-full transition-all duration-300"
                        style={{
                          width: `${((analysisStep + 1) / analysisSteps.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ) : !isUploaded ? (
                  /* Drag & Drop Upload Zone (Empty State) */
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer group flex flex-col items-center justify-center space-y-4 ${
                      isDragging
                        ? "border-violet-600 bg-violet-50 shadow-xs scale-[1.01]"
                        : "border-stone-300 hover:border-violet-400 bg-stone-50/50 hover:bg-stone-50"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-7 h-7" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
                        Drag and drop your resume file here
                      </p>
                      <p className="text-xs text-slate-500">or click to browse files from computer</p>
                    </div>

                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Browse Files
                    </button>

                    <p className="text-[11px] text-slate-400 font-normal pt-2">
                      Supports PDF, DOCX (Up to 10MB)
                    </p>
                  </div>
                ) : (
                  /* File Uploaded Success State */
                  <div className="p-5 rounded-2xl bg-stone-50/60 border border-stone-200 space-y-4 shadow-2xs">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-700 shrink-0">
                          <FileCheck className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 leading-snug">
                            Atharva_Kale_Resume.pdf
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            1.8 MB • Uploaded & Parsed
                          </div>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                        Active
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-stone-200 text-xs text-slate-700 space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                        <span>AI Parsing Accuracy</span>
                        <span className="text-emerald-700 font-bold">98% High Confidence</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                        Successfully extracted 6 technical framework skills and 3 full-stack engineering projects.
                      </p>
                    </div>

                    {/* Replace & Remove Actions */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 px-3 py-2 rounded-xl bg-white hover:bg-stone-100 text-slate-700 text-xs font-bold border border-stone-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-violet-600" />
                        <span>Replace</span>
                      </button>

                      <button
                        onClick={handleRemoveFile}
                        className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Completeness Indicator Widget */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-violet-600" />
                    Profile Completeness
                  </span>
                  <span className={isUploaded ? "text-emerald-700 font-extrabold" : "text-amber-700 font-extrabold"}>
                    {isUploaded ? "85% Ready" : "40% Ready"}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden p-0.5 border border-stone-300/60">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isUploaded ? "bg-gradient-to-r from-violet-600 to-emerald-500" : "bg-amber-500"
                    }`}
                    style={{ width: isUploaded ? "85%" : "40%" }}
                  />
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                  {isUploaded
                    ? "Add custom framework tags or portfolio links to reach 100% profile optimization."
                    : "Upload your resume to automatically extract candidate skills and projects."}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION — AI RESUME INSIGHTS (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* AI Profile Summary Card */}
            <div className="p-6 rounded-2xl bg-white border border-[#e5e3de] shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-violet-50 text-violet-700 border border-violet-100">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">AI Profile Summary</h2>
                    <p className="text-xs text-slate-500 font-normal">Extracted candidate details & skill mapping</p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-violet-50 text-violet-800 border border-violet-200 text-xs font-bold">
                  Fresher Candidate
                </span>
              </div>

              {/* Extracted Profile Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Candidate Name
                  </span>
                  <span className="text-sm font-extrabold text-slate-900">Atharva Kale</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Target Role
                  </span>
                  <span className="text-sm font-extrabold text-violet-700">Frontend Developer</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Experience Level
                  </span>
                  <span className="text-sm font-extrabold text-slate-800">Fresher / Entry Level</span>
                </div>
              </div>

              {/* Core Technical Skills */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-violet-600" />
                    Core Technical Skills ({skills.length})
                  </h3>

                  <button
                    onClick={() => setShowAddSkill(!showAddSkill)}
                    className="text-[11px] font-bold text-violet-700 hover:text-violet-800 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Skill</span>
                  </button>
                </div>

                {/* Add Custom Skill Input Form */}
                {showAddSkill && (
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 border border-stone-300 animate-in fade-in duration-200">
                    <input
                      type="text"
                      placeholder="e.g. Redux Toolkit, WebRTC..."
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                      className="flex-1 bg-transparent px-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                    />
                    <button
                      onClick={handleAddSkill}
                      className="px-3 py-1 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold cursor-pointer"
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-50 text-violet-800 border border-violet-200 text-xs font-semibold group hover:border-violet-400 transition-colors"
                    >
                      <CheckCircle2 className="w-3 h-3 text-violet-600" />
                      <span>{skill}</span>
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity ml-1 cursor-pointer"
                        aria-label={`Remove ${skill}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects Experience */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5 text-violet-600" />
                  Key Projects Extracted
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { name: "Chicago Yachts", desc: "Luxury yacht booking & fleet portal", tech: "Next.js • Tailwind" },
                    { name: "Event Hub", desc: "Interactive event ticketing dashboard", tech: "React • TypeScript" },
                    { name: "Nutribowl", desc: "Nutrition tracking web app", tech: "Node.js • REST APIs" },
                  ].map((proj) => (
                    <div
                      key={proj.name}
                      className="p-3.5 rounded-xl bg-stone-50/70 border border-stone-200 space-y-1 hover:border-violet-300 transition-colors"
                    >
                      <div className="text-xs font-bold text-slate-900">{proj.name}</div>
                      <p className="text-[11px] text-slate-500 leading-tight font-normal">{proj.desc}</p>
                      <div className="text-[10px] font-mono text-violet-700 pt-1 font-bold">{proj.tech}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Extracted Insights */}
              <div className="p-4 rounded-xl bg-violet-50/50 border border-violet-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                    AI Extracted Insights & Calibration
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-violet-100 text-violet-800 border border-violet-200 rounded-md">
                    Suggested Difficulty: Intermediate
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-white border border-stone-200">
                    <span className="text-[10px] text-slate-500 font-semibold block mb-0.5">
                      Technical Focus
                    </span>
                    <span className="text-slate-900 font-bold">React Hydration & State</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-stone-200">
                    <span className="text-[10px] text-slate-500 font-semibold block mb-0.5">
                      Project Experience
                    </span>
                    <span className="text-slate-900 font-bold">Frontend Architecture</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-stone-200">
                    <span className="text-[10px] text-slate-500 font-semibold block mb-0.5">
                      Communication Focus
                    </span>
                    <span className="text-slate-900 font-bold">STAR Framework Anecdotes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action CTA Footer */}
        <div className="p-6 rounded-2xl bg-white border border-[#e5e3de] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Candidate Profile Ready
            </h3>
            <p className="text-xs text-slate-500 font-normal">
              Proceed to customize role parameters, interview duration, and AI interviewer persona.
            </p>
          </div>

          <Link
            href="/interview/setup"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-xs hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Continue to Interview Setup</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
