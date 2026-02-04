/**
 * IconButton Component
 * 
 * Compact button for icons only - perfect for toolbars, tables, and dense UIs
 */

import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './UI.module.css';

export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Icon to display */
    icon: ReactNode;

    /** Accessible label (required for screen readers) */
    'aria-label': string;

    /** Button size */
    size?: IconButtonSize;

    /** Additional CSS class */
    className?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
    const {
        icon,
        size = 'md',
        className,
        ...rest
    } = props;

    return (
        <button
            ref={ref}
            className={cn(
                styles['icon-button'],
                styles[`icon-button-${size}`],
                className
            )}
            {...rest}
        >
            {icon}
        </button>
    );
});

IconButton.displayName = 'IconButton';
