/**
 * @generated through pnpm db export:types. Do not manually edit this file. 
 */ 

import type { ColumnType, Selectable, Insertable, Updateable } from "kysely";

export enum AccountRole {
  Account = 'Account',
  Admin = 'Admin',
}

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Account = Selectable<AccountTable>;

export interface AccountTable {
  createdAt: Generated<Timestamp>;
  email: string;
  firstName: string;
  id: Generated<string>;
  lastName: string;
  passwordHash: string;
  role: Generated<AccountRole>;
  updatedAt: Generated<Timestamp>;
}

export type AccountPasswordReset = Selectable<AccountPasswordResetTable>;

export interface AccountPasswordResetTable {
  accountId: string;
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  resetAt: Timestamp | null;
  token: string;
  updatedAt: Generated<Timestamp>;
}

export type ObjectStorageFile = Selectable<ObjectStorageFileTable>;

export interface ObjectStorageFileTable {
  accountId: string;
  contentType: string;
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  kind: string | null;
  name: string;
  path: string;
  recordId: string;
  recordTableName: string;
  sizeInBytes: number;
  updatedAt: Generated<Timestamp>;
}

export type Profile = Selectable<ProfileTable>;

export interface ProfileTable {
  accountId: string;
  city: string;
  contactEmail: string;
  contactPhone: string | null;
  country: string;
  createdAt: Generated<Timestamp>;
  firstName: string;
  id: Generated<string>;
  lastName: string;
  updatedAt: Generated<Timestamp>;
  websiteUrl: string | null;
}

export type WorkExperience = Selectable<WorkExperienceTable>;

export interface WorkExperienceTable {
  accountId: string;
  city: string;
  companyName: string;
  country: string;
  createdAt: Generated<Timestamp>;
  endMonth: number | null;
  endYear: number | null;
  id: Generated<string>;
  startMonth: number | null;
  startYear: number;
  title: string;
  updatedAt: Generated<Timestamp>;
}

export interface DB {
  account: AccountTable;
  accountPasswordReset: AccountPasswordResetTable;
  objectStorageFile: ObjectStorageFileTable;
  profile: ProfileTable;
  workExperience: WorkExperienceTable;
}
