// store.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useFriendStore = create(
  persist(
    (set) => ({
      usersData: [],
      setUsersData: (data:any) => set({ usersData: data }),
    }),
    {
      name: 'friend-data-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useFriendStore;
