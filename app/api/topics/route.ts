import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/utils/apiResponse";
import { ApiError } from "@/utils/apiError";
import { log } from "console";

export async function GET() {
  try {
    const topics = await prisma.topic.findMany({
      select: {
        id: true,
        title: true,
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
    console.log(err);
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
