'use client'

import { useState } from 'react'
import styles from './CodeTabs.module.css'

interface CodeTab {
    label: string
    code: string
    language?: string
}

interface CodeTabsProps {
    tabs: CodeTab[]
    defaultTab?: number
}

export function CodeTabs({ tabs, defaultTab = 0 }: CodeTabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab)

    return (
        <div className={styles.container}>
            <div className={styles.tabList} role="tablist">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        role="tab"
                        aria-selected={activeTab === index}
                        aria-controls={`tabpanel-${index}`}
                        id={`tab-${index}`}
                        className={`${styles.tab} ${activeTab === index ? styles.active : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {tabs.map((tab, index) => (
                <div
                    key={index}
                    role="tabpanel"
                    id={`tabpanel-${index}`}
                    aria-labelledby={`tab-${index}`}
                    hidden={activeTab !== index}
                    className={styles.tabPanel}
                >
                    <pre className={styles.code}>
                        <code className={tab.language ? `language-${tab.language}` : ''}>
                            {tab.code}
                        </code>
                    </pre>
                </div>
            ))}
        </div>
    )
}
