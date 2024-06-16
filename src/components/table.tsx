'use client';

import { ReactNode } from 'react';

export default function Table({
  className,
  children
}: {
  className: string,
  children: ReactNode
}) {
  let tableHtmlClasses = [
    "w-full border-spacing-0 border-separate rounded shadow overflow-hidden",
    "border border-solid border-black border-opacity-15",
    "hover:[&_tbody_tr]:bg-white",
    "[&_th]:text-left [&_th]:px-4 [&_th]:py-4 [&_th]:bg-white [&_th]:bg-opacity-5",
    "[&_td]:border-t [&_td]:border-solid [&_td]:border-black [&_td]:border-opacity-15",
    "[&_td]:px-4 [&_td]:py-3"
  ]

  tableHtmlClasses.push(className);

  return (
    <table className={tableHtmlClasses.join(' ')}>
      {children}
    </table>
  );
}
