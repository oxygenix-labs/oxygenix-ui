import type { Meta, StoryObj } from '@storybook/react';
import { AppShell, Sidebar, ResizablePanel } from '../packages/layout/src';

const meta = {
    title: 'Layout/AppShell',
    component: AppShell,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicLayout: Story = {
    render: () => (
        <AppShell
            header={
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <h1 style={{ margin: 0, fontSize: '20px' }}>My Application</h1>
                </div>
            }
            sidebar={
                <Sidebar
                    header={<div style={{ fontWeight: 600 }}>Navigation</div>}
                    navItems={[
                        { id: '1', label: 'Dashboard', icon: '📊', active: true },
                        { id: '2', label: 'Users', icon: '👥' },
                        { id: '3', label: 'Settings', icon: '⚙️' },
                    ]}
                />
            }
            footer={
                <div style={{ textAlign: 'center', color: '#737373', fontSize: '14px' }}>
                    © 2024 My Application
                </div>
            }
        >
            <div style={{ padding: '20px' }}>
                <h2>Main Content</h2>
                <p>This is the main content area of your application.</p>
            </div>
        </AppShell>
    ),
};

export const WithCollapsibleSidebar: Story = {
    render: () => (
        <AppShell
            header={
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <h1 style={{ margin: 0, fontSize: '20px' }}>Collapsible Sidebar Demo</h1>
                </div>
            }
            sidebar={
                <Sidebar
                    defaultCollapsed={false}
                    showToggle={true}
                    header={<div style={{ fontWeight: 600 }}>Menu</div>}
                    navItems={[
                        { id: '1', label: 'Home', icon: '🏠', active: true },
                        { id: '2', label: 'Projects', icon: '📁' },
                        { id: '3', label: 'Tasks', icon: '✓' },
                        { id: '4', label: 'Calendar', icon: '📅' },
                        { id: '5', label: 'Reports', icon: '📈' },
                        { id: '6', label: 'Settings', icon: '⚙️' },
                    ]}
                    footer={
                        <div style={{ fontSize: '12px', color: '#737373' }}>
                            v1.0.0
                        </div>
                    }
                />
            }
        >
            <div style={{ padding: '20px' }}>
                <h2>Content Area</h2>
                <p>Click the toggle button on the sidebar to collapse/expand it.</p>
                <div style={{ marginTop: '20px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
                    <h3>Sample Content</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>
        </AppShell>
    ),
};

export const WithResizablePanel: Story = {
    render: () => (
        <div style={{ height: '600px', display: 'flex' }}>
            <ResizablePanel
                direction="right"
                defaultSize={300}
                minSize={200}
                maxSize={500}
            >
                <div style={{ padding: '20px', height: '100%', background: '#f5f5f5' }}>
                    <h3>Resizable Panel</h3>
                    <p>Drag the right edge to resize this panel.</p>
                    <ul>
                        <li>Min width: 200px</li>
                        <li>Max width: 500px</li>
                        <li>Default: 300px</li>
                    </ul>
                </div>
            </ResizablePanel>

            <div style={{ flex: 1, padding: '20px' }}>
                <h3>Main Content</h3>
                <p>This area adjusts as you resize the panel.</p>
            </div>
        </div>
    ),
};

export const CompleteExample: Story = {
    render: () => (
        <AppShell
            header={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ fontSize: '24px' }}>🚀</div>
                        <h1 style={{ margin: 0, fontSize: '20px' }}>Enterprise Dashboard</h1>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #e5e5e5', background: 'white', cursor: 'pointer' }}>
                            🔔
                        </button>
                        <button style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #e5e5e5', background: 'white', cursor: 'pointer' }}>
                            👤
                        </button>
                    </div>
                </div>
            }
            sidebar={
                <Sidebar
                    header={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                                OX
                            </div>
                            <span style={{ fontWeight: 600 }}>Oxygenix</span>
                        </div>
                    }
                    navItems={[
                        { id: '1', label: 'Dashboard', icon: '📊', active: true },
                        { id: '2', label: 'Analytics', icon: '📈' },
                        { id: '3', label: 'Users', icon: '👥' },
                        { id: '4', label: 'Products', icon: '📦' },
                        { id: '5', label: 'Orders', icon: '🛒' },
                        { id: '6', label: 'Reports', icon: '📄' },
                        { id: '7', label: 'Settings', icon: '⚙️' },
                    ]}
                    footer={
                        <div style={{ padding: '12px', background: '#f5f5f5', borderRadius: '6px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 600 }}>John Doe</div>
                            <div style={{ fontSize: '11px', color: '#737373' }}>john@example.com</div>
                        </div>
                    }
                />
            }
            footer={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: '#737373' }}>
                    <span>© 2024 Oxygenix UI</span>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <a href="#" style={{ color: '#737373', textDecoration: 'none' }}>Privacy</a>
                        <a href="#" style={{ color: '#737373', textDecoration: 'none' }}>Terms</a>
                        <a href="#" style={{ color: '#737373', textDecoration: 'none' }}>Help</a>
                    </div>
                </div>
            }
        >
            <div>
                <h2 style={{ marginTop: 0 }}>Welcome to your Dashboard</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                    {[
                        { title: 'Total Users', value: '1,234', change: '+12%', icon: '👥' },
                        { title: 'Revenue', value: '$45,678', change: '+8%', icon: '💰' },
                        { title: 'Orders', value: '567', change: '+23%', icon: '🛒' },
                        { title: 'Conversion', value: '3.2%', change: '+0.5%', icon: '📈' },
                    ].map((stat, i) => (
                        <div key={i} style={{ padding: '20px', background: 'white', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                                <div style={{ fontSize: '14px', color: '#737373' }}>{stat.title}</div>
                                <div style={{ fontSize: '24px' }}>{stat.icon}</div>
                            </div>
                            <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>{stat.value}</div>
                            <div style={{ fontSize: '12px', color: '#16a34a' }}>{stat.change} from last month</div>
                        </div>
                    ))}
                </div>

                <div style={{ padding: '20px', background: 'white', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0 }}>Recent Activity</h3>
                    <p style={{ color: '#737373' }}>Your recent activity will appear here...</p>
                </div>
            </div>
        </AppShell>
    ),
};
