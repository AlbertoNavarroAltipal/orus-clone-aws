// src/store/useLoadingStore.ts
import { create } from 'zustand';

interface LoadingStore {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));