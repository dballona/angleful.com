'use client';

import { MAX_YEAR, POSSIBLE_YEARS } from '@/lib/constants';
import { useState } from 'react';

export default function YearSelect({
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

  const [value, setValue] = useState<number>(defaultValue ?? MAX_YEAR);

  return (
    <select
      id={id}
      name={name}
      required={required}
      defaultValue={value}
      onChange={(e) => setValue(+e.target.value)}
    >
      {POSSIBLE_YEARS.map(year => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}
