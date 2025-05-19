import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStore {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const secureStorage = {
  getItem: async (name: string) => {
    const value = await getItemAsync(name);
    return value ?? null;
  },
  setItem: async (name: string, value: string) => await setItemAsync(name, value),
  removeItem: async (name: string) => await deleteItemAsync(name),
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: 'secure-auth-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
