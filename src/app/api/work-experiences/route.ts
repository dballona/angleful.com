import {
  ApplicationError,
  withErrorHandling,
} from '@/app/api/_shared/error-handling';
import { getRequestParams } from '@/app/api/_shared/request-params';
import { withAuthenticatedAccount } from '@/app/api/_shared/auth-handling';
import { getCurrentAccount } from '@/lib/auth';

import { createWorkExperience, WorkExperienceParams, WorkExperienceSchema } from '@/models/work-experience';

export const POST = withErrorHandling(
  withAuthenticatedAccount(async (req: Request) => {
    const params = await getValidatedParams(req);

    return createWorkExperience({
      ...params,
    }).then(async workExperience => {
      return Response.json({ workExperience }, { status: 201 });
    });
  }),
);

async function getValidatedParams(req: Request): Promise<WorkExperienceParams> {
  const formData = await req.formData();
  const reqParams = getRequestParams(formData) as WorkExperienceParams;
  const currentAccount = await getCurrentAccount();

  const validation = WorkExperienceSchema.safeParse({
    ...reqParams,
    accountId: currentAccount!.id
  });

  if (validation.success) {
    return validation.data;
  } else {
    throw new ApplicationError({ ...validation.error.flatten(), status: 422 });
  }
}
