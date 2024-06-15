import { db } from '@/db';
import { DB, ObjectStorageFile, ObjectStorageFileTableName } from '@/db/types';
import { Transaction } from 'kysely';
import { z } from 'zod';

const accountId = z.string().uuid();
const recordId = z.string().uuid();
const recordTableName = z.string().trim().min(1);
const name = z.string().trim().min(1);
const kind = z.string().trim().optional();
const sizeInBytes = z.number().min(1);
const contentType = z.string().trim().min(1);
const path = z.string().trim().min(1);

const MAX_FILE_SIZE = 20_000_000;
const ACCEPTED_CONTENT_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
];

const file = z
  .custom<File>()
  .refine(file => !!file, `Image is required`)
  .refine(
    file => ACCEPTED_CONTENT_TYPES.includes(file.type),
    'Only .jpg, .jpeg, .png, .webp files are accepted.',
  )
  .refine(file => file.size <= MAX_FILE_SIZE, `Max file size is 20MB.`);

export const ObjectStorageFileUploadSchema = z.object({
  recordTableName,
  recordId,
  kind,
  file,
});

export type ObjectStorageFileUploadParams = z.infer<
  typeof ObjectStorageFileUploadSchema
>;

export const ObjectStorageFileSchema = z.object({
  accountId,
  recordTableName,
  recordId,
  name,
  kind,
  sizeInBytes,
  contentType,
  path,
});

export type ObjectStorageFileParams = z.infer<typeof ObjectStorageFileSchema>;


export async function getObjectStorageFilesForRecord({
  recordTableName,
  recordId,
  limit = 10,
}: {
  recordTableName: string;
  recordId: string;
  limit?: number;
}): Promise<ObjectStorageFile[]> {
  return await db
    .selectFrom('objectStorageFile')
    .selectAll()
    .where('recordId', '=', recordId)
    .where('recordTableName', '=', recordTableName)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .execute();
}

export async function getObjectStorageFile(
  id: string,
): Promise<ObjectStorageFile> {
  return await db
    .selectFrom('objectStorageFile')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirstOrThrow();
}

export async function createObjectStorageFile(
  params: ObjectStorageFileParams,
  trx?: Transaction<DB>,
): Promise<ObjectStorageFile> {
  return await (trx ?? db)
    .insertInto('objectStorageFile')
    .values(params)
    .returningAll()
    .executeTakeFirstOrThrow();
}
export async function deleteObjectStorageFile(id: string): Promise<void> {
  await db
    .deleteFrom('objectStorageFile')
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirstOrThrow();
}
