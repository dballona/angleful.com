import PageContent from '@/components/page-content';
import PageTitle from '@/components/page-title';
import { getCurrentAccount } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function AdminHomePage() {
  const currentAccount = await getCurrentAccount();
  if (!currentAccount) return <></>;

  return (
    <>
      <PageTitle
        title={`What's up, ${currentAccount.firstName}`}
        subtitle="Manage admin stuff here."
        actions={[
          {
            label: 'Do something',
            icon: 'plus',
            href: `/admin/somehwere`,
          },
          { label: 'Manage stuff', href: `/admin/stuff/` },
        ]}
      />

      <PageContent>
        Content goes here.
      </PageContent>
    </>
  );
}
