import { NextResponse } from "next/server";
import { analyzeResumeWithGemini } from "@/lib/gemini-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { resumeText, jobDescriptionText, fileName } = body;

    if (!resumeText || typeof resumeText !== "string") {
      return NextResponse.json(
        { error: "resumeText string is required." },
        { status: 400 }
      );
    }

    const analysis = await analyzeResumeWithGemini(
      resumeText,
      jobDescriptionText,
      fileName || "Resume.pdf"
    );

    return NextResponse.json({
      success: true,
      analysis,
      isAiGenerated: analysis.isAiGenerated,
      source: analysis.source,
    });
  } catch (error: any) {
    console.error("API /api/ai/analyze-resume error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during resume analysis." },
      { status: 500 }
    );
  }
}
