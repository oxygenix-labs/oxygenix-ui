'use client';

import { DataTable, Button } from '@oxygenix-ui/ui';

export function DataTableRenderDemo() {
  const columns = [
    { key: 'name', label: 'Name' },
    {
      key: 'status',
      label: 'Status',
      render: (value: any) => (
        <span
          style={{
            color: value === 'Active' ? 'green' : 'red',
            fontWeight: 'bold',
          }}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      align: 'right' as const,
      render: (_: any, row: any) => (
        <Button size="sm" onClick={() => alert(`Edit ${row.name}`)}>
          Edit
        </Button>
      ),
    },
  ];

  const data = [
    { id: 1, name: 'Project A', status: 'Active' },
    { id: 2, name: 'Project B', status: 'Inactive' },
  ];

  return <DataTable columns={columns} data={data} />;
}
