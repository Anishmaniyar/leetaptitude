import {
  getTotalAttempts,
  getCorrectAttempts,
} from "@/repository/stats.repository";

export async function getStatsService() {
  const totalAttempts = await getTotalAttempts();

  const correctAttempts = await getCorrectAttempts();

  const accuracy =
    totalAttempts === 0
      ? 0
      : Number(((correctAttempts / totalAttempts) * 100).toFixed(2));

  return {
    totalAttempts,
    correctAttempts,
    accuracy,
  };
}
