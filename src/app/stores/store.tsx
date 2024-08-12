// store.ts
import { create } from 'zustand';


interface UserProfile {
    name: string;
    userDescription: string;
    nativeLanguage: string[],
    fluentLanguagess: string[],
    learningLanguagess: string[],
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
