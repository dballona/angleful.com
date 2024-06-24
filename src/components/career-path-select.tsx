'use client';

import { CareerPath } from '@/db/types';
import { ChangeEvent, useState } from 'react';

export default function CareerPathSelect({
  id,
  name,
  defaultValue,
  required = false,
  onChange
}: {
  id: string;
  name: string;
  defaultValue?: CareerPath;
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}) {
  const [value, setValue] = useState<CareerPath>(defaultValue ?? CareerPath.IndividualContributor);

  const getCareerPathDisplayName = (careerPath: CareerPath) => {
    return careerPath.replace(/([A-Z])/g, ' $1').trim()
  }

  return (
    <select
      id={id}
      name={name}
      required={required}
      defaultValue={value}
      onChange={(e) => {
        setValue(e.target.value as CareerPath)
        onChange && onChange(e)
      }}
    >
      {Object.entries(CareerPath).map(
        ([, careerPath]) => (
          <option key={careerPath} value={careerPath}>
            {getCareerPathDisplayName(careerPath)}
          </option>
        ),
      )}
    </select>
  );
}
