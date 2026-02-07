'use client';

import { Pagination, Text } from '@oxygenix-ui/ui';
import { useState } from 'react';

export default function PaginationBasicDemo() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div
      style={{
        padding: '24px',
        border: '1px solid var(--oxy-border-color)',
        borderRadius: 'var(--oxy-radius-md)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <Text>Active Page: {currentPage}</Text>
      <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
    </div>
  );
}
