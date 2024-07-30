
import {create} from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const useUserProfileStore = create(
  persist(
    (set) => ({
      userId: '',
      name: '',
      userDescription: '',
      nativeLanguage: [],
      fluentLanguagess: [],
      learningLanguagess: [],
      userInterests: [],
      isOnline: Boolean,
      profilePic: '',
      setUserId: (userId) => set({userId}),
      setName: (name) => set({ name }),
      setUserDescription: (userDescription) => set({ userDescription }),
      setNativeLanguage: (nativeLanguage) => set({ nativeLanguage }),
      setfluentLanguagess: (fluentLanguagess) => set({ fluentLanguagess }),
      setlearningLanguagess: (learningLanguagess) => set({ learningLanguagess }),
      setUserInterests: (userInterests) => set({ userInterests }),
      setIsOnline: (isOnline) => set({isOnline}),
      setProfilePic: (profilePic) => set({profilePic})
    }),
    {
      name: 'user-profile-storage', // Unique name for the storage
      storage: createJSONStorage(()=>localStorage)
    }
  )
)

export const useProfile = () => {
  return useUserProfileStore((state) => ({
    userId: state.userId,
    name: state.name,
    userDescription: state.userDescription,
    nativeLanguage: state.nativeLanguage,
    fluentLanguagess: state.fluentLanguagess,
    learningLanguagess: state.learningLanguagess,
    userInterests: state.userInterests,
    isOnline: state.isOnline,
    profilePic: state.profilePic
  }));
};

export default useUserProfileStore
