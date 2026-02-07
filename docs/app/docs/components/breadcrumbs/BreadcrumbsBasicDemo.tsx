'use client';

import { Breadcrumbs } from '@oxygenix-ui/ui';

export default function BreadcrumbsBasicDemo() {
  return (
    <div
      style={{
        padding: '24px',
        border: '1px solid var(--oxy-border-color)',
        borderRadius: 'var(--oxy-radius-md)',
      }}
    >
      <Breadcrumbs
        items={[
          { label: 'Home', href: '#' },
          { label: 'Components', href: '#' },
          { label: 'Breadcrumbs' }, // Current page (no href)
        ]}
      />
    </div>
  );
}
