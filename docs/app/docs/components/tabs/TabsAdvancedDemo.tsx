'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent, Button } from '@oxygenix-ui/ui';
import { useState } from 'react';

export default function TabsAdvancedDemo() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div
      style={{
        padding: '24px',
        border: '1px solid var(--oxy-border-color)',
        borderRadius: 'var(--oxy-radius-md)',
      }}
    >
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ fontSize: '14px' }}>
          Current Tab: <strong>{activeTab}</strong>
        </span>
        <Button size="sm" variant="outline" onClick={() => setActiveTab('tab3')}>
          Jump to Tab 3
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="tab1">First Tab</TabsTrigger>
          <TabsTrigger value="tab2">Second Tab</TabsTrigger>
          <TabsTrigger value="tab3">Third Tab</TabsTrigger>
          <TabsTrigger value="tab4" disabled>
            Disabled Tab
          </TabsTrigger>
        </TabsList>
        <div
          style={{
            padding: '16px',
            border: '1px solid var(--oxy-border-color)',
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
          }}
        >
          <TabsContent value="tab1">Content for the first tab.</TabsContent>
          <TabsContent value="tab2">Content for the second tab.</TabsContent>
          <TabsContent value="tab3">Content for the third tab.</TabsContent>
          <TabsContent value="tab4">This content is not reachable.</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
