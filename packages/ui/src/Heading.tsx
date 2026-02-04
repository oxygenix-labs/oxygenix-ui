/**
 * Heading Component
 *
 * Controlled heading hierarchy to prevent random h1-h6 misuse
 */

import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './UI.module.css';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level (controls both semantics and styling) */
  level: HeadingLevel;

  /** Heading content */
  children: ReactNode;

  /** Additional CSS class */
  className?: string;
}

export function Heading(props: HeadingProps) {
  const { level, children, className, ...rest } = props;

  const Component = level;

  return (
    <Component className={cn(styles.heading, styles[`heading-${level}`], className)} {...rest}>
      {children}
    </Component>
  );
}

Heading.displayName = 'Heading';
