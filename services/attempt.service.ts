// src/services/attempt.service.ts
import { QuestionRepository } from "@/repository/question.repository";
import { AttemptRepository } from "@/repository/attempt.repository";
import { ApiError } from "@/utils/apiError";

const questionRepo = new QuestionRepository();
const attemptRepo = new AttemptRepository();

// Infers types directly from your validator data format
interface RecordAttemptInput {
  questionId: string;
  type: "MCQ" | "NUMERIC";
  selectedOptionId?: string;
  numericAnswer?: number;
}

export class AttemptService {
  async recordAttempt(data: RecordAttemptInput) {
    // 1. Fetch question via Repository
    const question = await questionRepo.findByIdWithOptions(data.questionId);
    if (!question) {
      throw new ApiError(404, "Question not found");
    }

    // 2. Check correctness (Core Business Logic)
    let isCorrect = false;
    if (data.type === "MCQ") {
      const correctOption = question.options.find(o => o.isCorrect);
      isCorrect = correctOption ? correctOption.id === data.selectedOptionId : false;
    } else {
      isCorrect = question.correctNumericAnswer === data.numericAnswer;
    }

    // 3. Store attempt via Repository
    const newAttempt = await attemptRepo.create({
      questionId: data.questionId,
      selectedOptionId: data.type === "MCQ" ? data.selectedOptionId : null,
      numericAnswer: data.type === "NUMERIC" ? data.numericAnswer : null,
      isCorrect,
    });

    return {
      isCorrect,
      attemptId: newAttempt.id,
      explanation: question.explanation,
    };
  }

  async getRecentAttempts(limit: number = 20) {
    const attempts = await attemptRepo.getRecent(limit);
    return attempts.map(att => ({
      id: att.id,
      questionTitle: att.question.title,
      isCorrect: att.isCorrect,
      timestamp: att.createdAt,
    }));
  }
}
