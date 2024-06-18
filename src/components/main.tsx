'use client';

import { ReactNode } from 'react';

export default function Main({ children }: { children: ReactNode }) {
  return (
    <main className="w-full min-h-screen px-12 pb-12 bg-white">
      <div className="pt-20">
        {children}
      </div>
    </main>
  );
}
