// store.ts
import { create } from 'zustand';
import createContext from 'zustand/context'


interface UserProfile {
    name: string;
    userDescription: string;
    nativeLanguage: string[],
    fluentLanguages: string[],
    learningLanguages: string[],
    userInterests: string[]
}

interface UserStore {
    profile: UserProfile | null;
    setProfile: (profile: UserProfile | null) => void;
}

export const useUserStore = create<UserStore>(
    
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
    }),
  );
