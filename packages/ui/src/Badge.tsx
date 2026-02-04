/**
 * Badge Component
 *
 * Status indicators for active, pending, archived states
 */

import { ReactNode } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './Feedback.module.css';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  /** Badge variant */
  variant?: BadgeVariant;

  /** Badge size */
  size?: BadgeSize;

  /** Badge content */
  children: ReactNode;

  /** Show dot indicator */
  dot?: boolean;

  /** Additional CSS class */
  className?: string;
}

export function Badge(props: BadgeProps) {
  const { variant = 'default', size = 'md', children, dot = false, className } = props;

  return (
    <span
      className={cn(styles.badge, styles[`badge-${variant}`], styles[`badge-${size}`], className)}
    >
      {dot && <span className={styles['badge-dot']} />}
      {children}
    </span>
  );
}

Badge.displayName = 'Badge';
