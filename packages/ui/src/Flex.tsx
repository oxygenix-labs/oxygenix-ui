/**
 * Flex Component
 *
 * Flexible layout utility (matching screenshot requirements)
 */

import { ReactNode, CSSProperties } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './Layout.module.css';

export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type FlexGap = string | number;

export interface FlexProps {
  /** Alignment */
  align?: FlexAlign;
  /** Justification */
  justify?: FlexJustify;
  /** Gap (spacing scale or CSS value) */
  gap?: FlexGap;
  /** Direction */
  direction?: 'row' | 'column';
  /** Wrap */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  /** Children */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

export function Flex(props: FlexProps) {
  const {
    align = 'stretch',
    justify = 'start',
    gap,
    direction = 'row',
    wrap = 'nowrap',
    children,
    className,
    style,
  } = props;

  // Map scale numbers to oxy-spacing if numeric, otherwise use raw value
  const gapValue =
    typeof gap === 'number' || (typeof gap === 'string' && !isNaN(Number(gap)))
      ? `var(--oxy-spacing-${gap})`
      : gap;

  return (
    <div
      className={cn(styles.flex, className)}
      style={{
        display: 'flex',
        flexDirection: direction,
        alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align,
        justifyContent:
          justify === 'start'
            ? 'flex-start'
            : justify === 'end'
              ? 'flex-end'
              : justify === 'between'
                ? 'space-between'
                : justify,
        flexWrap: wrap,
        gap: gapValue,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

Flex.displayName = 'Flex';
