import { AccountRole } from '@/db/types';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      role: AccountRole;
    };
  }

  interface User {
    role: AccountRole;
  }

  interface JWT {
    role: AccountRole;
  }
}
