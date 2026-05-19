// app/api/attempts/route.ts
import { NextResponse } from "next/server";
import { attemptSchema } from "@/lib/validators/attempts.validators";
import { ApiResponse } from "@/utils/apiResponse";
import { ApiError } from "@/utils/apiError";
import { AttemptService } from "@/services/attempt.service";

const attemptService = new AttemptService();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Input Validation
    const validation = attemptSchema.safeParse(body);
    if (!validation.success) {
      throw new ApiError(422, "Validation Error", validation.error);
    }

    // Delegate business operation to Service
    const result = await attemptService.recordAttempt(validation.data);

    // Return Uniform HTTP Response
    return NextResponse.json(
      new ApiResponse(201, "Attempt recorded successfully", result),
      { status: 201 },
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Internal Server Error",
      },
      { status: err.statusCode || 500 },
    );
  }
}
