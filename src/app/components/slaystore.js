import {create} from 'zustand'
import { persist } from 'zustand/middleware'

const useUserProfileStore = create(
  persist(
    (set) => ({
      name: '',
      userDescription: '',
      nativeLanguage: [],
      fluentLanguages: [],
      learningLanguages: [],
      userInterests: [],
      setName: (name) => set({ name }),
      setUserDescription: (userDescription) => set({ userDescription }),
      setNativeLanguage: (nativeLanguage) => set({ nativeLanguage }),
      setFluentLanguages: (fluentLanguages) => set({ fluentLanguages }),
      setLearningLanguages: (learningLanguages) => set({ learningLanguages }),
      setUserInterests: (userInterests) => set({ userInterests }),
    }),
    {
      name: 'user-profile-storage', // Unique name for the storage
    }
  )
)

export const useProfile = () => {
  return useUserProfileStore((state) => ({
    name: state.name,
    userDescription: state.userDescription,
    nativeLanguage: state.nativeLanguage,
    fluentLanguages: state.fluentLanguages,
    learningLanguages: state.learningLanguages,
    userInterests: state.userInterests,
  }));
};

export default useUserProfileStore
