import Box from '@/components/box';
import AccountSignUpForm from '@/components/account-sign-up-form';
import Logo from '@/components/logo';

export default async function SignUpPage() {
  return (
    <>
      <Logo width={150} height={50} className="block mx-auto w-[150px] pb-12" />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 col-start-4">
          <Box title="Sign up">
            <div className="mt-2">
              <AccountSignUpForm />
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}
