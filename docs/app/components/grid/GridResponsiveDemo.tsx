'use client';

import { Grid, Text } from '@oxygenix-ui/ui';

export default function GridResponsiveDemo() {
  return (
    <div
      style={{
        padding: '24px',
        border: '1px solid var(--oxy-border-color)',
        borderRadius: 'var(--oxy-radius-md)',
      }}
    >
      <Text style={{ marginBottom: '16px', display: 'block' }}>
        Resize the window to seem columns change: 4 (desktop) → 2 (tablet) → 1 (mobile)
      </Text>
      <Grid cols={4} colsMd={2} colsSm={1} gap={4}>
        {Array.from({ length: 4 }).map((_, i) => (
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
            Responsive Card {i + 1}
          </div>
        ))}
      </Grid>
    </div>
  );
}
