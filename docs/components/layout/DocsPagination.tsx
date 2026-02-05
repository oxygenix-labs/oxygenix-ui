'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { navigation, NavItem } from '@/lib/navigation';
import styles from './DocsPagination.module.css';

function flattenNavigation(items: NavItem[]): { title: string; href: string }[] {
  return items.reduce(
    (acc, item) => {
      if (item.href) {
        acc.push({ title: item.title, href: item.href });
      }
      if (item.items) {
        acc.push(...flattenNavigation(item.items));
      }
      return acc;
    },
    [] as { title: string; href: string }[]
  );
}

export function DocsPagination() {
  const pathname = usePathname();
  const flatNav = flattenNavigation(navigation);
  const currentIndex = flatNav.findIndex((item) => item.href === pathname);

  if (currentIndex === -1) return null;

  const prev = flatNav[currentIndex - 1];
  const next = flatNav[currentIndex + 1];

  return (
    <div className={styles.pagination}>
      {prev ? (
        <Link href={prev.href} className={styles.link}>
          <div className={styles.label}>Previous</div>
          <div className={styles.title}>
            <ChevronLeft size={16} />
            {prev.title}
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next && (
        <Link href={next.href} className={`${styles.link} ${styles.next}`}>
          <div className={styles.label}>Next</div>
          <div className={styles.title}>
            {next.title}
            <ChevronRight size={16} />
          </div>
        </Link>
      )}
    </div>
  );
}
