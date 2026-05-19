import { NextResponse } from "next/server";
import { ApiResponse } from "@/utils/apiResponse";
import { ApiError } from "@/utils/apiError";
import { getStatsService } from "@/services/stats.service";

export async function GET() {
  try {
    const stats = await getStatsService();

    const response = new ApiResponse(200, "Stats fetched successfully", stats);

    return NextResponse.json(response, {
      status: 200,
    });
  } catch (err: any) {
    console.error(err);

    const error = new ApiError(500, "Error getting stats", err);

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
