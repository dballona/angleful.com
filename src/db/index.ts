import { Pool } from 'pg';
import {
  CamelCasePlugin,
  Kysely,
  PostgresDialect,
  RawBuilder,
  sql,
} from 'kysely';

import { DB } from '@/db/types';

export function getDb(): Kysely<DB> {
  return new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: process.env.POSTGRES_URL,
      }),
    }),
    plugins: [new CamelCasePlugin()],
  });
}

export function triggerTouchUpdatedAtForTable(
  table: string,
): RawBuilder<unknown> {
  return sql`
    CREATE TRIGGER ${sql.raw(table)}_updated_at
      BEFORE UPDATE
      ON "${sql.raw(table)}"
      FOR EACH ROW
    EXECUTE PROCEDURE touch_updated_at();
  `;
}

export const db = getDb();
