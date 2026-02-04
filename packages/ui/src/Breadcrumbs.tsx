/**
 * Breadcrumbs Component
 * 
 * Async-friendly breadcrumb navigation
 */

import { ReactNode } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './Navigation.module.css';

export interface BreadcrumbsItem {
    /** Item label */
    label: ReactNode;

    /** Item URL */
    href?: string;

    /** Click handler */
    onClick?: () => void;
}

export interface BreadcrumbsProps {
    /** Breadcrumb items */
    items: BreadcrumbsItem[];

    /** Custom separator */
    separator?: ReactNode;

    /** Additional CSS class */
    className?: string;
}

export function Breadcrumbs(props: BreadcrumbsProps) {
    const {
        items,
        separator = '/',
        className,
    } = props;

    return (
        <nav className={cn(styles.breadcrumbs, className)} aria-label="Breadcrumb">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                const Element = item.href ? 'a' : 'span';

                return (
                    <div key={index} className={styles['breadcrumb-item']}>
                        <Element
                            href={item.href}
                            onClick={item.onClick}
                            className={isLast ? styles['breadcrumb-current'] : styles['breadcrumb-link']}
                            aria-current={isLast ? 'page' : undefined}
                        >
                            {item.label}
                        </Element>
                        {!isLast && (
                            <span className={styles['breadcrumb-separator']} aria-hidden="true">
                                {separator}
                            </span>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}

Breadcrumbs.displayName = 'Breadcrumbs';
