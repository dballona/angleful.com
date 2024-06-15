import Box from '@/components/box';
import AccountUpdatePasswordForm from '@/components/account-update-password-form';

type UpatePassworPageParams = {
  params: { token: string };
};

export default function UpdatePasswordPage({
  params: { token },
}: UpatePassworPageParams) {
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 col-start-4">
          <Box title="Update your password">
            <AccountUpdatePasswordForm token={token} />
          </Box>
        </div>
      </div>
    </>
  );
}
