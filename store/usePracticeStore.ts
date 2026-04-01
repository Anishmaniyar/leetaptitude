import { create } from 'zustand';
import { api } from '../lib/mock-api';
import { Question, UserStats, Category, Difficulty } from '../lib/types';

interface PracticeState {
  questions: Question[];
  stats: UserStats | null;
  isLoading: boolean;
  isLoadingStats: boolean;
  error: string | null;
  categoryFilter: Category | '';
  difficultyFilter: Difficulty | '';

  setCategoryFilter: (category: Category | '') => void;
  setDifficultyFilter: (difficulty: Difficulty | '') => void;
  fetchQuestions: () => Promise<void>;
  fetchStats: () => Promise<void>;
}

export const usePracticeStore = create<PracticeState>((set, get) => ({
  questions: [],
  stats: null,
  isLoading: false,
  isLoadingStats: false,
  error: null,
  categoryFilter: '',
  difficultyFilter: '',

  setCategoryFilter: (category) => set({ categoryFilter: category }),
  setDifficultyFilter: (difficulty) => set({ difficultyFilter: difficulty }),

  fetchQuestions: async () => {
    set({ isLoading: true, error: null });
    try {
      const { categoryFilter, difficultyFilter } = get();
      const res = await api.getQuestions(
        categoryFilter || undefined,
        difficultyFilter || undefined
      );
      set({ questions: res.data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch questions", isLoading: false });
    }
  },

  fetchStats: async () => {
    set({ isLoadingStats: true, error: null });
    try {
      const res = await api.getStats();
      set({ stats: res.data, isLoadingStats: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch stats", isLoadingStats: false });
    }
  }
}));
