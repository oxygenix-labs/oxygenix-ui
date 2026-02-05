'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Sidebar } from './Sidebar';
import styles from './MobileMenu.module.css';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <span style={{ fontWeight: 600 }}>Menu</span>
          <button onClick={onClose} className={styles.closeButton} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <div className={styles.content}>
          <Sidebar className={styles.sidebarOverride} />
        </div>
      </div>
    </>
  );
}
