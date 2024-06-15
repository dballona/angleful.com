'use client';

import { Color } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { MouseEvent, ReactNode } from 'react';

export default function Button({
  disabled = false,
  children,
  color,
  href,
  className,
  onClick,
}: {
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  color?: Color;
  href?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  const router = useRouter();

  const buttonClassNames = [
    "pt-[0.3rem] pb-[0.4rem] px-3",
    "cursor-pointer leading-6 font-normal",
    "rounded inline-block",
    "border border-solid",
  ];

  if (!color) {
    buttonClassNames.push.apply(buttonClassNames, [
      "text-black",
      "border-gray-400",
      "bg-gradient-to-b",
      "from-white via-30% to-gray-200 to-100%",
      "enabled:hover:from-white enabled:hover:via-10% enabled:hover:to-gray-100"
    ])
  } else if (color == 'red') {
    buttonClassNames.push.apply(buttonClassNames, [
      "text-white border-red-500 bg-red-500",
      "enabled:hover:border-red-400 enabled:hover:bg-red-400",
    ])
  } else if (color == 'sky') {
    buttonClassNames.push.apply(buttonClassNames, [
      "text-white border-sky-600 bg-sky-500",
      "enabled:hover:border-sky-500 enabled:hover:bg-sky-400",
    ])
  }

  if (disabled) {
    buttonClassNames.push("opacity-50 cursor-not-allowed")
  }

  if (className) buttonClassNames.push(className);

  if (href) {
    onClick = () => router.push(href);
  }

  return (
    <button
      className={buttonClassNames.join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
