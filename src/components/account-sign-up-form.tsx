'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import AlertContext from '@/providers/alert';
import { signIn } from 'next-auth/react';
import type { AccountSignUpParams } from '@/models/account';
import { useForm } from '@/hooks/form';
import FormItem from '@/components/form-item';
import FormAction from '@/components/form-action';

export default function AccountSignUpForm() {
  const router = useRouter();
  const alert = useContext(AlertContext);

  const { formData, validationErrors, isSubmittingForm, onSubmit } =
    useForm<AccountSignUpParams>({
      url: '/api/auth/sign-up',
      method: 'POST',
      onSuccess: async () => {
        const email = formData!.get('email');
        const password = formData!.get('password');

        signIn('credentials', {
          email,
          password,
          redirect: false,
          callbackUrl: '/sign-up',
        }).then(async response => {
          if (response?.error) {
            return alert.error(response.error);
          }

          alert.success('Successfully signed in.');
          router.push('/');
          router.refresh();
        });
      },
    });

  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        id="businessInvitationId"
        name="businessInvitationId"
        type="hidden"
      />

      <FormItem
        id="firstName"
        label="First Name"
        errors={validationErrors.firstName}
      >
        <input
          id="firstName"
          name="firstName"
          type="text"
          required
        />
      </FormItem>

      <FormItem
        id="lastName"
        label="Last Name"
        errors={validationErrors.lastName}
      >
        <input
          id="lastName"
          name="lastName"
          type="text"
          required
        />
      </FormItem>

      <FormItem id="email" label="Email" errors={validationErrors.email}>
        <input
          id="email"
          name="email"
          type="email"
          required
        />
      </FormItem>

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

      <FormAction label="Sign up" disabled={isSubmittingForm} />

      <p className="pt-5">
        Already have an account? <Link href="/sign-in" className="link">Sign in</Link> instead.
      </p>
    </form>
  );
}
