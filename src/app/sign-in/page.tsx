import Box from '@/components/box';
import AccountSignInForm from '@/components/account-sign-in-form';

export default function SignInPage() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 col-start-4">
          <Box title="Sign in">
            <AccountSignInForm />
          </Box>
        </div>
      </div>
    </>
  );
}
