'use client';

import { Stack } from '@oxygenix-ui/ui';

export default function StackBasicDemo() {
  return (
    <div
      style={{
        padding: '24px',
        border: '1px solid var(--oxy-border-color)',
        borderRadius: 'var(--oxy-radius-md)',
      }}
    >
      <Stack gap={4}>
        <div style={{ padding: '16px', background: 'var(--oxy-bg-subtle)', borderRadius: '4px' }}>
          Item 1
        </div>
        <div style={{ padding: '16px', background: 'var(--oxy-bg-subtle)', borderRadius: '4px' }}>
          Item 2
        </div>
        <div style={{ padding: '16px', background: 'var(--oxy-bg-subtle)', borderRadius: '4px' }}>
          Item 3
        </div>
      </Stack>
    </div>
  );
}
