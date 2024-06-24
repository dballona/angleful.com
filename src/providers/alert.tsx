import React, { useState } from 'react';

export enum AlertStatus {
  None = 'none',
  Success = 'success',
  Error = 'error',
}

type AlertCallbackType = (text: string) => void;

type AlertContextProps = {
  alert: AlertStatus;
  alertText: string | null;
  success: AlertCallbackType;
  error: AlertCallbackType;
  clear: () => void;
};

const timeout = 10000;

const AlertContext = React.createContext<AlertContextProps>(
  {} as AlertContextProps,
);
AlertContext.displayName = 'AlertContext';
export default AlertContext;

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = useState<AlertStatus>(AlertStatus.None);
  const [alertText, setAlertText] = useState<null | string>(null);
  const [timeoutHandle, setTimeoutHandle] = useState<null | NodeJS.Timeout>(
    null,
  );

  function clearAlert(): void {
    setAlert(AlertStatus.None);
    setAlertText(null);
  }

  return (
    <AlertContext.Provider
      value={{
        alert: alert,
        alertText: alertText,
        success: (text: string) => {
          setAlertText(text);
          setAlert(AlertStatus.Success);
          timeoutHandle && clearTimeout(timeoutHandle);
          setTimeoutHandle(setTimeout(clearAlert, timeout));
        },
        error: (text: string) => {
          setAlertText(text);
          setAlert(AlertStatus.Error);
        },
        clear: clearAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}
