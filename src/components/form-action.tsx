'use client';

import Button from '@/components/button';
import { Color } from '@/lib/constants';

export default function FormAction({
  label,
  disabled = false,
  color,
}: {
  label: string;
  disabled: boolean;
  color?: Color
}) {
  return (
    <div className="pt-2">
      <Button disabled={disabled} color={color}>
        {label}
      </Button>
    </div>
  );
}
