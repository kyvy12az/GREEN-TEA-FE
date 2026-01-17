import { create } from 'zustand';

export interface QuizAnswers {
  flavor: string;
  healthGoal: string;
  frequency: string;
  drinkTime: string;
  teaType: string;
}

export interface Recommendation {
  id: string;
  name: string;
  reason: string;
  matchScore: number;
  price: number;
  slug?: string;
  category?: string;
  image?: string | null;
}

interface RecommendationState {
  isModalOpen: boolean;
  currentStep: number;
  answers: Partial<QuizAnswers>;
  recommendations: Recommendation[];
  isLoading: boolean;
  error: string | null;
  
  openModal: () => void;
  closeModal: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setAnswer: (key: keyof QuizAnswers, value: string) => void;
  setRecommendations: (recommendations: Recommendation[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  isModalOpen: false,
  currentStep: 0,
  answers: {},
  recommendations: [],
  isLoading: false,
  error: null,
};

export const useRecommendationStore = create<RecommendationState>((set) => ({
  ...initialState,
  
  openModal: () => set({ isModalOpen: true, currentStep: 0, answers: {}, recommendations: [], error: null }),
  
  closeModal: () => set({ isModalOpen: false }),
  
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  
  prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
  
  setAnswer: (key, value) => set((state) => ({ 
    answers: { ...state.answers, [key]: value } 
  })),
  
  setRecommendations: (recommendations) => set({ recommendations }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  reset: () => set(initialState),
}));
