import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { QuickNav } from '@/components/mdx/QuickNav';
import { DocsPagination } from '@/components/layout/DocsPagination';
import styles from './layout.module.css';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className={styles.layout}>
        <Sidebar className={styles.sidebar} />
        <main className={styles.main}>
          {children}
          <DocsPagination />
        </main>
        <aside className={styles.quickNav}>
          <QuickNav />
        </aside>
      </div>
    </>
  );
}
