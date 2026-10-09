import { NextResponse } from "next/server";
import mammoth from "mammoth";
import { validateDocumentFile, createProcessedDocument, chunkDocumentText } from "@/lib/document-processing";
import { DocumentRole } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const role = (formData.get("role") as DocumentRole) || "knowledge_base";
    const interviewId = (formData.get("interviewId") as string) || undefined;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    // Validate file type & size
    const validation = validateDocumentFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    let extractedText = "";
    let requiresOcr = false;

    const extension = "." + file.name.split(".").pop()?.toLowerCase();

    if (extension === ".pdf" || file.type === "application/pdf") {
      try {
        const pdfParse = require("pdf-parse");
        const pdfData = await pdfParse(fileBuffer);
        extractedText = pdfData.text || "";
        if (extractedText.trim().length < 20) {
          requiresOcr = true;
        }
      } catch (pdfErr) {
        console.error("PDF extraction error:", pdfErr);
        requiresOcr = true;
      }
    } else if (
      extension === ".docx" ||
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      try {
        const result = await mammoth.extractRawText({ buffer: fileBuffer });
        extractedText = result.value || "";
      } catch (docxErr) {
        console.error("DOCX extraction error:", docxErr);
        return NextResponse.json(
          { error: "Failed to extract text from DOCX file." },
          { status: 500 }
        );
      }
    } else {
      // .txt, .md, plain text
      extractedText = fileBuffer.toString("utf-8");
    }

    const docId = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const statusOverride = requiresOcr ? "requires_ocr" : undefined;
    const errorMessage = requiresOcr
      ? "Document contains minimal extractable text. Scanned or image-based PDF detected (requires OCR)."
      : undefined;

    const processedDoc = createProcessedDocument(
      docId,
      { name: file.name, size: file.size, type: file.type },
      role,
      extractedText,
      statusOverride,
      errorMessage,
      interviewId
    );

    const passages = chunkDocumentText(docId, file.name, role, processedDoc.extractedText);

    return NextResponse.json({
      success: true,
      document: processedDoc,
      passages,
    });
  } catch (error: any) {
    console.error("Document parsing error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during document parsing." },
      { status: 500 }
    );
  }
}
