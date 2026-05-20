import { NextResponse } from "next/server";
import { ApiResponse } from "@/utils/apiResponse";
import { ApiError } from "@/utils/apiError";
import { AttemptService } from "@/services/attempt.service";

const attemptService = new AttemptService();

export async function GET() {
  try {
    const data = await attemptService.getRecentAttempts();
    const response = new ApiResponse(200, "Recent attempts fetched successfully", data);
    return NextResponse.json(response, { status: 200 });
  } catch (err: any) {
    const error = new ApiError(500, "Error getting recent attempts", err);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: error.statusCode }
    );
  }
}
