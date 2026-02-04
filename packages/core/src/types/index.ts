/**
 * Core TypeScript types used across Oxygenix UI components
 */

import { ReactNode, CSSProperties, HTMLAttributes } from 'react';

/**
 * Base props that all components should extend
 */
export interface BaseComponentProps {
    /** Additional CSS class names */
    className?: string;
    /** Inline styles */
    style?: CSSProperties;
    /** Children elements */
    children?: ReactNode;
    /** Test ID for testing */
    'data-testid'?: string;
}

/**
 * Props for components that can be disabled
 */
export interface DisableableProps {
    /** Whether the component is disabled */
    disabled?: boolean;
}

/**
 * Props for components that support loading states
 */
export interface LoadableProps {
    /** Whether the component is in a loading state */
    loading?: boolean;
}

/**
 * Size variants for components
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Color variants for components
 */
export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost';

/**
 * Generic event handler type
 */
export type EventHandler<T = void> = (event: T) => void;

/**
 * Async event handler type
 */
export type AsyncEventHandler<T = void> = (event: T) => Promise<void>;

/**
 * Polymorphic component props
 * Allows components to render as different HTML elements
 */
export type As = keyof JSX.IntrinsicElements;

export interface PolymorphicProps<E extends As = 'div'> {
    /** The element type to render as */
    as?: E;
}

/**
 * Merge props from polymorphic component with element props
 */
export type PropsWithAs<P, E extends As> = P &
    Omit<HTMLAttributes<HTMLElement>, keyof P> &
    PolymorphicProps<E>;

/**
 * Extract element type from polymorphic props
 */
export type ElementType<P> = P extends PolymorphicProps<infer E> ? E : never;

/**
 * Permission context for permission-based rendering
 */
export interface PermissionContext {
    /** Current user object */
    user?: unknown;
    /** Additional context data */
    [key: string]: unknown;
}

/**
 * Common permission check function
 */
export type PermissionCheck<T = unknown> = (
    item: T,
    context?: PermissionContext
) => boolean;

/**
 * Slot configuration for customizable component sections
 */
export type SlotConfig<T = unknown> = {
    [key: string]: ReactNode | ((context: T) => ReactNode);
};

/**
 * Controlled component value and change handler
 */
export interface ControlledProps<T> {
    /** Controlled value */
    value?: T;
    /** Change handler */
    onChange?: (value: T) => void;
}

/**
 * Uncontrolled component default value
 */
export interface UncontrolledProps<T> {
    /** Default value for uncontrolled mode */
    defaultValue?: T;
}

/**
 * Combined controlled/uncontrolled props
 */
export type ControllableProps<T> = ControlledProps<T> & UncontrolledProps<T>;

/**
 * Validation result
 */
export type ValidationResult = true | string | Promise<true | string>;

/**
 * Validation function
 */
export type ValidationFunction<T = any> = (value: T) => ValidationResult;

/**
 * Field error
 */
export interface FieldError {
    type: string;
    message: string;
}

/**
 * Form errors object
 */
export type FormErrors<T = any> = {
    [K in keyof T]?: FieldError | FormErrors<T[K]>;
};


