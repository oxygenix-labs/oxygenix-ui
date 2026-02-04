import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, Column } from '../packages/data/src';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'editor' | 'viewer';
    status: 'active' | 'inactive';
    lastLogin: Date;
}

const sampleData: User[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        status: 'active',
        lastLogin: new Date('2024-02-01'),
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'editor',
        status: 'active',
        lastLogin: new Date('2024-02-02'),
    },
    {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'viewer',
        status: 'inactive',
        lastLogin: new Date('2024-01-15'),
    },
    {
        id: '4',
        name: 'Alice Williams',
        email: 'alice@example.com',
        role: 'editor',
        status: 'active',
        lastLogin: new Date('2024-02-03'),
    },
    {
        id: '5',
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        role: 'viewer',
        status: 'active',
        lastLogin: new Date('2024-02-04'),
    },
];

const columns: Column<User>[] = [
    {
        id: 'name',
        header: 'Name',
        accessor: 'name',
        sortable: true,
    },
    {
        id: 'email',
        header: 'Email',
        accessor: 'email',
        sortable: true,
    },
    {
        id: 'role',
        header: 'Role',
        accessor: 'role',
        sortable: true,
        cell: ({ value }) => (
            <span style={{
                textTransform: 'capitalize',
                fontWeight: value === 'admin' ? 600 : 400
            }}>
                {value}
            </span>
        ),
    },
    {
        id: 'status',
        header: 'Status',
        accessor: 'status',
        sortable: true,
        cell: ({ value }) => (
            <span style={{
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 500,
                backgroundColor: value === 'active' ? '#dcfce7' : '#fee2e2',
                color: value === 'active' ? '#166534' : '#991b1b',
            }}>
                {value}
            </span>
        ),
    },
    {
        id: 'lastLogin',
        header: 'Last Login',
        accessor: 'lastLogin',
        sortable: true,
        cell: ({ value }) => new Date(value).toLocaleDateString(),
    },
];

const meta = {
    title: 'Data/DataTable',
    component: DataTable,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        data: {
            description: 'Array of data objects to display',
        },
        columns: {
            description: 'Column definitions',
        },
    },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        data: sampleData,
        columns: columns,
    },
};

export const WithSorting: Story = {
    args: {
        data: sampleData,
        columns: columns,
        sorting: {
            enabled: true,
            mode: 'single',
        },
    },
};

export const WithPagination: Story = {
    args: {
        data: sampleData,
        columns: columns,
        pagination: {
            enabled: true,
            pageSize: 3,
            showPageInfo: true,
        },
    },
};

export const WithSelection: Story = {
    args: {
        data: sampleData,
        columns: columns,
        selection: {
            mode: 'multi',
            showSelectAll: true,
        },
    },
};

export const Complete: Story = {
    args: {
        data: sampleData,
        columns: columns,
        sorting: {
            enabled: true,
            mode: 'multi',
        },
        pagination: {
            enabled: true,
            pageSize: 3,
            showPageInfo: true,
        },
        selection: {
            mode: 'multi',
            showSelectAll: true,
        },
        slots: {
            emptyState: (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                    <h3>No data found</h3>
                    <p>Try adjusting your filters</p>
                </div>
            ),
        },
    },
};

export const EmptyState: Story = {
    args: {
        data: [],
        columns: columns,
        slots: {
            emptyState: (
                <div style={{ padding: '60px', textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
                    <h3 style={{ marginBottom: '8px' }}>No users yet</h3>
                    <p style={{ color: '#737373' }}>Add your first user to get started</p>
                </div>
            ),
        },
    },
};
