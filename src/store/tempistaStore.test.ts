import { beforeEach, describe, expect, it, vi } from 'vitest';
import { tempistaRepository } from '../api/tempistaRepository';
import { useTempistaStore } from './tempistaStore';

vi.mock('../api/tempistaRepository', () => ({
  tempistaRepository: {
    getAllTempistas: vi.fn(),
  },
}));

const initialTempistaState = useTempistaStore.getState();

describe('tempistaStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useTempistaStore.setState(initialTempistaState);
  });

  it('adds a new tempista at the beginning of the list', () => {
    useTempistaStore.setState({
      tempistas: [{ id: 2, name: 'Luis' }],
    });

    useTempistaStore.getState().addTempista({ id: 1, name: 'Ana' });

    expect(useTempistaStore.getState().tempistas).toEqual([
      { id: 1, name: 'Ana' },
      { id: 2, name: 'Luis' },
    ]);
  });

  it('removes a tempista by id', () => {
    useTempistaStore.setState({
      tempistas: [
        { id: 1, name: 'Ana' },
        { id: 2, name: 'Luis' },
      ],
    });

    useTempistaStore.getState().removeTempista(1);

    expect(useTempistaStore.getState().tempistas).toEqual([
      { id: 2, name: 'Luis' },
    ]);
  });

  it('loads tempistas successfully', async () => {
    vi.mocked(tempistaRepository.getAllTempistas).mockResolvedValue([
      { id: 1, name: 'Ana' },
    ]);

    await useTempistaStore.getState().fetchTempistas();

    expect(tempistaRepository.getAllTempistas).toHaveBeenCalledTimes(1);
    expect(useTempistaStore.getState()).toMatchObject({
      tempistas: [{ id: 1, name: 'Ana' }],
      loading: false,
      error: null,
    });
  });

  it('stores the repository error when loading fails', async () => {
    vi.mocked(tempistaRepository.getAllTempistas).mockRejectedValue({
      message: 'Backend no disponible',
    });

    await useTempistaStore.getState().fetchTempistas();

    expect(useTempistaStore.getState()).toMatchObject({
      tempistas: [],
      loading: false,
      error: 'Backend no disponible',
    });
  });
});
