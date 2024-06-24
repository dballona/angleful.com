import { db } from '@/db';
import { CareerPath, DB, WorkExperience, WorkExperienceWithQuestions } from '@/db/types';
import { MAX_YEAR, MIN_YEAR } from '@/lib/constants';
import { z } from 'zod';
import { getQuestionsForCareerPath } from './question';
import { ExpressionBuilder } from 'kysely';
import { jsonObjectFrom } from 'kysely/helpers/postgres';

const accountId = z.string().uuid();
const careerPath = z.nativeEnum(CareerPath);
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
    careerPath,
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

export async function getWorkExperiencesWithQuestionsByAccountId(accountId: string): Promise<WorkExperienceWithQuestions[]> {
  return await db
    .selectFrom('workExperience')
    .selectAll()
    .where('accountId', '=', accountId)
    .orderBy('endYear desc')
    .execute()
    .then(workExperiences => {
      return Promise.all(workExperiences.map(transformIntoWorkExperienceWithQuestions));
    });
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

export async function deleteWorkExperience(
  id: string
): Promise<void> {
  await db
    .deleteFrom('workExperience')
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirstOrThrow();
}

async function transformIntoWorkExperienceWithQuestions(
  workExperience: WorkExperience,
): Promise<WorkExperienceWithQuestions> {
  const questions = await getQuestionsForCareerPath(workExperience.careerPath)
  return { ...workExperience, questions };
}
