'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './QuickNav.module.css';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function QuickNav() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    // Extract all h2 and h3 headings from the page
    const elements = Array.from(document.querySelectorAll('main h2, main h3'));
    const headingData = elements
      .filter((element) => element.id)
      .map((element) => ({
        id: element.id,
        text: element.textContent || '',
        level: parseInt(element.tagName.substring(1)),
      }));
    setHeadings(headingData);

    // Scroll spy functionality
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66% 0px',
        threshold: 1.0,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  if (headings.length === 0) return null;

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      // Update URL hash without scrolling
      history.pushState(null, '', `#${id}`);
      setActiveId(id);
    }
  };

  return (
    <nav className={styles.quickNav}>
      <div className={styles.title}>Quick nav</div>
      <ul className={styles.list}>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`${styles.item} ${heading.level === 3 ? styles.nested : ''} ${
              activeId === heading.id ? styles.active : ''
            }`}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(heading.id);
              }}
              className={styles.link}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
