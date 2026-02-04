/**
 * Modal / Dialog Component
 * 
 * Accessible, focus-trapped, composable modal dialog
 */

import { ReactNode, useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@oxygenix-ui/core';
import styles from './Navigation.module.css';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
    /** Open state */
    open: boolean;

    /** Close handler */
    onClose: () => void;

    /** Modal title */
    title?: string;

    /** Modal size */
    size?: ModalSize;

    /** Close on overlay click */
    closeOnOverlayClick?: boolean;

    /** Close on escape key */
    closeOnEscape?: boolean;

    /** Children */
    children: ReactNode;

    /** Additional CSS class */
    className?: string;
}

export function Modal(props: ModalProps) {
    const {
        open,
        onClose,
        title,
        size = 'md',
        closeOnOverlayClick = true,
        closeOnEscape = true,
        children,
        className,
    } = props;

    const [mounted, setMounted] = useState(false);
    const [exiting, setExiting] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!open) return;

        // Focus trap
        const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements && focusableElements.length > 0) {
            (focusableElements[0] as HTMLElement).focus();
        }

        // Escape key handler
        const handleEscape = (e: KeyboardEvent) => {
            if (closeOnEscape && e.key === 'Escape') {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleEscape);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [open, closeOnEscape]);

    const handleClose = () => {
        setExiting(true);
        setTimeout(() => {
            setExiting(false);
            onClose();
        }, 200); // Match animation duration
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            handleClose();
        }
    };

    if (!mounted || !open) return null;

    return createPortal(
        <>
            {/* Overlay */}
            <div
                className={cn(
                    styles['modal-overlay'],
                    exiting && styles['modal-overlay-exit']
                )}
                onClick={handleOverlayClick}
            />

            {/* Container */}
            <div className={styles['modal-container']} onClick={handleOverlayClick}>
                <div
                    ref={modalRef}
                    className={cn(
                        styles['modal-content'],
                        styles[`modal-${size}`],
                        exiting && styles['modal-content-exit'],
                        className
                    )}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={title ? 'modal-title' : undefined}
                >
                    {title && (
                        <div className={styles['modal-header']}>
                            <h2 id="modal-title" className={styles['modal-title']}>
                                {title}
                            </h2>
                            <button
                                className={styles['modal-close']}
                                onClick={handleClose}
                                aria-label="Close modal"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    {children}
                </div>
            </div>
        </>,
        document.body
    );
}

Modal.displayName = 'Modal';

// ModalBody Component
export interface ModalBodyProps {
    children: ReactNode;
    className?: string;
}

export function ModalBody(props: ModalBodyProps) {
    const { children, className } = props;

    return (
        <div className={cn(styles['modal-body'], className)}>
            {children}
        </div>
    );
}

ModalBody.displayName = 'ModalBody';

// ModalFooter Component
export interface ModalFooterProps {
    children: ReactNode;
    className?: string;
}

export function ModalFooter(props: ModalFooterProps) {
    const { children, className } = props;

    return (
        <div className={cn(styles['modal-footer'], className)}>
            {children}
        </div>
    );
}

ModalFooter.displayName = 'ModalFooter';
