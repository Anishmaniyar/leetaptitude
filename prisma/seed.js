import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

const topics = JSON.parse(
  fs.readFileSync("./prisma/data/topics.json", "utf-8"),
);

const subtopics = JSON.parse(
  fs.readFileSync("./prisma/data/subtopics.json", "utf-8"),
);

const questions = JSON.parse(
  fs.readFileSync("./prisma/data/questions.json", "utf-8"),
);

for (const topic of topics) {
  await prisma.topic.create({
    data: {
      title: topic.title,
      description: topic.description,
    },
  });
}

for (const subtopic of subtopics) {
  const existingTopic = await prisma.topic.findFirst({
    where: {
      title: subtopic.topicTitle,
    },
  });

  if (!existingTopic) {
    console.log(`Topic not found: ${subtopic.topicTitle}`);
    continue;
  }

  await prisma.subtopic.create({
    data: {
      title: subtopic.title,
      description: subtopic.description,

      topicId: existingTopic.id,
    },
  });
}

for (const question of questions) {
  const existingSubtopic = await prisma.subtopic.findFirst({
    where: {
      title: question.subtopicTitle,
    },
  });

  if (!existingSubtopic) {
    console.log(`Subtopic not found: ${question.subtopicTitle}`);
    continue;
  }

  // STEP 1 — Create question
  const createdQuestion = await prisma.question.create({
    data: {
      title: question.title,
      difficulty: question.difficulty,
      type: question.type,
      explanation: question.explanation,

      subtopicId: existingSubtopic.id,
    },
  });

  // STEP 2 — If MCQ, create options
  if (question.type === "MCQ") {
    for (const option of question.options) {
      await prisma.option.create({
        data: {
          text: option.text,
          isCorrect: option.isCorrect,

          questionId: createdQuestion.id,
        },
      });
    }
  }
}
