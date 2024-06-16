'use client';

import AlertContext, { AlertStatus } from '@/providers/alert';
import { useContext } from 'react';

export default function Alert() {
  const alert = useContext(AlertContext);
  const alertText = alert.alertText;

  let alertHtmlClasses = ['fixed text-sm font-normal tracking-tight rounded'];

  if (alert.alert !== AlertStatus.None) alertHtmlClasses.push('top-4 right-4 p-4 w-64 border border-solid border-opacity-20 bg-opacity-10');
  if (alert.alert === AlertStatus.Success) alertHtmlClasses.push('text-green-500 border-green-500 bg-green-500');
  if (alert.alert === AlertStatus.Error) alertHtmlClasses.push('text-red-500 border-red-500 bg-red-500');

  return (
    <div className={alertHtmlClasses.join(' ')}>{alertText}</div>
  );
}
