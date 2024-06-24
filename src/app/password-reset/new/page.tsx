import Box from '@/components/box';
import { AccountNewPasswordForm } from '@/components/account-new-password-form';
import Logo from '@/components/logo';

export default function NewPasswordResetPage() {
  return (
    <>
      <Logo width={150} height={50} className="block mx-auto w-[150px] pb-12" />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 col-start-4">
          <Box title="Reset your password">
            <div className="mt-2">
              <AccountNewPasswordForm />
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}
