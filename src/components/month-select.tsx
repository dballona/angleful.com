'use client';

import { MONTH_NAMES } from '@/lib/constants';
import { useState } from 'react';

export default function MonthSelect({
  id,
  name,
  defaultValue,
  required = false
}: {
  id: string;
  name: string;
  defaultValue?: number;
  required?: boolean;
}) {
  const currentMonth = new Date().getMonth() + 1;
  const [value, setValue] = useState<number>(defaultValue ?? currentMonth);

  return (
    <select
      id={id}
      name={name}
      required={required}
      defaultValue={value}
      onChange={(e) => setValue(+e.target.value)}
    >
      {MONTH_NAMES.map((month, index) => (
        <option key={index + 1} value={index + 1}>
          {month}
        </option>
      ))}
    </select>
  );
}
