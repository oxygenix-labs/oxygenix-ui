'use client';

import { Toast, ToastContainer, Button } from '@oxygenix-ui/ui';
import { useState } from 'react';

type ToastItem = {
  id: number;
  title: string;
  variant: 'info' | 'success' | 'warning' | 'error';
};

export default function ToastAdvancedDemo() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (variant: 'info' | 'success' | 'warning' | 'error') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title: `New ${variant} message`, variant }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      <div
        style={{
          padding: '24px',
          border: '1px solid var(--oxy-border-color)',
          borderRadius: 'var(--oxy-radius-md)',
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Button variant="outline" size="sm" onClick={() => addToast('info')}>
          Info
        </Button>
        <Button variant="outline" size="sm" onClick={() => addToast('success')}>
          Success
        </Button>
        <Button variant="outline" size="sm" onClick={() => addToast('warning')}>
          Warning
        </Button>
        <Button variant="outline" size="sm" onClick={() => addToast('error')}>
          Error
        </Button>
      </div>

      <ToastContainer position="bottom-right">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            title={toast.title}
            duration={3000}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastContainer>
    </>
  );
}
