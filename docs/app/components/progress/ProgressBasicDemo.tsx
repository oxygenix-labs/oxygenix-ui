'use client';

import { Progress } from '@oxygenix-ui/ui';
import { useState, useEffect } from 'react';

export default function ProgressBasicDemo() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
      <Progress value={50} label="Static Progress (50%)" showValue />
      <Progress value={value} label="Animated Progress" showValue />
    </div>
  );
}
