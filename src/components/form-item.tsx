'use client';

import { ReactNode } from 'react';
import FormHint from '@/components/form-hint';
import FormError from '@/components/form-error';

export default function FormItem({
  id,
  label,
  hint,
  errors,
  children,
}: {
  id: string;
  label?: string;
  hint?: string;
  errors?: string[];
  children: ReactNode;
}) {
  const formItemClassNames = ['pb-2'];
  if (errors) formItemClassNames.push('form-item-with-errors');

  return (
    <div className={formItemClassNames.join(' ')}>
      {label && (
        <>
          <label htmlFor={id}>{label}</label>
          <br />
        </>
      )}
      {children}
      {hint && <FormHint>{hint}</FormHint>}
      {errors && <FormError>{errors.join(', ')}</FormError>}
    </div>
  );
}
