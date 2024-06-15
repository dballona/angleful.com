import {
  ApplicationError,
  withErrorHandling,
} from '@/app/api/_shared/error-handling';
import { getRequestParams } from '@/app/api/_shared/request-params';
import { storage } from '@/lib/object-storage';
import { withAuthenticatedAccount } from '@/app/api/_shared/auth-handling';
import {
  ObjectStorageFileUploadParams,
  ObjectStorageFileUploadSchema,
  createObjectStorageFile
} from '@/models/object-storage-file';
import { getCurrentAccount } from '@/lib/auth';
import { db } from '@/db';

export const POST = withErrorHandling(
  withAuthenticatedAccount(async (req: Request) => {
    const currentAccount = await getCurrentAccount();
    const { file, ...validatedParams } = await getValidatedFileParams(req);

    return db.transaction().execute(async trx => {
      const objectStorageFileParams = await storage.storeFile(
        validatedParams.recordTableName,
        validatedParams.recordId,
        file,
      );

      const objectStorageFile = await createObjectStorageFile(
        {
          ...objectStorageFileParams,
          kind: validatedParams.kind,
          accountId: currentAccount!.id,
        },
        trx,
      );

      return Response.json({ objectStorageFile }, { status: 201 });
    });
  }),
);

async function getValidatedFileParams(
  req: Request,
): Promise<ObjectStorageFileUploadParams> {
  const formData = await req.formData();
  const reqParams = getRequestParams(formData) as ObjectStorageFileUploadParams;

  const validation = ObjectStorageFileUploadSchema.safeParse({
    ...reqParams,
  });

  if (validation.success) {
    return validation.data;
  } else {
    throw new ApplicationError({ ...validation.error.flatten(), status: 422 });
  }
}
