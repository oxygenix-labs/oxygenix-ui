/**
 * Skeleton Component
 *
 * Layout-aware loading placeholder with animation
 */

import { CSSProperties } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './DataTable.module.css';

export type SkeletonVariant = 'text' | 'title' | 'avatar' | 'rect' | 'circle';

export interface SkeletonProps {
  /** Skeleton variant */
  variant?: SkeletonVariant;

  /** Width */
  width?: string | number;

  /** Height */
  height?: string | number;

  /** Border radius */
  borderRadius?: string | number;

  /** Number of skeleton lines (for text variant) */
  count?: number;

  /** Additional CSS class */
  className?: string;

  /** Inline styles */
  style?: CSSProperties;
}

export function Skeleton(props: SkeletonProps) {
  const { variant = 'text', width, height, borderRadius, count = 1, className, style } = props;

  const skeletonStyle: CSSProperties = {
    width,
    height,
    borderRadius,
    ...style,
  };

  if (count > 1) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={cn(styles.skeleton, styles[`skeleton-${variant}`], className)}
            style={skeletonStyle}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(styles.skeleton, styles[`skeleton-${variant}`], className)}
      style={skeletonStyle}
      aria-hidden="true"
    />
  );
}

Skeleton.displayName = 'Skeleton';
