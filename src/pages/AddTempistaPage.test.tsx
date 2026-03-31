import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AddTempistaPage from './AddTempistaPage';
import { tempistaRepository } from '../api/tempistaRepository';

vi.mock('../api/tempistaRepository', () => ({
  tempistaRepository: {
    createTempista: vi.fn(),
  },
}));

describe('AddTempistaPage', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  it('creates a tempista and navigates back to the list after the success delay', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();

    vi.mocked(tempistaRepository.createTempista).mockResolvedValue({
      id: 1,
      name: 'Ana Perez',
    });

    render(<AddTempistaPage onNavigate={onNavigate} />);

    await user.type(screen.getByLabelText(/Tempista Name/i), 'Ana Perez');
    await user.click(screen.getByRole('button', { name: 'Create Tempista' }));

    await waitFor(() => {
      expect(tempistaRepository.createTempista).toHaveBeenCalledWith({
        name: 'Ana Perez',
      });
    });

    expect(screen.getByText(/TEMPISTA CREATED SUCCESSFULLY/i)).toBeInTheDocument();

    await waitFor(
      () => {
        expect(onNavigate).toHaveBeenCalledWith('tempistas');
      },
      { timeout: 2500 }
    );
  });

  it('shows the repository error when the create request fails', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();

    vi.mocked(tempistaRepository.createTempista).mockRejectedValue({
      message: 'No fue posible crear el tempista',
    });

    render(<AddTempistaPage onNavigate={onNavigate} />);

    await user.type(screen.getByLabelText(/Tempista Name/i), 'Ana Perez');
    await user.click(screen.getByRole('button', { name: 'Create Tempista' }));

    expect(
      await screen.findByText('No fue posible crear el tempista')
    ).toBeInTheDocument();
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('returns to the tempistas page when cancel is pressed', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();

    render(<AddTempistaPage onNavigate={onNavigate} />);

    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onNavigate).toHaveBeenCalledWith('tempistas');
  });
});
