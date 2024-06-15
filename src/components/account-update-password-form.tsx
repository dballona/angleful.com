'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import AlertContext from '@/providers/alert';
import type { AccountUpdatePasswordParams } from '@/models/account';
import FormItem from '@/components/form-item';
import FormAction from '@/components/form-action';
import { useForm } from '@/hooks/form';

export default function AccountUpdatePasswordForm({
  token,
}: {
  token: string;
}) {
  const router = useRouter();
  const alert = useContext(AlertContext);

  const { validationErrors, isSubmittingForm, onSubmit } =
    useForm<AccountUpdatePasswordParams>({
      url: '/api/auth/password-reset',
      method: 'PUT',
      onSuccess: async () => {
        router.push('/');
        alert.success(`Successfully updated your password.`);
        router.refresh();
      },
    });

  return (
    <form className="form" onSubmit={onSubmit}>
      <input id="token" name="token" type="hidden" value={token} />

      <FormItem
        id="password"
        label="Password"
        errors={validationErrors.password}
      >
        <input id="password" name="password" type="password" required />
      </FormItem>

      <FormItem
        id="passwordConfirmation"
        label="Password Confirmation"
        errors={validationErrors.passwordConfirmation}
      >
        <input
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="password"
          required
        />
      </FormItem>

      <FormAction label="Update password" disabled={isSubmittingForm} />

      <p className="pt-5">
        Remembered your details? <Link href="/sign-in" className="link">Sign in</Link> instead.
      </p>
    </form>
  );
}
