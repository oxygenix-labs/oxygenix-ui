/**
 * Pagination Component
 * 
 * Table and list pagination with ellipsis
 */

import { cn } from '@oxygenix-ui/core';
import styles from './Navigation.module.css';

export interface PaginationProps {
    /** Current page (1-indexed) */
    currentPage: number;

    /** Total number of pages */
    totalPages: number;

    /** Page change handler */
    onPageChange: (page: number) => void;

    /** Number of page buttons to show */
    siblingCount?: number;

    /** Show page info text */
    showInfo?: boolean;

    /** Total items (for info text) */
    totalItems?: number;

    /** Items per page (for info text) */
    pageSize?: number;

    /** Additional CSS class */
    className?: string;
}

export function Pagination(props: PaginationProps) {
    const {
        currentPage,
        totalPages,
        onPageChange,
        siblingCount = 1,
        showInfo = false,
        totalItems,
        pageSize,
        className,
    } = props;

    const generatePageNumbers = () => {
        const pages: (number | 'ellipsis')[] = [];

        // Always show first page
        pages.push(1);

        // Calculate range around current page
        const leftSibling = Math.max(currentPage - siblingCount, 2);
        const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);

        // Add left ellipsis if needed
        if (leftSibling > 2) {
            pages.push('ellipsis');
        }

        // Add pages around current
        for (let i = leftSibling; i <= rightSibling; i++) {
            pages.push(i);
        }

        // Add right ellipsis if needed
        if (rightSibling < totalPages - 1) {
            pages.push('ellipsis');
        }

        // Always show last page if more than 1 page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = generatePageNumbers();

    const startItem = totalItems && pageSize ? (currentPage - 1) * pageSize + 1 : null;
    const endItem = totalItems && pageSize ? Math.min(currentPage * pageSize, totalItems) : null;

    return (
        <div className={cn(styles.pagination, className)}>
            {/* Previous button */}
            <button
                className={styles['pagination-button']}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                ←
            </button>

            {/* Page numbers */}
            {pages.map((page, index) => {
                if (page === 'ellipsis') {
                    return (
                        <span key={`ellipsis-${index}`} className={styles['pagination-ellipsis']}>
                            ...
                        </span>
                    );
                }

                return (
                    <button
                        key={page}
                        className={cn(
                            styles['pagination-button'],
                            currentPage === page && styles['pagination-button-active']
                        )}
                        onClick={() => onPageChange(page)}
                        aria-label={`Page ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Next button */}
            <button
                className={styles['pagination-button']}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                →
            </button>

            {/* Info text */}
            {showInfo && startItem && endItem && totalItems && (
                <span className={styles['pagination-info']}>
                    Showing {startItem}-{endItem} of {totalItems}
                </span>
            )}
        </div>
    );
}

Pagination.displayName = 'Pagination';
