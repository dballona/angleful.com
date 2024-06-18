'use client';

import AlertContext, { AlertStatus } from '@/providers/alert';
import { useContext } from 'react';

export default function Alert() {
  const alert = useContext(AlertContext);
  const alertText = alert.alertText;

  let alertHtmlClasses = ['text-sm font-normal tracking-tight z-[9999]'];

  if (alert.alert !== AlertStatus.None) {
    alertHtmlClasses.push.apply(alertHtmlClasses, [
      "fixed right-4 top-4 w-[20rem] p-3",
      "bg-white bg-opacity-15 backdrop-blur shadow",
      "border border-solid rounded",
      "animate-fade-in"
    ])
  }

  if (alert.alert === AlertStatus.None) alertHtmlClasses.push('animate-fade-out')
  if (alert.alert === AlertStatus.Success) alertHtmlClasses.push('border-green-500 text-green-500');
  if (alert.alert === AlertStatus.Error) alertHtmlClasses.push('border-red-500 text-red-500');

  return (
    <div className={alertHtmlClasses.join(' ')}>
      {alertText}
    </div>
  );
}
