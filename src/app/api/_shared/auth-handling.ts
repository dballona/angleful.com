import { AccountRole } from '@/db/types';
import { getCurrentAccount } from '@/lib/auth';

export function withAuthenticatedAccount(
  fn: (request: Request, ...args: any) => Promise<Response>,
) {
  return async function (request: Request, ...args: any) {
    const currentAccount = await getCurrentAccount();

    if (!currentAccount) {
      return Response.json({}, { status: 401 });
    }

    return await fn(request, ...args);
  };
}

export function withAdminAccount(
  fn: (request: Request, ...args: any) => Promise<Response>,
) {
  return async function (request: Request, ...args: any) {
    const currentAccount = await getCurrentAccount();

    if (!currentAccount) {
      return Response.json({}, { status: 401 });
    }

    if (currentAccount.role !== AccountRole.Admin) {
      return Response.json({}, { status: 401 });
    }

    return await fn(request, ...args);
  };
}
