'use client';

import { ReactNode, useEffect } from 'react';

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

  return (
    <>
      <div className="modal__overlay" onClick={closeModal} />
      <div className="modal" style={{ maxWidth: width }}>
        <a className="modal__close" onClick={closeModal}>
          &times;
        </a>
        <h1 className="modal__title">{title}</h1>

        <div className="modal__content">{children}</div>
      </div>
    </>
  );
}
