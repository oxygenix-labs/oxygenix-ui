'use client';

import { PageHeader } from '@oxygenix-ui/ui';

export default function PageHeaderBasicDemo() {
  return (
    <div
      style={{
        border: '1px solid var(--oxy-border-color)',
        borderRadius: 'var(--oxy-radius-md)',
        padding: '24px',
      }}
    >
      <PageHeader title="Settings" subtitle="Manage your account settings and preferences." />
    </div>
  );
}
