import AsyncStorage from '@react-native-async-storage/async-storage';
import { Receipt } from '../types';

const KEYS = {
  QUEUE:   'receipt_queue',
  COUNTER: 'expense_counter',
} as const;

const INITIAL_COUNTER = 1000;

// ─── Queue ────────────────────────────────────────────────────────────────────

export async function saveQueue(receipts: Receipt[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.QUEUE, JSON.stringify(receipts));
}

export async function loadQueue(): Promise<Receipt[]> {
  const raw = await AsyncStorage.getItem(KEYS.QUEUE);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Receipt[];
  } catch {
    return [];
  }
}

export async function clearQueue(): Promise<void> {
  await AsyncStorage.removeItem(KEYS.QUEUE);
}

// ─── Expense counter ──────────────────────────────────────────────────────────

export async function loadCounter(): Promise<number> {
  const raw = await AsyncStorage.getItem(KEYS.COUNTER);
  if (!raw) return INITIAL_COUNTER;
  const n = parseInt(raw, 10);
  return isNaN(n) ? INITIAL_COUNTER : n;
}

export async function saveCounter(n: number): Promise<void> {
  await AsyncStorage.setItem(KEYS.COUNTER, String(n));
}
