/**
 * Text Component
 * 
 * Semantic typography wrapper for consistent text styling
 */

import { ReactNode, HTMLAttributes, ElementType } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './UI.module.css';

export type TextVariant = 'body' | 'muted' | 'caption' | 'small' | 'large';
export type TextWeight = 'normal' | 'medium' | 'bold';

export interface TextProps extends HTMLAttributes<HTMLElement> {
    /** Text variant */
    variant?: TextVariant;

    /** Font weight */
    weight?: TextWeight;

    /** HTML element to render */
    as?: ElementType;

    /** Text content */
    children: ReactNode;

    /** Additional CSS class */
    className?: string;
}

export function Text(props: TextProps) {
    const {
        variant = 'body',
        weight = 'normal',
        as: Component = 'p',
        children,
        className,
        ...rest
    } = props;

    return (
        <Component
            className={cn(
                styles.text,
                styles[`text-${variant}`],
                weight !== 'normal' && styles[`text-${weight}`],
                className
            )}
            {...rest}
        >
            {children}
        </Component>
    );
}

Text.displayName = 'Text';
