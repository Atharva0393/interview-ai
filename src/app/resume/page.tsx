"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw,
  ArrowRight,
  Briefcase,
  Target,
  Award,
  Trash2,
  FileCheck,
  Zap,
  Code,
  FolderGit2,
  Sliders,
  Plus,
  X,
  Cpu,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";

export default function ResumePage() {
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
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()]);
      setNewSkillInput("");
      setShowAddSkill(false);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-300">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e293b] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 1: Resume Analysis & Profile Setup</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Build Your Interview Profile
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Upload your resume and let AI prepare a personalized interview experience.
            </p>
          </div>

          {/* Quick Action Info Badge */}
          <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-xl shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-xs">
              <span className="text-slate-400 font-medium">Profile Readiness: </span>
              <span className="text-emerald-400 font-bold">{isUploaded ? "85% Ready" : "40% Incomplete"}</span>
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
            <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-xl flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    Resume Document
                  </h2>
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
                    PDF, DOCX
                  </span>
                </div>

                {/* Simulated Analysis Loading State */}
                {isAnalyzing ? (
                  <div className="p-8 rounded-2xl border border-blue-500/40 bg-blue-950/20 text-center space-y-6 animate-pulse">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-violet-600 p-0.5 mx-auto flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <div className="w-full h-full rounded-[14px] bg-[#0b0f19] flex items-center justify-center">
                        <Cpu className="w-7 h-7 text-blue-400 animate-spin" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-white">Analyzing Resume Content...</h3>
                      <p className="text-xs text-blue-300 font-mono">
                        {analysisSteps[analysisStep]}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-blue-500/30">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-300"
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
                        ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20 scale-[1.01]"
                        : "border-slate-700/80 hover:border-blue-500/60 bg-slate-900/40 hover:bg-slate-900/80"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-7 h-7" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
                        Drag and drop your resume file here
                      </p>
                      <p className="text-xs text-slate-400">or click to browse files from computer</p>
                    </div>

                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-semibold transition-colors"
                    >
                      Browse Files
                    </button>

                    <p className="text-[11px] text-slate-500 font-medium pt-2">
                      Supports PDF, DOCX (Up to 10MB)
                    </p>
                  </div>
                ) : (
                  /* File Uploaded Success State */
                  <div className="p-5 rounded-2xl bg-slate-900/90 border border-blue-500/30 space-y-4 shadow-lg">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600/20 to-violet-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                          <FileCheck className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white leading-snug">
                            Atharva_Kale_Resume.pdf
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            1.8 MB • Uploaded & Parsed
                          </div>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                        Active
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                        <span>AI Parsing Accuracy</span>
                        <span className="text-emerald-400 font-bold">98% High Confidence</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Successfully extracted 6 technical framework skills and 3 full-stack engineering projects.
                      </p>
                    </div>

                    {/* Replace & Remove Actions */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                        <span>Replace</span>
                      </button>

                      <button
                        onClick={handleRemoveFile}
                        className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Completeness Indicator Widget */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#111827] border border-[#1e293b] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-violet-400" />
                    Profile Completeness
                  </span>
                  <span className={isUploaded ? "text-emerald-400 font-extrabold" : "text-amber-400 font-extrabold"}>
                    {isUploaded ? "85% Ready" : "40% Ready"}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isUploaded ? "bg-gradient-to-r from-blue-500 to-emerald-400" : "bg-amber-500"
                    }`}
                    style={{ width: isUploaded ? "85%" : "40%" }}
                  />
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
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
            <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">AI Profile Summary</h2>
                    <p className="text-xs text-slate-400">Extracted candidate details & skill mapping</p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-violet-950/60 text-violet-300 border border-violet-500/30 text-xs font-semibold">
                  Fresher Candidate
                </span>
              </div>

              {/* Extracted Profile Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Candidate Name
                  </span>
                  <span className="text-sm font-extrabold text-white">Atharva Kale</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Target Role
                  </span>
                  <span className="text-sm font-extrabold text-blue-400">Frontend Developer</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Experience Level
                  </span>
                  <span className="text-sm font-extrabold text-violet-400">Fresher / Entry Level</span>
                </div>
              </div>

              {/* Core Technical Skills */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-blue-400" />
                    Core Technical Skills ({skills.length})
                  </h3>

                  <button
                    onClick={() => setShowAddSkill(!showAddSkill)}
                    className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Skill</span>
                  </button>
                </div>

                {/* Add Custom Skill Input Form */}
                {showAddSkill && (
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-700 animate-in fade-in duration-200">
                    <input
                      type="text"
                      placeholder="e.g. Redux Toolkit, WebRTC..."
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                      className="flex-1 bg-transparent px-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                    <button
                      onClick={handleAddSkill}
                      className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowAddSkill(false)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white"
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-950/40 text-blue-300 border border-blue-500/30 text-xs font-semibold group hover:border-blue-400 transition-colors"
                    >
                      <CheckCircle2 className="w-3 h-3 text-blue-400" />
                      <span>{skill}</span>
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity ml-1"
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
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5 text-violet-400" />
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
                      className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1 hover:border-violet-500/30 transition-colors"
                    >
                      <div className="text-xs font-bold text-white">{proj.name}</div>
                      <p className="text-[11px] text-slate-400 leading-tight">{proj.desc}</p>
                      <div className="text-[10px] font-mono text-violet-400 pt-1">{proj.tech}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Extracted Insights */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/30 via-slate-900 to-violet-950/30 border border-blue-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    AI Extracted Insights & Calibration
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-md">
                    Suggested Difficulty: Intermediate
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-semibold block mb-0.5">
                      Technical Focus
                    </span>
                    <span className="text-slate-200 font-bold">React Hydration & State</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-semibold block mb-0.5">
                      Project Experience
                    </span>
                    <span className="text-slate-200 font-bold">Frontend Architecture</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-semibold block mb-0.5">
                      Communication Focus
                    </span>
                    <span className="text-slate-200 font-bold">STAR Framework Anecdotes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action CTA Footer */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-violet-950/50 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Candidate Profile Ready
            </h3>
            <p className="text-xs text-slate-300">
              Proceed to customize role parameters, interview duration, and AI interviewer persona.
            </p>
          </div>

          <Link
            href="/interview/setup"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-xs font-extrabold shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Continue to Interview Setup</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
