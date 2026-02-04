/**
 * FormGroup Component
 *
 * Logical grouping of fields for large forms
 */

import { ReactNode } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './Forms.module.css';

export interface FormGroupProps {
  /** Group legend/title */
  legend?: string;

  /** Group description */
  description?: string;

  /** Form fields */
  children: ReactNode;

  /** Additional CSS class */
  className?: string;
}

export function FormGroup(props: FormGroupProps) {
  const { legend, description, children, className } = props;

  return (
    <fieldset className={cn(styles['form-group'], className)}>
      {legend && <legend className={styles['form-group-legend']}>{legend}</legend>}

      {description && <p className={styles['form-group-description']}>{description}</p>}

      {children}
    </fieldset>
  );
}

FormGroup.displayName = 'FormGroup';
