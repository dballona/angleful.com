'use client';

import Button from '@/components/button';
import { Icon, IconName } from '@/components/icon';
import { MouseEvent } from 'react';

type PageAction = {
  label: string;
  href?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  icon?: IconName;
  disabled?: boolean;
};

export default function PageTitle({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle: string;
  actions?: PageAction[];
}) {
  return (
    <>
      <h1 className="mt-6">{title}</h1>
      <h4 className="mb-4">{subtitle}</h4>
      {actions &&
        actions.map((action, idx) => (
          <span key={idx}>
            <Button
              className="mr-2"
              color={idx == 0 ? 'sky' : undefined}
              href={action.href ?? undefined}
              onClick={e => action.onClick && action.onClick(e)}
              disabled={action.disabled ?? undefined}
            >
              {action.icon && <Icon name={action.icon} style={{ width: 20, top: -1, left: -1 }} />}
              {action.label}
            </Button>
          </span>
        ))}
    </>
  );
}
