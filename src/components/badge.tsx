import { Color } from '@/lib/constants';
import { ReactNode } from 'react';

export default function Badge({
  color,
  children,
}: {
  color: Color;
  children: ReactNode;
}) {
  const borderClasses = `border border-solid border-${color}-500`;

  return (
    <span className={`p-1 rounded ${borderClasses} text-${color}-500 leading-3 uppercase font-semibold`}>
      {children}
    </span>
  );
}
