import { Kysely, sql } from 'kysely';
import { triggerTouchUpdatedAtForTable } from '..';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType('questionable_type')
    .asEnum(['WorkExperience'])
    .execute();

  await db.schema
    .createTable('question')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('questionable_type', sql`questionable_type`, col => col.notNull())
    .addColumn('career_path', sql`career_path`, col => col.notNull())
    .addColumn('question', 'varchar', col => col.notNull())
    .addColumn('hint', 'varchar', col => col.notNull())
    .addColumn('created_at', 'timestamp', col =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', col =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex('question_questionable_type_career_path_idx')
    .on('question')
    .columns(['questionable_type', 'career_path'])
    .execute();

  await triggerTouchUpdatedAtForTable('question').execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('question').execute();
  await db.schema.dropType('questionable_type').execute();
}
