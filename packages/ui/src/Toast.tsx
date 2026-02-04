/**
 * Toast Component
 * 
 * Promise-aware toast notifications with auto-dismiss
 */

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@oxygenix-ui/core';
import styles from './Feedback.module.css';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastProps {
    /** Toast variant */
    variant?: ToastVariant;

    /** Toast title */
    title: string;

    /** Toast description */
    description?: string;

    /** Custom icon */
    icon?: ReactNode;

    /** Auto-dismiss duration in ms (0 = no auto-dismiss) */
    duration?: number;

    /** Close handler */
    onClose?: () => void;

    /** Additional CSS class */
    className?: string;
}

const defaultIcons: Record<ToastVariant, string> = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
};

export function Toast(props: ToastProps) {
    const {
        variant = 'info',
        title,
        description,
        icon,
        duration = 5000,
        onClose,
        className,
    } = props;

    const [exiting, setExiting] = useState(false);

    const handleClose = () => {
        setExiting(true);
        setTimeout(() => {
            onClose?.();
        }, 200); // Match animation duration
    };

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                handleClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, handleClose]);

    return (
        <div
            className={cn(
                styles.toast,
                styles[`toast-${variant}`],
                exiting && styles['toast-exit'],
                className
            )}
            role="alert"
            aria-live="polite"
        >
            <div className={styles['toast-icon']}>
                {icon ?? defaultIcons[variant]}
            </div>

            <div className={styles['toast-content']}>
                <div className={styles['toast-title']}>{title}</div>
                {description && (
                    <div className={styles['toast-description']}>{description}</div>
                )}
            </div>

            <button
                className={styles['toast-close']}
                onClick={handleClose}
                aria-label="Close notification"
            >
                ✕
            </button>
        </div>
    );
}

Toast.displayName = 'Toast';

// Toast Container Component
export interface ToastContainerProps {
    /** Toast position */
    position?: ToastPosition;

    /** Children (Toast components) */
    children: ReactNode;
}

export function ToastContainer(props: ToastContainerProps) {
    const { position = 'top-right', children } = props;

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <div className={cn(
            styles['toast-container'],
            styles[`toast-container-${position}`]
        )}>
            {children}
        </div>,
        document.body
    );
}

ToastContainer.displayName = 'ToastContainer';
