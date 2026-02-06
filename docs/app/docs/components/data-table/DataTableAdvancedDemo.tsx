'use client';

import { DataTable } from '@oxygenix-ui/ui';

export function DataTableAdvancedDemo() {
  const columns = [
    { key: 'id', label: 'ID', width: 50, sortable: true },
    { key: 'item', label: 'Item', sortable: true },
    { key: 'price', label: 'Price', align: 'right' as const, sortable: true },
  ];

  const data = [
    { id: 1, item: 'Apple', price: '$1.20' },
    { id: 2, item: 'Banana', price: '$0.80' },
    { id: 3, item: 'Cherry', price: '$2.50' },
    { id: 4, item: 'Date', price: '$3.00' },
    { id: 5, item: 'Elderberry', price: '$4.00' },
  ];

  return <DataTable pagination pageSize={3} columns={columns} data={data} />;
}
