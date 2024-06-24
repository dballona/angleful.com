'use client';

import { FormEventHandler, ReactNode } from 'react';

export default function Form({
  className,
  onSubmit,
  children
}: {
  className?: string,
  onSubmit?: FormEventHandler<HTMLFormElement>
  children: ReactNode
}) {
  let formHtmlClasses = ['form'];

  if (className) formHtmlClasses.push(className);

  return (
    <form className={formHtmlClasses.join(' ')} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
