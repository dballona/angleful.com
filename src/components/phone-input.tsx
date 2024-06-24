'use client';

import 'react-phone-number-input/style.css';
import Input, { Country, parsePhoneNumber } from 'react-phone-number-input';
import { useState } from 'react';

export default function PhoneInput({
  id,
  name,
  defaultValue,
  required = false,
  defaultCountry
}: {
  id: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  defaultCountry?: string
}) {
  const internationalPhone = defaultValue || '';

  const parsedCountryFromPhone = parsePhoneNumber(internationalPhone)?.country
  const defaultCountryWithPriorityApplied = parsedCountryFromPhone || defaultCountry as Country || 'US';

  const [value, setValue] = useState<string | undefined>(internationalPhone);

  return (
    <>
      <input name={name} type="hidden" value={value} />
      <Input
        id={id}
        international={false}
        defaultCountry={defaultCountryWithPriorityApplied}
        value={internationalPhone}
        onChange={value => setValue(value)}
        required={required}
        className="phone-input"
      />
    </>
  );
}
