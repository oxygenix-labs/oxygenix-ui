import { Header } from '@/components/layout/Header';
import styles from './layout.module.css';

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className={styles.layout}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}
