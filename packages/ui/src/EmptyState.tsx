/**
 * EmptyState Component
 *
 * Used inside tables, lists, and dashboards when no data is available
 */

import { ReactNode } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './DataTable.module.css';

export interface EmptyStateProps {
  /** Icon or illustration */
  icon?: ReactNode;

  /** Title */
  title: string;

  /** Description */
  description?: string;

  /** Action button or link */
  action?: ReactNode;

  /** Additional CSS class */
  className?: string;
}

export function EmptyState(props: EmptyStateProps) {
  const { icon, title, description, action, className } = props;

  return (
    <div className={cn(styles['empty-state'], className)}>
      {icon && <div className={styles['empty-state-icon']}>{icon}</div>}
      <h3 className={styles['empty-state-title']}>{title}</h3>
      {description && <p className={styles['empty-state-description']}>{description}</p>}
      {action && <div className={styles['empty-state-action']}>{action}</div>}
    </div>
  );
}

EmptyState.displayName = 'EmptyState';
