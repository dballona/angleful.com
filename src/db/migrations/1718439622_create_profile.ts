import { Kysely, sql } from 'kysely';
import { triggerTouchUpdatedAtForTable } from '..';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('profile')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('account_id', 'uuid', col =>
      col.references('account.id').onDelete('cascade').notNull(),
    )
    .addColumn('career_path', sql`career_path`, col => col.notNull())
    .addColumn('first_name', 'varchar', col => col.notNull())
    .addColumn('last_name', 'varchar', col => col.notNull())
    .addColumn('city', 'varchar', col => col.notNull())
    .addColumn('country', 'varchar(2)', col => col.notNull())
    .addColumn('contact_email', 'varchar', col => col.notNull())
    .addColumn('contact_phone', 'varchar')
    .addColumn('website_url', 'varchar')
    .addColumn('created_at', 'timestamp', col =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', col =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex('profile_account_id_idx')
    .on('profile')
    .column('account_id')
    .execute();

  await triggerTouchUpdatedAtForTable('profile').execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('profile').execute();
}
