import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { QuickNav } from '@/components/mdx/QuickNav'
import styles from './layout.module.css'

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <div className={styles.layout}>
                <Sidebar />
                <main className={styles.main}>
                    {children}
                </main>
                <aside className={styles.quickNav}>
                    <QuickNav />
                </aside>
            </div>
        </>
    )
}
