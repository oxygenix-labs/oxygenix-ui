/**
 * Simple DataTable Example
 * 
 * Demonstrates basic usage of the DataTable component
 */

import React from 'react';
import { DataTable, Column } from '@oxygenix-ui/data';
import '@oxygenix-ui/tokens/themes/enterprise.css';

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
];

export function SimpleExample() {
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

    return (
        <div style={{ padding: '20px' }}>
            <h1>User Management</h1>

            <DataTable
                data={sampleData}
                columns={columns}
                sorting={{
                    enabled: true,
                    mode: 'single',
                }}
                pagination={{
                    enabled: true,
                    pageSize: 10,
                    showPageInfo: true,
                }}
                selection={{
                    mode: 'multi',
                    showSelectAll: true,
                }}
                slots={{
                    emptyState: (
                        <div>
                            <h3>No users found</h3>
                            <p>Add your first user to get started</p>
                        </div>
                    ),
                }}
                onRowClick={(user) => {
                    console.log('Clicked user:', user);
                }}
            />
        </div>
    );
}
