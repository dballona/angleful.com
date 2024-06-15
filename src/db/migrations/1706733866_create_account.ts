import { Kysely, sql } from 'kysely';
import { triggerTouchUpdatedAtForTable } from '..';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('account')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('role', sql`account_role`, col =>
      col.defaultTo('Account').notNull(),
    )
    .addColumn('first_name', 'varchar', col => col.notNull())
    .addColumn('last_name', 'varchar', col => col.notNull())
    .addColumn('email', 'varchar', col => col.notNull().unique())
    .addColumn('password_hash', 'varchar', col => col.notNull())
    .addColumn('created_at', 'timestamp', col =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', col =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex('account_role_idx')
    .on('account')
    .column('role')
    .execute();

  await db.schema
    .createIndex('account_created_at_idx')
    .on('account')
    .column('created_at')
    .execute();

  await db.schema
    .createIndex('account_updated_at_idx')
    .on('account')
    .column('updated_at')
    .execute();

  await triggerTouchUpdatedAtForTable('account').execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('account').execute();
}
