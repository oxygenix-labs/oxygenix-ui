/**
 * DataTable Hook - Headless table state management
 * 
 * This hook manages all table state (sorting, pagination, selection, filtering)
 * and can be used independently for custom table implementations.
 */

import { useState, useMemo, useCallback } from 'react';
import type {
    Column,
    SortingState,
    SortingConfig,
    PaginationConfig,
    SelectionConfig,
} from './types';

export interface UseDataTableProps<T = any> {
    data: T[];
    columns: Column<T>[];
    sorting?: SortingConfig;
    pagination?: PaginationConfig;
    selection?: SelectionConfig<T>;
    getRowId?: (row: T) => string;
}

export interface UseDataTableReturn<T = any> {
    // Data
    rows: T[];
    visibleColumns: Column<T>[];

    // Sorting
    sortState: SortingState;
    setSortState: (state: SortingState) => void;
    toggleSort: (columnId: string) => void;
    getSortDirection: (columnId: string) => 'asc' | 'desc' | undefined;

    // Pagination
    currentPage: number;
    pageSize: number;
    totalPages: number;
    canPreviousPage: boolean;
    canNextPage: boolean;
    nextPage: () => void;
    previousPage: () => void;
    goToPage: (page: number) => void;
    setPageSize: (size: number) => void;
    paginatedRows: T[];

    // Selection
    selectedRows: string[];
    isRowSelected: (rowId: string) => boolean;
    toggleRowSelection: (rowId: string) => void;
    toggleSelectAll: () => void;
    isAllSelected: boolean;
    isSomeSelected: boolean;

    // Utilities
    getCellValue: (row: T, column: Column<T>) => any;
}

export function useDataTable<T = any>(
    props: UseDataTableProps<T>
): UseDataTableReturn<T> {
    const {
        data,
        columns,
        sorting: sortingConfig,
        pagination: paginationConfig,
        selection: selectionConfig,
        getRowId = (row: any) => row.id || String(row),
    } = props;

    // ========================================
    // SORTING STATE
    // ========================================
    const [sortState, setSortState] = useState<SortingState>(
        sortingConfig?.sortState || []
    );

    const toggleSort = useCallback(
        (columnId: string) => {
            setSortState((prev) => {
                const existing = prev.find((s) => s.column === columnId);

                if (!existing) {
                    // Add new sort
                    if (sortingConfig?.mode === 'single') {
                        return [{ column: columnId, direction: 'asc' }];
                    }
                    return [...prev, { column: columnId, direction: 'asc' }];
                }

                if (existing.direction === 'asc') {
                    // Change to desc
                    return prev.map((s) =>
                        s.column === columnId ? { ...s, direction: 'desc' as const } : s
                    );
                }

                // Remove sort
                return prev.filter((s) => s.column !== columnId);
            });
        },
        [sortingConfig?.mode]
    );

    const getSortDirection = useCallback(
        (columnId: string) => {
            return sortState.find((s) => s.column === columnId)?.direction;
        },
        [sortState]
    );

    // ========================================
    // PAGINATION STATE
    // ========================================
    const [currentPage, setCurrentPage] = useState(paginationConfig?.currentPage || 1);
    const [pageSize, setPageSize] = useState(paginationConfig?.pageSize || 50);

    // ========================================
    // SELECTION STATE
    // ========================================
    const [selectedRows, setSelectedRows] = useState<string[]>(
        selectionConfig?.selectedRows || []
    );

    const isRowSelected = useCallback(
        (rowId: string) => selectedRows.includes(rowId),
        [selectedRows]
    );

    const toggleRowSelection = useCallback(
        (rowId: string) => {
            setSelectedRows((prev) => {
                if (selectionConfig?.mode === 'single') {
                    return prev.includes(rowId) ? [] : [rowId];
                }

                return prev.includes(rowId)
                    ? prev.filter((id) => id !== rowId)
                    : [...prev, rowId];
            });
        },
        [selectionConfig?.mode]
    );

    // ========================================
    // COMPUTED VALUES
    // ========================================

    // Visible columns
    const visibleColumns = useMemo(
        () => columns.filter((col) => !col.hidden),
        [columns]
    );

    // Sorted data
    const sortedData = useMemo(() => {
        if (!sortingConfig?.enabled || sortState.length === 0) {
            return data;
        }

        // Use custom sort if provided
        if (sortingConfig.customSort) {
            return sortingConfig.customSort(data, sortState);
        }

        // Default sort implementation
        return [...data].sort((a, b) => {
            for (const sort of sortState) {
                const column = columns.find((col) => col.id === sort.column);
                if (!column) continue;

                const aValue = getCellValue(a, column);
                const bValue = getCellValue(b, column);

                if (aValue === bValue) continue;

                const comparison = aValue > bValue ? 1 : -1;
                return sort.direction === 'asc' ? comparison : -comparison;
            }
            return 0;
        });
    }, [data, sortState, sortingConfig, columns]);

    // Paginated data
    const paginatedRows = useMemo(() => {
        if (!paginationConfig?.enabled) {
            return sortedData;
        }

        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        return sortedData.slice(start, end);
    }, [sortedData, currentPage, pageSize, paginationConfig?.enabled]);

    // Pagination helpers
    const totalPages = Math.ceil(sortedData.length / pageSize);
    const canPreviousPage = currentPage > 1;
    const canNextPage = currentPage < totalPages;

    const nextPage = useCallback(() => {
        if (canNextPage) {
            setCurrentPage((p) => p + 1);
        }
    }, [canNextPage]);

    const previousPage = useCallback(() => {
        if (canPreviousPage) {
            setCurrentPage((p) => p - 1);
        }
    }, [canPreviousPage]);

    const goToPage = useCallback((page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    }, [totalPages]);

    // Selection helpers
    const selectableRows = useMemo(() => {
        return paginatedRows.filter((row) =>
            selectionConfig?.isRowSelectable ? selectionConfig.isRowSelectable(row) : true
        );
    }, [paginatedRows, selectionConfig]);

    const selectableRowIds = useMemo(
        () => selectableRows.map(getRowId),
        [selectableRows, getRowId]
    );

    const isAllSelected = useMemo(
        () =>
            selectableRowIds.length > 0 &&
            selectableRowIds.every((id) => selectedRows.includes(id)),
        [selectableRowIds, selectedRows]
    );

    const isSomeSelected = useMemo(
        () =>
            selectableRowIds.some((id) => selectedRows.includes(id)) && !isAllSelected,
        [selectableRowIds, selectedRows, isAllSelected]
    );

    const toggleSelectAll = useCallback(() => {
        if (isAllSelected) {
            setSelectedRows((prev) =>
                prev.filter((id) => !selectableRowIds.includes(id))
            );
        } else {
            setSelectedRows((prev) => [...new Set([...prev, ...selectableRowIds])]);
        }
    }, [isAllSelected, selectableRowIds]);

    // ========================================
    // UTILITIES
    // ========================================

    const getCellValue = useCallback((row: T, column: Column<T>) => {
        if (column.accessor) {
            if (typeof column.accessor === 'function') {
                return column.accessor(row);
            }
            return row[column.accessor];
        }
        return undefined;
    }, []);

    return {
        // Data
        rows: paginatedRows,
        visibleColumns,

        // Sorting
        sortState,
        setSortState,
        toggleSort,
        getSortDirection,

        // Pagination
        currentPage,
        pageSize,
        totalPages,
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        goToPage,
        setPageSize,
        paginatedRows,

        // Selection
        selectedRows,
        isRowSelected,
        toggleRowSelection,
        toggleSelectAll,
        isAllSelected,
        isSomeSelected,

        // Utilities
        getCellValue,
    };
}
