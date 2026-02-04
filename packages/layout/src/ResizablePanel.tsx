/**
 * ResizablePanel Component
 *
 * Panel that can be resized by dragging handles
 */

import React, { ReactNode, useRef, useState, useCallback, useEffect } from 'react';
import { cn, clamp } from '@oxygenix-ui/core';
import styles from './Layout.module.css';

export type ResizeDirection = 'left' | 'right' | 'top' | 'bottom';

export interface ResizablePanelProps {
  /** Panel content */
  children: ReactNode;

  /** Resize direction */
  direction?: ResizeDirection;

  /** Initial size (px or %) */
  defaultSize?: number | string;

  /** Minimum size (px) */
  minSize?: number;

  /** Maximum size (px) */
  maxSize?: number;

  /** Resize handler */
  onResize?: (size: number) => void;

  /** Resize end handler */
  onResizeEnd?: (size: number) => void;

  /** Additional CSS class */
  className?: string;
}

export function ResizablePanel(props: ResizablePanelProps) {
  const {
    children,
    direction = 'right',
    defaultSize = 300,
    minSize = 100,
    maxSize = 800,
    onResize,
    onResizeEnd,
    className,
  } = props;

  const panelRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<number>(typeof defaultSize === 'number' ? defaultSize : 300);
  const [isResizing, setIsResizing] = useState(false);

  const isHorizontal = direction === 'left' || direction === 'right';

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !panelRef.current) return;

      const rect = panelRef.current.getBoundingClientRect();
      let newSize: number;

      if (isHorizontal) {
        if (direction === 'right') {
          newSize = e.clientX - rect.left;
        } else {
          newSize = rect.right - e.clientX;
        }
      } else {
        if (direction === 'bottom') {
          newSize = e.clientY - rect.top;
        } else {
          newSize = rect.bottom - e.clientY;
        }
      }

      const clampedSize = clamp(newSize, minSize, maxSize);
      setSize(clampedSize);
      onResize?.(clampedSize);
    },
    [isResizing, isHorizontal, direction, minSize, maxSize, onResize]
  );

  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      onResizeEnd?.(size);
    }
  }, [isResizing, size, onResizeEnd]);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const handleClassName = cn(
    styles['resizable-handle'],
    isHorizontal ? styles['resizable-handle-horizontal'] : styles['resizable-handle-vertical'],
    direction === 'right' && styles['resizable-handle-horizontal-right'],
    direction === 'left' && styles['resizable-handle-horizontal-left'],
    direction === 'top' && styles['resizable-handle-vertical-top'],
    direction === 'bottom' && styles['resizable-handle-vertical-bottom']
  );

  return (
    <div
      ref={panelRef}
      className={cn(styles['resizable-panel'], className)}
      style={{
        [isHorizontal ? 'width' : 'height']: `${size}px`,
        flexShrink: 0,
      }}
    >
      {children}

      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className={handleClassName}
        onMouseDown={handleMouseDown}
        onKeyDown={(e) => {
          // Allow keyboard control for accessibility
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMouseDown(e as unknown as React.MouseEvent);
          }
        }}
        role="separator"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-orientation={isHorizontal ? 'vertical' : 'horizontal'}
        aria-valuenow={size}
        aria-valuemin={minSize}
        aria-valuemax={maxSize}
      />
    </div>
  );
}

ResizablePanel.displayName = 'ResizablePanel';
