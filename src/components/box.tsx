'use client';

import { Color } from '@/lib/constants';
import { ReactNode } from 'react';

export default function Box({
  title,
  subtitle,
  subtitleColor,
  children,
}: {
  title?: string;
  subtitle?: string;
  subtitleColor?: Color;
  children: ReactNode;
}) {
  return (
    <div
      className={`
        w-full p-8 bg-white rounded shadow
        border border-solid border-black border-opacity-15
      `}
    >
      {title && (
        <h3>{title}</h3>
      )}
      {subtitle && (
        <h4 className={`pt-1 text-${subtitleColor}-500`}>{subtitle}</h4>
      )}
      {children}
    </div>
  );
}
