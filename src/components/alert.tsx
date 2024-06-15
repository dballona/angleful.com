'use client';

import AlertContext, { AlertStatus } from '@/providers/alert';
import { useContext } from 'react';

export default function Alert() {
  const alert = useContext(AlertContext);
  const alertText = alert.alertText;

  let alertHtmlClasses = ['w-full font-normal tracking-tight'];
  if (alert.alert === AlertStatus.Success) alertHtmlClasses.push('text-green-500');
  if (alert.alert === AlertStatus.Error) alertHtmlClasses.push('text-red-500');

  return (
    <div className={alertHtmlClasses.join(' ')}>{alertText}</div>
  );
}
