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

/**
 * Checks if code is running in browser environment
 */
export function isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Safely gets a value from an object using a path string
 * 
 * @warning This function uses `any` for flexibility. Consider using typed alternatives.
 * 
 * @example
 * ```tsx
 * const obj = { user: { name: 'John', address: { city: 'NYC' } } };
 * get(obj, 'user.address.city') // Returns: 'NYC'
 * get(obj, 'user.age', 25)      // Returns: 25 (default value)
 * ```
 */
export function get<T = any>(
    obj: any,
    path: string,
    defaultValue?: T
): T | undefined {
    const keys = path.split('.');
    let result = obj;

    for (const key of keys) {
        if (result === null || result === undefined) {
            return defaultValue;
        }
        result = result[key];
    }

    return result !== undefined ? result : defaultValue;
}

/**
 * Safely sets a value in an object using a path string
 * Returns a new object (immutable)
 * 
 * @example
 * ```tsx
 * const obj = { user: { name: 'John' } };
 * set(obj, 'user.age', 30)
 * // Returns: { user: { name: 'John', age: 30 } }
 * ```
 */
export function set<T extends object>(obj: T, path: string, value: any): T {
    const keys = path.split('.');
    const lastKey = keys.pop();

    if (!lastKey) return obj;

    const result = { ...obj };
    let current: any = result;

    for (const key of keys) {
        if (!(key in current)) {
            current[key] = {};
        } else {
            current[key] = { ...current[key] };
        }
        current = current[key];
    }

    current[lastKey] = value;
    return result;
}

/**
 * Debounce function
 * Returns a debounced version of the function
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null;
            func(...args);
        };

        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function
 * Returns a throttled version of the function
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean;

    return function executedFunction(...args: Parameters<T>) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

/**
 * Deep merge two objects
 * Returns a new object (immutable)
 */
export function deepMerge<T extends object>(target: T, source: Partial<T>): T {
    const output = { ...target };

    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
            const sourceValue = source[key as keyof T];
            const targetValue = target[key as keyof T];

            if (isObject(sourceValue) && isObject(targetValue)) {
                (output as any)[key] = deepMerge(targetValue as any, sourceValue as any);
            } else {
                (output as any)[key] = sourceValue;
            }
        });
    }

    return output;
}

/**
 * Check if value is a plain object
 */
function isObject(item: any): item is object {
    return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Format bytes to human-readable string
 * 
 * @example
 * ```tsx
 * formatBytes(1024)      // Returns: '1 KB'
 * formatBytes(1048576)   // Returns: '1 MB'
 * ```
 */
export function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Omit keys from an object
 * Returns a new object without the specified keys
 * 
 * @example
 * ```tsx
 * const obj = { a: 1, b: 2, c: 3 };
 * omit(obj, ['b', 'c']) // Returns: { a: 1 }
 * ```
 */
export function omit<T extends object, K extends keyof T>(
    obj: T,
    keys: K[]
): Omit<T, K> {
    const result = { ...obj };
    keys.forEach((key) => delete result[key]);
    return result;
}

/**
 * Pick keys from an object
 * Returns a new object with only the specified keys
 * 
 * @example
 * ```tsx
 * const obj = { a: 1, b: 2, c: 3 };
 * pick(obj, ['a', 'c']) // Returns: { a: 1, c: 3 }
 * ```
 */
export function pick<T extends object, K extends keyof T>(
    obj: T,
    keys: K[]
): Pick<T, K> {
    const result = {} as Pick<T, K>;
    keys.forEach((key) => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });
    return result;
}
