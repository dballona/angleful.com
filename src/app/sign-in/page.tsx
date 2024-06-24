import Box from '@/components/box';
import AccountSignInForm from '@/components/account-sign-in-form';
import Logo from '@/components/logo';

export default function SignInPage() {
  return (
    <>
      <Logo width={150} height={50} className="block mx-auto w-[150px] pb-12" />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 col-start-4">
          <Box title="Sign in">
            <div className="mt-2">
              <AccountSignInForm />
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}
