'use client';

import { Stack, Button, Text } from '@oxygenix-ui/ui';

export default function StackAdvancedDemo() {
  return (
    <div
      style={{
        padding: '24px',
        border: '1px solid var(--oxy-border-color)',
        borderRadius: 'var(--oxy-radius-md)',
      }}
    >
      <Stack gap={6}>
        <div>
          <Text style={{ marginBottom: '8px' }}>Horizontal Alignment</Text>
          <Stack direction="horizontal" gap={2} align="center">
            <Button size="sm">Small</Button>
            <Button>Medium</Button>
            <Button size="lg">Large</Button>
          </Stack>
        </div>

        <div>
          <Text style={{ marginBottom: '8px' }}>Justify Content</Text>
          <Stack
            direction="horizontal"
            gap={2}
            justify="between"
            style={{ background: 'var(--oxy-bg-subtle)', padding: '12px', borderRadius: '4px' }}
          >
            <Button variant="outline" size="sm">
              Left
            </Button>
            <Button variant="outline" size="sm">
              Right
            </Button>
          </Stack>
        </div>
      </Stack>
    </div>
  );
}
