/**
 * Sidebar Component
 *
 * Collapsible sidebar with navigation
 */

import { ReactNode } from 'react';
import { cn, useControllable } from '@oxygenix-ui/core';
import styles from './Layout.module.css';

export interface SidebarNavItem {
  /** Item ID */
  id: string;

  /** Item label */
  label: string;

  /** Item icon */
  icon?: ReactNode;

  /** Item href */
  href?: string;

  /** Click handler */
  onClick?: () => void;

  /** Whether item is active */
  active?: boolean;

  /** Whether item is disabled */
  disabled?: boolean;
}

export interface SidebarProps {
  /** Sidebar header content */
  header?: ReactNode;

  /** Navigation items */
  navItems?: SidebarNavItem[];

  /** Sidebar footer content */
  footer?: ReactNode;

  /** Custom content (overrides navItems) */
  children?: ReactNode;

  /** Whether sidebar is collapsed */
  collapsed?: boolean;

  /** Default collapsed state */
  defaultCollapsed?: boolean;

  /** Collapse change handler */
  onCollapsedChange?: (collapsed: boolean) => void;

  /** Whether to show toggle button */
  showToggle?: boolean;

  /** Additional CSS class */
  className?: string;
}

export function Sidebar(props: SidebarProps) {
  const {
    header,
    navItems,
    footer,
    children,
    collapsed: controlledCollapsed,
    defaultCollapsed = false,
    onCollapsedChange,
    showToggle = true,
    className,
  } = props;

  const [collapsed, setCollapsed] = useControllable(
    controlledCollapsed,
    defaultCollapsed,
    onCollapsedChange
  );

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        styles.sidebar,
        collapsed ? styles['sidebar-collapsed'] : styles['sidebar-expanded'],
        className
      )}
      style={{ position: 'relative' }}
    >
      {showToggle && (
        <button
          className={styles['sidebar-toggle']}
          onClick={toggleCollapsed}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
        >
          {collapsed ? '→' : '←'}
        </button>
      )}

      {header && <div className={styles['sidebar-header']}>{header}</div>}

      <div className={styles['sidebar-content']}>
        {children || (
          <nav>
            <ul className={styles['sidebar-nav']}>
              {navItems?.map((item) => (
                <li key={item.id} className={styles['sidebar-nav-item']}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className={cn(
                        styles['sidebar-nav-link'],
                        item.active && styles['sidebar-nav-link-active']
                      )}
                      onClick={item.onClick}
                      aria-current={item.active ? 'page' : undefined}
                      aria-disabled={item.disabled}
                    >
                      {item.icon && <span className={styles['sidebar-nav-icon']}>{item.icon}</span>}
                      <span className={styles['sidebar-nav-label']}>{item.label}</span>
                    </a>
                  ) : (
                    <button
                      className={cn(
                        styles['sidebar-nav-link'],
                        item.active && styles['sidebar-nav-link-active']
                      )}
                      onClick={item.onClick}
                      disabled={item.disabled}
                      aria-current={item.active ? 'page' : undefined}
                      style={{ width: '100%', border: 'none', background: 'none' }}
                    >
                      {item.icon && <span className={styles['sidebar-nav-icon']}>{item.icon}</span>}
                      <span className={styles['sidebar-nav-label']}>{item.label}</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {footer && <div className={styles['sidebar-footer']}>{footer}</div>}
    </div>
  );
}

Sidebar.displayName = 'Sidebar';
