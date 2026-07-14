'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode, useState } from 'react';
import { queryClient as defaultQueryClient } from '@/lib/query/queryClient';

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => defaultQueryClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
