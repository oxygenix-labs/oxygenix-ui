/**
 * DataTable Component Types
 */

import { ReactNode, HTMLAttributes } from 'react';

/**
 * Column definition for DataTable
 */
export interface Column<T = any> {
  /** Unique column identifier */
  id: string;

  /** Column header content */
  header: ReactNode | ((context: HeaderContext) => ReactNode);

  /** Data accessor - key or function */
  accessor?: keyof T | ((row: T) => any);

  /** Custom cell renderer */
  cell?: (context: CellContext<T>) => ReactNode;

  /** Column width */
  width?: number | string;

  /** Minimum column width */
  minWidth?: number;

  /** Maximum column width */
  maxWidth?: number;

  /** Whether column is sortable */
  sortable?: boolean;

  /** Whether column is filterable */
  filterable?: boolean;

  /** Whether column is resizable */
  resizable?: boolean;

  /** Column pinning */
  pinned?: 'left' | 'right' | false;

  /** Whether column is hidden */
  hidden?: boolean;

  /** Text alignment */
  align?: 'left' | 'center' | 'right';

  /** Custom metadata */
  meta?: Record<string, any>;
}

/**
 * Cell rendering context
 */
export interface CellContext<T = any> {
  /** Cell value */
  value: any;

  /** Row data */
  row: T;

  /** Row index */
  rowIndex: number;

  /** Column definition */
  column: Column<T>;

  /** Whether cell is being edited */
  isEditing: boolean;

  /** Whether row is selected */
  isSelected: boolean;

  /** Whether row is hovered */
  isHovered: boolean;
}

/**
 * Header rendering context
 */
export interface HeaderContext {
  /** Column definition */
  column: Column;

  /** Whether column is sorted */
  isSorted: boolean;

  /** Sort direction */
  sortDirection: 'asc' | 'desc' | undefined;

  /** Whether column is filtered */
  isFiltered: boolean;
}

/**
 * Sorting state
 */
export type SortingState = Array<{
  column: string;
  direction: 'asc' | 'desc';
}>;

/**
 * Sorting configuration
 */
export interface SortingConfig {
  /** Whether sorting is enabled */
  enabled?: boolean;

  /** Sorting mode */
  mode?: 'single' | 'multi';

  /** Current sort state */
  sortState?: SortingState;

  /** Sort change handler */
  onSortChange?: (state: SortingState) => void;

  /** Custom sort function */
  customSort?: (rows: any[], sorting: SortingState) => any[];
}

/**
 * Pagination configuration
 */
export interface PaginationConfig {
  /** Whether pagination is enabled */
  enabled?: boolean;

  /** Page size */
  pageSize?: number;

  /** Available page size options */
  pageSizeOptions?: number[];

  /** Current page (1-indexed) */
  currentPage?: number;

  /** Page change handler */
  onPageChange?: (page: number) => void;

  /** Page size change handler */
  onPageSizeChange?: (pageSize: number) => void;

  /** Show page size selector */
  showPageSizeSelector?: boolean;

  /** Show page info */
  showPageInfo?: boolean;
}

/**
 * Selection configuration
 */
export interface SelectionConfig<T = any> {
  /** Selection mode */
  mode: 'single' | 'multi';

  /** Selected row IDs */
  selectedRows?: string[];

  /** Selection change handler */
  onSelectionChange?: (selectedRows: string[], rows: T[]) => void;

  /** Function to determine if row is selectable */
  isRowSelectable?: (row: T) => boolean;

  /** Select row on click */
  selectOnRowClick?: boolean;

  /** Show select all checkbox */
  showSelectAll?: boolean;
}

/**
 * Server-side configuration
 */
export interface ServerSideConfig<T = any> {
  /** Total number of rows on server */
  totalRows: number;

  /** Fetch data handler */
  onFetchData: (params: FetchParams) => Promise<FetchResult<T>>;

  /** Keep previous data while loading */
  keepPreviousData?: boolean;
}

/**
 * Fetch parameters for server-side mode
 */
export interface FetchParams {
  page: number;
  pageSize: number;
  sorting?: SortingState;
  filters?: FilterState;
}

/**
 * Fetch result for server-side mode
 */
export interface FetchResult<T> {
  data: T[];
  totalRows: number;
}

/**
 * Filter state
 */
export type FilterState = Record<string, any>;

/**
 * Virtualization configuration
 */
export interface VirtualizationConfig {
  /** Whether virtualization is enabled */
  enabled: boolean;

  /** Estimate row height */
  estimateRowHeight?: (index: number) => number;

  /** Number of items to render outside visible area */
  overscan?: number;
}

/**
 * Slots configuration for custom rendering
 */
export interface SlotsConfig<T = any> {
  /** Empty state */
  emptyState?: ReactNode;

  /** Loading state */
  loadingState?: ReactNode;

  /** Error state */
  errorState?: (error: Error) => ReactNode;

  /** Toolbar */
  toolbar?: ReactNode;

  /** Footer */
  footer?: ReactNode;

  /** Row actions */
  rowActions?: (row: T) => ReactNode;

  /** Bulk actions */
  bulkActions?: (selectedRows: T[]) => ReactNode;
}

/**
 * DataTable props
 */
export interface DataTableProps<T = any> extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Table data */
  data: T[];

  /** Column definitions */
  columns: Column<T>[];

  /** Server-side mode configuration */
  serverSide?: ServerSideConfig<T>;

  /** Selection configuration */
  selection?: SelectionConfig<T>;

  /** Sorting configuration */
  sorting?: SortingConfig;

  /** Pagination configuration */
  pagination?: PaginationConfig;

  /** Virtualization configuration */
  virtualization?: VirtualizationConfig;

  /** Row click handler */
  onRowClick?: (row: T, event: React.MouseEvent) => void;

  /** Custom row class name */
  rowClassName?: (row: T) => string;

  /** Customization slots */
  slots?: SlotsConfig<T>;

  /** Loading state */
  loading?: boolean;

  /** Error state */
  error?: Error;

  /** Get row ID */
  getRowId?: (row: T) => string;
}
