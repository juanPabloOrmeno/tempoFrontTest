import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import TempistaForm from './TempistaForm';

describe('TempistaForm', () => {
  it('shows a validation error when the name is empty', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<TempistaForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button', { name: 'Create Tempista' }));

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits the typed tempista name', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<TempistaForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/Tempista Name/i), 'Ana Perez');
    await user.click(screen.getByRole('button', { name: 'Create Tempista' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ name: 'Ana Perez' });
    });

    expect(screen.getByText(/TEMPISTA CREATED SUCCESSFULLY/i)).toBeInTheDocument();
  });

  it('calls the cancel handler', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(<TempistaForm onCancel={onCancel} />);

    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
