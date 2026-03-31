import React from 'react';
import type { Transaction } from '../types/transaction';
import { useTransactionStore } from '../store/transactionStore';
import { transactionRepository } from '../api/tramsactionRepository';
import '../styles/TransactionRow.css';

interface TransactionRowProps {
  transaction: Transaction;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  const removeTransaction = useTransactionStore((state) => state.removeTransaction);
  const setError = useTransactionStore((state) => state.setError);

  // Formatear la fecha ISO a formato legible
  const formatDate = (isoDate: string): { date: string; time: string } => {
    const date = new Date(isoDate);
    return {
      date: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
    };
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        `¿Estás seguro de que deseas eliminar la transacción de ${transaction.merchant}?`
      )
    ) {
      return;
    }

    try {
      await transactionRepository.deleteTransaction(transaction.transactionId);
      removeTransaction(transaction.transactionId);
    } catch (error: any) {
      setError(
        error.message || 'Error al eliminar la transacción'
      );
    }
  };

  const { date, time } = formatDate(transaction.transactionDate);

  return (
    <tr className="transaction-row">
      <td className="cell-date" data-label="Date">
        <div>{date}</div>
        <div className="cell-time">{time}</div>
      </td>
      <td className="cell-merchant" data-label="Merchant">
        <div className="merchant-avatar">
          {transaction.merchant.charAt(0).toUpperCase()}
        </div>
        <div className="merchant-info">
          <div className="merchant-name">{transaction.merchant}</div>
          <div className="merchant-invoice">{transaction.tempistaName}</div>
        </div>
      </td>
      <td className="cell-amount" data-label="Amount">
        ${transaction.amount.toLocaleString('en-US')}
      </td>
      <td className="cell-status" data-label="Status">
        <span className="status-badge status-success">
          <span className="status-icon">✓</span>
          Completed
        </span>
      </td>
      <td className="cell-actions" data-label="Actions">
        <button
          className="action-btn"
          title="Eliminar transacción"
          onClick={handleDelete}
        >
          🗑️
        </button>
      </td>
    </tr>
  );
};

export default TransactionRow;
