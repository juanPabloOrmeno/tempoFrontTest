import React, { useState } from 'react';
import '../styles/AddTempistaPage.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TempistaForm from '../components/TempistaForm';
import { tenpistaRepository } from '../api/tenpistaRepository';
import type { TenpistaRequest } from '../types/api';

interface AddTempistaPageProps {
  onNavigate?: (page: string) => void;
}

const AddTempistaPage: React.FC<AddTempistaPageProps> = ({ onNavigate }) => {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (tenpistaData: TenpistaRequest) => {
    try {
      setSubmitError(null);
      const response = await tenpistaRepository.createTenpista(tenpistaData);
      console.log('Tenpista creado exitosamente:', response);
      
      // Redirigir después de 1.5 segundos
      setTimeout(() => {
        onNavigate?.('tenpistas');
      }, 1500);
    } catch (error: any) {
      const errorMessage = error.message || 'Error al crear el tenpista';
      setSubmitError(errorMessage);
      console.error('Error al crear tenpista:', error);
    }
  };

  const handleCancel = () => {
    onNavigate?.('tenpistas');
  };

  return (
    <div className="add-tempista-page">
      <Sidebar activeItem="tenpistas" onNavClick={onNavigate} />

      <main className="main-content">
        <Header
          title="Add New Tenpista"
          description="Register a new team member to your architectural project workspace."
        />

        <div className="page-content">
          <div className="breadcrumb">
            <span className="breadcrumb-link">Tenpistas</span>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-active">Add Member</span>
          </div>

          {submitError && (
            <div className="error-message" style={{ padding: '12px 16px', background: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '16px' }}>
              {submitError}
            </div>
          )}

          <TempistaForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </main>
    </div>
  );
};

export default AddTempistaPage;
