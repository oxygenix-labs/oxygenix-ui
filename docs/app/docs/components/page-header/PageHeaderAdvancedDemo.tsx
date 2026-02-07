'use client';

import { PageHeader, Button } from '@oxygenix-ui/ui';

export default function PageHeaderAdvancedDemo() {
  return (
    <div
      style={{
        border: '1px solid var(--oxy-border-color)',
        borderRadius: 'var(--oxy-radius-md)',
        padding: '24px',
      }}
    >
      <PageHeader
        title="Product Details"
        subtitle="View and edit product information."
        breadcrumbs={[
          { label: 'Home', href: '#' },
          { label: 'Products', href: '#' },
          { label: 'Electronics' },
        ]}
        actions={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        }
      />
    </div>
  );
}
