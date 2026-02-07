'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutTemplate,
  MousePointer2,
  Square,
  Columns,
  Maximize2,
  Table,
  CreditCard,
  CheckSquare,
  AlignJustify,
  Search,
  ArrowRight,
  Bell,
  List,
  Grid3X3,
  BookOpen,
  SplitSquareHorizontal,
  FolderOpen,
  File as FileIcon,
  BarChart,
  Layers,
  Type,
} from 'lucide-react';
import styles from './overview.module.css';

interface ComponentData {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
}

interface ComponentCategory {
  title: string;
  id: string;
  components: ComponentData[];
}

const categories: ComponentCategory[] = [
  {
    title: 'UI',
    id: 'ui',
    components: [
      {
        title: 'Button',
        description: 'Interactive button component with various variants and sizes.',
        href: '/docs/components/button',
        icon: MousePointer2,
      },
      {
        title: 'Text',
        description: 'Typography component for consistent text styling.',
        href: '/components/text',
        icon: Type,
      },
      {
        title: 'Divider',
        description: 'Visual separator between content blocks.',
        href: '/components/divider',
        icon: SplitSquareHorizontal,
      },
      {
        title: 'Badge',
        description: 'Small status indicators for metadata and labels.',
        href: '/components/badge',
        icon: Square,
      },
    ],
  },
  {
    title: 'Forms',
    id: 'forms',
    components: [
      {
        title: 'Form',
        description: 'High-level form wrapper with validation support.',
        href: '/components/form',
        icon: AlignJustify,
      },
      {
        title: 'Checkbox',
        description: 'Binary selection control for forms.',
        href: '/components/checkbox',
        icon: CheckSquare,
      },
      {
        title: 'Select',
        description: 'Dropdown menu for selecting one or more options.',
        href: '/components/select',
        icon: AlignJustify,
      },
      {
        title: 'Textarea',
        description: 'Multi-line text input field.',
        href: '/components/textarea',
        icon: AlignJustify,
      },
    ],
  },
  {
    title: 'Data Display',
    id: 'data-display',
    components: [
      {
        title: 'Data Table',
        description: 'Advanced data grid with sorting, filtering, and pagination.',
        href: '/components/data-table',
        icon: Table,
      },
      {
        title: 'Card',
        description: 'Container for grouping related content and actions.',
        href: '/components/card',
        icon: CreditCard,
      },
      {
        title: 'Empty State',
        description: 'Placeholder content for when data is missing.',
        href: '/components/empty-state',
        icon: FileIcon,
      },
      {
        title: 'Skeleton',
        description: 'Loading placeholder for content.',
        href: '/components/skeleton',
        icon: Square,
      },
    ],
  },
  {
    title: 'Layout',
    id: 'layout',
    components: [
      {
        title: 'App Shell',
        description: 'The main layout structure with header, sidebar, and content areas.',
        href: '/components/app-shell',
        icon: LayoutTemplate,
      },
      {
        title: 'Grid',
        description: 'Responsive layout system based on CSS Grid.',
        href: '/components/grid',
        icon: Grid3X3,
      },
      {
        title: 'Stack',
        description: 'Flexbox layout primitive for organizing elements.',
        href: '/components/stack',
        icon: Layers,
      },
      {
        title: 'Sidebar',
        description: 'Collapsible navigation panel.',
        href: '/components/sidebar',
        icon: Columns,
      },
    ],
  },
  {
    title: 'Navigation',
    id: 'navigation',
    components: [
      {
        title: 'Tabs',
        description: 'Switch between different views within the same context.',
        href: '/components/tabs',
        icon: BookOpen,
      },
      {
        title: 'Breadcrumbs',
        description: 'Navigation aid that shows the current page location.',
        href: '/components/breadcrumbs',
        icon: FolderOpen,
      },
      {
        title: 'Pagination',
        description: 'Navigation for splitting content across multiple pages.',
        href: '/components/pagination',
        icon: List,
      },
    ],
  },
  {
    title: 'Feedback',
    id: 'feedback',
    components: [
      {
        title: 'Modal',
        description: 'Dialog window that overlays the main content.',
        href: '/components/modal',
        icon: Maximize2,
      },
      {
        title: 'Toast',
        description: 'Transient notifications for system messages.',
        href: '/components/toast',
        icon: Bell,
      },
      {
        title: 'Progress',
        description: 'Visual indicator of an operation status.',
        href: '/components/progress',
        icon: BarChart,
      },
    ],
  },
];

export default function ComponentsOverviewPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Flatten logic for simple count if needed, but for filtering we filter categories
  const filteredCategories = categories
    .map((category) => ({
      ...category,
      components: category.components.filter(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.components.length > 0);

  const totalComponents = categories.reduce((acc, cat) => acc + cat.components.length, 0);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Explore Enterprise Components</h1>
        <p className={styles.heroSubtitle}>
          A comprehensive collection of {totalComponents}+ accessible, production-ready React
          components.
        </p>

        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Search components..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {filteredCategories.map((category) => (
        <section key={category.id} className={styles.categorySection}>
          <h2 id={category.id} className={styles.categoryTitle}>
            {category.title}
          </h2>
          <div className={styles.grid}>
            {category.components.map((component) => (
              <Link href={component.href} key={component.title} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>
                    <component.icon size={24} />
                  </div>
                  {/* Changed to h3 so it doesn't pollute the main table of contents if QuickNav only targets h2 */}
                  <div className={styles.cardTitle}>{component.title}</div>
                </div>
                <p className={styles.cardDescription}>{component.description}</p>
                <div className={styles.cardFooter}>
                  View Docs <ArrowRight size={16} className={styles.arrowIcon} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {filteredCategories.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-secondary)' }}>
          <p>No components found matching &quot;{searchQuery}&quot;</p>
        </div>
      )}
    </div>
  );
}
