export interface Receipt {
  id: string;
  imageUri: string[];
  date: string;
  amount: number;
  vendor: string;
  category: string;
  expenseNumber: string;
  notes: string;
  taxName: string;
  taxRate: number;
  paymentType: string;
}

export interface CSVRow {
  date: string;
  amount: string;
  vendor: string;
  category: string;
  expense_number: string;
  notes: string;
  tax_name: string;
  tax_rate: string;
  payment_type: string;
}

export interface ConfigType {
  taxName: string;
  taxRate: number;
  defaultPayment: string;
  defaultCategory: string;
}
