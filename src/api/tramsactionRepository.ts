/**
 * Transaction Repository
 * Encapsula todas las llamadas API relacionadas con transacciones
 */

import axiosClient from '../config/axiosClient';
import type { TransactionRequest, TransactionResponse } from '../types/api';

export const transactionRepository = {
  /**
   * Crear una nueva transacción
   * POST /transaction
   */
  createTransaction: async (transactionData: TransactionRequest): Promise<TransactionResponse> => {
    try {
      const response = await axiosClient.post<TransactionResponse>(
        '/transaction',
        transactionData
      );
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Error al crear transacción',
        status: error.response?.status,
      };
    }
  },

  /**
   * Obtener todas las transacciones
   * GET /transaction
   */
  getAllTransactions: async (): Promise<TransactionResponse[]> => {
    try {
      const response = await axiosClient.get<TransactionResponse[]>(
        '/transaction'
      );
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Error al obtener transacciones',
        status: error.response?.status,
      };
    }
  },

  /**
   * Obtener transacción por ID
   * GET /transaction/:transactionId
   */
  getTransactionById: async (transactionId: number): Promise<TransactionResponse> => {
    try {
      const response = await axiosClient.get<TransactionResponse>(
        `/transaction/${transactionId}`
      );
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || `Error al obtener transacción ${transactionId}`,
        status: error.response?.status,
      };
    }
  },

  /**
   * Eliminar transacción por ID
   * DELETE /transaction/:transactionId
   */
  deleteTransaction: async (transactionId: number): Promise<void> => {
    try {
      await axiosClient.delete(`/transaction/${transactionId}`);
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || `Error al eliminar transacción ${transactionId}`,
        status: error.response?.status,
      };
    }
  },
};
