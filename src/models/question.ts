import { db } from '@/db';
import { CareerPath, Question, QuestionableType } from '@/db/types';
import { z } from 'zod';

const questionableType = z.nativeEnum(QuestionableType);
const careerPath = z.nativeEnum(CareerPath);
const question = z.string().trim().min(1);
const hint = z.string().trim().min(1);

export const QuestionSchema = z
  .object({
    questionableType,
    careerPath,
    question,
    hint
  })

export type QuestionParams = z.infer<typeof QuestionSchema>;

export async function getQuestionsForCareerPath(careerPath: CareerPath): Promise<Question[]> {
  return await db
    .selectFrom('question')
    .selectAll()
    .where('careerPath', '=', careerPath)
    .execute();
}

export async function createQuestion(
  params: QuestionParams,
): Promise<Question> {
  return await db
    .insertInto('question')
    .values(params)
    .returningAll()
    .executeTakeFirstOrThrow();
}
