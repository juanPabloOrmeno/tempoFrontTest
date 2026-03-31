import React, { useState } from 'react';
import '../styles/TempistaForm.css';

interface TempistaFormProps {
  onSubmit?: (tempista: TempistaFormData) => void;
  onCancel?: () => void;
}

export interface TempistaFormData {
  name: string;
  email: string;
  phone: string;
  specialty: string;
  bio: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  specialty?: string;
}

const TempistaForm: React.FC<TempistaFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<TempistaFormData>({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    bio: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaved, setIsSaved] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.specialty) {
      newErrors.specialty = 'Specialty is required';
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

    onSubmit?.(formData);
    setIsSaved(true);

    // Reset form after a short delay
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        specialty: '',
        bio: '',
      });
      setIsSaved(false);
    }, 1500);
  };

  return (
    <form className="tempista-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <input
              type="text"
              id="name"
              name="name"
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="e.g. John Smith"
              value={formData.name}
              onChange={handleInputChange}
            />
            {formData.name && <span className="input-indicator">✓</span>}
          </div>
          {errors.name && (
            <p className="form-error">{errors.name}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
            />
            {formData.email && !errors.email && (
              <span className="input-indicator">✓</span>
            )}
          </div>
          {errors.email && (
            <p className="form-error">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <p className="form-hint">Optional contact number</p>
        </div>

        <div className="form-group">
          <label htmlFor="specialty" className="form-label">
            Specialty <span className="required">*</span>
          </label>
          <select
            id="specialty"
            name="specialty"
            className={`form-select ${errors.specialty ? 'error' : ''}`}
            value={formData.specialty}
            onChange={handleInputChange}
          >
            <option value="">Select Specialty</option>
            <option value="architect">Architect</option>
            <option value="structural">Structural Engineer</option>
            <option value="mechanical">Mechanical Engineer</option>
            <option value="electrical">Electrical Engineer</option>
            <option value="designer">Interior Designer</option>
            <option value="project-manager">Project Manager</option>
          </select>
          {errors.specialty && (
            <p className="form-error">{errors.specialty}</p>
          )}
        </div>
      </div>

      <div className="form-group full-width">
        <label htmlFor="bio" className="form-label">
          Biography / Description
        </label>
        <textarea
          id="bio"
          name="bio"
          className="form-textarea"
          placeholder="Tell us about your experience, skills, and expertise..."
          value={formData.bio}
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
            {isSaved ? 'Saving...' : 'Save Tenpista'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TempistaForm;
