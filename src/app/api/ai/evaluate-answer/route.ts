import { NextResponse } from "next/server";
import { evaluateAnswerWithGemini } from "@/lib/gemini-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { questionId, questionText, candidateAnswer, expectedKeyPoints, resumeContext } = body;

    if (!questionText || !candidateAnswer) {
      return NextResponse.json(
        { error: "questionText and candidateAnswer strings are required." },
        { status: 400 }
      );
    }

    const evaluation = await evaluateAnswerWithGemini({
      questionId: questionId || "q1",
      questionText,
      candidateAnswer,
      expectedKeyPoints,
      resumeContext,
    });

    return NextResponse.json({ success: true, evaluation });
  } catch (error: any) {
    console.error("API /api/ai/evaluate-answer error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during answer evaluation." },
      { status: 500 }
    );
  }
}
