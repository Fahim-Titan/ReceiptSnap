import { serialize } from '../src/services/csvSerializer';
import { Receipt } from '../src/types';

describe('csvSerializer', () => {
  it('serializes empty array to header only', () => {
    expect(serialize([])).toBe('date,amount,vendor,category,expense_number,notes,tax_name,tax_rate,payment_type');
  });

  it('serializes receipts to CSV string with correct formatting', () => {
    const receipts: Receipt[] = [
      {
        id: '1',
        imageUri: ['uri1'],
        date: '2025-03-28',
        amount: 45.67,
        vendor: 'Coffee Shop',
        category: 'Meals',
        expenseNumber: 'EXP-1001',
        notes: 'Client lunch',
        taxName: 'BC GST',
        taxRate: 5,
        paymentType: 'Credit Card',
      },
      {
        id: '2',
        imageUri: ['uri2'],
        date: '2025-03-29',
        amount: 100,
        vendor: 'Hardware Store, Inc.', // contains comma
        category: 'Supplies',
        expenseNumber: 'EXP-1002',
        notes: 'Keyboard "mechanical"', // contains quotes
        taxName: 'BC GST',
        taxRate: 5,
        paymentType: 'Debit Card',
      }
    ];

    const result = serialize(receipts);
    const lines = result.split('\n');

    expect(lines[0]).toBe('date,amount,vendor,category,expense_number,notes,tax_name,tax_rate,payment_type');
    expect(lines[1]).toBe('2025-03-28,45.67,Coffee Shop,Meals,EXP-1001,Client lunch,BC GST,5,Credit Card');
    expect(lines[2]).toBe('2025-03-29,100.00,"Hardware Store, Inc.",Supplies,EXP-1002,"Keyboard ""mechanical""",BC GST,5,Debit Card');
  });
});
