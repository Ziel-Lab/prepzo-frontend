import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names or class name objects and merges Tailwind CSS classes
 * 
 * This utility function uses clsx to combine class names and then uses 
 * tailwind-merge to properly handle conflicting Tailwind CSS classes.
 * 
 * Example:
 * ```tsx
 * <div className={cn(
 *   "text-red-500", // Base styles
 *   isActive && "bg-blue-500", // Conditional styles
 *   className // User-provided styles that might override the defaults
 * )}>
 *   Content
 * </div>
 * ```
 * 
 * @param inputs - Class values to be combined (strings, objects, arrays, etc.)
 * @returns A string of combined and merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date to a localized string based on user's locale
 * 
 * @param date - The date to format
 * @param options - Intl.DateTimeFormat options for formatting
 * @returns A localized date string
 */
export function formatDate(date: Date, options: Intl.DateTimeFormatOptions = {}): string {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options
  });
}

/**
 * Truncates a string to a specified maximum length and adds an ellipsis if needed
 * 
 * @param text - The string to truncate
 * @param maxLength - Maximum length of the returned string (not including ellipsis)
 * @returns Truncated string with ellipsis if original exceeds maxLength
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Delays execution for a specified amount of time
 * 
 * @param ms - Time to delay in milliseconds
 * @returns A promise that resolves after the specified delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Safely access deeply nested object properties without throwing errors
 * 
 * @param obj - The object to access properties from
 * @param path - The path to the property as a string (e.g., 'user.profile.name')
 * @param defaultValue - The default value to return if the path doesn't exist
 * @returns The value at the path or the default value
 */
export function getNestedValue<T>(obj: any, path: string, defaultValue: T): T {
  try {
    return path.split('.').reduce((o, p) => (o?.[p] ?? defaultValue), obj) as T;
  } catch (e) {
    return defaultValue;
  }
}
