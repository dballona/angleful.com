import { useSession } from 'next-auth/react';

export function usePathNamespace() {
  const { data: session } = useSession();
  return session?.user.role.toLowerCase();
}
