'use client';

import { SessionProvider } from 'next-auth/react';
import { AlertProvider } from '@/providers/alert';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>
        <AlertProvider>{children}</AlertProvider>
      </SessionProvider>
    </>
  );
}
