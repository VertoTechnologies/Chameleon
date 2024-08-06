// store.ts (or .tsx)
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the type for the state
interface EmailStoreState {
  userEmail: string;
  otp: string;
  setUserEmail: (email: string) => void;
  setOtp: (otp: string) => void;
}

// Create the store with typed state and actions
const useEmailStore = create<EmailStoreState>()(
  persist(
    (set) => ({
      userEmail: '', // Initial state for userEmail
      otp: '',       // Initial state for otp
      setUserEmail: (email) => set({ userEmail: email }), // Action to set the email
      setOtp: (otp) => set({ otp: otp }), // Action to set the otp
    }),
    {
      name: 'email-otp-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useEmailStore;
