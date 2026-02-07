'use client';

import { Breadcrumbs } from '@oxygenix-ui/ui';
import { ChevronRight, Home } from 'lucide-react';

export default function BreadcrumbsAdvancedDemo() {
  return (
    <div
      style={{
        padding: '24px',
        border: '1px solid var(--oxy-border-color)',
        borderRadius: 'var(--oxy-radius-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--oxy-text-muted)' }}>
          Custom Separator (Arrow)
        </div>
        <Breadcrumbs
          separator={<ChevronRight size={14} />}
          items={[
            { label: 'Projects', href: '#' },
            { label: 'Oxygenix UI', href: '#' },
            { label: 'Settings' },
          ]}
        />
      </div>

      <div>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--oxy-text-muted)' }}>
          With Icons
        </div>
        <Breadcrumbs
          items={[
            { label: <Home size={16} />, href: '#' },
            { label: 'Dashboard', href: '#' },
            { label: 'Analytics' },
          ]}
        />
      </div>
    </div>
  );
}
