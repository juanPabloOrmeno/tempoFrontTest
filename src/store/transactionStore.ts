import { create } from 'zustand';
import type { Transaction, FilterState } from '../types/transaction';
import { transactionRepository } from '../api/transactionRepository';

interface TransactionState {
  // Estado
  transactions: Transaction[];
  currentPage: number;
  filters: FilterState;
  totalEntries: number;
  totalPages: number;
  loading: boolean;
  error: string | null;

  // Acciones
  setTransactions: (transactions: Transaction[]) => void;
  setCurrentPage: (page: number) => void;
  setFilters: (filters: FilterState) => void;
  updateFilters: (filters: Partial<FilterState>) => void;
  setTotalEntries: (total: number) => void;
  setTotalPages: (pages: number) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  
  // Acciones asincrónicas
  fetchTransactions: () => Promise<void>;
  addTransaction: (transaction: Transaction) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const initialFilters: FilterState = {
  merchantName: '',
  dateRange: 'Last 30 Days',
  status: 'All Transactions',
};

export const useTransactionStore = create<TransactionState>((set, get) => ({
  // Estado inicial
  transactions: [],
  currentPage: 1,
  filters: initialFilters,
  totalEntries: 0,
  totalPages: 0,
  loading: false,
  error: null,

  // Acciones síncronas
  setTransactions: (transactions) => set({ transactions }),

  setCurrentPage: (page) => set({ currentPage: page }),

  setFilters: (filters) => set({ filters }),

  updateFilters: (partialFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...partialFilters },
    })),

  setTotalEntries: (total) => set({ totalEntries: total }),

  setTotalPages: (pages) => set({ totalPages: pages }),

  applyFilters: () => {
    set({ currentPage: 1 });
    const state = get();
    console.log('Filtros aplicados:', state.filters);
  },

  resetFilters: () =>
    set({
      filters: initialFilters,
      currentPage: 1,
    }),

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
}));
