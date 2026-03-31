/**
 * Tipos alineados con la API del TempoService
 * Sincronizados con los DTOs del backend
 */

export interface TransactionRequest {
  transactionId: number;
  amount: number;
  merchant: string;
  tenpistaId: number;
  transactionDate: string; // ISO format: "2026-03-28T15:30:00"
}

export interface TransactionResponse {
  transactionId: number;
  amount: number;
  merchant: string;
  tenpistaName: string;
  transactionDate: string; // ISO format
  createdAt: string; // ISO format
}

export interface TenpistaRequest {
  name: string;
}

export interface TenpistaResponse {
  id: number;
  name: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
