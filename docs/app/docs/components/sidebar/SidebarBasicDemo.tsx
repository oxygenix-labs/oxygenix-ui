'use client';

import { Sidebar } from '@oxygenix-ui/layout';
import { useState } from 'react';
import { Home, User, Settings, FileText } from 'lucide-react';

export default function SidebarBasicDemo() {
  const [activeId, setActiveId] = useState('home');

  return (
    <div
      style={{
        height: '400px',
        border: '1px solid var(--oxy-border-color)',
        borderRadius: 'var(--oxy-radius-md)',
        overflow: 'hidden',
      }}
    >
      <Sidebar
        header={<div style={{ fontWeight: 600, padding: '0 12px' }}>My App</div>}
        navItems={[
          {
            id: 'home',
            label: 'Home',
            icon: <Home size={18} />,
            active: activeId === 'home',
            onClick: () => setActiveId('home'),
          },
          {
            id: 'profile',
            label: 'Profile',
            icon: <User size={18} />,
            active: activeId === 'profile',
            onClick: () => setActiveId('profile'),
          },
          {
            id: 'documents',
            label: 'Documents',
            icon: <FileText size={18} />,
            active: activeId === 'documents',
            onClick: () => setActiveId('documents'),
          },
          {
            id: 'settings',
            label: 'Settings',
            icon: <Settings size={18} />,
            active: activeId === 'settings',
            onClick: () => setActiveId('settings'),
          },
        ]}
      />
    </div>
  );
}
