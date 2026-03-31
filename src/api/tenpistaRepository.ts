/**
 * Tenpista Repository
 * Encapsula todas las llamadas API relacionadas con tenpistas
 */

import axiosClient from '../config/axiosClient';
import type { TenpistaRequest, TenpistaResponse } from '../types/api';

export const tenpistaRepository = {
  /**
   * Obtener todos los tenpistas
   * GET /tenpistas
   */
  getAllTenpistas: async (): Promise<TenpistaResponse[]> => {
    try {
      const response = await axiosClient.get<TenpistaResponse[]>(
        '/tenpistas'
      );
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Error al obtener tenpistas',
        status: error.response?.status,
      };
    }
  },

  /**
   * Obtener tenpista por nombre
   * GET /tenpistas/:name
   */
  getTenpistaByName: async (name: string): Promise<TenpistaResponse> => {
    try {
      const response = await axiosClient.get<TenpistaResponse>(
        `/tenpistas/${encodeURIComponent(name)}`
      );
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || `Error al obtener tenpista ${name}`,
        status: error.response?.status,
      };
    }
  },

  /**
   * Crear un nuevo tenpista
   * POST /tenpistas
   */
  createTenpista: async (tenpistaData: TenpistaRequest): Promise<TenpistaResponse> => {
    try {
      const response = await axiosClient.post<TenpistaResponse>(
        '/tenpistas',
        tenpistaData
      );
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Error al crear tenpista',
        status: error.response?.status,
      };
    }
  },
};
