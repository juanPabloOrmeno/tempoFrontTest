import React from 'react';
import type { Transaction } from '../types/transaction';
import '../styles/TransactionRow.css';

interface TransactionRowProps {
  transaction: Transaction;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success':
        return 'status-success';
      case 'Pending':
        return 'status-pending';
      case 'Failed':
        return 'status-failed';
      default:
        return '';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      MATERIALS: 'category-materials',
      SOFTWARE: 'category-software',
      OPERATIONS: 'category-operations',
      FEES: 'category-fees',
    };
    return colors[category] || 'category-default';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Success':
        return '✓';
      case 'Pending':
        return '⊙';
      case 'Failed':
        return '⚠';
      default:
        return '';
    }
  };

  return (
    <tr className="transaction-row">
      <td className="cell-date" data-label="Date">
        <div>{transaction.date}</div>
        <div className="cell-time">{transaction.time}</div>
      </td>
      <td className="cell-merchant" data-label="Merchant">
        <div className="merchant-avatar">
          {transaction.merchant.charAt(0).toUpperCase()}
        </div>
        <div className="merchant-info">
          <div className="merchant-name">{transaction.merchant}</div>
          {transaction.merchantInvoice && (
            <div className="merchant-invoice">{transaction.merchantInvoice}</div>
          )}
        </div>
      </td>
      <td className="cell-category" data-label="Category">
        <span className={`category-badge ${getCategoryColor(transaction.category)}`}>
          {transaction.category}
        </span>
      </td>
      <td className="cell-amount" data-label="Amount">
        ${transaction.amount.toFixed(2)}
      </td>
      <td className="cell-status" data-label="Status">
        <span className={`status-badge ${getStatusColor(transaction.status)}`}>
          <span className="status-icon">{getStatusIcon(transaction.status)}</span>
          {transaction.status}
        </span>
      </td>
      <td className="cell-actions" data-label="Actions">
        <button className="action-btn" title="More actions">
          ⋮
        </button>
      </td>
    </tr>
  );
};

export default TransactionRow;
