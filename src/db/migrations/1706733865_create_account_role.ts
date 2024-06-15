import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType('account_role')
    .asEnum(['Account', 'Admin'])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropType('account_role').execute();
}
