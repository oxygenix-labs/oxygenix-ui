/**
 * Select Component
 * 
 * Native select with keyboard-first navigation
 * Note: For async/searchable selects, use a dedicated library like react-select
 */

import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './Forms.module.css';

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    /** Select options */
    options: SelectOption[];

    /** Placeholder option */
    placeholder?: string;

    /** Error state */
    error?: boolean;

    /** Additional CSS class */
    className?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
    const {
        options,
        placeholder,
        error = false,
        className,
        ...rest
    } = props;

    return (
        <select
            ref={ref}
            className={cn(
                styles.select,
                error && styles['select-error'],
                className
            )}
            {...rest}
        >
            {placeholder && (
                <option value="" disabled>
                    {placeholder}
                </option>
            )}
            {options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
});

Select.displayName = 'Select';
