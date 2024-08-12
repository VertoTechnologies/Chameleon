// store.ts (or .tsx)
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the type for the state
interface SuggestionStoreState {
  suggestions: User[];  // Array to store all suggestions
  setSuggestions: (newSuggestions: User[]) => void; // Action to set all suggestions
  addSuggestion: (suggestion: User) => void; // Action to add a single suggestion
  clearSuggestions: () => void; // Action to clear all suggestions
}

// Define the User type based on your current code
interface User {
  userId: string;
  name: string;
  userDescription: string;
  nativeLanguage: string;
  fluentLanguagess: string[];
  learningLanguagess: string[];
  userInterests: string[];
  profilePic: string;
  purpose: string;
  learningLanguageRanks: Language[];
  fluentLanguageRanks: Language[];
}

interface Language {
  language: string;
  level: number;
}

// Create the store with typed state and actions
const useSuggestionStore = create<SuggestionStoreState>()(
  persist(
    (set) => ({
      suggestions: [], // Initial state for suggestions
      setSuggestions: (newSuggestions) => set({ suggestions: newSuggestions }), // Action to set all suggestions
      addSuggestion: (suggestion) => set((state) => ({ suggestions: [...state.suggestions, suggestion] })), 
      clearSuggestions: () => set({ suggestions: [] }), // Action to clear all suggestions
    }),
    {
      name: 'suggestions-storage', // Key for localStorage
      // storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);

export default useSuggestionStore;
