'use client';

import AlertContext, { AlertStatus } from '@/providers/alert';
import { useContext } from 'react';

export default function Alert() {
  const alert = useContext(AlertContext);
  const alertText = alert.alertText;

  let additionalStyles = []

  if (alert.alert === AlertStatus.None) additionalStyles.push('hidden')
  if (alert.alert === AlertStatus.Success) additionalStyles.push('text-green-500');
  if (alert.alert === AlertStatus.Error) additionalStyles.push('text-red-500');

  return (
    <div
      className={`
        text-sm font-semibold tracking-tighter z-[9999]
        fixed bottom-12 left-1/2 -translate-x-1/2 w-[20rem]
        bg-white bg-opacity-75 backdrop-blur shadow
        border border-solid border-black border-opacity-10
        ${additionalStyles.join("")}
      `
      }>
      <div className="grid grid-cols-8">
        <div className="col-span-7 p-3">
          {alertText}
        </div>
        <div className="col-span-1 text-center">
          <a
            onClick={alert.clear}
            className="block p-3 cursor-pointer"
          >
            &times;
          </a>
        </div>
      </div>
    </div>
  );
}
