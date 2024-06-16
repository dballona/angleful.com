import {
  ApplicationError,
  withErrorHandling,
} from '@/app/api/_shared/error-handling';
import { getRequestParams } from '@/app/api/_shared/request-params';
import { withAuthenticatedAccount } from '@/app/api/_shared/auth-handling';
import { getCurrentAccount } from '@/lib/auth';

import { updateWorkExperience, WorkExperienceParams, WorkExperienceSchema } from '@/models/work-experience';

export const PUT = withErrorHandling(
  withAuthenticatedAccount(
    async (req: Request, { params }: { params: { id: string } }) => {
      const validatedParams = await getValidatedParams(req);

      return updateWorkExperience(params.id, {
        ...validatedParams,
      }).then(async business => {
        return Response.json({ business });
      });
    },
  ),
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
