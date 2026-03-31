import React from 'react';
import type { Transaction } from '../types/transaction';
import '../styles/TransactionTable.css';
import TransactionRow from './TransactionRow';

interface TransactionTableProps {
  transactions: Transaction[];
  totalEntries?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  totalEntries = 482,
  currentPage = 1,
  totalPages = 48,
  onPageChange,
}) => {
  return (
    <div className="transaction-table-container">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>DATE</th>
            <th>MERCHANT</th>
            <th>AMOUNT</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.transactionId} transaction={transaction} />
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <div className="pagination-info">
          Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, totalEntries)} of {totalEntries} entries
        </div>

        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>

          {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
            const pageNum = currentPage - 1 + i;
            if (pageNum < 1) return null;
            return (
              <button
                key={pageNum}
                className={`pagination-btn page-num ${currentPage === pageNum ? 'active' : ''}`}
                onClick={() => onPageChange?.(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}

          {totalPages > 3 && (
            <>
              <span className="pagination-dots">•••</span>
              <button
                className="pagination-btn page-num"
                onClick={() => onPageChange?.(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            className="pagination-btn"
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
