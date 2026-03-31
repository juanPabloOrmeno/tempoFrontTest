import React, { useEffect, useState } from 'react';
import '../styles/TenpistasPage.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { tempistaRepository } from '../api/tempistaRepository';
import { useTempistaStore } from '../store/tempistaStore';
import type { TempistaResponse } from '../types/api';

interface TempistasPageProps {
  onNavigate?: (page: string) => void;
}

const TempistasPage: React.FC<TempistasPageProps> = ({ onNavigate }) => {
  const [tempistas, setTempistas] = useState<TempistaResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const removeTempista = useTempistaStore((state) => state.removeTempista);

  // Cargar tempistas al montar el componente
  useEffect(() => {
    const loadTempistas = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await tempistaRepository.getAllTempistas();
        setTempistas(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar los tempistas');
        console.error('Error cargando tempistas:', err);
      } finally {
        setLoading(false);
      }
    };
    loadTempistas();
  }, []);

  const handleDeleteTempista = async (tempista: TempistaResponse) => {
    if (
      !window.confirm(
        `¿Estás seguro de que deseas eliminar a ${tempista.name}?`
      )
    ) {
      return;
    }

    try {
      await tempistaRepository.deleteTempista(tempista.id);
      setTempistas((prev) => prev.filter((t) => t.id !== tempista.id));
      removeTempista(tempista.id);
    } catch (err: any) {
      setError(err.message || `Error al eliminar a ${tempista.name}`);
      console.error('Error eliminando tempista:', err);
    }
  };

  return (
    <div className="tempistas-page">
      <Sidebar activeItem="tempistas" onNavClick={onNavigate} />

      <main className="main-content">
        <Header
          title="Tempistas"
          description="Manage your team members and collaborators."
          actionButton={{
            label: 'Add Tempista',
            onClick: () => onNavigate?.('add-tempista'),
          }}
        />

        <div className="page-content">
          {error && (
            <div className="error-message" style={{ padding: '16px', background: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '16px' }}>
              Error: {error}
            </div>
          )}

          {loading ? (
            <div className="loading-message" style={{ padding: '32px', textAlign: 'center', color: '#495057' }}>
              Cargando tempistas...
            </div>
          ) : (
            <div className="tempistas-grid">
              {tempistas.length === 0 ? (
                <div className="empty-state" style={{ padding: '48px', textAlign: 'center', color: '#868e96' }}>
                  <p>No hay tempistas registrados</p>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => onNavigate?.('add-tempista')}
                    style={{ marginTop: '16px' }}
                  >
                    Crear primero
                  </button>
                </div>
              ) : (
                tempistas.map((tempista) => (
                  <div key={tempista.id} className="tempista-card">
                    <div className="tempista-card-header">
                      <div className="tempista-avatar">
                        {tempista.name.charAt(0).toUpperCase()}
                      </div>
                      <button
                        className="tempista-delete-btn"
                        onClick={() => handleDeleteTempista(tempista)}
                        title={`Eliminar a ${tempista.name}`}
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="tempista-info">
                      <h3 className="tempista-name">{tempista.name}</h3>
                      <p className="tempista-id">ID: {tempista.id}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TempistasPage;
