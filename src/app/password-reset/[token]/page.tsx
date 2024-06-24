import Box from '@/components/box';
import AccountUpdatePasswordForm from '@/components/account-update-password-form';
import Logo from '@/components/logo';

type UpatePassworPageParams = {
  params: { token: string };
};

export default function UpdatePasswordPage({
  params: { token },
}: UpatePassworPageParams) {
  return (
    <>
      <Logo width={150} height={50} className="block mx-auto w-[150px] pb-12" />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 col-start-4">
          <Box title="Update your password">
            <div className="mt-2">
              <AccountUpdatePasswordForm token={token} />
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}
