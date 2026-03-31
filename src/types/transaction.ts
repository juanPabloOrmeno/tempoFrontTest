export interface Transaction {
  id: string;
  date: string;
  time: string;
  merchant: string;
  merchantInvoice?: string;
  category: string;
  amount: number;
  status: 'Success' | 'Pending' | 'Failed';
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
