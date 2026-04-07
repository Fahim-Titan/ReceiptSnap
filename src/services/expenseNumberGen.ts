import { Config } from '../config';
import { loadCounter, saveCounter } from './storageService';

/**
 * Returns the next sequential expense number (e.g. "EXP-1001") and
 * persists the incremented counter to AsyncStorage.
 */
export async function nextExpenseNumber(): Promise<string> {
  const counter = await loadCounter();
  const next = counter + 1;
  await saveCounter(next);
  return `${Config.expensePrefix ?? 'EXP'}-${next}`;
}

/** Pure formatter — does not touch storage. */
export function formatExpenseNumber(counter: number): string {
  return `${Config.expensePrefix ?? 'EXP'}-${counter}`;
}
