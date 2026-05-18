import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/utils/apiResponse";
import { ApiError } from "@/utils/apiError";

export async function GET() {
  try {
    const topics = await prisma.topic.findMany({
      select: {
        id: true,
        topic: true,
        description: true,
      },
    });

    const response = new ApiResponse(
      200,
      "Topics fetched successfully",
      topics,
    );

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    const error = new ApiError(500, "Error fetching topics");

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: error.statusCode },
    );
  }
}
