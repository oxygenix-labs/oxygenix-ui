/**
 * Sidebar Component
 *
 * Collapsible sidebar with navigation items and permission awareness
 */

import { ReactNode, useState } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './Layout.module.css';

export interface SidebarNavItem {
  /** Item key */
  key: string;

  /** Item label */
  label: string;

  /** Item icon */
  icon?: ReactNode;

  /** Item URL/path */
  href?: string;

  /** Click handler */
  onClick?: () => void;

  /** Active state */
  active?: boolean;

  /** Permission check (if false, item is hidden) */
  visible?: boolean;
}

export interface SidebarProps {
  /** Logo or brand */
  logo?: ReactNode;

  /** Navigation items */
  navItems?: SidebarNavItem[];

  /** Footer content */
  footer?: ReactNode;

  /** Collapsed state */
  collapsed?: boolean;

  /** Collapse change handler */
  onCollapsedChange?: (collapsed: boolean) => void;

  /** Additional CSS class */
  className?: string;
}

export function Sidebar(props: SidebarProps) {
  const {
    logo,
    navItems = [],
    footer,
    collapsed: controlledCollapsed,
    onCollapsedChange,
    className,
  } = props;

  const [internalCollapsed, setInternalCollapsed] = useState(false);

  const collapsed = controlledCollapsed ?? internalCollapsed;

  const handleToggle = () => {
    const newCollapsed = !collapsed;
    if (onCollapsedChange) {
      onCollapsedChange(newCollapsed);
    } else {
      setInternalCollapsed(newCollapsed);
    }
  };

  const visibleNavItems = navItems.filter((item) => item.visible !== false);

  return (
    <div className={cn(styles.sidebar, collapsed && styles['sidebar-collapsed'], className)}>
      <div className={styles['sidebar-header']}>
        {logo && <div className={styles['sidebar-logo']}>{logo}</div>}
        <button
          className={styles['sidebar-toggle']}
          onClick={handleToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <nav className={styles['sidebar-nav']}>
        {visibleNavItems.map((item) => {
          const NavItem = item.href ? 'a' : 'button';

          return (
            <NavItem
              key={item.key}
              href={item.href}
              onClick={item.onClick}
              className={cn(
                styles['sidebar-nav-item'],
                item.active && styles['sidebar-nav-item-active']
              )}
            >
              {item.icon && <span className={styles['sidebar-nav-item-icon']}>{item.icon}</span>}
              <span className={styles['sidebar-nav-item-label']}>{item.label}</span>
            </NavItem>
          );
        })}
      </nav>

      {footer && <div className={styles['sidebar-footer']}>{footer}</div>}
    </div>
  );
}

Sidebar.displayName = 'Sidebar';
