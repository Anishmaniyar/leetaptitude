import { prisma } from "@/lib/prisma";

export async function getTotalAttempts() {
  return prisma.attempt.count();
}

export async function getCorrectAttempts() {
  return prisma.attempt.count({
    where: {
      isCorrect: true,
    },
  });
}
