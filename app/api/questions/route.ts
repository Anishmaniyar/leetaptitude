import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/utils/apiResponse";
import { ApiError } from "@/utils/apiError";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const subtopicId = searchParams.get("subtopicId");

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const totalQuestions = await prisma.question.count();

    const totalPages = Math.ceil(totalQuestions / limit);
    const itemsToSkip = (page - 1) * limit;

    const questions = await prisma.question.findMany({
      skip: itemsToSkip,
      take: limit,
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        title: true,
        type: true,
        subtopicId: true,
        options: {
          select: {
            id: true,
            text: true,
            isCorrect: true,
          },
        },
      },
    });

    const pagination = {
      page,
      limit,
      totalQuestions,
      totalPages,
    };

    const response = new ApiResponse(200, "Questions fetched successfully", {
      questions,
      pagination,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (err: any) {
    const error = new ApiError(500, "Error getting questions", err);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: error.statusCode },
    );
  }
}
