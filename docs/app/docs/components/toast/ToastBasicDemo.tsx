'use client';

import { Toast, ToastContainer, Button } from '@oxygenix-ui/ui';
import { useState } from 'react';

export default function ToastBasicDemo() {
  const [showToast, setShowToast] = useState(false);

  return (
    <>
      <div
        style={{
          padding: '24px',
          border: '1px solid var(--oxy-border-color)',
          borderRadius: 'var(--oxy-radius-md)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button onClick={() => setShowToast(true)}>Show Toast</Button>
      </div>

      <ToastContainer>
        {showToast && (
          <Toast
            title="Notification"
            description="This is a floating notification."
            onClose={() => setShowToast(false)}
          />
        )}
      </ToastContainer>
    </>
  );
}
