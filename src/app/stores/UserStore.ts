import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState = {
  userId: "",
  name: "",
  userDescription: "",
  nativeLanguage: [],
  fluentLanguagess: [],
  learningLanguagess: [],
  userInterests: [],
  isOnline: false,
  profilePic: "",
};

const useUserProfileStore = create(
  persist(
    (set) => ({
      ...initialState,
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
      reset: () => set(initialState),
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
  }));
};

export default useUserProfileStore;