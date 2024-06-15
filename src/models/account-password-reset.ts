import { db } from '@/db';
import { AccountPasswordReset } from '@/db/types';

import crypto from 'crypto';

export async function getPasswordReset(
  token: string,
): Promise<AccountPasswordReset | undefined> {
  const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

  return await db
    .selectFrom('accountPasswordReset')
    .selectAll()
    .where('token', '=', token)
    .where('resetAt', 'is', null)
    .where('createdAt', '>', yesterday)
    .executeTakeFirst();
}

export async function createPasswordReset({
  accountId,
}: {
  accountId: string;
}): Promise<AccountPasswordReset> {
  return await db
    .insertInto('accountPasswordReset')
    .values({
      accountId,
      token: crypto.randomBytes(128).toString('base64url'),
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function setPasswordAsReset(
  token: string,
): Promise<AccountPasswordReset> {
  var today = new Date();

  return await db
    .updateTable('accountPasswordReset')
    .where('token', '=', token)
    .set({
      resetAt: today,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}
