import { db } from '@/db';
import { WorkExperience } from '@/db/types';
import { MAX_YEAR, MIN_YEAR } from '@/lib/constants';
import { z } from 'zod';

const accountId = z.string().uuid();
const companyName = z.string().trim().min(1);
const title = z.string().trim().min(1);
const city = z.string().trim().min(1);
const country = z.string().trim().min(2).max(2);
const startMonth = z.number().min(1).max(12);
const startYear = z.number().min(MIN_YEAR).max(MAX_YEAR);
const endMonth = z.number().min(1).max(12);
const endYear = z.number().min(MIN_YEAR).max(MAX_YEAR);

export const WorkExperienceSchema = z
  .object({
    accountId,
    companyName,
    title,
    city,
    country,
    startMonth,
    startYear,
    endMonth,
    endYear,
  })

export type WorkExperienceParams = z.infer<typeof WorkExperienceSchema>;

export async function getWorkExperiencesByAccountId(accountId: string): Promise<WorkExperience[]> {
  return await db
    .selectFrom('workExperience')
    .selectAll()
    .where('accountId', '=', accountId)
    .orderBy('endYear desc')
    .execute();
}

export async function createWorkExperience(
  params: WorkExperienceParams,
): Promise<WorkExperience> {
  return await db
    .insertInto('workExperience')
    .values(params)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function updateWorkExperience(
  id: string,
  params: WorkExperienceParams,
): Promise<WorkExperience> {
  return await db
    .updateTable('workExperience')
    .set(params)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirstOrThrow();
}
