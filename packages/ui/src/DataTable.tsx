/**
 * DataTable Component
 * 
 * Advanced table with sorting, pagination, selection, and virtualization support
 */

import { ReactNode, useState } from 'react';
import { cn } from '@oxygenix-ui/core';
import { Checkbox } from './Checkbox';
import { Button } from './Button';
import styles from './DataTable.module.css';

export interface TableColumn<T = any> {
    /** Column key (must match data property) */
    key: string;

    /** Column header label */
    label: string;

    /** Column width */
    width?: string | number;

    /** Enable sorting */
    sortable?: boolean;

    /** Custom cell renderer */
    render?: (value: T[keyof T], row: T, index: number) => ReactNode;

    /** Text alignment */
    align?: 'left' | 'center' | 'right';
}

export type SortDirection = 'asc' | 'desc' | null;

export interface DataTableProps<T = any> {
    /** Table columns */
    columns: TableColumn<T>[];

    /** Table data */
    data: T[];

    /** Enable row selection */
    selectable?: boolean;

    /** Selected row keys */
    selectedRows?: Set<string | number>;

    /** Selection change handler */
    onSelectionChange?: (selectedRows: Set<string | number>) => void;

    /** Row key extractor */
    getRowKey?: (row: T, index: number) => string | number;

    /** Enable pagination */
    pagination?: boolean;

    /** Current page (1-indexed) */
    currentPage?: number;

    /** Page size */
    pageSize?: number;

    /** Total items (for server-side pagination) */
    totalItems?: number;

    /** Page change handler */
    onPageChange?: (page: number) => void;

    /** Sort column */
    sortColumn?: string;

    /** Sort direction */
    sortDirection?: SortDirection;

    /** Sort change handler */
    onSortChange?: (column: string, direction: SortDirection) => void;

    /** Loading state */
    loading?: boolean;

    /** Additional CSS class */
    className?: string;
}

export function DataTable<T = any>(props: DataTableProps<T>) {
    const {
        columns,
        data,
        selectable = false,
        selectedRows = new Set(),
        onSelectionChange,
        getRowKey = (_, index) => index,
        pagination = false,
        currentPage = 1,
        pageSize = 10,
        totalItems,
        onPageChange,
        sortColumn,
        sortDirection,
        onSortChange,
        loading: _loading = false,
        className,
    } = props;

    const [internalSortColumn, setInternalSortColumn] = useState<string | null>(null);
    const [internalSortDirection, setInternalSortDirection] = useState<SortDirection>(null);

    const activeSortColumn = sortColumn ?? internalSortColumn;
    const activeSortDirection = sortDirection ?? internalSortDirection;

    // Handle sorting
    const handleSort = (column: TableColumn<T>) => {
        if (!column.sortable) return;

        let newDirection: SortDirection = 'asc';

        if (activeSortColumn === column.key) {
            if (activeSortDirection === 'asc') {
                newDirection = 'desc';
            } else if (activeSortDirection === 'desc') {
                newDirection = null;
            }
        }

        if (onSortChange) {
            onSortChange(column.key, newDirection);
        } else {
            setInternalSortColumn(newDirection ? column.key : null);
            setInternalSortDirection(newDirection);
        }
    };

    // Handle selection
    const handleSelectAll = (checked: boolean) => {
        if (!onSelectionChange) return;

        if (checked) {
            const allKeys = new Set(paginatedData.map((row, index) => getRowKey(row, index)));
            onSelectionChange(allKeys);
        } else {
            onSelectionChange(new Set());
        }
    };

    const handleSelectRow = (rowKey: string | number, checked: boolean) => {
        if (!onSelectionChange) return;

        const newSelection = new Set(selectedRows);
        if (checked) {
            newSelection.add(rowKey);
        } else {
            newSelection.delete(rowKey);
        }
        onSelectionChange(newSelection);
    };

    // Sort data
    let sortedData = [...data];
    if (activeSortColumn && activeSortDirection) {
        sortedData.sort((a, b) => {
            const aValue = (a as any)[activeSortColumn];
            const bValue = (b as any)[activeSortColumn];

            if (aValue < bValue) return activeSortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return activeSortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }

    // Paginate data
    const total = totalItems ?? sortedData.length;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = pagination ? sortedData.slice(startIndex, endIndex) : sortedData;
    const totalPages = Math.ceil(total / pageSize);

    const allSelected = paginatedData.length > 0 && paginatedData.every((row, index) =>
        selectedRows.has(getRowKey(row, index))
    );
    const someSelected = paginatedData.some((row, index) =>
        selectedRows.has(getRowKey(row, index))
    );

    return (
        <div className={cn(styles['data-table-container'], className)}>
            <table className={styles['data-table']}>
                <thead className={styles['data-table-header']}>
                    <tr>
                        {selectable && (
                            <th className={cn(styles['data-table-header-cell'], styles['data-table-checkbox-cell'])}>
                                <Checkbox
                                    checked={allSelected}
                                    indeterminate={someSelected && !allSelected}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                    aria-label="Select all rows"
                                />
                            </th>
                        )}
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={cn(
                                    styles['data-table-header-cell'],
                                    column.sortable && styles['data-table-header-cell-sortable']
                                )}
                                style={{ width: column.width, textAlign: column.align }}
                                onClick={() => handleSort(column)}
                            >
                                {column.label}
                                {column.sortable && (
                                    <span
                                        className={cn(
                                            styles['data-table-sort-indicator'],
                                            activeSortColumn === column.key && styles['data-table-sort-indicator-active']
                                        )}
                                    >
                                        {activeSortColumn === column.key
                                            ? activeSortDirection === 'asc'
                                                ? '↑'
                                                : '↓'
                                            : '↕'}
                                    </span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row, index) => {
                        const rowKey = getRowKey(row, index);
                        const isSelected = selectedRows.has(rowKey);

                        return (
                            <tr
                                key={rowKey}
                                className={cn(
                                    styles['data-table-body-row'],
                                    isSelected && styles['data-table-body-row-selected']
                                )}
                            >
                                {selectable && (
                                    <td className={cn(styles['data-table-body-cell'], styles['data-table-checkbox-cell'])}>
                                        <Checkbox
                                            checked={isSelected}
                                            onChange={(e) => handleSelectRow(rowKey, e.target.checked)}
                                            aria-label={`Select row ${index + 1}`}
                                        />
                                    </td>
                                )}
                                {columns.map((column) => {
                                    const value = (row as any)[column.key];
                                    return (
                                        <td
                                            key={column.key}
                                            className={styles['data-table-body-cell']}
                                            style={{ textAlign: column.align }}
                                        >
                                            {column.render ? column.render(value, row, index) : value}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {pagination && (
                <div className={styles['data-table-footer']}>
                    <div className={styles['data-table-page-info']}>
                        Showing {startIndex + 1}-{Math.min(endIndex, total)} of {total}
                    </div>
                    <div className={styles['data-table-pagination']}>
                        <Button
                            size="sm"
                            variant="secondary"
                            disabled={currentPage === 1}
                            onClick={() => onPageChange?.(currentPage - 1)}
                        >
                            Previous
                        </Button>
                        <span className={styles['data-table-page-info']}>
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            size="sm"
                            variant="secondary"
                            disabled={currentPage === totalPages}
                            onClick={() => onPageChange?.(currentPage + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

DataTable.displayName = 'DataTable';
