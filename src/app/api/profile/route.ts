import {
  ApplicationError,
  withErrorHandling,
} from '@/app/api/_shared/error-handling';
import { getRequestParams } from '@/app/api/_shared/request-params';
import { withAuthenticatedAccount } from '@/app/api/_shared/auth-handling';
import { getCurrentAccount } from '@/lib/auth';

import { ProfileParams, ProfileSchema, createProfile, updateProfile } from '@/models/profile';

export const POST = withErrorHandling(
  withAuthenticatedAccount(async (req: Request) => {
    const params = await getValidatedParams(req);

    return createProfile({
      ...params,
    }).then(async profile => {
      return Response.json({ profile }, { status: 201 });
    });
  }),
);

export const PUT = withErrorHandling(
  withAuthenticatedAccount(async (req: Request) => {
    const params = await getValidatedParams(req);
    const currentAccount = await getCurrentAccount();

    return updateProfile(
      currentAccount!.id,
      params
    ).then(async profile => {
      return Response.json({ profile }, { status: 200 });
    });
  }),
);

async function getValidatedParams(req: Request): Promise<ProfileParams> {
  const formData = await req.formData();
  const reqParams = getRequestParams(formData) as ProfileParams;
  const currentAccount = await getCurrentAccount();

  const validation = ProfileSchema.safeParse({
    ...reqParams,
    accountId: currentAccount!.id
  });

  if (validation.success) {
    return validation.data;
  } else {
    throw new ApplicationError({ ...validation.error.flatten(), status: 422 });
  }
}
