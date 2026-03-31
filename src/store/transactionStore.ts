import { create } from 'zustand';
import type { Transaction } from '../types/transaction';
import { transactionRepository } from '../api/tramsactionRepository';

interface TransactionState {
  // Estado
  transactions: Transaction[];
  currentPage: number;
  totalEntries: number;
  totalPages: number;
  loading: boolean;
  error: string | null;

  // Acciones
  setTransactions: (transactions: Transaction[]) => void;
  setCurrentPage: (page: number) => void;
  setTotalEntries: (total: number) => void;
  setTotalPages: (pages: number) => void;
  
  // Acciones asincrónicas
  fetchTransactions: () => Promise<void>;
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (transactionId: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  // Estado inicial
  transactions: [],
  currentPage: 1,
  totalEntries: 0,
  totalPages: 0,
  loading: false,
  error: null,

  // Acciones síncronas
  setTransactions: (transactions) => set({ transactions }),

  setCurrentPage: (page) => set({ currentPage: page }),

  setTotalEntries: (total) => set({ totalEntries: total }),

  setTotalPages: (pages) => set({ totalPages: pages }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  // Cargar transacciones del backend
  fetchTransactions: async () => {
    set({ loading: true, error: null });
    try {
      const data = await transactionRepository.getAllTransactions();
      set({
        transactions: data,
        totalEntries: data.length,
        totalPages: Math.ceil(data.length / 10),
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Error al cargar transacciones',
        loading: false,
      });
    }
  },

  // Agregar transacción a la lista local
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
      totalEntries: state.totalEntries + 1,
    })),

  // Eliminar transacción de la lista local
  removeTransaction: (transactionId: number) =>
    set((state) => ({
      transactions: state.transactions.filter(
        (t) => t.transactionId !== transactionId
      ),
      totalEntries: Math.max(0, state.totalEntries - 1),
    })),
}));
