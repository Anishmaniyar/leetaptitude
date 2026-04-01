import { ApiResponse, Question, UserStats, UserProfile, HeatmapItem, CategoryStat, ActivityItem, TagStat } from './types';

// Mock Delay to simulate network request
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const mockQuestions: Question[] = [
  {
    id: "q1",
    title: "Train Speed Calculation",
    description: "A train 150m long is running at a speed of 90 km/h. How much time will it take to cross a railway signal?",
    type: "mcq",
    category: "Quant",
    difficulty: "Easy",
    tags: ["Time and Distance", "Trains"],
    options: [
      { id: "o1", text: "5 seconds", isCorrect: false },
      { id: "o2", text: "6 seconds", isCorrect: true },
      { id: "o3", text: "8 seconds", isCorrect: false },
      { id: "o4", text: "10 seconds", isCorrect: false }
    ]
  },
  {
    id: "q2",
    title: "Syllogism Basics",
    description: "All men are mortal. Socrates is a man. Therefore...",
    type: "mcq",
    category: "Logical",
    difficulty: "Medium",
    tags: ["Syllogism"],
    options: [
      { id: "o1", text: "Socrates is mortal", isCorrect: true },
      { id: "o2", text: "Socrates is immortal", isCorrect: false },
      { id: "o3", text: "All mortals are men", isCorrect: false },
      { id: "o4", text: "Socrates is entirely conceptual", isCorrect: false }
    ]
  },
  {
    id: "q3",
    title: "Profit and Loss Scenario",
    description: "A person buys an article for $50 and sells it for $60. What is his profit percentage?",
    type: "mcq",
    category: "Quant",
    difficulty: "Easy",
    tags: ["Profit & Loss"],
    options: [
      { id: "o1", text: "10%", isCorrect: false },
      { id: "o2", text: "15%", isCorrect: false },
      { id: "o3", text: "20%", isCorrect: true },
      { id: "o4", text: "25%", isCorrect: false }
    ]
  },
  {
    id: "q4",
    title: "Data Interpretation Pie Chart",
    description: "If a pie chart shows expenses and rent is 90 degrees out of 360, what percentage of the total is rent?",
    type: "numeric",
    category: "DI",
    difficulty: "Easy",
    tags: ["Pie Charts"],
  }
];

export const mockStats: UserStats = {
  totalSolved: 145,
  totalCorrect: 121,
  totalIncorrect: 24,
  accuracy: 83.4,
  currentStreak: 12,
  lastActiveDate: new Date().toISOString()
};

export const mockTags: TagStat[] = [
  { name: "Profit & Loss", count: 25, category: "Quant" },
  { name: "Time and Distance", count: 18, category: "Quant" },
  { name: "Percentages", count: 32, category: "Quant" },
  { name: "Syllogism", count: 14, category: "Logical" },
  { name: "Blood Relations", count: 10, category: "Logical" },
  { name: "Reading Comprehension", count: 40, category: "Verbal" },
  { name: "Grammar", count: 60, category: "Verbal" },
  { name: "Pie Charts", count: 12, category: "DI" },
  { name: "Line Graphs", count: 8, category: "DI" }
];

export const mockHeatmap: HeatmapItem[] = Array.from({ length: 90 }).map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - i);
  return {
    date: d.toISOString().split('T')[0],
    count: Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0
  };
});

export const mockCategoryStats: CategoryStat[] = [
  { name: 'Quant', accuracy: 85 },
  { name: 'Logical', accuracy: 92 },
  { name: 'Verbal', accuracy: 78 },
  { name: 'DI', accuracy: 88 }
];

export const mockActivity: ActivityItem[] = [
  { id: "a1", questionName: "Train Speed Calculation", isCorrect: true, timeTaken: "1m 12s", date: "2 mins ago" },
  { id: "a2", questionName: "Syllogism Basics", isCorrect: false, timeTaken: "45s", date: "1 hour ago" },
  { id: "a3", questionName: "Profit and Loss Scenario", isCorrect: true, timeTaken: "2m 5s", date: "Yesterday" }
];

// Simulated API Endpoints
export const api = {
  async getQuestions(category?: string, difficulty?: string): Promise<ApiResponse<Question[]>> {
    await delay(800);
    if (Math.random() < 0.05) throw new Error("Failed to fetch questions");
    let filtered = mockQuestions;
    if (category) filtered = filtered.filter(q => q.category === category);
    if (difficulty) filtered = filtered.filter(q => q.difficulty === difficulty);
    return { success: true, message: "Questions fetched successfully", data: filtered };
  },

  async getQuestionById(id: string): Promise<ApiResponse<Question>> {
    await delay(600);
    const question = mockQuestions.find(q => q.id === id);
    if (!question) throw new Error("Question not found");
    return { success: true, message: "Question fetched completely", data: question };
  },

  async getStats(): Promise<ApiResponse<UserStats>> {
    await delay(500);
    return { success: true, message: "Stats fetched successfully", data: mockStats };
  },

  async getProfile(): Promise<ApiResponse<UserProfile>> {
    await delay(300);
    return { success: true, message: "Profile fetched successfully", data: { id: "u1", name: "Alex Coder", email: "alex@example.com", joinedDate: "Jan 2026" } };
  },

  async getHeatmap(): Promise<ApiResponse<HeatmapItem[]>> {
    await delay(400);
    return { success: true, message: "Heatmap fetched", data: mockHeatmap };
  },

  async getCategoryStats(): Promise<ApiResponse<CategoryStat[]>> {
    await delay(400);
    return { success: true, message: "Category stats fetched", data: mockCategoryStats };
  },

  async getActivity(): Promise<ApiResponse<ActivityItem[]>> {
    await delay(500);
    return { success: true, message: "Activity fetched", data: mockActivity };
  },

  async getTags(): Promise<ApiResponse<TagStat[]>> {
    await delay(600);
    return { success: true, message: "Tags fetched successfully", data: mockTags };
  },

  async submitAttempt(questionId: string, answerIdOrValue: string): Promise<ApiResponse<{isCorrect: boolean, explanation: string}>> {
    await delay(600);
    const question = mockQuestions.find(q => q.id === questionId);
    if (!question) throw new Error("Question not found");
    let isCorrect = false;
    let explanation = "";
    if (question.type === "mcq") {
      const selectedOption = question.options?.find(o => o.id === answerIdOrValue);
      isCorrect = !!selectedOption?.isCorrect;
      explanation = isCorrect 
        ? "Great job! The logic is verified." 
        : "Oops, that was incorrect. Remember to double-check the formula.";
    } else {
      isCorrect = answerIdOrValue === "25";
      explanation = isCorrect ? "Right on point!" : "Incorrect value. Rent is 90/360 * 100% = 25%.";
    }
    if (Math.random() < 0.05) throw new Error("Failed to submit attempt. Network error.");
    return { success: true, message: "Attempt submitted", data: { isCorrect, explanation } };
  }
}

