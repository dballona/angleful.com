'use client';

import { ReactNode } from 'react';

export default function FormHint({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <span className="text-sm">{children}</span>
  );
}
