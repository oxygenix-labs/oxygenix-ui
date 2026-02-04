/**
 * Stack Component
 *
 * Vertical/horizontal spacing utility (Radix-style)
 */

import { ReactNode, CSSProperties } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './Layout.module.css';

export type StackDirection = 'vertical' | 'horizontal';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';
export type StackJustify = 'start' | 'center' | 'end' | 'between';
export type StackGap = 1 | 2 | 3 | 4 | 5 | 6 | 8;

export interface StackProps {
  /** Stack direction */
  direction?: StackDirection;

  /** Align items */
  align?: StackAlign;

  /** Justify content */
  justify?: StackJustify;

  /** Gap between items (spacing scale) */
  gap?: StackGap;

  /** Children */
  children: ReactNode;

  /** Additional CSS class */
  className?: string;

  /** Inline styles */
  style?: CSSProperties;
}

export function Stack(props: StackProps) {
  const {
    direction = 'vertical',
    align = 'stretch',
    justify = 'start',
    gap = 4,
    children,
    className,
    style,
  } = props;

  return (
    <div
      className={cn(
        styles.stack,
        styles[`stack-${direction}`],
        styles[`stack-align-${align}`],
        styles[`stack-justify-${justify}`],
        styles[`stack-gap-${gap}`],
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

Stack.displayName = 'Stack';
