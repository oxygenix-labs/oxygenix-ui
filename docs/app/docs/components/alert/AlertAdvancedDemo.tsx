'use client';

import { Alert, Button } from '@oxygenix-ui/ui';
import { Rocket } from 'lucide-react';
import { useState } from 'react';

export default function AlertAdvancedDemo() {
  const [show, setShow] = useState(true);

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
      {/* Custom Icon */}
      <Alert
        icon={<Rocket size={18} />}
        title="New Features Available"
        description="Check out the new version of Oxygenix UI!"
      />

      {/* Closable Alert */}
      {show ? (
        <Alert
          variant="info"
          title="Dismissible Alert"
          description="You can close this alert by clicking the X button."
          closable
          onClose={() => setShow(false)}
        />
      ) : (
        <Button variant="outline" size="sm" onClick={() => setShow(true)}>
          Reset Alert
        </Button>
      )}
    </div>
  );
}
