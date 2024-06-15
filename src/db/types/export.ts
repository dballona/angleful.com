import { readFileSync, writeFileSync } from 'fs';
import * as path from 'path';

const FILE_RELATIVE_PATH = './generated.ts';

function transformFile() {
  const filePath = path.join(__dirname, FILE_RELATIVE_PATH);

  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  let dbInterfaceLineIndex = lines.findIndex(line => {
    return line === 'export interface DB {';
  });

  if (dbInterfaceLineIndex === -1) {
    console.warn(
      "Couldn't find `export interface DB {`! This script is fragile and the result is probably wrong!",
    );
    dbInterfaceLineIndex = Number.MAX_SAFE_INTEGER; // So that the check below doesn't return true;
  }

  const transformedLines = lines.flatMap((line, index) => {
    if (line.startsWith('import type')) {
      //
      // Matches on `import type { ... } from "kysely";`
      // and appends `Selectable`, `Insertable` and `Updateable`
      // to whatever is inside `{ ... }`.
      //
      // E.g.
      //
      // import type { ColumnType } from "kysely";
      //
      // becomes
      //
      // import type { ColumnType, Selectable, Insertable, Updateable } from "kysely";
      //
      const importedTypes = line.match(
        /^import type \{(.*) \} from "kysely";$/,
      )?.[1];
      if (!importedTypes) {
        return line;
      }

      return line.replace(
        importedTypes,
        `${importedTypes}, Selectable, Insertable, Updateable`,
      );
    }

    if (
      line.startsWith('export type') &&
      (line.endsWith('";') || line.endsWith("';"))
    ) {
      //
      // Transforms string union literal types like this
      //
      // export type AccountRole = "Merchant" | "Admin"
      //
      // to enums like this
      //
      // export enum AccountRole {
      //   Merchant: 'Merchant',
      //   Admin: 'Admin',
      // }
      //
      const matches = line.match(/export type (\w+) = (.*);/);
      const typeName = matches?.[1];
      const options = matches?.[2].replace(/"|'/g, '').split(' | ');

      return [
        `export enum ${typeName} {`,
        options?.map(opt => `  ${opt} = '${opt}',`).join('\n'),
        `}`,
      ].flat();
    }

    if (line.startsWith('export interface')) {
      //
      // Matches on `export interface GeneratedInterface {`
      // appends `Table` to it: `GeneratedInterfaceTable`
      // and adds the three specific definitions:
      // `Selectable`, `Insertable` and `Updateable`
      //
      const interfaceName = line.match(/export interface (\w+) \{/)?.[1];
      if (!interfaceName || interfaceName === 'DB') {
        return line;
      }

      return [
        `export type ${interfaceName} = Selectable<${interfaceName}Table>;`,
        // `export type New${interfaceName} = Insertable<${interfaceName}Table>;`,
        // `export type ${interfaceName}Update = Updateable<${interfaceName}Table>;`,
        '',
        line.replace(interfaceName, `${interfaceName}Table`),
      ];
    }

    if (index > dbInterfaceLineIndex) {
      //
      // Matches table definitions in the `DB` interface like this
      //
      // export interface DB {
      //   account: Account;
      // }
      //
      // and generate this
      //
      // export interface DB {
      //   account: AccountTable;
      // }
      //
      const dbTableInterface = line.match(/^\s+\w+: (\w+);$/)?.[1];
      if (!dbTableInterface) {
        return line;
      }

      return line.replace(dbTableInterface, `${dbTableInterface}Table`);
    }

    return line;
  });

  transformedLines.unshift(
    '/**\n * @generated through pnpm db export:types. Do not manually edit this file. \n */ \n',
  );

  writeFileSync(filePath, transformedLines.join('\n'), 'utf-8');
}

transformFile();
