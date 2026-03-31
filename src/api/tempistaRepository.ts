/**
 * Tempista Repository
 * Encapsula todas las llamadas API relacionadas con tempistas
 */

import axiosClient from '../config/axiosClient';
import type { TempistaRequest, TempistaResponse } from '../types/api';

export const tempistaRepository = {
  /**
   * Obtener todos los tempistas
   * GET /tempistas
   */
  getAllTempistas: async (): Promise<TempistaResponse[]> => {
    try {
      const response = await axiosClient.get<TempistaResponse[]>(
        '/tempistas'
      );
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Error al obtener tempistas',
        status: error.response?.status,
      };
    }
  },

  /**
   * Obtener tempista por nombre
   * GET /tempistas/:name
   */
  getTempistaByName: async (name: string): Promise<TempistaResponse> => {
    try {
      const response = await axiosClient.get<TempistaResponse>(
        `/tempistas/${encodeURIComponent(name)}`
      );
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || `Error al obtener tempista ${name}`,
        status: error.response?.status,
      };
    }
  },

  /**
   * Crear un nuevo tempista
   * POST /tempistas
   */
  createTempista: async (tempistaData: TempistaRequest): Promise<TempistaResponse> => {
    try {
      const response = await axiosClient.post<TempistaResponse>(
        '/tempistas',
        tempistaData
      );
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Error al crear tempista',
        status: error.response?.status,
      };
    }
  },

  /**
   * Eliminar tempista por ID
   * DELETE /tempistas/:id
   */
  deleteTempista: async (tempistaId: number): Promise<void> => {
    try {
      await axiosClient.delete(`/tempistas/${tempistaId}`);
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || `Error al eliminar tempista ${tempistaId}`,
        status: error.response?.status,
      };
    }
  },
};
