import { Kysely, sql } from 'kysely';
import { triggerTouchUpdatedAtForTable } from '..';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('object_storage_file')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('account_id', 'uuid', col =>
      col.references('account.id').onDelete('cascade').notNull(),
    )
    .addColumn('record_id', 'uuid', col => col.notNull())
    .addColumn('record_table_name', 'varchar', col => col.notNull())
    .addColumn('kind', 'varchar')
    .addColumn('name', 'varchar', col => col.notNull())
    .addColumn('size_in_bytes', 'integer', col => col.notNull())
    .addColumn('content_type', 'varchar', col => col.notNull())
    .addColumn('path', 'varchar', col => col.notNull())
    .addColumn('created_at', 'timestamp', col =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', col =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex('object_storage_file_account_id_idx')
    .on('object_storage_file')
    .column('account_id')
    .execute();

  await db.schema
    .createIndex('object_storage_file_record_idx')
    .on('object_storage_file')
    .columns(['record_id', 'record_table_name'])
    .execute();

  await triggerTouchUpdatedAtForTable('object_storage_file').execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('object_storage_file').execute();
}
