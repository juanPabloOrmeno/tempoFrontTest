import React, { useEffect } from 'react';
import '../styles/TransactionsPage.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TransactionTable from '../components/TransactionTable';
import { useTransactionStore } from '../store/transactionStore';

interface TransactionsPageProps {
  onNavigate?: (page: string) => void;
}

const TransactionsPage: React.FC<TransactionsPageProps> = ({ onNavigate }) => {
  const {
    transactions,
    currentPage,
    totalPages,
    loading,
    error,
    setCurrentPage,
    fetchTransactions,
  } = useTransactionStore();

  // Cargar transacciones cuando se monta el componente
  useEffect(() => {
    fetchTransactions();
  }, []);

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
