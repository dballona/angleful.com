import Box from '@/components/box';
import Button from '@/components/button';
import PageContent from '@/components/page-content';
import PageTitle from '@/components/page-title';
import { getCurrentAccount } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  const currentAccount = await getCurrentAccount();
  if (!currentAccount) return <></>;

  return (
    <>
      <PageTitle
        title={`What's up, ${currentAccount.firstName}`}
        subtitle="Manage account stuff here."
        actions={[
          {
            label: 'Go to profile',
            icon: 'plus',
            href: `/account/profile`,
          },
          { label: 'Manage stuff', href: `/account/stuff/` },
        ]}
      />

      <PageContent>
        <div className="grid grid-cols-3 gap-8">
          <Box title="#1: Set up profile">
            <span className="block">
              Create your profile manually, connect your LinkedIn or upload your current CV.
            </span>
            <Button href="/account/profile" className="mt-4">Get started</Button>
          </Box>

          <Box title="#2: Experiences">
            <span className="block">
              Add where you worked, what you did, and what you did achieve in previous roles.
            </span>
            <Button href="/" className="mt-4" disabled={true}>Add experiences</Button>
          </Box>

          <Box title="#3: We got you">
            <span className="block">
              We'll generate a CV that works well for exactly what you want to achieve.
            </span>
            <Button href="/" className="mt-4" disabled={true}>Let's see</Button>
          </Box>
        </div>
      </PageContent>
    </>
  );
}
