import { Color } from '@/lib/constants';
import { ReactNode } from 'react';

export default function Badge({
  color,
  children,
}: {
  color: Color;
  children: ReactNode;
}) {
  const borderClasses = ``;

  return (
    <span
      className={`
        p-1 rounded 
        border border-solid border-${color}-500 
        text-${color}-500 leading-3 uppercase font-semibold
      `}
    >
      {children}
    </span>
  );
}
