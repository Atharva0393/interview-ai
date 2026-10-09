import { DocumentRole, DocumentStatus, ProcessedDocument, DocumentPassage } from "./types";

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB limit

const ALLOWED_MIME_TYPES: Record<string, string> = {
  "application/pdf": "PDF",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
  "text/plain": "TXT",
  "text/markdown": "MD",
  "text/x-markdown": "MD",
};

const ALLOWED_EXTENSIONS = [".pdf", ".docx", ".txt", ".md"];

export function validateDocumentFile(file: File | { name: string; size: number; type: string }): FileValidationResult {
  const extension = "." + file.name.split(".").pop()?.toLowerCase();

  if (!ALLOWED_EXTENSIONS.includes(extension) && !ALLOWED_MIME_TYPES[file.type]) {
    return {
      valid: false,
      error: `Unsupported file format (${extension || file.type}). Please upload a PDF, DOCX, TXT, or MD file.`,
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds the 10MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`,
    };
  }

  return { valid: true };
}

export function normalizeDocumentText(rawText: string): string {
  if (!rawText) return "";
  return rawText
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\t/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function countWords(text: string): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function chunkDocumentText(
  docId: string,
  docName: string,
  docRole: DocumentRole,
  text: string,
  maxWordsPerChunk: number = 250,
  overlapWords: number = 30
): DocumentPassage[] {
  const normalized = normalizeDocumentText(text);
  const words = normalized.split(/\s+/).filter(Boolean);

  if (words.length === 0) return [];

  const passages: DocumentPassage[] = [];
  let index = 0;
  let start = 0;

  while (start < words.length) {
    const end = Math.min(start + maxWordsPerChunk, words.length);
    const chunkWords = words.slice(start, end);
    const passageContent = chunkWords.join(" ");

    passages.push({
      id: `${docId}_p_${index}`,
      docId,
      docName,
      docRole,
      content: passageContent,
      passageIndex: index,
    });

    index++;
    start += maxWordsPerChunk - overlapWords;
    if (start >= words.length || end === words.length) break;
  }

  return passages;
}

export function createProcessedDocument(
  id: string,
  file: { name: string; size: number; type: string },
  role: DocumentRole,
  extractedText: string,
  statusOverride?: DocumentStatus,
  errorMessage?: string,
  interviewId?: string
): ProcessedDocument {
  const normalized = normalizeDocumentText(extractedText);
  const wordCount = countWords(normalized);

  let status: DocumentStatus = statusOverride || "indexed";
  if (!statusOverride) {
    if (wordCount < 5 && (file.name.endsWith(".pdf") || file.type.includes("pdf"))) {
      status = "requires_ocr";
      errorMessage = "Document contains minimal extractable text. Scanned or image-based PDF detected (requires OCR).";
    } else if (wordCount === 0) {
      status = "error";
      errorMessage = "No text could be extracted from document.";
    }
  }

  return {
    id,
    name: file.name,
    role,
    mimeType: file.type || "application/octet-stream",
    size: file.size,
    extractedText: normalized,
    wordCount,
    status,
    errorMessage,
    uploadedAt: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    interviewId,
    isExplicit: true,
  };
}
