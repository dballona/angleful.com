import { db } from '@/db';
import { Profile } from '@/db/types';
import { z } from 'zod';

const accountId = z.string().uuid();
const firstName = z.string().trim().min(1);
const lastName = z.string().trim().min(1);
const city = z.string().trim().min(1);
const country = z.string().trim().min(2).max(2);
const contactEmail = z.string().trim().email();
const contactPhone = z.string().trim().min(1, 'Must be present');
const websiteUrl = z.string();

export const ProfileSchema = z
  .object({
    accountId,
    firstName,
    lastName,
    city,
    country,
    contactEmail,
    contactPhone,
    websiteUrl
  })

export type ProfileParams = z.infer<typeof ProfileSchema>;

export async function getProfileByAccountId(accountId: string): Promise<Profile> {
  return await db
    .selectFrom('profile')
    .selectAll()
    .where('accountId', '=', accountId)
    .executeTakeFirstOrThrow();
}

export async function maybeProfileByAccountId(accountId: string): Promise<Profile | undefined> {
  return await db
    .selectFrom('profile')
    .selectAll()
    .where('accountId', '=', accountId)
    .executeTakeFirst();
}

export async function createProfile(
  params: ProfileParams,
): Promise<Profile> {
  return await db
    .insertInto('profile')
    .values(params)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function updateProfile(
  accountId: string,
  params: ProfileParams,
): Promise<Profile> {
  return await db
    .updateTable('profile')
    .set(params)
    .where('accountId', '=', accountId)
    .returningAll()
    .executeTakeFirstOrThrow();
}
