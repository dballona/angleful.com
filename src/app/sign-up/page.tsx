import Box from '@/components/box';
import AccountSignUpForm from '@/components/account-sign-up-form';

export default async function SignUpPage() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 col-start-4">
          <Box title="Sign up">
            <AccountSignUpForm />
          </Box>
        </div>
      </div>
    </>
  );
}
