import { create } from 'zustand';

type ObraSocialStore = {
  tieneObraSocial: boolean;
  setTieneObraSocial: (valor: boolean) => void;
  resetObraSocial: () => void;
};

export const useObraSocialStore = create<ObraSocialStore>((set) => ({
  tieneObraSocial: false,
  setTieneObraSocial: (valor) => set({ tieneObraSocial: valor }),
  resetObraSocial: () => set({ tieneObraSocial: false }),
}));