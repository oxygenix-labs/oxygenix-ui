import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
    DataTable,
    TableToolbar,
    EmptyState,
    Skeleton,
    Button,
    Input,
    type TableColumn
} from '../packages/ui/src';

// Sample data
interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
    lastLogin: string;
}

const sampleUsers: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active', lastLogin: '2024-02-04' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'active', lastLogin: '2024-02-03' },
    { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Editor', status: 'inactive', lastLogin: '2024-01-28' },
    { id: 4, name: 'David Brown', email: 'david@example.com', role: 'User', status: 'active', lastLogin: '2024-02-04' },
    { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'active', lastLogin: '2024-02-02' },
    { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'User', status: 'inactive', lastLogin: '2024-01-15' },
    { id: 7, name: 'Grace Wilson', email: 'grace@example.com', role: 'Editor', status: 'active', lastLogin: '2024-02-04' },
    { id: 8, name: 'Henry Moore', email: 'henry@example.com', role: 'User', status: 'active', lastLogin: '2024-02-01' },
];

// DataTable Stories
const dataTableMeta = {
    title: 'Data/DataTable',
    component: DataTable,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default dataTableMeta;
type Story = StoryObj<typeof dataTableMeta>;

const userColumns: TableColumn<User>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    {
        key: 'status',
        label: 'Status',
        sortable: true,
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
    { key: 'lastLogin', label: 'Last Login', sortable: true },
];

export const BasicTable: Story = {
    render: () => (
        <DataTable
            columns={userColumns}
            data={sampleUsers}
            getRowKey={(row) => row.id}
        />
    ),
};

export const WithSorting: Story = {
    render: () => {
        const [sortColumn, setSortColumn] = useState<string>('name');
        const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>('asc');

        return (
            <DataTable
                columns={userColumns}
                data={sampleUsers}
                getRowKey={(row) => row.id}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSortChange={(column, direction) => {
                    setSortColumn(column);
                    setSortDirection(direction);
                }}
            />
        );
    },
};

export const WithPagination: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);

        return (
            <DataTable
                columns={userColumns}
                data={sampleUsers}
                getRowKey={(row) => row.id}
                pagination
                currentPage={currentPage}
                pageSize={5}
                onPageChange={setCurrentPage}
            />
        );
    },
};

export const WithSelection: Story = {
    render: () => {
        const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

        return (
            <div>
                <div style={{ marginBottom: '16px', padding: '12px', background: '#f3f4f6', borderRadius: '4px' }}>
                    Selected: {selectedRows.size} row(s)
                </div>
                <DataTable
                    columns={userColumns}
                    data={sampleUsers}
                    getRowKey={(row) => row.id}
                    selectable
                    selectedRows={selectedRows}
                    onSelectionChange={setSelectedRows}
                />
            </div>
        );
    },
};

export const CompleteDataTable: Story = {
    render: () => {
        const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
        const [currentPage, setCurrentPage] = useState(1);
        const [sortColumn, setSortColumn] = useState<string>('name');
        const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>('asc');
        const [searchTerm, setSearchTerm] = useState('');

        const filteredUsers = sampleUsers.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div>
                <TableToolbar
                    title="Users"
                    selectedCount={selectedRows.size}
                    leftContent={
                        <Input
                            type="search"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '300px' }}
                        />
                    }
                    rightContent={
                        <>
                            <Button variant="secondary" size="sm">Filter</Button>
                            <Button variant="secondary" size="sm">Export</Button>
                            <Button variant="primary" size="sm">Add User</Button>
                        </>
                    }
                    bulkActions={
                        <>
                            <Button variant="secondary" size="sm">Delete</Button>
                            <Button variant="secondary" size="sm">Export Selected</Button>
                        </>
                    }
                />
                <DataTable
                    columns={userColumns}
                    data={filteredUsers}
                    getRowKey={(row) => row.id}
                    selectable
                    selectedRows={selectedRows}
                    onSelectionChange={setSelectedRows}
                    pagination
                    currentPage={currentPage}
                    pageSize={5}
                    onPageChange={setCurrentPage}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    onSortChange={(column, direction) => {
                        setSortColumn(column);
                        setSortDirection(direction);
                    }}
                />
            </div>
        );
    },
};

// EmptyState Stories
export const EmptyStateBasic: Story = {
    render: () => (
        <EmptyState
            icon="📭"
            title="No data found"
            description="There are no items to display at this time."
        />
    ),
};

export const EmptyStateWithAction: Story = {
    render: () => (
        <EmptyState
            icon="📊"
            title="No users yet"
            description="Get started by adding your first user to the system."
            action={<Button variant="primary">Add User</Button>}
        />
    ),
};

export const EmptyTableState: Story = {
    render: () => (
        <div>
            <TableToolbar
                title="Users"
                rightContent={<Button variant="primary" size="sm">Add User</Button>}
            />
            <div style={{ border: '1px solid var(--oxy-color-border-default)', borderTop: 'none' }}>
                <EmptyState
                    icon="👥"
                    title="No users found"
                    description="Start by adding your first user to the system."
                    action={<Button variant="primary">Add User</Button>}
                />
            </div>
        </div>
    ),
};

// Skeleton Stories
export const SkeletonText: Story = {
    render: () => (
        <div style={{ width: '400px' }}>
            <Skeleton variant="text" count={3} />
        </div>
    ),
};

export const SkeletonTitle: Story = {
    render: () => (
        <div style={{ width: '400px' }}>
            <Skeleton variant="title" />
            <div style={{ marginTop: '8px' }}>
                <Skeleton variant="text" count={2} />
            </div>
        </div>
    ),
};

export const SkeletonAvatar: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Skeleton variant="avatar" />
            <div style={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" style={{ marginTop: '4px' }} />
            </div>
        </div>
    ),
};

export const SkeletonCard: Story = {
    render: () => (
        <div style={{ width: '300px', padding: '16px', border: '1px solid var(--oxy-color-border-default)', borderRadius: '8px' }}>
            <Skeleton variant="rect" height={150} style={{ marginBottom: '12px' }} />
            <Skeleton variant="title" />
            <Skeleton variant="text" count={2} style={{ marginTop: '8px' }} />
        </div>
    ),
};

export const SkeletonTable: Story = {
    render: () => (
        <div style={{ border: '1px solid var(--oxy-color-border-default)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', background: 'var(--oxy-color-bg-secondary)', borderBottom: '1px solid var(--oxy-color-border-default)' }}>
                <Skeleton variant="text" width="150px" />
            </div>
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} style={{ padding: '12px 16px', borderBottom: '1px solid var(--oxy-color-border-default)', display: 'flex', gap: '16px' }}>
                    <Skeleton variant="avatar" width={32} height={32} />
                    <div style={{ flex: 1 }}>
                        <Skeleton variant="text" width="40%" />
                        <Skeleton variant="text" width="60%" style={{ marginTop: '4px' }} />
                    </div>
                    <Skeleton variant="text" width="80px" />
                </div>
            ))}
        </div>
    ),
};

export const LoadingTableExample: Story = {
    render: () => {
        const [loading, setLoading] = useState(true);

        // Simulate loading
        setTimeout(() => setLoading(false), 3000);

        if (loading) {
            return (
                <div>
                    <TableToolbar
                        title="Users"
                        rightContent={<Skeleton variant="text" width="100px" height="32px" />}
                    />
                    <div style={{ border: '1px solid var(--oxy-color-border-default)', borderTop: 'none' }}>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} style={{ padding: '12px 16px', borderBottom: '1px solid var(--oxy-color-border-default)', display: 'flex', gap: '16px' }}>
                                <Skeleton variant="circle" width={18} height={18} />
                                <Skeleton variant="text" width="20%" />
                                <Skeleton variant="text" width="25%" />
                                <Skeleton variant="text" width="15%" />
                                <Skeleton variant="text" width="10%" />
                                <Skeleton variant="text" width="15%" />
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div>
                <TableToolbar
                    title="Users"
                    rightContent={<Button variant="primary" size="sm">Add User</Button>}
                />
                <DataTable
                    columns={userColumns}
                    data={sampleUsers.slice(0, 5)}
                    getRowKey={(row) => row.id}
                    selectable
                />
            </div>
        );
    },
};
