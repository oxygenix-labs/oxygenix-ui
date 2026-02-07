'use client';

import { useState } from 'react';
import { Badge, Button, Text, Heading } from '@oxygenix-ui/ui';
import { Github } from 'lucide-react';
import styles from './page.module.css';

type ChangeType = 'feature' | 'fix' | 'improvement';

interface ChangeItem {
  id: string;
  description: string;
  type: ChangeType;
}

interface Release {
  version: string;
  date: string;
  description?: string;
  changes: ChangeItem[];
}

const releases: Release[] = [
  {
    version: 'v0.6.1',
    date: 'February 7, 2026',
    description: 'Hotfix release addressing build stability and component exports.',
    changes: [
      { id: '1', type: 'fix', description: 'Resolved export conflicts in `page.tsx` icons.' },
      { id: '2', type: 'fix', description: 'Fixed `QuickNav` rendering issues on static builds.' },
      { id: '3', type: 'improvement', description: 'Optimized package bundle size.' },
    ],
  },
  {
    version: 'v0.6.0',
    date: 'February 1, 2026',
    description: 'Major update introducing new navigation components and improved theming system.',
    changes: [
      {
        id: '1',
        type: 'feature',
        description: 'Added `Tabs`, `Breadcrumbs`, and `Pagination` components.',
      },
      {
        id: '2',
        type: 'feature',
        description: 'Introduced new "Playground" for interactive component testing.',
      },
      { id: '3', type: 'improvement', description: 'Enhanced dark mode contrast ratios.' },
      { id: '4', type: 'fix', description: 'Fixed accessibility issues in `Modal` focus trap.' },
    ],
  },
  {
    version: 'v0.5.0',
    date: 'January 15, 2026',
    description: 'Initial public beta release.',
    changes: [
      {
        id: '1',
        type: 'feature',
        description: 'Core component library launch (Button, Input, Card).',
      },
      { id: '2', type: 'feature', description: 'Documentation site with MDX support.' },
    ],
  },
];

const typeColors: Record<ChangeType, 'success' | 'warning' | 'info' | 'default' | 'primary'> = {
  feature: 'primary',
  fix: 'warning',
  improvement: 'info',
};

const typeLabels: Record<ChangeType, string> = {
  feature: 'Features',
  fix: 'Fixes',
  improvement: 'Improvements',
};

const typeIcons: Record<ChangeType, string> = {
  feature: '✨',
  fix: '🐛',
  improvement: '🧪',
};

export default function ChangelogPage() {
  const [filter, setFilter] = useState<ChangeType | 'all'>('all');

  const filteredReleases = releases
    .map((release) => ({
      ...release,
      changes:
        filter === 'all' ? release.changes : release.changes.filter((c) => c.type === filter),
    }))
    .filter((release) => release.changes.length > 0);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Heading level="h1" className={styles.title}>
            Changelog
          </Heading>
          <Text className={styles.subtitle}>
            Stay up to date with new releases and improvements.
          </Text>
        </div>
        <div className={styles.actions}>
          <a
            href="https://github.com/oxygenix-ui/oxygenix-ui/releases"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" leftIcon={<Github size={16} />}>
              View on GitHub
            </Button>
          </a>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <Button
          variant={filter === 'all' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'feature' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setFilter('feature')}
        >
          ✨ Features
        </Button>
        <Button
          variant={filter === 'fix' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setFilter('fix')}
        >
          🐛 Fixes
        </Button>
        <Button
          variant={filter === 'improvement' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setFilter('improvement')}
        >
          🧪 Improvements
        </Button>
      </div>

      {/* Timeline */}
      <div className={styles.timeline}>
        {filteredReleases.map((release, index) => (
          <div key={release.version} className={styles.release}>
            <div className={styles.timelineMarker}>
              <div className={styles.markerDot} />
              {index !== filteredReleases.length - 1 && <div className={styles.markerLine} />}
            </div>
            <div className={styles.releaseContent}>
              <div className={styles.releaseHeader}>
                <div className={styles.versionBadge}>
                  <Badge variant="solid" size="lg">
                    {release.version}
                  </Badge>
                </div>
                <span className={styles.releaseDate}>{release.date}</span>
              </div>
              {release.description && (
                <Text className={styles.releaseDescription}>{release.description}</Text>
              )}

              <div className={styles.changesList}>
                {release.changes.map((change) => (
                  <div key={change.id} className={styles.changeItem}>
                    <span className={styles.changeIcon} aria-hidden="true">
                      {typeIcons[change.type]}
                    </span>
                    <span className={styles.changeText}>{change.description}</span>
                    <Badge
                      variant={typeColors[change.type] as any}
                      size="sm"
                      className={styles.changeTypeBadge}
                    >
                      {typeLabels[change.type]}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
