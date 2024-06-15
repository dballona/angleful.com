import * as path from 'path';
import { promises as fs } from 'fs';
import { Migrator, FileMigrationProvider, Kysely } from 'kysely';
import { getDb } from '.';
import { DB } from './types';

const MIGRATION_PATH = path.join(__dirname, './migrations');

async function getMigrator(db: Kysely<DB>): Promise<Migrator> {
  return new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: MIGRATION_PATH,
    }),
  });
}

export async function migrateToLatest() {
  const db = getDb();
  const migrator = await getMigrator(db);
  const { error, results } = await migrator.migrateToLatest();

  results?.forEach(migration => {
    if (migration.status === 'Success') {
      console.log(
        `migration "${migration.migrationName}" was executed successfully`,
      );
    } else if (migration.status === 'Error') {
      console.error(`failed to execute migration "${migration.migrationName}"`);
    }
  });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

export async function migrateDown() {
  const db = getDb();
  const migrator = await getMigrator(db);
  const { error, results } = await migrator.migrateDown();

  results?.forEach(migration => {
    if (migration.status === 'Success') {
      console.log(
        `migration "${migration.migrationName}" was reverted successfully`,
      );
    } else if (migration.status === 'Error') {
      console.error(
        `failed to rollback migration "${migration.migrationName}"`,
      );
    }
  });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

const NEW_MIGRATION_TEMPLATE = `
import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {

}

export async function down(db: Kysely<any>): Promise<void> {
  
}
`;

export async function migrateNew(name: string | undefined) {
  const date = parseInt((new Date().getTime() / 1000).toFixed(0));

  if (!name) {
    console.log('no migration name provided');
    process.exit(1);
  }

  const migrationName = `${date}_${name}.ts`;
  const fullPath = path.join(MIGRATION_PATH, migrationName);

  await fs.writeFile(fullPath, NEW_MIGRATION_TEMPLATE);

  console.log(`Successfully created migration ${fullPath}`);
}
