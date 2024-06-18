'use client';

import { ReactNode, useEffect } from 'react';
import { Icon } from './icon';

export default function Modal({
  title,
  width,
  closeModal,
  children,
}: {
  title: string;
  width?: number;
  closeModal: () => void;
  children: ReactNode;
}) {
  const KEY_NAME_ESC = 'Escape';
  const KEY_EVENT_TYPE = 'keydown';

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === KEY_NAME_ESC) {
        closeModal();
      }
    };

    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [closeModal]);

  const modalOverlayHtmlClasses = [
    "fixed z-40 w-full h-full top-0 left-0 bg-white bg-opacity-25 backdrop-blur"
  ]

  const modalHtmlClasses = [
    "fixed z-50 bg-white border border-solid border-black border-opacity-15 rounded",
    "p-8 left-1/2 -translate-x-1/2 top-20 shadow animate-fade-in"
  ]

  const modalCloseHtmlClasses = [
    "absolute -top-6 -right-6 cursor-pointer",
    "w-6 h-6 text-center text-black"
  ]

  return (
    <>
      <div className={modalOverlayHtmlClasses.join(' ')} onClick={closeModal} />
      <div className={modalHtmlClasses.join(' ')} style={{ maxWidth: width }}>
        <a className={modalCloseHtmlClasses.join(' ')} onClick={closeModal}>
          <Icon name="close" style={{ height: "1rem" }} />
        </a>

        <h1 className="pb-4">{title}</h1>
        <div className="pb-2">{children}</div>
      </div>
    </>
  );
}
