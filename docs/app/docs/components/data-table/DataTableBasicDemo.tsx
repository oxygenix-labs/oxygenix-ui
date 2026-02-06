'use client';

import { DataTable } from '@oxygenix-ui/ui';

export function DataTableBasicDemo() {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
  ];

  const data = [
    { id: 1, name: 'John Doe', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'User', status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', role: 'Editor', status: 'Active' },
  ];

  return <DataTable columns={columns} data={data} />;
}
