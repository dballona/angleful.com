import { db } from '@/db';
import { compare, hash } from 'bcryptjs';
import { Account, AccountRole } from '@/db/types';
import { z } from 'zod';

const firstName = z.string().trim().min(1);
const lastName = z.string().trim().min(1);
const email = z.string().trim().email();
const password = z.coerce
  .string()
  .regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm,
    'Password needs to be at least 8 characters long, have one lowercase letter, ' +
    'one uppercase letter, one digit and one special character',
  );
const passwordConfirmation = z.coerce.string();

function passwordAndPasswordConfirmationMustMatch({
  password,
  passwordConfirmation,
}: {
  password: string;
  passwordConfirmation: string;
}) {
  return password === passwordConfirmation;
}

export const AccountSignUpSchema = z
  .object({
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
  })
  .refine(passwordAndPasswordConfirmationMustMatch, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

export type AccountSignUpParams = z.infer<typeof AccountSignUpSchema>;

export const AccountSignInSchema = z.object({
  email,
  password,
});

export type AccountSignInParams = z.infer<typeof AccountSignInSchema>;

export const AccountNewPasswordSchema = z.object({
  email,
});

export type AccountNewPasswordParams = z.infer<typeof AccountNewPasswordSchema>;

export const AccountUpdatePasswordSchema = z
  .object({
    password,
    passwordConfirmation,
    token: z.string(),
  })
  .refine(passwordAndPasswordConfirmationMustMatch, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

export type AccountUpdatePasswordParams = z.infer<
  typeof AccountUpdatePasswordSchema
>;


export async function getAdminAccounts(): Promise<Account[]> {
  return await db
    .selectFrom('account')
    .selectAll()
    .where('role', '=', AccountRole.Admin)
    .execute();
}

export async function getAccount(id: string): Promise<Account> {
  return await db
    .selectFrom('account')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirstOrThrow();
}

export async function getAccountByEmail(
  email: string,
): Promise<Account | undefined> {
  return await db
    .selectFrom('account')
    .selectAll()
    .where('email', 'ilike', email)
    .executeTakeFirst();
}

export async function authenticateAccount(
  email: string,
  password: string,
): Promise<Account> {
  const account = await getAccountByEmail(email);

  // Account doesn't exist or password doesn't match
  if (!account || !(await compare(password, account.passwordHash))) {
    throw new Error('Invalid email or password');
  }

  return account;
}

export async function createAccount(
  params: AccountSignUpParams,
): Promise<Account> {
  return await db
    .insertInto('account')
    .values({
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      passwordHash: await hash(params.password, 10),
      role: AccountRole.Account,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function updateAccountPassword(
  id: string,
  {
    password,
    passwordConfirmation,
  }: {
    password: string;
    passwordConfirmation: string;
  },
): Promise<Account> {
  if (password !== passwordConfirmation) {
    throw new Error('Passwords do not match');
  }

  return await db
    .updateTable('account')
    .set({
      passwordHash: await hash(password, 10),
    })
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirstOrThrow();
}
