import { prisma } from "@/lib/prisma";

export class QuestionRepository {
  async findByIdWithOptions(id: string) {
    return await prisma.question.findUnique({
      where: { id },
      include: { options: true },
    });
  }

  async getTotalQuestionCount(subtopicId?: string) {
    return await prisma.question.count({
      where: {
        subtopicId: subtopicId || undefined,
      },
    });
  }

  async getPaginatedQuestions(skip: number, limit: number, subtopicId?: string) {
    return await prisma.question.findMany({
      where: {
        subtopicId: subtopicId || undefined,
      },
      skip,
      take: limit,

      orderBy: {
        id: "asc",
      },

      select: {
        id: true,
        title: true,
        type: true,
        subtopicId: true,

        options: {
          select: {
            id: true,
            text: true,
            isCorrect: true,
          },
        },
      },
    });
  }
}
