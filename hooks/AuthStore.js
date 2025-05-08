import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const secureStorage = {
  getItem: async (name) => {
    const value = await getItemAsync(name);
    return value ?? null;
  },
  setItem: async (name, value) => await setItemAsync(name, value),
  removeItem: async (name) => await deleteItemAsync(name),
};

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
      resetBears: () => {
        set({ bears: 0 });
        storage.removeItem('secure-storage'); // Elimina el almacenamiento | NO TIENE SENTIDO ESTA LINEA ES SOLO UNA DEMOSTRACION DE COMO SE USARIA EL removeItem
      },
    }),
    {
      name: 'secure-auth-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
