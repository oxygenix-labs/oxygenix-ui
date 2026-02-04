'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { navigation } from '@/lib/navigation'
import styles from './Sidebar.module.css'

export function Sidebar() {
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

    useEffect(() => {
        const stored = localStorage.getItem('sidebar-collapsed')
        if (stored) {
            setCollapsed(JSON.parse(stored))
        }
    }, [])

    const toggleSection = (title: string) => {
        const newCollapsed = { ...collapsed, [title]: !collapsed[title] }
        setCollapsed(newCollapsed)
        localStorage.setItem('sidebar-collapsed', JSON.stringify(newCollapsed))
    }

    const isActive = (href: string) => pathname === href

    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                {navigation.map((section) => {
                    // Handle items with direct href (no children)
                    if (section.href) {
                        return (
                            <Link
                                key={section.href}
                                href={section.href}
                                className={`${styles.item} ${isActive(section.href) ? styles.active : ''
                                    }`}
                            >
                                {section.title}
                            </Link>
                        )
                    }

                    // Handle sections with items
                    if (!section.items) return null

                    return (
                        <div key={section.title} className={styles.section}>
                            <div
                                className={styles.sectionHeader}
                                onClick={() => toggleSection(section.title)}
                            >
                                <span>{section.title}</span>
                                <ChevronDown
                                    size={14}
                                    className={`${styles.sectionIcon} ${collapsed[section.title] ? styles.collapsed : ''
                                        }`}
                                />
                            </div>

                            <div
                                className={`${styles.items} ${collapsed[section.title] ? styles.collapsed : ''
                                    }`}
                            >
                                {section.items.map((item) => {
                                    if ('items' in item && item.items) {
                                        // Subsection with nested items
                                        return (
                                            <div key={item.title} className={styles.nested}>
                                                <div
                                                    className={styles.subsectionHeader}
                                                    onClick={() => toggleSection(`${section.title}-${item.title}`)}
                                                >
                                                    <span>{item.title}</span>
                                                    <ChevronDown
                                                        size={12}
                                                        className={`${styles.subsectionIcon} ${collapsed[`${section.title}-${item.title}`]
                                                                ? styles.collapsed
                                                                : ''
                                                            }`}
                                                    />
                                                </div>
                                                <div
                                                    className={`${styles.items} ${collapsed[`${section.title}-${item.title}`]
                                                            ? styles.collapsed
                                                            : ''
                                                        }`}
                                                >
                                                    {item.items.map((subItem) => (
                                                        <Link
                                                            key={subItem.href}
                                                            href={subItem.href!}
                                                            className={`${styles.item} ${isActive(subItem.href!) ? styles.active : ''
                                                                }`}
                                                        >
                                                            {subItem.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    }

                                    // Regular item with href
                                    if (item.href) {
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={`${styles.item} ${isActive(item.href) ? styles.active : ''
                                                    }`}
                                            >
                                                {item.title}
                                            </Link>
                                        )
                                    }

                                    return null
                                })}
                            </div>
                        </div>
                    )
                })}
            </nav>
        </aside>
    )
}
