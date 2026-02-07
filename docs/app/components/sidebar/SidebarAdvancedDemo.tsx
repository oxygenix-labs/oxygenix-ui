'use client';

import { Sidebar } from '@oxygenix-ui/layout';
import { useState } from 'react';
import { LayoutDashboard, Database, Lock } from 'lucide-react';

export default function SidebarAdvancedDemo() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeId, setActiveId] = useState('dashboard');

  return (
    <div
      style={{
        height: '500px',
        display: 'flex',
        border: '1px solid var(--oxy-border-color)',
        borderRadius: 'var(--oxy-radius-md)',
        overflow: 'hidden',
      }}
    >
      <Sidebar
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        header={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0 8px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                minWidth: '24px',
                height: '24px',
                background: 'var(--oxy-primary-color, #0070f3)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              O
            </div>
            {!collapsed && <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>Oxygenix</span>}
          </div>
        }
        navItems={[
          {
            id: 'dashboard',
            label: 'Dashboard',
            icon: <LayoutDashboard size={18} />,
            active: activeId === 'dashboard',
            onClick: () => setActiveId('dashboard'),
          },
          {
            id: 'database',
            label: 'Database',
            icon: <Database size={18} />,
            active: activeId === 'database',
            onClick: () => setActiveId('database'),
          },
          {
            id: 'admin',
            label: 'Admin',
            icon: <Lock size={18} />,
            active: activeId === 'admin',
            onClick: () => setActiveId('admin'),
          },
        ]}
        footer={
          <div
            style={{
              padding: '12px',
              background: 'var(--oxy-bg-subtle)',
              borderRadius: '6px',
              overflow: 'hidden',
            }}
          >
            {!collapsed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ccc' }}
                ></div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '13px', fontWeight: 500 }}>John Doe</span>
                  <span style={{ fontSize: '11px', color: 'var(--oxy-text-muted)' }}>Admin</span>
                </div>
              </div>
            ) : (
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#ccc',
                  margin: '0 auto',
                }}
              ></div>
            )}
          </div>
        }
      />
      <div style={{ flex: 1, padding: '24px', background: 'var(--oxy-bg-surface)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
          {activeId.charAt(0).toUpperCase() + activeId.slice(1)} Area
        </h2>
        <p style={{ color: 'var(--oxy-text-muted)', lineHeight: '1.6' }}>
          The sidebar is currently <strong>{collapsed ? 'collapsed' : 'expanded'}</strong>.
        </p>
        <div
          style={{
            marginTop: '24px',
            padding: '16px',
            background: 'var(--oxy-bg-subtle)',
            borderRadius: '8px',
          }}
        >
          <p>Main content area adjusts to sidebar width changes automatically.</p>
        </div>
      </div>
    </div>
  );
}
