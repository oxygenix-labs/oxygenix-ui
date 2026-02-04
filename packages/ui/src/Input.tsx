/**
 * Input Component
 * 
 * Text, number, password, search inputs with validation support
 */

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './Forms.module.css';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputType = 'text' | 'number' | 'password' | 'email' | 'search' | 'tel' | 'url';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Input type */
    type?: InputType;

    /** Input size */
    size?: InputSize;

    /** Error state */
    error?: boolean;

    /** Additional CSS class */
    className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        type = 'text',
        size = 'md',
        error = false,
        className,
        ...rest
    } = props;

    return (
        <input
            ref={ref}
            type={type}
            className={cn(
                styles.input,
                styles[`input-${size}`],
                error && styles['input-error'],
                className
            )}
            {...rest}
        />
    );
});

Input.displayName = 'Input';
