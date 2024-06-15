'use client';

import { useState } from 'react';

export default function Checkbox({
  id,
  name,
  label,
  defaultValue = false,
  required = false,
}: {
  id: string;
  name: string;
  label: string;
  defaultValue?: boolean;
  required?: boolean;
}) {
  const [value, setValue] = useState<number>(defaultValue ? 1 : 0);

  return (
    <div className="checkbox">
      <input
        id={id}
        name={name}
        value={value}
        type="checkbox"
        checked={value === 1}
        onChange={e => setValue(e.target.value == '0' ? 1 : 0)}
        required={required}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
