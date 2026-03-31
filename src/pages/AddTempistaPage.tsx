import React from 'react';
import '../styles/AddTempistaPage.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TempistaForm, { type TempistaFormData } from '../components/TempistaForm';

interface AddTempistaPageProps {
  onNavigate?: (page: string) => void;
}

const AddTempistaPage: React.FC<AddTempistaPageProps> = ({ onNavigate }) => {
  const handleSubmit = (tempistaData: TempistaFormData) => {
    console.log('Nuevo tempista agregado:', tempistaData);
    // Aquí iría la lógica para guardar el tempista
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
