// src/repositories/attempt.repository.ts
import { prisma } from "@/lib/prisma";

// Use a type or interface for incoming clean data
interface CreateAttemptInput {
  questionId: string;
  selectedOptionId?: string | null;
  numericAnswer?: number | null;
  isCorrect: boolean;
}

export class AttemptRepository {
  async create(data: CreateAttemptInput) {
    return await prisma.attempt.create({
      data: {
        questionId: data.questionId,
        selectedOptionId: data.selectedOptionId ?? null,
        numericAnswer: data.numericAnswer ?? null,
        isCorrect: data.isCorrect,
      },
    });
  }

  async getRecent(limit: number) {
    return await prisma.attempt.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      include: {
        question: {
          select: {
            title: true,
          },
        },
      },
    });
  }
}
