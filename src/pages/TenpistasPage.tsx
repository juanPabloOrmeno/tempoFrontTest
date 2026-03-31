import React, { useEffect, useState } from 'react';
import '../styles/TenpistasPage.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { tenpistaRepository } from '../api/tenpistaRepository';
import type { TenpistaResponse } from '../types/api';

interface TenpistasPageProps {
  onNavigate?: (page: string) => void;
}

const TenpistasPage: React.FC<TenpistasPageProps> = ({ onNavigate }) => {
  const [tenpistas, setTenpistas] = useState<TenpistaResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar tenpistas al montar el componente
  useEffect(() => {
    const loadTenpistas = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await tenpistaRepository.getAllTenpistas();
        setTenpistas(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar los tenpistas');
        console.error('Error cargando tenpistas:', err);
      } finally {
        setLoading(false);
      }
    };
    loadTenpistas();
  }, []);

  return (
    <div className="tenpistas-page">
      <Sidebar activeItem="tenpistas" onNavClick={onNavigate} />

      <main className="main-content">
        <Header
          title="Tenpistas"
          description="Manage your team members and collaborators."
          actionButton={{
            label: 'Add Tenpista',
            onClick: () => onNavigate?.('add-tenpista'),
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
              Cargando tenpistas...
            </div>
          ) : (
            <div className="tenpistas-grid">
              {tenpistas.length === 0 ? (
                <div className="empty-state" style={{ padding: '48px', textAlign: 'center', color: '#868e96' }}>
                  <p>No hay tenpistas registrados</p>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => onNavigate?.('add-tenpista')}
                    style={{ marginTop: '16px' }}
                  >
                    Crear primero
                  </button>
                </div>
              ) : (
                tenpistas.map((tenpista) => (
                  <div key={tenpista.id} className="tenpista-card">
                    <div className="tenpista-avatar">
                      {tenpista.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="tenpista-info">
                      <h3 className="tenpista-name">{tenpista.name}</h3>
                      <p className="tenpista-id">ID: {tenpista.id}</p>
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

export default TenpistasPage;
