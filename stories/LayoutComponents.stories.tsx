import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
    AppShell,
    Sidebar,
    PageHeader,
    Stack,
    Grid,
    Button,
    Text,
    Heading,
    DataTable,
    type SidebarNavItem,
    type TableColumn
} from '../packages/ui/src';

// Layout Stories
const layoutMeta = {
    title: 'Layout/AppShell',
    component: AppShell,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof AppShell>;

export default layoutMeta;
type Story = StoryObj<typeof layoutMeta>;

// Sample navigation items
const navItems: SidebarNavItem[] = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊', active: true },
    { key: 'users', label: 'Users', icon: '👥' },
    { key: 'products', label: 'Products', icon: '📦' },
    { key: 'orders', label: 'Orders', icon: '🛒' },
    { key: 'analytics', label: 'Analytics', icon: '📈' },
    { key: 'settings', label: 'Settings', icon: '⚙️' },
];

export const BasicAppShell: Story = {
    render: () => (
        <AppShell
            sidebar={
                <Sidebar
                    logo="Oxygenix"
                    navItems={navItems}
                />
            }
            header={
                <PageHeader
                    title="Dashboard"
                    actions={
                        <>
                            <Button variant="secondary" size="sm">Export</Button>
                            <Button variant="primary" size="sm">New Item</Button>
                        </>
                    }
                />
            }
        >
            <div style={{ padding: '24px' }}>
                <Text>Main content area</Text>
            </div>
        </AppShell>
    ),
};

export const WithBreadcrumbs: Story = {
    render: () => (
        <AppShell
            sidebar={
                <Sidebar
                    logo="Oxygenix"
                    navItems={navItems}
                />
            }
            header={
                <PageHeader
                    breadcrumbs={[
                        { label: 'Home', href: '#' },
                        { label: 'Products', href: '#' },
                        { label: 'Electronics' },
                    ]}
                    title="Electronics"
                    subtitle="Manage your electronic products"
                    actions={
                        <>
                            <Button variant="secondary" size="sm">Filter</Button>
                            <Button variant="primary" size="sm">Add Product</Button>
                        </>
                    }
                />
            }
        >
            <div style={{ padding: '24px' }}>
                <Text>Product listing page</Text>
            </div>
        </AppShell>
    ),
};

export const CollapsibleSidebar: Story = {
    render: () => {
        const [collapsed, setCollapsed] = useState(false);

        return (
            <AppShell
                sidebar={
                    <Sidebar
                        logo="Oxygenix"
                        navItems={navItems}
                        collapsed={collapsed}
                        onCollapsedChange={setCollapsed}
                        footer={
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {!collapsed && (
                                    <>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e5e7eb' }} />
                                        <div>
                                            <Text variant="small" weight="medium">John Doe</Text>
                                            <Text variant="caption">Admin</Text>
                                        </div>
                                    </>
                                )}
                            </div>
                        }
                    />
                }
                header={
                    <PageHeader
                        title="Dashboard"
                        subtitle="Welcome back!"
                    />
                }
            >
                <div style={{ padding: '24px' }}>
                    <Text>Click the sidebar toggle to collapse/expand</Text>
                </div>
            </AppShell>
        );
    },
};

export const PermissionAwareSidebar: Story = {
    render: () => {
        const permissionNavItems: SidebarNavItem[] = [
            { key: 'dashboard', label: 'Dashboard', icon: '📊', active: true, visible: true },
            { key: 'users', label: 'Users', icon: '👥', visible: true },
            { key: 'admin', label: 'Admin Panel', icon: '🔐', visible: false }, // Hidden
            { key: 'products', label: 'Products', icon: '📦', visible: true },
            { key: 'reports', label: 'Reports', icon: '📄', visible: false }, // Hidden
            { key: 'settings', label: 'Settings', icon: '⚙️', visible: true },
        ];

        return (
            <AppShell
                sidebar={
                    <Sidebar
                        logo="Oxygenix"
                        navItems={permissionNavItems}
                    />
                }
                header={
                    <PageHeader
                        title="Permission-Aware Navigation"
                        subtitle="Admin Panel and Reports are hidden based on permissions"
                    />
                }
            >
                <div style={{ padding: '24px' }}>
                    <Text>Only visible navigation items are shown in the sidebar</Text>
                </div>
            </AppShell>
        );
    },
};

// Stack Stories
export const StackVertical: Story = {
    render: () => (
        <div style={{ padding: '24px' }}>
            <Stack direction="vertical" gap={4}>
                <div style={{ padding: '16px', background: '#e5e7eb', borderRadius: '4px' }}>Item 1</div>
                <div style={{ padding: '16px', background: '#e5e7eb', borderRadius: '4px' }}>Item 2</div>
                <div style={{ padding: '16px', background: '#e5e7eb', borderRadius: '4px' }}>Item 3</div>
            </Stack>
        </div>
    ),
};

export const StackHorizontal: Story = {
    render: () => (
        <div style={{ padding: '24px' }}>
            <Stack direction="horizontal" gap={4} align="center">
                <div style={{ padding: '16px', background: '#e5e7eb', borderRadius: '4px' }}>Item 1</div>
                <div style={{ padding: '16px', background: '#e5e7eb', borderRadius: '4px' }}>Item 2</div>
                <div style={{ padding: '16px', background: '#e5e7eb', borderRadius: '4px' }}>Item 3</div>
            </Stack>
        </div>
    ),
};

export const StackAlignment: Story = {
    render: () => (
        <div style={{ padding: '24px' }}>
            <Stack direction="vertical" gap={6}>
                <div>
                    <Text variant="small" weight="medium" style={{ marginBottom: '8px' }}>Align Start</Text>
                    <Stack direction="horizontal" gap={2} align="start">
                        <div style={{ padding: '8px', background: '#e5e7eb', borderRadius: '4px', height: '40px' }}>Short</div>
                        <div style={{ padding: '8px', background: '#e5e7eb', borderRadius: '4px', height: '80px' }}>Tall</div>
                        <div style={{ padding: '8px', background: '#e5e7eb', borderRadius: '4px', height: '60px' }}>Medium</div>
                    </Stack>
                </div>

                <div>
                    <Text variant="small" weight="medium" style={{ marginBottom: '8px' }}>Align Center</Text>
                    <Stack direction="horizontal" gap={2} align="center">
                        <div style={{ padding: '8px', background: '#e5e7eb', borderRadius: '4px', height: '40px' }}>Short</div>
                        <div style={{ padding: '8px', background: '#e5e7eb', borderRadius: '4px', height: '80px' }}>Tall</div>
                        <div style={{ padding: '8px', background: '#e5e7eb', borderRadius: '4px', height: '60px' }}>Medium</div>
                    </Stack>
                </div>

                <div>
                    <Text variant="small" weight="medium" style={{ marginBottom: '8px' }}>Justify Between</Text>
                    <Stack direction="horizontal" gap={2} justify="between" style={{ width: '100%' }}>
                        <div style={{ padding: '8px', background: '#e5e7eb', borderRadius: '4px' }}>Left</div>
                        <div style={{ padding: '8px', background: '#e5e7eb', borderRadius: '4px' }}>Right</div>
                    </Stack>
                </div>
            </Stack>
        </div>
    ),
};

// Grid Stories
export const GridBasic: Story = {
    render: () => (
        <div style={{ padding: '24px' }}>
            <Grid cols={3} gap={4}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} style={{ padding: '24px', background: '#e5e7eb', borderRadius: '4px', textAlign: 'center' }}>
                        Item {i + 1}
                    </div>
                ))}
            </Grid>
        </div>
    ),
};

export const GridResponsive: Story = {
    render: () => (
        <div style={{ padding: '24px' }}>
            <Text variant="small" style={{ marginBottom: '16px', display: 'block' }}>
                Resize window to see responsive behavior: 4 cols → 2 cols (tablet) → 1 col (mobile)
            </Text>
            <Grid cols={4} colsMd={2} colsSm={1} gap={4}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} style={{ padding: '24px', background: '#e5e7eb', borderRadius: '4px', textAlign: 'center' }}>
                        Card {i + 1}
                    </div>
                ))}
            </Grid>
        </div>
    ),
};

export const GridDashboard: Story = {
    render: () => (
        <div style={{ padding: '24px' }}>
            <Grid cols={12} gap={4}>
                {/* Header spanning full width */}
                <div style={{ gridColumn: 'span 12', padding: '24px', background: '#3b82f6', color: 'white', borderRadius: '4px' }}>
                    <Heading level="h2" style={{ color: 'white' }}>Dashboard Overview</Heading>
                </div>

                {/* Stats cards */}
                <div style={{ gridColumn: 'span 3', padding: '16px', background: '#e5e7eb', borderRadius: '4px' }}>
                    <Text variant="caption">Total Users</Text>
                    <Heading level="h3">1,234</Heading>
                </div>
                <div style={{ gridColumn: 'span 3', padding: '16px', background: '#e5e7eb', borderRadius: '4px' }}>
                    <Text variant="caption">Revenue</Text>
                    <Heading level="h3">$45.2K</Heading>
                </div>
                <div style={{ gridColumn: 'span 3', padding: '16px', background: '#e5e7eb', borderRadius: '4px' }}>
                    <Text variant="caption">Orders</Text>
                    <Heading level="h3">567</Heading>
                </div>
                <div style={{ gridColumn: 'span 3', padding: '16px', background: '#e5e7eb', borderRadius: '4px' }}>
                    <Text variant="caption">Conversion</Text>
                    <Heading level="h3">3.2%</Heading>
                </div>

                {/* Main content area */}
                <div style={{ gridColumn: 'span 8', padding: '24px', background: '#f3f4f6', borderRadius: '4px', minHeight: '300px' }}>
                    <Text weight="medium">Main Chart Area</Text>
                </div>

                {/* Sidebar */}
                <div style={{ gridColumn: 'span 4', padding: '24px', background: '#f3f4f6', borderRadius: '4px', minHeight: '300px' }}>
                    <Text weight="medium">Recent Activity</Text>
                </div>
            </Grid>
        </div>
    ),
};

// Complete Enterprise Example
export const CompleteEnterpriseApp: Story = {
    render: () => {
        const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

        const users = [
            { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active' as const },
            { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'active' as const },
            { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Editor', status: 'inactive' as const },
        ];

        const columns: TableColumn[] = [
            { key: 'name', label: 'Name', sortable: true },
            { key: 'email', label: 'Email', sortable: true },
            { key: 'role', label: 'Role' },
            {
                key: 'status',
                label: 'Status',
                render: (value) => (
                    <span style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        background: value === 'active' ? '#10b981' : '#6b7280',
                        color: 'white'
                    }}>
                        {value}
                    </span>
                )
            },
        ];

        return (
            <AppShell
                sidebar={
                    <Sidebar
                        logo="Oxygenix"
                        navItems={[
                            { key: 'dashboard', label: 'Dashboard', icon: '📊' },
                            { key: 'users', label: 'Users', icon: '👥', active: true },
                            { key: 'products', label: 'Products', icon: '📦' },
                            { key: 'analytics', label: 'Analytics', icon: '📈' },
                            { key: 'settings', label: 'Settings', icon: '⚙️' },
                        ]}
                    />
                }
                header={
                    <PageHeader
                        breadcrumbs={[
                            { label: 'Home', href: '#' },
                            { label: 'Users' },
                        ]}
                        title="User Management"
                        subtitle="Manage your team members and permissions"
                        actions={
                            <>
                                <Button variant="secondary" size="sm">Export</Button>
                                <Button variant="primary" size="sm">Add User</Button>
                            </>
                        }
                    />
                }
            >
                <div style={{ padding: '24px' }}>
                    <Stack direction="vertical" gap={6}>
                        {/* Stats Grid */}
                        <Grid cols={3} gap={4}>
                            <div style={{ padding: '16px', background: 'var(--oxy-color-bg-secondary)', borderRadius: '8px', border: '1px solid var(--oxy-color-border-default)' }}>
                                <Text variant="caption">Total Users</Text>
                                <Heading level="h3">1,234</Heading>
                                <Text variant="small" style={{ color: '#10b981' }}>↑ 12% from last month</Text>
                            </div>
                            <div style={{ padding: '16px', background: 'var(--oxy-color-bg-secondary)', borderRadius: '8px', border: '1px solid var(--oxy-color-border-default)' }}>
                                <Text variant="caption">Active Users</Text>
                                <Heading level="h3">987</Heading>
                                <Text variant="small" style={{ color: '#10b981' }}>↑ 8% from last month</Text>
                            </div>
                            <div style={{ padding: '16px', background: 'var(--oxy-color-bg-secondary)', borderRadius: '8px', border: '1px solid var(--oxy-color-border-default)' }}>
                                <Text variant="caption">New This Month</Text>
                                <Heading level="h3">45</Heading>
                                <Text variant="small" style={{ color: '#ef4444' }}>↓ 3% from last month</Text>
                            </div>
                        </Grid>

                        {/* Data Table */}
                        <DataTable
                            columns={columns}
                            data={users}
                            getRowKey={(row) => row.id}
                            selectable
                            selectedRows={selectedRows}
                            onSelectionChange={setSelectedRows}
                        />
                    </Stack>
                </div>
            </AppShell>
        );
    },
};
