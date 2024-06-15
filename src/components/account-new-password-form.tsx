'use client';

import Link from 'next/link';

import type { AccountNewPasswordParams } from '@/models/account';
import AlertContext from '@/providers/alert';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import FormItem from '@/components/form-item';
import FormAction from '@/components/form-action';
import { useForm } from '@/hooks/form';

export function AccountNewPasswordForm() {
  const router = useRouter();
  const alert = useContext(AlertContext);

  const { formData, isSubmittingForm, onSubmit } =
    useForm<AccountNewPasswordParams>({
      url: '/api/auth/password-reset',
      method: 'POST',
      onSuccess: async () => {
        const email = formData!.get('email');
        router.push('/');
        alert.success(
          `We have sent an email to ${email} with instructions to reset your password.`,
        );
        router.refresh();
      },
    });

  return (
    <form className="form" onSubmit={onSubmit}>
      <FormItem id="email" label="Email">
        <input id="email" name="email" type="email" required />
      </FormItem>

      <FormAction label="Send me instructions" disabled={isSubmittingForm} />

      <p className="pt-5">
        Already have an account? <Link href="/sign-in" className="link">Sign in</Link> instead.
      </p>
    </form>
  );
}
