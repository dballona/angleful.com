import { authenticateAccount, getAccount } from '@/models/account';
import { Account, AccountRole } from '@/db/types';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const account = await authenticateAccount(email, password);

        return {
          id: account.id,
          email: account.email,
          role: account.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as AccountRole;
      }

      return session;
    },
  },
};

export async function getCurrentAccountId(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
): Promise<string | undefined> {
  const session = await getServerSession(...args, authConfig);
  return session?.user.id;
}

export async function getCurrentAccount(): Promise<Account | undefined> {
  const accountId = await getCurrentAccountId();
  if (accountId) return getAccount(accountId);

  return undefined;
}

export async function getPathNamespaceForAccount(
  currentAccount: Account,
): Promise<string> {
  return currentAccount.role.toLowerCase();
}
