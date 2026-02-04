/**
 * Checkbox Component
 *
 * Checkbox with indeterminate support
 */

import { InputHTMLAttributes, forwardRef, useEffect, useRef } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './Forms.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Checkbox label */
  label?: string;

  /** Indeterminate state (for "select all" scenarios) */
  indeterminate?: boolean;

  /** Additional CSS class */
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { label, indeterminate = false, className, id, ...rest } = props;

  const internalRef = useRef<HTMLInputElement | null>(null);

  // Set indeterminate property
  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleRef = (node: HTMLInputElement | null) => {
    internalRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  if (!label) {
    return (
      <input
        ref={handleRef}
        type="checkbox"
        id={checkboxId}
        className={cn(styles.checkbox, className)}
        {...rest}
      />
    );
  }

  return (
    <label htmlFor={checkboxId} className={styles['checkbox-wrapper']}>
      <input
        ref={handleRef}
        type="checkbox"
        id={checkboxId}
        className={cn(styles.checkbox, className)}
        {...rest}
      />
      <span className={styles['checkbox-label']}>{label}</span>
    </label>
  );
});

Checkbox.displayName = 'Checkbox';
