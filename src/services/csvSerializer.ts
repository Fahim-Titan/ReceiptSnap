import { Receipt, CSVRow } from '../types';

const HEADERS: (keyof CSVRow)[] = [
  'date',
  'amount',
  'vendor',
  'category',
  'expense_number',
  'notes',
  'tax_name',
  'tax_rate',
  'payment_type',
];

function escapeCell(value: string | undefined | null): string {
  if (!value) return '';
  // Wrap in quotes if value contains comma, quote, or newline
  if (/[,"\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function serialize(receipts: Receipt[]): string {
  const rows: CSVRow[] = receipts.map((r) => ({
    date: r.date,
    amount: typeof r.amount === 'number' && !isNaN(r.amount) ? r.amount.toFixed(2) : '0.00',
    vendor: r.vendor,
    category: r.category,
    expense_number: r.expenseNumber,
    notes: r.notes,
    tax_name: r.taxName,
    tax_rate: typeof r.taxRate === 'number' && !isNaN(r.taxRate) ? String(r.taxRate) : '0',
    payment_type: r.paymentType,
  }));

  const headerRow = HEADERS.join(',');
  const bodyRows = rows
    .map((row) => HEADERS.map((h) => escapeCell(row[h])).join(','))
    .join('\n');

  return headerRow + (bodyRows ? '\n' + bodyRows : '');
}
