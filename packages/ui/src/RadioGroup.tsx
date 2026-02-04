/**
 * RadioGroup Component
 *
 * Controlled radio button grouping with accessibility-first design
 */

import { cn } from '@oxygenix-ui/core';
import styles from './Forms.module.css';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Radio group name (required for grouping) */
  name: string;

  /** Radio options */
  options: RadioOption[];

  /** Selected value */
  value?: string;

  /** Change handler */
  onChange?: (value: string) => void;

  /** Horizontal layout */
  horizontal?: boolean;

  /** Additional CSS class */
  className?: string;
}

export function RadioGroup(props: RadioGroupProps) {
  const { name, options, value, onChange, horizontal = false, className } = props;

  const handleChange = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
  };

  return (
    <div
      className={cn(
        styles['radio-group'],
        horizontal && styles['radio-group-horizontal'],
        className
      )}
      role="radiogroup"
    >
      {options.map((option) => {
        const radioId = `${name}-${option.value}`;

        return (
          <label key={option.value} htmlFor={radioId} className={styles['radio-wrapper']}>
            <input
              type="radio"
              id={radioId}
              name={name}
              value={option.value}
              checked={value === option.value}
              disabled={option.disabled}
              onChange={() => handleChange(option.value)}
              className={styles.radio}
            />
            <span className={styles['radio-label']}>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}

RadioGroup.displayName = 'RadioGroup';
