'use client'

import { useState } from 'react'

interface User {
    id: number
    name: string
    email: string
    role: string
    status: 'active' | 'inactive'
}

const sampleUsers: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'active' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Editor', status: 'inactive' },
    { id: 4, name: 'David Brown', email: 'david@example.com', role: 'User', status: 'active' },
    { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'active' },
]

export function DataTableDemo() {
    const [users] = useState<User[]>(sampleUsers)
    const [sortColumn, setSortColumn] = useState<keyof User>('name')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    const [selectedRows, setSelectedRows] = useState<number[]>([])

    const sortedUsers = [...users].sort((a, b) => {
        const aVal = a[sortColumn]
        const bVal = b[sortColumn]
        const modifier = sortDirection === 'asc' ? 1 : -1
        return aVal > bVal ? modifier : -modifier
    })

    const handleSort = (column: keyof User) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }

    const toggleRow = (id: number) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        )
    }

    const toggleAll = () => {
        setSelectedRows(prev =>
            prev.length === users.length ? [] : users.map(u => u.id)
        )
    }

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '14px',
            }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <th style={{ padding: '12px', textAlign: 'left', width: '40px' }}>
                            <input
                                type="checkbox"
                                checked={selectedRows.length === users.length}
                                onChange={toggleAll}
                                style={{ cursor: 'pointer' }}
                            />
                        </th>
                        <th
                            onClick={() => handleSort('name')}
                            style={{
                                padding: '12px',
                                textAlign: 'left',
                                cursor: 'pointer',
                                userSelect: 'none',
                                fontWeight: 600,
                                color: 'var(--color-text-secondary)',
                            }}
                        >
                            Name {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            onClick={() => handleSort('email')}
                            style={{
                                padding: '12px',
                                textAlign: 'left',
                                cursor: 'pointer',
                                userSelect: 'none',
                                fontWeight: 600,
                                color: 'var(--color-text-secondary)',
                            }}
                        >
                            Email {sortColumn === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            onClick={() => handleSort('role')}
                            style={{
                                padding: '12px',
                                textAlign: 'left',
                                cursor: 'pointer',
                                userSelect: 'none',
                                fontWeight: 600,
                                color: 'var(--color-text-secondary)',
                            }}
                        >
                            Role {sortColumn === 'role' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map(user => (
                        <tr
                            key={user.id}
                            style={{
                                borderBottom: '1px solid var(--color-border)',
                                backgroundColor: selectedRows.includes(user.id) ? 'var(--color-bg-subtle)' : 'transparent',
                            }}
                        >
                            <td style={{ padding: '12px' }}>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(user.id)}
                                    onChange={() => toggleRow(user.id)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </td>
                            <td style={{ padding: '12px', fontWeight: 500 }}>{user.name}</td>
                            <td style={{ padding: '12px', color: 'var(--color-text-secondary)' }}>{user.email}</td>
                            <td style={{ padding: '12px' }}>{user.role}</td>
                            <td style={{ padding: '12px' }}>
                                <span style={{
                                    padding: '2px 8px',
                                    borderRadius: '999px',
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    backgroundColor: user.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(156, 163, 175, 0.1)',
                                    color: user.status === 'active' ? '#059669' : '#6b7280',
                                }}>
                                    {user.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedRows.length > 0 && (
                <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    background: 'var(--color-bg-subtle)',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                }}>
                    {selectedRows.length} row{selectedRows.length !== 1 ? 's' : ''} selected
                </div>
            )}
        </div>
    )
}
