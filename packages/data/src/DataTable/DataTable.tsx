/**
 * DataTable Component
 * 
 * Enterprise-grade data table with sorting, pagination, and selection.
 * Supports both client-side and server-side data management.
 */

import React, { useMemo } from 'react';
import { cn } from '@oxygenix-ui/core';
import { useDataTable } from './useDataTable';
import type { DataTableProps, CellContext, HeaderContext } from './types';
import styles from './DataTable.module.css';

export function DataTable<T = any>(props: DataTableProps<T>) {
    const {
        data,
        columns,
        sorting,
        pagination,
        selection,
        onRowClick,
        rowClassName,
        slots,
        loading = false,
        error,
        getRowId = (row: any) => row.id || String(row),
        className,
        style,
        ...rest
    } = props;

    // Use headless hook for state management
    const table = useDataTable({
        data,
        columns,
        sorting,
        pagination,
        selection,
        getRowId,
    });

    // ========================================
    // RENDER HELPERS
    // ========================================

    const renderHeader = (column: typeof columns[0]) => {
        const context: HeaderContext = {
            column,
            isSorted: !!table.getSortDirection(column.id),
            sortDirection: table.getSortDirection(column.id),
            isFiltered: false,
        };

        const content = typeof column.header === 'function'
            ? column.header(context)
            : column.header;

        const isSortable = sorting?.enabled && column.sortable;

        return (
            <th
                key={column.id}
                className={cn(
                    styles['header-cell'],
                    isSortable && styles['header-cell-sortable'],
                    context.isSorted && styles['header-cell-sorted']
                )}
                style={{
                    width: column.width,
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                    textAlign: column.align,
                }}
                onClick={isSortable ? () => table.toggleSort(column.id) : undefined}
                role="columnheader"
                aria-sort={
                    context.isSorted
                        ? context.sortDirection === 'asc'
                            ? 'ascending'
                            : 'descending'
                        : undefined
                }
            >
                <div className={styles['header-content']}>
                    {content}
                    {isSortable && context.isSorted && (
                        <span className={styles['sort-icon']} aria-hidden="true">
                            {context.sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                    )}
                </div>
            </th>
        );
    };

    const renderCell = (row: T, column: typeof columns[0], rowIndex: number) => {
        const value = table.getCellValue(row, column);
        const rowId = getRowId(row);

        const context: CellContext<T> = {
            value,
            row,
            rowIndex,
            column,
            isEditing: false,
            isSelected: table.isRowSelected(rowId),
            isHovered: false,
        };

        const content = column.cell ? column.cell(context) : value;

        return (
            <td
                key={column.id}
                className={cn(
                    styles.cell,
                    column.align && styles[`cell-align-${column.align}`]
                )}
                style={{
                    width: column.width,
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                }}
                role="gridcell"
            >
                {content}
            </td>
        );
    };

    const renderRow = (row: T, index: number) => {
        const rowId = getRowId(row);
        const isSelected = table.isRowSelected(rowId);
        const isClickable = !!onRowClick;

        return (
            <tr
                key={rowId}
                className={cn(
                    styles.row,
                    isSelected && styles['row-selected'],
                    isClickable && styles['row-clickable'],
                    rowClassName?.(row)
                )}
                onClick={(e) => {
                    if (selection?.selectOnRowClick) {
                        table.toggleRowSelection(rowId);
                    }
                    onRowClick?.(row, e);
                }}
                role="row"
                aria-selected={isSelected}
                tabIndex={isClickable ? 0 : undefined}
            >
                {table.visibleColumns.map((column) => renderCell(row, column, index))}
            </tr>
        );
    };

    // ========================================
    // RENDER STATES
    // ========================================

    if (error && slots?.errorState) {
        return <div className={className}>{slots.errorState(error)}</div>;
    }

    if (loading && slots?.loadingState) {
        return <div className={className}>{slots.loadingState}</div>;
    }

    if (table.rows.length === 0 && slots?.emptyState) {
        return (
            <div className={cn(styles['table-container'], className)} style={style}>
                <div className={styles['empty-state']}>{slots.emptyState}</div>
            </div>
        );
    }

    // ========================================
    // MAIN RENDER
    // ========================================

    return (
        <div className={cn(styles['table-container'], className)} style={style} {...rest}>
            {slots?.toolbar}

            {slots?.bulkActions && table.selectedRows.length > 0 && (
                <div>
                    {typeof slots.bulkActions === 'function'
                        ? slots.bulkActions(
                            data.filter((row) => table.selectedRows.includes(getRowId(row)))
                        )
                        : slots.bulkActions}
                </div>
            )}

            <table
                className={styles.table}
                role="grid"
                aria-rowcount={data.length}
                aria-colcount={table.visibleColumns.length}
            >
                <thead className={styles.header}>
                    <tr role="row">
                        {table.visibleColumns.map(renderHeader)}
                    </tr>
                </thead>

                <tbody className={styles.body}>
                    {table.rows.map((row, index) => renderRow(row, index))}
                </tbody>
            </table>

            {pagination?.enabled && (
                <div className={styles.pagination}>
                    <div className={styles['pagination-info']}>
                        {pagination.showPageInfo && (
                            <span>
                                Page {table.currentPage} of {table.totalPages} ({data.length} total rows)
                            </span>
                        )}
                    </div>

                    <div className={styles['pagination-controls']}>
                        <button
                            className={styles['pagination-button']}
                            onClick={table.previousPage}
                            disabled={!table.canPreviousPage}
                            aria-label="Previous page"
                        >
                            Previous
                        </button>

                        <span className={styles['pagination-info']}>
                            {table.currentPage} / {table.totalPages}
                        </span>

                        <button
                            className={styles['pagination-button']}
                            onClick={table.nextPage}
                            disabled={!table.canNextPage}
                            aria-label="Next page"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {slots?.footer}
        </div>
    );
}

// Display name for debugging
DataTable.displayName = 'DataTable';
