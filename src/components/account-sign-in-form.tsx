'use client';

import { FormEvent, useContext, useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AlertContext from '@/providers/alert';
import type { AccountSignInParams } from '@/models/account';
import FormItem from '@/components/form-item';
import FormAction from '@/components/form-action';
import FormHint from '@/components/form-hint';

export default function AccountSignInForm() {
  const router = useRouter();
  const alert = useContext(AlertContext);

  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmittingForm(true);

    const params: AccountSignInParams = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    signIn('credentials', {
      email: params.email,
      password: params.password,
      redirect: false,
    })
      .then(response => {
        if (response?.error) {
          return alert.error(response.error);
        }

        alert.success('Successfully signed in.');
        router.push('/');
        router.refresh();
      })
      .finally(() => {
        setIsSubmittingForm(false);
      });
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <FormItem id="email" label="Email">
        <input id="email" name="email" type="email" required />
      </FormItem>

      <FormItem id="password" label="Password">
        <input id="password" name="password" type="password" required />
        <FormHint>
          <Link href="/password-reset/new" className="link">forgot your password?</Link>
        </FormHint>
      </FormItem>

      <FormAction label="Sign in" disabled={isSubmittingForm} />

      <p className="pt-5">
        Don&apos;t have an account? <Link href="/sign-up" className="link">Sign up</Link> for
        free. <br />
      </p>
    </form>
  );
}
