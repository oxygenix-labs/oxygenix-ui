/**
 * TableToolbar Component
 * 
 * Toolbar for bulk actions, filters, and export functionality
 */

import { ReactNode } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './DataTable.module.css';

export interface TableToolbarProps {
    /** Toolbar title */
    title?: string;

    /** Number of selected items */
    selectedCount?: number;

    /** Left side content (filters, search) */
    leftContent?: ReactNode;

    /** Right side content (actions, export) */
    rightContent?: ReactNode;

    /** Bulk actions (shown when items are selected) */
    bulkActions?: ReactNode;

    /** Additional CSS class */
    className?: string;
}

export function TableToolbar(props: TableToolbarProps) {
    const {
        title,
        selectedCount = 0,
        leftContent,
        rightContent,
        bulkActions,
        className,
    } = props;

    const hasSelection = selectedCount > 0;

    return (
        <div className={cn(styles['table-toolbar'], className)}>
            <div className={styles['table-toolbar-left']}>
                {hasSelection && bulkActions ? (
                    <>
                        <span className={styles['table-toolbar-selection-info']}>
                            {selectedCount} selected
                        </span>
                        {bulkActions}
                    </>
                ) : (
                    <>
                        {title && <h3 className={styles['table-toolbar-title']}>{title}</h3>}
                        {leftContent}
                    </>
                )}
            </div>
            <div className={styles['table-toolbar-right']}>
                {rightContent}
            </div>
        </div>
    );
}

TableToolbar.displayName = 'TableToolbar';
