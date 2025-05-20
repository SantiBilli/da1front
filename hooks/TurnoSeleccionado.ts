import { create } from 'zustand';

type TurnoStore = {
  diaSeleccionado: string;
  horaSeleccionada: string;
  idTurnoSeleccionado: string;
  setDia: (dia: string) => void;
  setHora: (hora: string) => void;
  setIdTurno: (id: string) => void;
  resetTurno: () => void;
};

export const useTurnoStore = create<TurnoStore>((set) => ({
  diaSeleccionado: '',
  horaSeleccionada: '',
  idTurnoSeleccionado: '',

  setDia: (dia) => set({ diaSeleccionado: dia }),
  setHora: (hora) => set({ horaSeleccionada: hora }),
  setIdTurno: (id) => set({ idTurnoSeleccionado: id }),

  resetTurno: () =>
    set({
      diaSeleccionado: '',
      horaSeleccionada: '',
      idTurnoSeleccionado: '',
    }),
}));
