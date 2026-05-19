import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // =========================
  // TOPIC
  // =========================

  const aptitudeTopic = await prisma.topic.create({
    data: {
      title: "Quantitative Aptitude",
      description: "Arithmetic and quantitative problem solving questions",
    },
  });

  // =========================
  // SUBTOPICS
  // =========================

  const profitLoss = await prisma.subtopic.create({
    data: {
      title: "Profit & Loss",
      description: "Practice questions on profit, loss and percentages",
      topicId: aptitudeTopic.id,
    },
  });

  const percentages = await prisma.subtopic.create({
    data: {
      title: "Percentages",
      description: "Questions based on percentage calculations",
      topicId: aptitudeTopic.id,
    },
  });

  // =========================
  // QUESTIONS
  // =========================

  const question1 = await prisma.question.create({
    data: {
      title:
        "A shopkeeper buys an item for ₹500 and sells it for ₹600. Find the profit percentage.",

      type: "MCQ",

      difficulty: "EASY",

      explanation: "Profit = 100, Profit % = (100 / 500) × 100 = 20%",

      subtopicId: profitLoss.id,
    },
  });

  const question2 = await prisma.question.create({
    data: {
      title: "What is 25% of 200?",

      type: "NUMERIC",

      difficulty: "EASY",

      explanation: "25% of 200 = 50",

      subtopicId: percentages.id,
    },
  });

  // =========================
  // OPTIONS (FOR MCQ)
  // =========================

  await prisma.option.createMany({
    data: [
      {
        text: "10%",
        isCorrect: false,
        questionId: question1.id,
      },
      {
        text: "15%",
        isCorrect: false,
        questionId: question1.id,
      },
      {
        text: "20%",
        isCorrect: true,
        questionId: question1.id,
      },
      {
        text: "25%",
        isCorrect: false,
        questionId: question1.id,
      },
    ],
  });

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error("❌ Error while seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
