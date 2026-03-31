import React from 'react';
import '../styles/AddTransactionPage.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TransactionForm from '../components/TransactionForm';
import { useTransactionStore } from '../store/transactionStore';
import type { Transaction } from '../types/transaction';

interface AddTransactionPageProps {
  onNavigate?: (page: string) => void;
}

const AddTransactionPage: React.FC<AddTransactionPageProps> = ({ onNavigate }) => {
  const addTransaction = useTransactionStore((state) => state.setTransactions);
  const transactions = useTransactionStore((state) => state.transactions);

  const handleSubmit = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      id: `${Date.now()}`,
      ...transactionData,
    };

    addTransaction([...transactions, newTransaction]);
    console.log('Nueva transacción agregada:', newTransaction);
  };

  const handleCancel = () => {
    onNavigate?.('transactions');
  };

  return (
    <div className="add-transaction-page">
      <Sidebar activeItem="transactions" onNavClick={onNavigate} />

      <main className="main-content">
        <Header
          title="Create New Transaction"
          description="Input your expense or income details to keep your architectural project ledger accurate and up-to-date."
        />

        <div className="page-content">
          <div className="breadcrumb">
            <span className="breadcrumb-link">Transactions</span>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-active">Add Record</span>
          </div>

          <TransactionForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </main>
    </div>
  );
};

export default AddTransactionPage;
