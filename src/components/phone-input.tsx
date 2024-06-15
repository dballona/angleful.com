'use client';

import 'react-phone-number-input/style.css';
import Input, { parsePhoneNumber } from 'react-phone-number-input';
import { useState } from 'react';

export default function PhoneInput({
  id,
  name,
  defaultValue,
  required = false,
}: {
  id: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const internationalPhone = defaultValue || '';
  const defaultCountry = parsePhoneNumber(internationalPhone)?.country || 'US';
  const [value, setValue] = useState<string | undefined>(internationalPhone);

  return (
    <>
      <input name={name} type="hidden" value={value} />
      <Input
        id={id}
        international={false}
        defaultCountry={defaultCountry}
        value={internationalPhone}
        onChange={value => setValue(value)}
        required={required}
        className="phone-input"
      />
    </>
  );
}
