import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('./pages/TransactionsPage', () => ({
  default: ({ onNavigate }: { onNavigate?: (page: string) => void }) => (
    <div>
      <h1>Transactions Page</h1>
      <button onClick={() => onNavigate?.('tempistas')}>Go To Tempistas</button>
    </div>
  ),
}));

vi.mock('./pages/AddTransactionPage', () => ({
  default: ({ onNavigate }: { onNavigate?: (page: string) => void }) => (
    <div>
      <h1>Add Transaction Page</h1>
      <button onClick={() => onNavigate?.('transactions')}>Back To Transactions</button>
    </div>
  ),
}));

vi.mock('./pages/TempistasPage', () => ({
  default: ({ onNavigate }: { onNavigate?: (page: string) => void }) => (
    <div>
      <h1>Tempistas Page</h1>
      <button onClick={() => onNavigate?.('add-tempista')}>Go To Add Tempista</button>
    </div>
  ),
}));

vi.mock('./pages/AddTempistaPage', () => ({
  default: ({ onNavigate }: { onNavigate?: (page: string) => void }) => (
    <div>
      <h1>Add Tempista Page</h1>
      <button onClick={() => onNavigate?.('transactions')}>Back Home</button>
    </div>
  ),
}));

describe('App', () => {
  it('renders the transactions page by default', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Transactions Page' })).toBeInTheDocument();
  });

  it('navigates between pages when children request a page change', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Go To Tempistas' }));
    expect(screen.getByRole('heading', { name: 'Tempistas Page' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Go To Add Tempista' }));
    expect(screen.getByRole('heading', { name: 'Add Tempista Page' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Back Home' }));
    expect(screen.getByRole('heading', { name: 'Transactions Page' })).toBeInTheDocument();
  });
});
