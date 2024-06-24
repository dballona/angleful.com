import { Kysely, sql } from 'kysely';
import { triggerTouchUpdatedAtForTable } from '..';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('work_experience')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('account_id', 'uuid', col =>
      col.references('account.id').onDelete('cascade').notNull(),
    )
    .addColumn('career_path', sql`career_path`, col => col.notNull())
    .addColumn('company_name', 'varchar', col => col.notNull())
    .addColumn('title', 'varchar', col => col.notNull())
    .addColumn('city', 'varchar', col => col.notNull())
    .addColumn('country', 'varchar(2)', col => col.notNull())
    .addColumn('start_month', 'integer')
    .addColumn('start_year', 'integer', col => col.notNull())
    .addColumn('end_month', 'integer')
    .addColumn('end_year', 'integer')
    .addColumn('created_at', 'timestamp', col =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', col =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex('work_experience_account_id_idx')
    .on('work_experience')
    .column('account_id')
    .execute();

  await triggerTouchUpdatedAtForTable('work_experience').execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('work_experience').execute();
}
