import React, { useState } from 'react';
import '../styles/AddTransactionPage.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TransactionForm from '../components/TransactionForm';
import { useTransactionStore } from '../store/transactionStore';
import { transactionRepository } from '../api/transactionRepository';
import type { TransactionRequest } from '../types/api';

interface AddTransactionPageProps {
  onNavigate?: (page: string) => void;
}

const AddTransactionPage: React.FC<AddTransactionPageProps> = ({ onNavigate }) => {
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (transactionRequest: TransactionRequest) => {
    try {
      setSubmitError(null);
      const response = await transactionRepository.createTransaction(transactionRequest);
      
      // Agregar la transacción a la lista local
      addTransaction(response);
      console.log('Transacción creada exitosamente:', response);
      
      // Redirigir después de 1.5 segundos
      setTimeout(() => {
        onNavigate?.('transactions');
      }, 1500);
    } catch (error: any) {
      const errorMessage = error.message || 'Error al crear la transacción';
      setSubmitError(errorMessage);
      console.error('Error al crear transacción:', error);
    }
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

          {submitError && (
            <div className="error-message" style={{ padding: '12px 16px', background: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '16px' }}>
              {submitError}
            </div>
          )}

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
