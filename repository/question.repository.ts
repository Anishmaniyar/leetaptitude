// src/repositories/question.repository.ts
import { prisma } from "@/lib/prisma";

export class QuestionRepository {
  async findByIdWithOptions(id: string) {
    return await prisma.question.findUnique({
      where: { id },
      include: { options: true },
    });
  }
}
