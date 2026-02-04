/**
 * Grid Component
 *
 * Simple responsive layout grid (not CSS Grid wrapper hell)
 */

import { ReactNode, CSSProperties } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './Layout.module.css';

export type GridColumns = 1 | 2 | 3 | 4 | 6 | 12;
export type GridGap = 1 | 2 | 3 | 4 | 5 | 6 | 8;

export interface GridProps {
  /** Number of columns */
  cols?: GridColumns;

  /** Number of columns on mobile (max-width: 640px) */
  colsSm?: GridColumns;

  /** Number of columns on tablet (max-width: 768px) */
  colsMd?: GridColumns;

  /** Gap between items (spacing scale) */
  gap?: GridGap;

  /** Children */
  children: ReactNode;

  /** Additional CSS class */
  className?: string;

  /** Inline styles */
  style?: CSSProperties;
}

export function Grid(props: GridProps) {
  const { cols = 12, colsSm, colsMd, gap = 4, children, className, style } = props;

  return (
    <div
      className={cn(
        styles.grid,
        styles[`grid-cols-${cols}`],
        colsMd && styles[`grid-cols-md-${colsMd}`],
        colsSm && styles[`grid-cols-sm-${colsSm}`],
        styles[`grid-gap-${gap}`],
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

Grid.displayName = 'Grid';
