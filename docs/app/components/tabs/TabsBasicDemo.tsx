'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent, Text } from '@oxygenix-ui/ui';

export default function TabsBasicDemo() {
  return (
    <div
      style={{
        padding: '24px',
        border: '1px solid var(--oxy-border-color)',
        borderRadius: 'var(--oxy-radius-md)',
      }}
    >
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <div
          style={{
            padding: '16px',
            background: 'var(--oxy-bg-subtle)',
            borderRadius: '0 0 4px 4px',
            marginTop: '8px',
          }}
        >
          <TabsContent value="account">
            <Text weight="medium" style={{ marginBottom: '8px', display: 'block' }}>
              Account Details
            </Text>
            <Text size="sm" style={{ color: 'var(--oxy-text-muted)' }}>
              Manage your account information here.
            </Text>
          </TabsContent>
          <TabsContent value="password">
            <Text weight="medium" style={{ marginBottom: '8px', display: 'block' }}>
              Change Password
            </Text>
            <Text size="sm" style={{ color: 'var(--oxy-text-muted)' }}>
              Update your password to keep your account secure.
            </Text>
          </TabsContent>
          <TabsContent value="settings">
            <Text weight="medium" style={{ marginBottom: '8px', display: 'block' }}>
              Preferences
            </Text>
            <Text size="sm" style={{ color: 'var(--oxy-text-muted)' }}>
              Customize your application experience.
            </Text>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
