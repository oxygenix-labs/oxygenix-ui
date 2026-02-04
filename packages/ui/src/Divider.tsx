/**
 * Divider Component
 *
 * Subtle separators for dense layouts
 */

import { HTMLAttributes } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './UI.module.css';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';

  /** Dashed style */
  dashed?: boolean;

  /** Additional CSS class */
  className?: string;
}

export function Divider(props: DividerProps) {
  const { orientation = 'horizontal', dashed = false, className, ...rest } = props;

  return (
    <hr
      className={cn(
        styles.divider,
        orientation === 'vertical' && styles['divider-vertical'],
        dashed && styles['divider-dashed'],
        className
      )}
      aria-orientation={orientation}
      {...rest}
    />
  );
}

Divider.displayName = 'Divider';
