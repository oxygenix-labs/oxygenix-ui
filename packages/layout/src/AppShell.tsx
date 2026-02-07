/**
 * AppShell Component
 *
 * Main application layout with sidebar, header, content, and footer
 */
'use client';

import { ReactNode } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './Layout.module.css';

export interface AppShellProps {
  /** Sidebar content */
  sidebar?: ReactNode;

  /** Header content */
  header?: ReactNode;

  /** Main content */
  children: ReactNode;

  /** Footer content */
  footer?: ReactNode;

  /** Additional CSS class */
  className?: string;
}

export function AppShell(props: AppShellProps) {
  const { sidebar, header, children, footer, className } = props;

  return (
    <div className={cn(styles['app-shell'], className)}>
      {sidebar && <aside className={styles['app-shell-sidebar']}>{sidebar}</aside>}

      <div className={styles['app-shell-main']}>
        {header && <header className={styles['app-shell-header']}>{header}</header>}

        <main className={styles['app-shell-content']}>{children}</main>

        {footer && <footer className={styles['app-shell-footer']}>{footer}</footer>}
      </div>
    </div>
  );
}

AppShell.displayName = 'AppShell';
