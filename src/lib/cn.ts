import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge conditional class names and de-duplicate conflicting Tailwind utilities.
 * Use this for every component that composes classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
