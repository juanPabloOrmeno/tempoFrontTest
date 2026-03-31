import React, { useEffect } from 'react';
import '../styles/TransactionsPage.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import FilterPanel from '../components/FilterPanel';
import TransactionTable from '../components/TransactionTable';
import { useTransactionStore } from '../store/transactionStore';
import type { FilterState } from '../types/transaction';

interface TransactionsPageProps {
  onNavigate?: (page: string) => void;
}

const TransactionsPage: React.FC<TransactionsPageProps> = ({ onNavigate }) => {
  const {
    transactions,
    currentPage,
    filters,
    totalPages,
    loading,
    error,
    updateFilters,
    setCurrentPage,
    applyFilters,
    fetchTransactions,
  } = useTransactionStore();

  // Cargar transacciones cuando se monta el componente
  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleFilterChange = (newFilters: FilterState) => {
    updateFilters(newFilters);
  };

  const handleApplyFilters = () => {
    applyFilters();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="transactions-page">
      <Sidebar activeItem="transactions" onNavClick={onNavigate} />

      <main className="main-content">
        <Header
          title="Transactions"
          description="Manage and audit your architectural project expenses."
          actionButton={{
            label: 'New Transaction',
            onClick: () => onNavigate?.('add-transaction'),
          }}
        />

        <div className="page-content">
          <FilterPanel
            onFilterChange={handleFilterChange}
            onApplyFilters={handleApplyFilters}
          />

          {error && (
            <div className="error-message" style={{ padding: '16px', background: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '16px' }}>
              Error al cargar transacciones: {error}
            </div>
          )}

          {loading ? (
            <div className="loading-message" style={{ padding: '32px', textAlign: 'center', color: '#495057' }}>
              Cargando transacciones...
            </div>
          ) : (
            <TransactionTable
              transactions={transactions}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default TransactionsPage;
