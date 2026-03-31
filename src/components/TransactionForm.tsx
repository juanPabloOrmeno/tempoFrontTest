import React, { useState } from 'react';
import type { Transaction } from '../types/transaction';
import '../styles/TransactionForm.css';

interface TransactionFormProps {
  onSubmit?: (transaction: Omit<Transaction, 'id'>) => void;
  onCancel?: () => void;
}

interface FormErrors {
  merchantName?: string;
  category?: string;
  amount?: string;
  transactionDate?: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    merchantName: '',
    category: '',
    amount: '',
    transactionDate: '',
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaved, setIsSaved] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.merchantName.trim()) {
      newErrors.merchantName = 'Merchant name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.transactionDate) {
      newErrors.transactionDate = 'Transaction date is required';
    } else {
      const selectedDate = new Date(formData.transactionDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate > today) {
        newErrors.transactionDate = 'Future dates are not permitted';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const transaction: Omit<Transaction, 'id'> = {
      date: new Date(formData.transactionDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      merchant: formData.merchantName,
      category: formData.category,
      amount: parseFloat(formData.amount),
      status: 'Pending',
    };

    onSubmit?.(transaction);
    setIsSaved(true);

    // Reset form after a short delay
    setTimeout(() => {
      setFormData({
        merchantName: '',
        category: '',
        amount: '',
        transactionDate: '',
        notes: '',
      });
      setIsSaved(false);
    }, 1500);
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="merchantName" className="form-label">
            Merchant Name <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <input
              type="text"
              id="merchantName"
              name="merchantName"
              className={`form-input ${errors.merchantName ? 'error' : ''}`}
              placeholder="e.g. Skyline Materials"
              value={formData.merchantName}
              onChange={handleInputChange}
            />
            {formData.merchantName && (
              <span className="input-indicator">✓</span>
            )}
          </div>
          {!errors.merchantName && (
            <p className="form-hint">Full legal business name for the vendor.</p>
          )}
          {errors.merchantName && (
            <p className="form-error">{errors.merchantName}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category <span className="required">*</span>
          </label>
          <select
            id="category"
            name="category"
            className={`form-select ${errors.category ? 'error' : ''}`}
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            <option value="MATERIALS">Materials</option>
            <option value="SOFTWARE">Software</option>
            <option value="OPERATIONS">Operations</option>
            <option value="FEES">Fees</option>
          </select>
          {errors.category && (
            <p className="form-error">{errors.category}</p>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="amount" className="form-label">
            Amount <span className="required">*</span>
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className={`form-input ${errors.amount ? 'error' : ''}`}
            placeholder="0.00"
            step="0.01"
            value={formData.amount}
            onChange={handleInputChange}
          />
          {errors.amount && (
            <p className="form-error">{errors.amount}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="transactionDate" className="form-label">
            Transaction Date <span className="required">*</span>
          </label>
          <input
            type="date"
            id="transactionDate"
            name="transactionDate"
            className={`form-input ${errors.transactionDate ? 'error' : ''}`}
            value={formData.transactionDate}
            onChange={handleInputChange}
          />
          {errors.transactionDate && (
            <p className="form-error">{errors.transactionDate}</p>
          )}
        </div>
      </div>

      <div className="form-group full-width">
        <label htmlFor="notes" className="form-label">
          Additional Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          className="form-textarea"
          placeholder="Optional context or project references..."
          value={formData.notes}
          onChange={handleInputChange}
          rows={6}
        />
      </div>

      <div className="form-footer">
        <div className="form-status">
          {isSaved && (
            <p className="status-message">✓ DRAFT SAVED LOCALLY</p>
          )}
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSaved}
          >
            {isSaved ? 'Saving...' : 'Save Transaction'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TransactionForm;
