'use client';

import { Alert } from '@oxygenix-ui/ui';

export default function AlertBasicDemo() {
  return (
    <div
      style={{
        padding: '24px',
        border: '1px solid var(--oxy-border-color)',
        borderRadius: 'var(--oxy-radius-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <Alert title="Information" description="This is a basic informational alert." />
      <Alert
        variant="success"
        title="Success"
        description="Your changes have been saved successfully."
      />
      <Alert variant="warning" title="Warning" description="Please review your account settings." />
      <Alert variant="error" title="Error" description="Something went wrong. Please try again." />
    </div>
  );
}
