'use client';

import AlertContext, { AlertStatus } from '@/providers/alert';
import { useContext } from 'react';

export default function Alert() {
  const alert = useContext(AlertContext);
  const alertText = alert.alertText;

  let alertHtmlClasses = ['fixed text-sm font-normal tracking-tight rounded z-[9999]'];

  if (alert.alert !== AlertStatus.None) {
    alertHtmlClasses.push.apply(alertHtmlClasses, [
      "bg-gradient-to-b from-white via-30% to-slate-100 to-100%",
      "bottom-4 right-4 p-4 border border-solid border-opacity-15"
    ])
  }

  if (alert.alert === AlertStatus.Success) alertHtmlClasses.push('text-green-500 border-green-500 bg-green-500');
  if (alert.alert === AlertStatus.Error) alertHtmlClasses.push('text-red-500 border-red-500 bg-red-500 shadow');

  return (
    <div className={alertHtmlClasses.join(' ')}>
      {alertText}
    </div>
  );
}
