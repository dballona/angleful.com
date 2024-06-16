'use client';

import { signOut } from 'next-auth/react';
import Button from '@/components/button';

export default function AccountSignOutButton() {
  return (
    <Button
      size="sm"
      onClick={async () => {
        await signOut({ redirect: true });
      }}
    >
      Log out
    </Button>
  );
}
