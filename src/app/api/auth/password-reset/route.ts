import {
  ApplicationError,
  withErrorHandling,
} from '@/app/api/_shared/error-handling';
import {
  AccountNewPasswordParams,
  AccountNewPasswordSchema,
  AccountUpdatePasswordParams,
  AccountUpdatePasswordSchema,
  getAccountByEmail,
  updateAccountPassword
} from '@/models/account';
import {
  createPasswordReset,
  getPasswordReset,
  setPasswordAsReset,
} from '@/models/account-password-reset';
import { sendResetPasswordEmail } from '@/mailers/reset-password-email';
import { getRequestParams } from '@/app/api/_shared/request-params';

export const POST = withErrorHandling(async (req: Request) => {
  const { email } = await getNewValidatedParams(req);

  return getAccountByEmail(email).then(async account => {
    if (!account) {
      return Response.json(
        {
          error: `Unable to find account ${email}.`,
        },
        { status: 404 },
      );
    }

    const passwordReset = await createPasswordReset({ accountId: account.id });

    await sendResetPasswordEmail({
      to: account.email,
      firstName: account.firstName,
      resetPasswordToken: passwordReset.token,
    });

    return Response.json({ email }, { status: 201 });
  });
});

async function getNewValidatedParams(
  req: Request,
): Promise<AccountNewPasswordParams> {
  const formData = await req.formData();
  const reqParams = getRequestParams(formData) as AccountNewPasswordParams;

  const validation = AccountNewPasswordSchema.safeParse(reqParams);

  if (validation.success) {
    return validation.data;
  } else {
    throw new ApplicationError({ ...validation.error.flatten(), status: 422 });
  }
}

export const PUT = withErrorHandling(async (req: Request) => {
  const { token, password, passwordConfirmation } =
    await getUpdateValidatedParams(req);

  return getPasswordReset(token).then(async passwordReset => {
    if (!passwordReset) {
      return Response.json(
        {
          error: `Invalid or expired token.`,
        },
        { status: 404 },
      );
    }

    await updateAccountPassword(passwordReset.accountId, {
      password,
      passwordConfirmation,
    });
    await setPasswordAsReset(passwordReset.token);

    return Response.json({});
  });
});

async function getUpdateValidatedParams(
  req: Request,
): Promise<AccountUpdatePasswordParams> {
  const formData = await req.formData();
  const reqParams = getRequestParams(formData) as AccountUpdatePasswordParams;

  const validation = AccountUpdatePasswordSchema.safeParse(reqParams);

  if (validation.success) {
    return validation.data;
  } else {
    throw new ApplicationError({ ...validation.error.flatten(), status: 422 });
  }
}
