import { z } from "zod";

export const attemptSchema = z.discriminatedUnion("type", [
  // MCQ Attempt
  z.object({
    type: z.literal("MCQ"),

    questionId: z.string().min(1, "Question ID is required"),

    selectedOptionId: z.string().min(1, "Option ID is required"),
  }),

  // Numeric Attempt
  z.object({
    type: z.literal("NUMERIC"),

    questionId: z.string().min(1, "Question ID is required"),

    numericAnswer: z.number(),
  }),
]);
