import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Language {
  language: string;
  level: number;
}


const useUserProfileStore = create(
  persist(
    (set) => ({
      userId: "",
      name: "",
      userDescription: "",
      nativeLanguage: [],
      fluentLanguagess: [],
      learningLanguagess: [],
      userInterests: [],
      isOnline: Boolean,
      profilePic: "", 
      purpose: "",
      learningLanguageRanks: [],
      fluentLanguageRanks: [],
      setUserId: (userId: string) => set({ userId }),
      setName: (name: string) => set({ name }),
      setUserDescription: (userDescription: string) => set({ userDescription }),
      setNativeLanguage: (nativeLanguage: string) => set({ nativeLanguage }),
      setfluentLanguagess: (fluentLanguagess: string[]) =>
        set({ fluentLanguagess }),
      setlearningLanguagess: (learningLanguagess: string[]) =>
        set({ learningLanguagess }),
      setUserInterests: (userInterests: string[]) => set({ userInterests }),
      setIsOnline: (isOnline: boolean) => set({ isOnline }),
      setProfilePic: (profilePic: string) => set({ profilePic }),
      setPurpose: (purpose: string) => set({ purpose }),
      setLearningLanguageRanks: (learningLanguageRanks: Language[])=>set({ learningLanguageRanks }),
      setFluentLanguageRanks: (fluentLanguageRanks: Language[])=>set({ fluentLanguageRanks })
    }),
    {
      name: "user-profile-storage", // Unique name for the storage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useProfile = () => {
  return useUserProfileStore((state: any) => ({
    userId: state.userId,
    name: state.name,
    userDescription: state.userDescription,
    nativeLanguage: state.nativeLanguage,
    fluentLanguagess: state.fluentLanguagess,
    learningLanguagess: state.learningLanguagess,
    userInterests: state.userInterests,
    isOnline: state.isOnline,
    profilePic: state.profilePic,
    purpose: state.purpose,
    learningLanguageRanks: state.learningLanguageRanks,
    fluentLanguageRanks: state.fluentLanguageRanks
  }));
};

export default useUserProfileStore;