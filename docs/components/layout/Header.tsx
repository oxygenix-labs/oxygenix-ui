'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Moon, Sun, Search, Github } from 'lucide-react'
import styles from './Header.module.css'

export function Header() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setMounted(true)
        const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        const initialTheme = stored || systemPreference
        setTheme(initialTheme)
        document.documentElement.setAttribute('data-theme', initialTheme)
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
    }

    const isActive = (path: string) => {
        if (path === '/docs') {
            return pathname?.startsWith('/docs')
        }
        return pathname === path
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>O</div>
                    <span>Oxygenix UI</span>
                </Link>

                <nav className={styles.nav}>
                    <ul className={styles.navLinks}>
                        <li>
                            <Link
                                href="/docs"
                                className={`${styles.navLink} ${isActive('/docs') ? styles.active : ''}`}
                            >
                                Docs
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/docs/components/data-table"
                                className={styles.navLink}
                            >
                                Components
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/examples"
                                className={styles.navLink}
                            >
                                Examples
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className={styles.actions}>
                    <button
                        className={styles.searchTrigger}
                        onClick={() => console.log('Open search')}
                        aria-label="Search documentation"
                    >
                        <Search size={14} />
                        <span>Search</span>
                        <kbd className={styles.searchShortcut}>⌘K</kbd>
                    </button>

                    {mounted && (
                        <button
                            className={styles.iconButton}
                            onClick={toggleTheme}
                            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                        </button>
                    )}

                    <a
                        href="https://github.com/oxygenix-ui/oxygenix-ui"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconButton}
                        aria-label="View on GitHub"
                    >
                        <Github size={16} />
                    </a>
                </div>
            </div>
        </header>
    )
}
