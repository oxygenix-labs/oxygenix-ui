/**
 * Textarea Component
 *
 * Multi-line text input with auto-resize and max-length handling
 */

'use client';

import { TextareaHTMLAttributes, forwardRef, useEffect, useRef } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './Forms.module.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Auto-resize to fit content */
  autoResize?: boolean;

  /** Error state */
  error?: boolean;

  /** Additional CSS class */
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const { autoResize = false, error = false, className, onChange, value, ...rest } = props;

  const internalRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-resize functionality
  useEffect(() => {
    if (autoResize && internalRef.current) {
      const textarea = internalRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value, autoResize]);

  const handleRef = (node: HTMLTextAreaElement | null) => {
    internalRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  return (
    <textarea
      ref={handleRef}
      className={cn(
        styles.textarea,
        autoResize && styles['textarea-auto-resize'],
        error && styles['textarea-error'],
        className
      )}
      onChange={onChange}
      value={value}
      {...rest}
    />
  );
});

Textarea.displayName = 'Textarea';
