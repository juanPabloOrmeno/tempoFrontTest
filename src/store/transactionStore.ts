import { create } from 'zustand';
import type { Transaction, FilterState } from '../types/transaction';

interface TransactionState {
  // Estado
  transactions: Transaction[];
  currentPage: number;
  filters: FilterState;
  totalEntries: number;
  totalPages: number;

  // Acciones
  setTransactions: (transactions: Transaction[]) => void;
  setCurrentPage: (page: number) => void;
  setFilters: (filters: FilterState) => void;
  updateFilters: (filters: Partial<FilterState>) => void;
  setTotalEntries: (total: number) => void;
  setTotalPages: (pages: number) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  merchantName: '',
  dateRange: 'Last 30 Days',
  status: 'All Transactions',
};

export const useTransactionStore = create<TransactionState>((set, get) => ({
  // Estado inicial
  transactions: [
    {
      id: '1',
      date: 'Oct 24, 2023',
      time: '14:32 PM',
      merchant: 'Structura Blueprints Ltd.',
      merchantInvoice: 'Inv #88219',
      category: 'MATERIALS',
      amount: 1245.6,
      status: 'Success',
    },
    {
      id: '2',
      date: 'Oct 22, 2023',
      time: '09:15 AM',
      merchant: 'RenderCloud Pro',
      merchantInvoice: 'SaaS Subscription',
      category: 'SOFTWARE',
      amount: 299.0,
      status: 'Pending',
    },
    {
      id: '3',
      date: 'Oct 21, 2023',
      time: '16:45 PM',
      merchant: 'Logistics Hub',
      merchantInvoice: 'Shipping Fee',
      category: 'OPERATIONS',
      amount: 84.2,
      status: 'Success',
    },
    {
      id: '4',
      date: 'Oct 20, 2023',
      time: '11:02 AM',
      merchant: 'Global Surveys Inc.',
      merchantInvoice: 'Error Processing',
      category: 'FEES',
      amount: 2500.0,
      status: 'Failed',
    },
  ],
  currentPage: 1,
  filters: initialFilters,
  totalEntries: 482,
  totalPages: 48,

  // Acciones
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
    // Resetear a página 1 al aplicar filtros
    set({ currentPage: 1 });
    // Aquí iría la lógica para aplicar filtros a las transacciones
    const state = get();
    console.log('Filtros aplicados:', state.filters);
  },

  resetFilters: () =>
    set({
      filters: initialFilters,
      currentPage: 1,
    }),
}));
