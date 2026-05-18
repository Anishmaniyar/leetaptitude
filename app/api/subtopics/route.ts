import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/utils/apiResponse";
import { ApiError } from "@/utils/apiError";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const topicId = searchParams.get("topicId");

    const subtopics = await prisma.subtopic.findMany({
      where: {
        topicId: topicId || undefined,
      },
      select: {
        id: true,
        title: true,
        description: true,
        topicId: true,
      },
    });

    const response = new ApiResponse(
      200,
      "Subtopics fetched successfully",
      subtopics,
    );

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    const error = new ApiError(500, "Error getting subtopics");

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: error.statusCode },
    );
  }
}
