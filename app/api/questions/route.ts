// src/app/api/questions/route.ts

import { NextResponse } from "next/server";

import { ApiResponse } from "@/utils/apiResponse";
import { ApiError } from "@/utils/apiError";

import { QuestionService } from "@/services/question.service";

const questionService = new QuestionService();

export async function GET(req: Request) {
  try {
    // 1. Read query params
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const subtopicId = searchParams.get("subtopicId") || undefined;

    // 2. Call service
    const data = await questionService.getPaginatedQuestions(page, limit, subtopicId);

    // 3. Return response
    const response = new ApiResponse(
      200,
      "Questions fetched successfully",
      data,
    );

    return NextResponse.json(response, {
      status: 200,
    });
  } catch (err: any) {
    const error = new ApiError(500, "Error getting questions", err);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: error.statusCode,
      },
    );
  }
}
