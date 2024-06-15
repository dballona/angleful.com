import { withErrorHandling } from '@/app/api/_shared/error-handling';
import { redirect } from 'next/navigation';
import { storage } from '@/lib/object-storage';
import { withAuthenticatedAccount } from '@/app/api/_shared/auth-handling';
import { getObjectStorageFile } from '@/models/object-storage-file';
import { getCurrentAccount } from '@/lib/auth';
import { AccountRole } from '@/db/types';

export const GET = withErrorHandling(
  withAuthenticatedAccount(
    async (req: Request, { params }: { params: { id: string } }) => {
      const currentAccount = await getCurrentAccount();
      const objectStorageFile = await getObjectStorageFile(params.id);

      if (
        currentAccount!.id !== objectStorageFile.accountId &&
        currentAccount!.role !== AccountRole.Admin
      ) {
        return Response.json({}, { status: 401 });
      }

      const signedUrl = await storage.getSignedFileUrl(objectStorageFile.path);

      return redirect(signedUrl);
    },
  ),
);
