import React from 'react';
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
    updateFilters,
    setCurrentPage,
    applyFilters,
  } = useTransactionStore();

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

          <TransactionTable
            transactions={transactions}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
};

export default TransactionsPage;
