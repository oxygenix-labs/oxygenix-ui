'use client';

import { Grid } from '@oxygenix-ui/ui';

export default function GridBasicDemo() {
  return (
    <div
      style={{
        padding: '24px',
        border: '1px solid var(--oxy-border-color)',
        borderRadius: 'var(--oxy-radius-md)',
      }}
    >
      <Grid cols={3} gap={4}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              padding: '24px',
              background: 'var(--oxy-bg-subtle)',
              borderRadius: '4px',
              textAlign: 'center',
              border: '1px solid var(--oxy-border-color)',
            }}
          >
            Item {i + 1}
          </div>
        ))}
      </Grid>
    </div>
  );
}
