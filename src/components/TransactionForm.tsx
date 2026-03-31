import React, { useState, useEffect } from 'react';
import type { TransactionRequest } from '../types/api';
import type { TenpistaResponse } from '../types/api';
import { transactionRepository } from '../api/transactionRepository';
import { tenpistaRepository } from '../api/tenpistaRepository';
import '../styles/TransactionForm.css';

interface TransactionFormProps {
    onSubmit?: (transaction: TransactionRequest) => void | Promise<void>;
    onCancel?: () => void;
}

interface FormErrors {
    transactionId?: string;
    merchant?: string;
    amount?: string;
    transactionDate?: string;
    tenpistaId?: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        transactionId: '',
        merchant: '',
        amount: '',
        transactionDate: '',
        tenpistaId: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSaved, setIsSaved] = useState(false);
    const [tenpistas, setTenpistas] = useState<TenpistaResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Cargar tenpistas al montar el componente
    useEffect(() => {
        const loadTenpistas = async () => {
            try {
                setLoading(true);
                const data = await tenpistaRepository.getAllTenpistas();
                setTenpistas(data);
            } catch (error) {
                console.error('Error cargando tenpistas:', error);
            } finally {
                setLoading(false);
            }
        };
        loadTenpistas();
    }, []);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.transactionId.trim()) {
            newErrors.transactionId = 'Transaction ID is required';
        } else if (isNaN(Number(formData.transactionId))) {
            newErrors.transactionId = 'Transaction ID must be a number';
        } else if (Number(formData.transactionId) <= 0) {
            newErrors.transactionId = 'Transaction ID must be greater than 0';
        }

        if (!formData.merchant.trim()) {
            newErrors.merchant = 'Merchant name is required';
        }

        if (!formData.amount) {
            newErrors.amount = 'Amount is required';
        } else if (isNaN(Number(formData.amount))) {
            newErrors.amount = 'Amount must be a number';
        } else if (Number(formData.amount) <= 0) {
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

        if (!formData.tenpistaId) {
            newErrors.tenpistaId = 'Tenpista is required';
        } else if (isNaN(Number(formData.tenpistaId))) {
            newErrors.tenpistaId = 'Invalid tenpista';
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
        // Limpiar error cuando el usuario empieza a escribir
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const transactionRequest: TransactionRequest = {
                transactionId: Number(formData.transactionId),
                merchant: formData.merchant,
                amount: Number(formData.amount),
                tenpistaId: Number(formData.tenpistaId),
                transactionDate: new Date(formData.transactionDate).toISOString(),
            };

            await onSubmit?.(transactionRequest);
            setIsSaved(true);

            // Reset form después de un delay
            setTimeout(() => {
                setFormData({
                    transactionId: '',
                    merchant: '',
                    amount: '',
                    transactionDate: '',
                    tenpistaId: '',
                });
                setIsSaved(false);
            }, 1500);
        } catch (error) {
            console.error('Error enviando transacción:', error);
            setErrors({
                merchant: 'Error al enviar la transacción. Intenta de nuevo.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="transaction-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="transactionId" className="form-label">
                        Transaction ID <span className="required">*</span>
                    </label>
                    <div className="input-wrapper">
                        <input
                            type="number"
                            id="transactionId"
                            name="transactionId"
                            className={`form-input ${errors.transactionId ? 'error' : ''}`}
                            placeholder="e.g. 1001"
                            value={formData.transactionId}
                            onChange={handleInputChange}
                        />
                        {formData.transactionId && !errors.transactionId && (
                            <span className="input-indicator">✓</span>
                        )}
                    </div>
                    {errors.transactionId && (
                        <p className="form-error">{errors.transactionId}</p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="merchant" className="form-label">
                        Merchant <span className="required">*</span>
                    </label>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            id="merchant"
                            name="merchant"
                            className={`form-input ${errors.merchant ? 'error' : ''}`}
                            placeholder="e.g. Skyline Materials"
                            value={formData.merchant}
                            onChange={handleInputChange}
                        />
                        {formData.merchant && !errors.merchant && (
                            <span className="input-indicator">✓</span>
                        )}
                    </div>
                    {errors.merchant && (
                        <p className="form-error">{errors.merchant}</p>
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
                        placeholder="0"
                        step="1"
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
                <label htmlFor="tenpistaId" className="form-label">
                    Tenpista <span className="required">*</span>
                </label>
                <select
                    id="tenpistaId"
                    name="tenpistaId"
                    className={`form-select ${errors.tenpistaId ? 'error' : ''}`}
                    value={formData.tenpistaId}
                    onChange={handleInputChange}
                    disabled={loading}
                >
                    <option value="">
                        {loading ? 'Loading tenpistas...' : 'Select a Tenpista'}
                    </option>
                    {tenpistas.map((tenpista) => (
                        <option key={tenpista.id} value={tenpista.id}>
                            {tenpista.name}
                        </option>
                    ))}
                </select>
                {errors.tenpistaId && (
                    <p className="form-error">{errors.tenpistaId}</p>
                )}
            </div>

            <div className="form-footer">
                <div className="form-status">
                    {isSaved && (
                        <p className="status-message">✓ TRANSACTION CREATED SUCCESSFULLY</p>
                    )}
                </div>
                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn-cancel"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSaved || isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Create Transaction'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default TransactionForm;
