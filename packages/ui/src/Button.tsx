/**
 * Button Component
 * 
 * Accessible button with variants, sizes, loading state, and icon support
 */

import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './UI.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    /** Button variant */
    variant?: ButtonVariant;

    /** Button size */
    size?: ButtonSize;

    /** Loading state */
    loading?: boolean;

    /** Icon to display before text */
    leftIcon?: ReactNode;

    /** Icon to display after text */
    rightIcon?: ReactNode;

    /** Button content */
    children?: ReactNode;

    /** Additional CSS class */
    className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        variant = 'primary',
        size = 'md',
        loading = false,
        leftIcon,
        rightIcon,
        children,
        className,
        disabled,
        ...rest
    } = props;

    return (
        <button
            ref={ref}
            className={cn(
                styles.button,
                styles[`button-${variant}`],
                styles[`button-${size}`],
                loading && styles['button-loading'],
                className
            )}
            disabled={disabled || loading}
            aria-busy={loading}
            {...rest}
        >
            {loading && <span className={styles['button-spinner']} aria-hidden="true" />}
            {!loading && leftIcon && <span aria-hidden="true">{leftIcon}</span>}
            {children}
            {!loading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
        </button>
    );
});

Button.displayName = 'Button';
