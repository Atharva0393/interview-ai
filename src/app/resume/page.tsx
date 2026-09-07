"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UploadCloud,
  FileText,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  ArrowRight,
  Briefcase,
  Target,
  Award,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { MOCK_RESUME_ANALYSIS, MOCK_USER_PROFILE } from "@/lib/mock-data";

export default function ResumePage() {
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);
  const [selectedRole, setSelectedRole] = useState(MOCK_RESUME_ANALYSIS.targetRole);

  const handleSimulateReanalysis = () => {
    setIsSimulatingUpload(true);
    setTimeout(() => {
      setIsSimulatingUpload(false);
    }, 1200);
  };

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* Header Title Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Resume Parsing & Skill Alignment</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Resume & Profile Setup</h1>
            <p className="text-xs text-slate-400">
              Upload your resume to extract candidate technical skills and align against your target interview profile.
            </p>
          </div>

          <button
            onClick={handleSimulateReanalysis}
            disabled={isSimulatingUpload}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors shadow-sm cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulatingUpload ? "animate-spin text-blue-400" : ""}`} />
            <span>{isSimulatingUpload ? "Re-Analyzing..." : "Re-Analyze Resume"}</span>
          </button>
        </div>

        {/* Top Grid: Drag & Drop Zone + Parsed Profile Score */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Dropzone Container (1 col) */}
          <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] flex flex-col justify-between space-y-4">
            <div>
              <h2 className="text-base font-bold text-white mb-1">Resume Document</h2>
              <p className="text-xs text-slate-400 mb-4">Supported formats: PDF, DOCX (Max 10MB)</p>

              {/* Upload Drop Zone Box */}
              <div className="border-2 border-dashed border-slate-700/80 hover:border-blue-500/60 rounded-2xl p-6 text-center bg-slate-900/40 hover:bg-slate-900/70 transition-all cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                  Drag and drop your resume file here
                </p>
                <p className="text-[11px] text-slate-500 mt-1">or click to browse files from computer</p>
              </div>
            </div>

            {/* Currently Active Resume Info */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">{MOCK_RESUME_ANALYSIS.fileName}</div>
                  <div className="text-[10px] text-slate-400">Parsed {MOCK_RESUME_ANALYSIS.uploadDate}</div>
                </div>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md">
                Active
              </span>
            </div>
          </div>

          {/* AI Compatibility & Target Match (2 cols) */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] flex flex-col justify-between space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Target Role Matching
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-3xl font-extrabold text-white">{MOCK_RESUME_ANALYSIS.score}%</span>
                  <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg">
                    High Compatibility
                  </span>
                </div>
              </div>

              {/* Target Role Selector */}
              <div className="w-full sm:w-64 space-y-1">
                <label className="text-xs font-semibold text-slate-300">Selected Target Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Senior Frontend Engineer">Senior Frontend Engineer</option>
                  <option value="Full Stack React Engineer">Full Stack React Engineer</option>
                  <option value="Systems Architect">Systems Architect</option>
                  <option value="Engineering Manager">Engineering Manager</option>
                </select>
              </div>
            </div>

            {/* Extracted Technical Skills Chips */}
            <div>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Detected Candidate Skills ({MOCK_RESUME_ANALYSIS.detectedSkills.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {MOCK_RESUME_ANALYSIS.detectedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-950/50 text-blue-300 border border-blue-500/30 text-xs font-medium"
                  >
                    <CheckCircle className="w-3 h-3 text-blue-400" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Suggested Skill Additions */}
            <div>
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Missing Recommended Skills for {selectedRole}
              </h3>
              <div className="flex flex-wrap gap-2">
                {MOCK_RESUME_ANALYSIS.missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-lg bg-amber-950/40 text-amber-300 border border-amber-500/30 text-xs font-medium"
                  >
                    + {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Strengths & AI Resume Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Resume Strengths */}
          <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              Key Resume Strengths
            </h3>
            <ul className="space-y-3">
              {MOCK_RESUME_ANALYSIS.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Optimization Tips */}
          <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              Optimization Recommendations
            </h3>
            <ul className="space-y-3">
              {MOCK_RESUME_ANALYSIS.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <Target className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Navigation CTA */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-violet-950/40 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white">Profile Ready for Mock Interview</h4>
            <p className="text-xs text-slate-400">
              Your parsed profile will customize interview question complexity and persona style.
            </p>
          </div>
          <Link
            href="/interview/setup"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 shrink-0"
          >
            <span>Proceed to Interview Setup</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
