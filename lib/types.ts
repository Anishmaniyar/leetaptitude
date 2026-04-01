export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  success: boolean;
  message: string;
  error?: string;
}

export type Category = 'Quant' | 'Logical' | 'Verbal' | 'DI';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  type: 'mcq' | 'numeric';
  category: Category;
  difficulty: Difficulty;
  tags: string[];
  options?: Option[];
}

export interface UserStats {
  totalSolved: number;
  totalCorrect: number;
  totalIncorrect: number;
  accuracy: number;
  currentStreak: number;
  lastActiveDate: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
}

export interface ActivityItem {
  id: string;
  questionName: string;
  isCorrect: boolean;
  timeTaken: string; // e.g., '2m 15s'
  date: string;
}

export interface CategoryStat {
  name: string;
  accuracy: number;
}

export interface HeatmapItem {
  date: string;
  count: number;
}

export interface TagStat {
  name: string;
  count: number;
  category: Category;
}
