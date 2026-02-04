/**
 * PageHeader Component
 * 
 * Page header with title, breadcrumbs, subtitle, and actions
 */

import { ReactNode } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './Layout.module.css';

export interface BreadcrumbItem {
    /** Breadcrumb label */
    label: string;

    /** Breadcrumb URL */
    href?: string;

    /** Click handler */
    onClick?: () => void;
}

export interface PageHeaderProps {
    /** Page title */
    title: string;

    /** Page subtitle */
    subtitle?: string;

    /** Breadcrumbs */
    breadcrumbs?: BreadcrumbItem[];

    /** Action buttons */
    actions?: ReactNode;

    /** Additional CSS class */
    className?: string;
}

export function PageHeader(props: PageHeaderProps) {
    const {
        title,
        subtitle,
        breadcrumbs = [],
        actions,
        className,
    } = props;

    return (
        <div className={cn(styles['page-header'], className)}>
            <div className={styles['page-header-left']}>
                {breadcrumbs.length > 0 && (
                    <nav className={styles['page-header-breadcrumbs']} aria-label="Breadcrumb">
                        {breadcrumbs.map((item, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            const BreadcrumbElement = item.href ? 'a' : 'span';

                            return (
                                <div key={index} className={styles['page-header-breadcrumb-item']}>
                                    <BreadcrumbElement
                                        href={item.href}
                                        onClick={item.onClick}
                                        className={item.href ? styles['page-header-breadcrumb-link'] : undefined}
                                        aria-current={isLast ? 'page' : undefined}
                                    >
                                        {item.label}
                                    </BreadcrumbElement>
                                    {!isLast && (
                                        <span className={styles['page-header-breadcrumb-separator']}>
                                            /
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                )}

                <h1 className={styles['page-header-title']}>{title}</h1>

                {subtitle && (
                    <p className={styles['page-header-subtitle']}>{subtitle}</p>
                )}
            </div>

            {actions && (
                <div className={styles['page-header-actions']}>
                    {actions}
                </div>
            )}
        </div>
    );
}

PageHeader.displayName = 'PageHeader';
