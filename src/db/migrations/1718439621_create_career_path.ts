import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType('career_path')
    .asEnum([
      'IndividualContributor',
      'Manager',
    ])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropType('career_path').execute();
}
