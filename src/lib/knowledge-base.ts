import { ProcessedDocument, DocumentPassage, DocumentRole } from "./types";
import { chunkDocumentText } from "./document-processing";

// In-memory / localStorage document passage store for current session
class KnowledgeBaseEngine {
  private documents: Map<string, ProcessedDocument> = new Map();
  private passages: DocumentPassage[] = [];

  public addDocument(doc: ProcessedDocument, newPassages?: DocumentPassage[]): void {
    this.documents.set(doc.id, doc);

    if (newPassages && newPassages.length > 0) {
      // Remove old passages for this doc if updating
      this.passages = this.passages.filter((p) => p.docId !== doc.id);
      this.passages.push(...newPassages);
    } else if (doc.extractedText) {
      const generated = chunkDocumentText(doc.id, doc.name, doc.role, doc.extractedText);
      this.passages = this.passages.filter((p) => p.docId !== doc.id);
      this.passages.push(...generated);
    }
  }

  public removeDocument(docId: string): void {
    this.documents.delete(docId);
    this.passages = this.passages.filter((p) => p.docId !== docId);
  }

  public getDocument(docId: string): ProcessedDocument | undefined {
    return this.documents.get(docId);
  }

  public getAllDocuments(roleFilter?: DocumentRole, interviewIdFilter?: string): ProcessedDocument[] {
    let list = Array.from(this.documents.values());
    if (roleFilter) {
      list = list.filter((d) => d.role === roleFilter);
    }
    if (interviewIdFilter) {
      list = list.filter((d) => !d.interviewId || d.interviewId === interviewIdFilter);
    }
    return list;
  }

  public retrieveKnowledgeContext(
    queryText: string,
    targetDocIds?: string[],
    maxPassages: number = 3
  ): DocumentPassage[] {
    let candidatePassages = this.passages;

    if (targetDocIds && targetDocIds.length > 0) {
      candidatePassages = candidatePassages.filter((p) => targetDocIds.includes(p.docId));
    }

    if (candidatePassages.length === 0) return [];
    if (!queryText || queryText.trim().length === 0) {
      return candidatePassages.slice(0, maxPassages);
    }

    // Rank passages by keyword term frequency match
    const keywords = queryText
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 2);

    const scored = candidatePassages.map((passage) => {
      const contentLower = passage.content.toLowerCase();
      let matchScore = 0;

      for (const kw of keywords) {
        if (contentLower.includes(kw)) {
          matchScore += 1;
        }
      }

      // Bonus for role relevance
      if (passage.docRole === "job_description") matchScore += 0.5;
      if (passage.docRole === "candidate_resume") matchScore += 0.5;

      return { passage, score: matchScore };
    });

    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, maxPassages).map((item) => item.passage);
  }

  public clearAll(): void {
    this.documents.clear();
    this.passages = [];
  }
}

export const globalKnowledgeBase = new KnowledgeBaseEngine();
