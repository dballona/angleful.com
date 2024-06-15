'use client';

import { Color } from '@/lib/constants';
import { ReactNode } from 'react';

export default function Box({
  title,
  subtitle,
  subtitleColor,
  children,
}: {
  title: string;
  subtitle?: string;
  subtitleColor?: Color;
  children: ReactNode;
}) {
  const subtitleClassNames = ['pt-1'];
  if (subtitleColor) subtitleClassNames.push(`text-${subtitleColor}-500`);

  return (
    <div className="w-full p-8 border border-solid bg-opaque border-opaque rounded-lg">
      <h3>{title}</h3>
      {subtitle && (
        <h4 className={subtitleClassNames.join(' ')}>{subtitle}</h4>
      )}
      <div className="mt-4">{children}</div>
    </div>
  );
}
