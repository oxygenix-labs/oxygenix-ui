/**
 * Progress Component
 *
 * Determinate and indeterminate progress indicators
 */

import { cn } from '@oxygenix-ui/core';
import styles from './Feedback.module.css';

export type ProgressVariant = 'primary' | 'success' | 'warning' | 'error';
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressProps {
  /** Progress value (0-100) */
  value?: number;

  /** Progress variant */
  variant?: ProgressVariant;

  /** Progress size */
  size?: ProgressSize;

  /** Show label */
  label?: string;

  /** Show percentage */
  showValue?: boolean;

  /** Indeterminate mode */
  indeterminate?: boolean;

  /** Additional CSS class */
  className?: string;
}

export function Progress(props: ProgressProps) {
  const {
    value = 0,
    variant = 'primary',
    size = 'md',
    label,
    showValue = false,
    indeterminate = false,
    className,
  } = props;

  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={cn(styles.progress, className)}>
      {(label || showValue) && (
        <div className={styles['progress-label']}>
          {label && <span className={styles['progress-label-text']}>{label}</span>}
          {showValue && !indeterminate && (
            <span className={styles['progress-label-value']}>{clampedValue}%</span>
          )}
        </div>
      )}

      <div
        className={cn(
          styles['progress-track'],
          styles[`progress-${size}`],
          indeterminate && styles['progress-indeterminate']
        )}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={cn(styles['progress-bar'], styles[`progress-${variant}`])}
          style={indeterminate ? undefined : { width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}

Progress.displayName = 'Progress';
