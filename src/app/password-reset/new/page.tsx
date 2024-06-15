import Box from '@/components/box';
import { AccountNewPasswordForm } from '@/components/account-new-password-form';

export default function NewPasswordResetPage() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 col-start-4">
          <Box title="Reset your password">
            <AccountNewPasswordForm />
          </Box>
        </div>
      </div>
    </>
  );
}
