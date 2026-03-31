import React, { useState } from 'react';
import type { TenpistaRequest } from '../types/api';
import '../styles/TempistaForm.css';

interface TempistaFormProps {
  onSubmit?: (tenpista: TenpistaRequest) => void | Promise<void>;
  onCancel?: () => void;
}

interface FormErrors {
  name?: string;
}

const TempistaForm: React.FC<TempistaFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
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
      const tenpistaRequest: TenpistaRequest = {
        name: formData.name,
      };

      await onSubmit?.(tenpistaRequest);
      setIsSaved(true);

      setTimeout(() => {
        setFormData({ name: '' });
        setIsSaved(false);
      }, 1500);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="tempista-form" onSubmit={handleSubmit}>
      <div className="form-group full-width">
        <label htmlFor="name" className="form-label">
          Tenpista Name <span className="required">*</span>
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            id="name"
            name="name"
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="e.g. Juan Pérez"
            value={formData.name}
            onChange={handleInputChange}
          />
          {formData.name && !errors.name && (
            <span className="input-indicator">✓</span>
          )}
        </div>
        {!errors.name && (
          <p className="form-hint">Full legal name of the team member.</p>
        )}
        {errors.name && (
          <p className="form-error">{errors.name}</p>
        )}
      </div>

      <div className="form-footer">
        <div className="form-status">
          {isSaved && (
            <p className="status-message">✓ TENPISTA CREATED SUCCESSFULLY</p>
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
            {isSubmitting ? 'Creating...' : 'Create Tenpista'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TempistaForm;
