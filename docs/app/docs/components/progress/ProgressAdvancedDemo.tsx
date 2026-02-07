'use client';

import { Progress } from '@oxygenix-ui/ui';

export default function ProgressAdvancedDemo() {
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
        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Variants</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Progress value={75} variant="success" label="Success" />
          <Progress value={50} variant="warning" label="Warning" />
          <Progress value={25} variant="error" label="Error" />
        </div>
      </div>

      <div>
        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Indeterminate</div>
        <Progress indeterminate label="Loading..." />
      </div>

      <div>
        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Sizes</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Progress value={40} size="sm" label="Small" />
          <Progress value={60} size="md" label="Medium" />
          <Progress value={80} size="lg" label="Large" />
        </div>
      </div>
    </div>
  );
}
