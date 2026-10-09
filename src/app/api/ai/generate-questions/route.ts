import { NextResponse } from "next/server";
import { generatePersonalizedQuestionsWithGemini } from "@/lib/gemini-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      role,
      category,
      difficulty,
      experienceLevel,
      candidateResumeText,
      jobDescriptionText,
      knowledgePassages,
      focusAreas,
    } = body;

    const questions = await generatePersonalizedQuestionsWithGemini({
      role: role || "Frontend Developer",
      category: category || "General Technical",
      difficulty: difficulty || "Medium",
      experienceLevel: experienceLevel || "Mid Level",
      candidateResumeText,
      jobDescriptionText,
      knowledgePassages,
      focusAreas,
    });

    const isAiGenerated = questions.length > 0 ? questions[0].isAiGenerated : false;
    const source = questions.length > 0 ? questions[0].source : "fallback";

    return NextResponse.json({ success: true, questions, isAiGenerated, source });
  } catch (error: any) {
    console.error("API /api/ai/generate-questions error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during question generation." },
      { status: 500 }
    );
  }
}
