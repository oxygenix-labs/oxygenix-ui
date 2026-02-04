/**
 * Tabs Component
 * 
 * Lazy-loaded tab panels with keyboard navigation
 */

import { ReactNode, useState, createContext, useContext } from 'react';
import { cn } from '@oxygenix-ui/core';
import styles from './Navigation.module.css';

interface TabsContextValue {
    activeTab: string;
    setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps {
    /** Default active tab */
    defaultValue?: string;

    /** Controlled active tab */
    value?: string;

    /** Change handler */
    onValueChange?: (value: string) => void;

    /** Children */
    children: ReactNode;

    /** Additional CSS class */
    className?: string;
}

export function Tabs(props: TabsProps) {
    const {
        defaultValue,
        value: controlledValue,
        onValueChange,
        children,
        className,
    } = props;

    const [internalValue, setInternalValue] = useState(defaultValue || '');

    const activeTab = controlledValue ?? internalValue;

    const setActiveTab = (newValue: string) => {
        if (onValueChange) {
            onValueChange(newValue);
        } else {
            setInternalValue(newValue);
        }
    };

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={cn(styles.tabs, className)}>
                {children}
            </div>
        </TabsContext.Provider>
    );
}

Tabs.displayName = 'Tabs';

// TabsList Component
export interface TabsListProps {
    children: ReactNode;
    className?: string;
}

export function TabsList(props: TabsListProps) {
    const { children, className } = props;

    return (
        <div className={cn(styles['tabs-list'], className)} role="tablist">
            {children}
        </div>
    );
}

TabsList.displayName = 'TabsList';

// TabsTrigger Component
export interface TabsTriggerProps {
    value: string;
    children: ReactNode;
    disabled?: boolean;
    className?: string;
}

export function TabsTrigger(props: TabsTriggerProps) {
    const { value, children, disabled = false, className } = props;
    const context = useContext(TabsContext);

    if (!context) {
        throw new Error('TabsTrigger must be used within Tabs');
    }

    const { activeTab, setActiveTab } = context;
    const isActive = activeTab === value;

    return (
        <button
            className={cn(
                styles['tabs-trigger'],
                isActive && styles['tabs-trigger-active'],
                className
            )}
            onClick={() => !disabled && setActiveTab(value)}
            disabled={disabled}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${value}`}
            id={`tab-${value}`}
        >
            {children}
        </button>
    );
}

TabsTrigger.displayName = 'TabsTrigger';

// TabsContent Component
export interface TabsContentProps {
    value: string;
    children: ReactNode;
    /** Lazy load - only render when active */
    lazy?: boolean;
    className?: string;
}

export function TabsContent(props: TabsContentProps) {
    const { value, children, lazy = true, className } = props;
    const context = useContext(TabsContext);

    if (!context) {
        throw new Error('TabsContent must be used within Tabs');
    }

    const { activeTab } = context;
    const isActive = activeTab === value;

    // Lazy loading: don't render until active
    if (lazy && !isActive) {
        return null;
    }

    return (
        <div
            className={cn(styles['tabs-content'], className)}
            role="tabpanel"
            id={`panel-${value}`}
            aria-labelledby={`tab-${value}`}
            hidden={!isActive}
        >
            {children}
        </div>
    );
}

TabsContent.displayName = 'TabsContent';
