'use client';

import { useState } from 'react';

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

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
