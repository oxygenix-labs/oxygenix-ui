'use client';

import { Badge } from '@oxygenix-ui/ui';

export default function BadgeAdvancedDemo() {
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
        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Sizes</div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Badge size="sm" variant="primary">
            Small
          </Badge>
          <Badge size="md" variant="primary">
            Medium
          </Badge>
          <Badge size="lg" variant="primary">
            Large
          </Badge>
        </div>
      </div>

      <div>
        <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
          With Dot Indicator
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge dot variant="success">
            Online
          </Badge>
          <Badge dot variant="warning">
            Away
          </Badge>
          <Badge dot variant="error">
            Busy
          </Badge>
        </div>
      </div>
    </div>
  );
}
