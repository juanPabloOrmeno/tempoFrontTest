/**
 * Tipos del frontend adaptados para trabajar con la API
 */

export interface Transaction {
  transactionId: number;
  amount: number;
  merchant: string;
  tenpistaName: string;
  transactionDate: string; // ISO format
  createdAt: string; // ISO format
}

export interface FilterState {
  merchantName: string;
  dateRange: string;
  status: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}
