import { Kysely, sql } from 'kysely';
import { triggerTouchUpdatedAtForTable } from '..';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('account_password_reset')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('account_id', 'uuid', col =>
      col.references('account.id').onDelete('cascade').notNull(),
    )
    .addColumn('token', 'varchar', col => col.unique().notNull())
    .addColumn('reset_at', 'timestamp', col => col.defaultTo(null))
    .addColumn('created_at', 'timestamp', col =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', col =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex('account_password_reset_account_id_idx')
    .on('account_password_reset')
    .column('account_id')
    .execute();

  await triggerTouchUpdatedAtForTable('account_password_reset').execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('account_password_reset').execute();
}
