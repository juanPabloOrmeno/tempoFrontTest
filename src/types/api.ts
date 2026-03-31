/**
 * Tipos alineados con la API del TempoService
 * Sincronizados con los DTOs del backend
 */

export interface TransactionRequest {
  transactionId: number;
  amount: number;
  merchant: string;
  tempistaId: number;
  transactionDate: string; // ISO format: "2026-03-28T15:30:00"
}

export interface TransactionResponse {
  transactionId: number;
  amount: number;
  merchant: string;
  tempistaName: string;
  transactionDate: string; // ISO format
  createdAt: string; // ISO format
}

export interface TempistaRequest {
  name: string;
}

export interface TempistaResponse {
  id: number;
  name: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
