/**
 * FormField Component
 * 
 * Wrapper for form controls with label, error, and hint support
 */

import { ReactNode } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './Forms.module.css';

export interface FormFieldProps {
    /** Field label */
    label?: string;

    /** Field ID (connects label to input) */
    htmlFor?: string;

    /** Required indicator */
    required?: boolean;

    /** Helper text */
    hint?: string;

    /** Error message */
    error?: string;

    /** Form control element */
    children: ReactNode;

    /** Additional CSS class */
    className?: string;
}

export function FormField(props: FormFieldProps) {
    const {
        label,
        htmlFor,
        required = false,
        hint,
        error,
        children,
        className,
    } = props;

    return (
        <div className={cn(styles['form-field'], className)}>
            {label && (
                <label htmlFor={htmlFor} className={styles['form-field-label']}>
                    {label}
                    {required && <span className={styles['form-field-required']}>*</span>}
                </label>
            )}

            {children}

            {hint && !error && (
                <span className={styles['form-field-hint']}>{hint}</span>
            )}

            {error && (
                <span className={styles['form-field-error']} role="alert">
                    {error}
                </span>
            )}
        </div>
    );
}

FormField.displayName = 'FormField';
