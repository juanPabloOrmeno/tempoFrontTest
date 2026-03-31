import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import TempistasPage from './TempistasPage';
import { tempistaRepository } from '../api/tempistaRepository';
import { useTempistaStore } from '../store/tempistaStore';

vi.mock('../api/tempistaRepository', () => ({
  tempistaRepository: {
    getAllTempistas: vi.fn(),
    deleteTempista: vi.fn(),
  },
}));

const initialTempistaState = useTempistaStore.getState();

describe('TempistasPage', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    useTempistaStore.setState(initialTempistaState);
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('loads and renders the tempistas returned by the repository', async () => {
    vi.mocked(tempistaRepository.getAllTempistas).mockResolvedValue([
      { id: 1, name: 'Ana' },
      { id: 2, name: 'Luis' },
    ]);

    render(<TempistasPage />);

    expect(await screen.findByText('Ana')).toBeInTheDocument();
    expect(screen.getByText('Luis')).toBeInTheDocument();
  });

  it('navigates to the add tempista page from the empty state', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();

    vi.mocked(tempistaRepository.getAllTempistas).mockResolvedValue([]);

    render(<TempistasPage onNavigate={onNavigate} />);

    expect(
      await screen.findByText('No hay tempistas registrados')
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Crear primero' }));

    expect(onNavigate).toHaveBeenCalledWith('add-tempista');
  });

  it('deletes a tempista after confirmation and syncs the store action', async () => {
    const user = userEvent.setup();
    const removeTempista = vi.fn();

    useTempistaStore.setState({ removeTempista });
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    vi.mocked(tempistaRepository.getAllTempistas).mockResolvedValue([
      { id: 1, name: 'Ana' },
    ]);
    vi.mocked(tempistaRepository.deleteTempista).mockResolvedValue(undefined);

    render(<TempistasPage />);

    await user.click(await screen.findByTitle('Eliminar a Ana'));

    await waitFor(() => {
      expect(tempistaRepository.deleteTempista).toHaveBeenCalledWith(1);
    });

    expect(removeTempista).toHaveBeenCalledWith(1);

    await waitFor(() => {
      expect(screen.queryByText('Ana')).not.toBeInTheDocument();
    });
  });

  it('shows an error message when loading tempistas fails', async () => {
    vi.mocked(tempistaRepository.getAllTempistas).mockRejectedValue({
      message: 'Error de carga',
    });

    render(<TempistasPage />);

    expect(await screen.findByText('Error: Error de carga')).toBeInTheDocument();
  });
});
