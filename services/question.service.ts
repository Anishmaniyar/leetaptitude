// src/services/question.service.ts

import { QuestionRepository } from "@/repository/question.repository";

const questionRepository = new QuestionRepository();

export class QuestionService {
  async getPaginatedQuestions(page: number, limit: number, subtopicId?: string) {
    // 1. Get total question count
    const totalQuestions = await questionRepository.getTotalQuestionCount(subtopicId);

    // 2. Calculate pagination values
    const totalPages = Math.ceil(totalQuestions / limit);

    const itemsToSkip = (page - 1) * limit;

    // 3. Fetch paginated questions
    const questions = await questionRepository.getPaginatedQuestions(
      itemsToSkip,
      limit,
      subtopicId,
    );

    // 4. Return final formatted response
    return {
      questions,

      pagination: {
        page,
        limit,
        totalQuestions,
        totalPages,
      },
    };
  }
}
