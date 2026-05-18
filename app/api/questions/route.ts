import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/utils/apiResponse";
import { ApiError } from "@/utils/apiError";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const subtopicId = searchParams.get("subtopicId");

    const questions = await prisma.question.findMany({
      where: {
        subtopicId: subtopicId || undefined,
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
          },
        },
      },
    });

    const response = new ApiResponse(
      200,
      "Questions fetched successfully",
      questions,
    );

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
