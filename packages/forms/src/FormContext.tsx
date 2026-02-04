/**
 * Form Context
 * 
 * Provides form state and methods to child components
 */

import { createContext, useContext } from 'react';
import type { FormContextValue } from './types';

export const FormContext = createContext<FormContextValue | null>(null);

/**
 * Hook to access form context
 * 
 * @example
 * ```tsx
 * function CustomField() {
 *   const { form, permissions } = useFormContext();
 *   const { watch, formState } = form;
 *   
 *   return <div>...</div>;
 * }
 * ```
 */
export function useFormContext<TFieldValues = any>(): FormContextValue<TFieldValues> {
    const context = useContext(FormContext);

    if (!context) {
        throw new Error('useFormContext must be used within a Form component');
    }

    return context as FormContextValue<TFieldValues>;
}
