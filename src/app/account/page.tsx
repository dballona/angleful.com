import Box from '@/components/box';
import Button from '@/components/button';
import { Icon } from '@/components/icon';
import PageContent from '@/components/page-content';
import PageTitle from '@/components/page-title';
import { getCurrentAccount } from '@/lib/auth';
import { getLinkedInSignInUrl, getLinkedInUserInfo } from '@/lib/linkedin';

export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  const currentAccount = await getCurrentAccount();
  const linkedInSignInUrl = getLinkedInSignInUrl();
  if (!currentAccount) return <></>;

  return (
    <>
      <PageTitle
        title={`Welcome, ${currentAccount.firstName}`}
        subtitle="Start by setting up your profile"
      // actions={[
      //   {
      //     label: 'Go to profile',
      //     icon: 'plus',
      //     href: `/account/profile`,
      //   },
      //   { label: 'Manage stuff', href: `/account/stuff/` },
      // ]}
      />

      <PageContent>
        <p className="mb-6">We offer two options to get started:</p>

        <div className="grid grid-cols-2 gap-8">
          <Box title="Set up manually">
            <span className="block">
              Create your profile by providing the required information manually.
            </span>
            <Button href="/account/profile" className="mt-4">Get started</Button>
          </Box>

          <Box title="Set up with LinkedIn">
            <span className="block">
              Connect your LinkedIn account and we'll pull your profile information.
            </span>
            <Button href={linkedInSignInUrl} className="mt-4">
              <Icon name="linkedin" style={{ height: '1rem', top: -1 }} /> Connect my Linkedin
            </Button>
          </Box>
        </div>
      </PageContent>
    </>
  );
}
