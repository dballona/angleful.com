'use client';

import { ReactNode } from 'react';

export default function Main({ children }: { children: ReactNode }) {
  return (
    <main className="w-full min-h-screen px-12 mb-12 mt-8">
      {children}
    </main>
  );
}
