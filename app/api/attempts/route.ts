import { NextResponse } from "next/server";
import { attemptSchema } from "@/lib/validators/attempts.validators";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/utils/apiResponse";
import { ApiError } from "@/utils/apiError";
import { log } from "node:console";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = attemptSchema.safeParse(body);

    if (!validation.success) {
      throw new ApiError(422, "Validation Error", validation.error);
    }

    const data = validation.data;

    // 1. Fetch question
    const question = await prisma.question.findUnique({
      where: { id: data.questionId },
      include: { options: true },
    });

    if (!question) {
      throw new ApiError(404, "Question not found");
    }

    // 2. Check correctness
    let isCorrect = false;

    if (data.type === "MCQ") {
      isCorrect = question.correctOptionId === data.selectedOptionId;
    } else {
      isCorrect = question.correctNumericAnswer === data.numericAnswer;
    }

    // 3. Store attempt
    const newAttempt = await prisma.attempt.create({
      data: {
        questionId: data.questionId,
        selectedOptionId: data.type === "MCQ" ? data.selectedOptionId : null,
        numericAnswer: data.type === "NUMERIC" ? data.numericAnswer : null,
        isCorrect,
      },
    });

    return NextResponse.json(
      new ApiResponse(201, "Attempt recorded successfully", {
        isCorrect,
        attemptId: newAttempt.id,
      }),
      { status: 201 },
    );
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Internal Server Error",
      },
      { status: err.statusCode || 500 },
    );
  }
}
