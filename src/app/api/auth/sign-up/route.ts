import { AccountSignUpParams, AccountSignUpSchema } from '@/models/account';
import {
  ApplicationError,
  withErrorHandling,
} from '@/app/api/_shared/error-handling';
import { getRequestParams } from '@/app/api/_shared/request-params';
import { createAccount, getAccountByEmail } from '@/models/account';

export const POST = withErrorHandling(async (req: Request) => {
  const formData = await req.formData();

  const params = await getValidatedParams(formData);
  const account = await getAccountByEmail(params.email);

  if (!account) {
    return createAccount({
      ...params,
    }).then(async account => {
      return Response.json({}, { status: 201 });
    });
  } else {
    throw new ApplicationError({
      fieldErrors: { email: ['Email is taken'] },
      formErrors: [],
      status: 422,
    });
  }
});

async function getValidatedParams(
  formData: FormData,
): Promise<AccountSignUpParams> {
  const reqParams = getRequestParams(formData) as AccountSignUpParams;

  const validation = AccountSignUpSchema.safeParse(reqParams);

  if (validation.success) {
    return validation.data;
  } else {
    throw new ApplicationError({ ...validation.error.flatten(), status: 422 });
  }
}
