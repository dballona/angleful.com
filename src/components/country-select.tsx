'use client';

import { Country } from '@/db/types';
import { useState } from 'react';

export default function CountrySelect({
  id,
  name,
  defaultValue,
  required = false,
  countries
}: {
  id: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  countries: Country[]
}) {
  const [value, setValue] = useState<string>(defaultValue ?? "US");

  return (
    <select
      id={id}
      name={name}
      required={required}
      defaultValue={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {countries.map(country => (
        <option key={country.isoCode} value={country.isoCode}>
          {country.name}
        </option>
      ))}
    </select>
  );
}
