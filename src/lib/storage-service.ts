import { ProcessedDocument, InterviewSessionConfig, SessionResultReport, CandidateProfileAnalysis } from "./types";
import { globalKnowledgeBase } from "./knowledge-base";
import { MOCK_RESUME_ANALYSIS } from "./mock-data";

const DOCS_STORAGE_KEY = "interview_ai_documents_v1";
const CONFIG_STORAGE_KEY = "interview_ai_session_config_v1";
const PROFILE_ANALYSIS_KEY = "interview_ai_profile_analysis_v1";
const LAST_RESULT_KEY = "interview_ai_last_result_v1";

export function loadSavedDocuments(): ProcessedDocument[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(DOCS_STORAGE_KEY);
    if (!raw) return [];
    const parsed: ProcessedDocument[] = JSON.parse(raw);
    parsed.forEach((doc) => globalKnowledgeBase.addDocument(doc));
    return parsed;
  } catch (e) {
    console.error("Failed to load documents from localStorage", e);
    return [];
  }
}

export function saveDocumentToStorage(doc: ProcessedDocument): ProcessedDocument[] {
  if (typeof window === "undefined") return [];
  try {
    const existing = loadSavedDocuments();
    const updated = [doc, ...existing.filter((d) => d.id !== doc.id)];
    localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(updated));
    globalKnowledgeBase.addDocument(doc);
    return updated;
  } catch (e) {
    console.error("Failed to save document to localStorage", e);
    return [];
  }
}

export function removeDocumentFromStorage(docId: string): ProcessedDocument[] {
  if (typeof window === "undefined") return [];
  try {
    const existing = loadSavedDocuments();
    const updated = existing.filter((d) => d.id !== docId);
    localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(updated));
    globalKnowledgeBase.removeDocument(docId);
    return updated;
  } catch (e) {
    console.error("Failed to remove document from localStorage", e);
    return [];
  }
}

export function saveProfileAnalysis(analysis: CandidateProfileAnalysis): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROFILE_ANALYSIS_KEY, JSON.stringify(analysis));
  } catch (e) {
    console.error("Failed to save profile analysis", e);
  }
}

export function loadSavedProfileAnalysis(): CandidateProfileAnalysis {
  if (typeof window === "undefined") return MOCK_RESUME_ANALYSIS;
  try {
    const raw = localStorage.getItem(PROFILE_ANALYSIS_KEY);
    if (!raw) return MOCK_RESUME_ANALYSIS;
    return JSON.parse(raw);
  } catch (e) {
    return MOCK_RESUME_ANALYSIS;
  }
}

export function saveSessionConfig(config: InterviewSessionConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error("Failed to save session config", e);
  }
}

export function loadSavedSessionConfig(): InterviewSessionConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function saveSessionResult(result: SessionResultReport): void {
  if (typeof window === "undefined") return;
  try {
    const versioned: SessionResultReport = {
      ...result,
      schemaVersion: result.schemaVersion || 2,
    };
    localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(versioned));
  } catch (e) {
    console.error("Failed to save session result", e);
  }
}

export function loadSavedSessionResult(): SessionResultReport | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LAST_RESULT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Backward compatibility: If no schemaVersion, treat as Phase 1 (v1)
    if (!parsed.schemaVersion) {
      parsed.schemaVersion = 1;
    }
    return parsed;
  } catch (e) {
    return null;
  }
}
