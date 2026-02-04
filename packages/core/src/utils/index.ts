/**
 * Utility functions for Oxygenix UI
 */

/**
 * Combines multiple class names into a single string
 * Filters out falsy values
 * 
 * @example
 * ```tsx
 * cn('base-class', isActive && 'active', 'another-class')
 * // Returns: 'base-class active another-class'
 * ```
 */
export function cn(...classes: Array<string | boolean | undefined | null>): string {
    return classes.filter(Boolean).join(' ');
}

/**
 * Generates a unique ID
 * Useful for accessibility attributes (aria-labelledby, aria-describedby)
 * 
 * @example
 * ```tsx
 * const id = generateId('field');
 * // Returns: 'field-abc123'
 * ```
 */
let idCounter = 0;
export function generateId(prefix = 'oxy'): string {
    idCounter += 1;
    return `${prefix}-${idCounter}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Clamps a number between min and max values
 * 
 * @example
 * ```tsx
 * clamp(5, 0, 10)  // Returns: 5
 * clamp(-5, 0, 10) // Returns: 0
 * clamp(15, 0, 10) // Returns: 10
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}


