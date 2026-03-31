import React, { useState } from 'react';
import '../styles/AddTempistaPage.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TempistaForm from '../components/TempistaForm';
import { tempistaRepository } from '../api/tempistaRepository';
import type { TempistaRequest } from '../types/api';

interface AddTempistaPageProps {
  onNavigate?: (page: string) => void;
}

const AddTempistaPage: React.FC<AddTempistaPageProps> = ({ onNavigate }) => {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (tempistaData: TempistaRequest) => {
    try {
      setSubmitError(null);
      const response = await tempistaRepository.createTempista(tempistaData);
      console.log('Tempista creado exitosamente:', response);
      
      // Redirigir después de 1.5 segundos
      setTimeout(() => {
        onNavigate?.('tempistas');
      }, 1500);
    } catch (error: any) {
      const errorMessage = error.message || 'Error al crear el tempista';
      setSubmitError(errorMessage);
      console.error('Error al crear tempista:', error);
    }
  };

  const handleCancel = () => {
    onNavigate?.('tempistas');
  };

  return (
    <div className="add-tempista-page">
      <Sidebar activeItem="tempistas" onNavClick={onNavigate} />

      <main className="main-content">
        <Header
          title="Add New Tempista"
          description="Register a new team member to your architectural project workspace."
        />

        <div className="page-content">
          <div className="breadcrumb">
            <span className="breadcrumb-link">Tempistas</span>
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
