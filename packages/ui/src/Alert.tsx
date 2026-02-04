/**
 * Alert Component
 * 
 * Inline alerts for info, success, warning, and error messages
 */

import { ReactNode, useState } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './Feedback.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
    /** Alert variant */
    variant?: AlertVariant;

    /** Alert title */
    title?: string;

    /** Alert description */
    description?: ReactNode;

    /** Custom icon */
    icon?: ReactNode;

    /** Show close button */
    closable?: boolean;

    /** Close handler */
    onClose?: () => void;

    /** Additional CSS class */
    className?: string;
}

const defaultIcons: Record<AlertVariant, string> = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
};

export function Alert(props: AlertProps) {
    const {
        variant = 'info',
        title,
        description,
        icon,
        closable = false,
        onClose,
        className,
    } = props;

    const [visible, setVisible] = useState(true);

    const handleClose = () => {
        setVisible(false);
        onClose?.();
    };

    if (!visible) return null;

    return (
        <div
            className={cn(
                styles.alert,
                styles[`alert-${variant}`],
                className
            )}
            role="alert"
        >
            <div className={styles['alert-icon']}>
                {icon ?? defaultIcons[variant]}
            </div>

            <div className={styles['alert-content']}>
                {title && (
                    <div className={styles['alert-title']}>{title}</div>
                )}
                {description && (
                    <div className={styles['alert-description']}>{description}</div>
                )}
            </div>

            {closable && (
                <button
                    className={styles['alert-close']}
                    onClick={handleClose}
                    aria-label="Close alert"
                >
                    ✕
                </button>
            )}
        </div>
    );
}

Alert.displayName = 'Alert';
