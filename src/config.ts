export const Config = {
  taxName: process.env.EXPO_PUBLIC_TAX_NAME || 'BC GST',
  taxRate: Number(process.env.EXPO_PUBLIC_TAX_RATE) || 5,
  defaultPayment: process.env.EXPO_PUBLIC_DEFAULT_PAYMENT_TYPE || 'Credit Card',
  defaultCategory: 'Miscellaneous',
};
