import { create } from 'zustand';
import { tempistaRepository } from '../api/tempistaRepository';
import type { TempistaResponse } from '../types/api';

interface TempistaState {
  // Estado
  tempistas: TempistaResponse[];
  loading: boolean;
  error: string | null;

  // Acciones síncronas
  setTempistas: (tempistas: TempistaResponse[]) => void;
  addTempista: (tempista: TempistaResponse) => void;
  removeTempista: (tempistaId: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Acciones asincrónicas
  fetchTempistas: () => Promise<void>;
}

export const useTempistaStore = create<TempistaState>((set) => ({
  // Estado inicial
  tempistas: [],
  loading: false,
  error: null,

  // Acciones síncronas
  setTempistas: (tempistas) => set({ tempistas }),

  addTempista: (tempista) =>
    set((state) => ({
      tempistas: [tempista, ...state.tempistas],
    })),

  removeTempista: (tempistaId: number) =>
    set((state) => ({
      tempistas: state.tempistas.filter((t) => t.id !== tempistaId),
    })),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  // Cargar tempistas del backend
  fetchTempistas: async () => {
    set({ loading: true, error: null });
    try {
      const data = await tempistaRepository.getAllTempistas();
      set({
        tempistas: data,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Error al cargar tempistas',
        loading: false,
      });
    }
  },
}));
