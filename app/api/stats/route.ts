import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/utils/apiResponse";
import { ApiError } from "@/utils/apiError";
export async function GET() {
  try {
    const totalAttempts = await prisma.attempt.count();
    const correctAttempts = await prisma.attempt.count({
      where: {
        isCorrect: true,
      },
    });
    const accuracy =
      totalAttempts === 0 ? 0 : (correctAttempts / totalAttempts) * 100;
    const response = new ApiResponse(200, "Stats fetched successfully", {
      totalAttempts,
      correctAttempts,
      accuracy,
    });
    return NextResponse.json(response, { status: 200 });
  } catch (err: any) {
    const error = new ApiError(500, "Error getting stats", err);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: error.statusCode },
    );
  }
}
