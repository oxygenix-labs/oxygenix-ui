'use client';

import { Pagination } from '@oxygenix-ui/ui';
import { useState } from 'react';

export default function PaginationAdvancedDemo() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 125;
  const pageSize = 10;
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div
      style={{
        padding: '24px',
        border: '1px solid var(--oxy-border-color)',
        borderRadius: 'var(--oxy-radius-md)',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        showInfo
        totalItems={totalItems}
        pageSize={pageSize}
      />
    </div>
  );
}
