import ProfileForm from '@/components/profile-form';
import PageContent from '@/components/page-content';
import PageTitle from '@/components/page-title';
import { getCurrentAccount, getPathNamespaceForAccount } from '@/lib/auth';
import { getCountries } from '@/models/country';
import { getProfileByAccountId } from '@/models/profile';

export const dynamic = 'force-dynamic';

export default async function NewBusinessPage() {
  const countries = await getCountries();
  const currentAccount = await getCurrentAccount();
  const profile = await getProfileByAccountId(currentAccount!.id);
  const pathNamespace = await getPathNamespaceForAccount(currentAccount!);

  return (
    <>
      <PageTitle
        title="Profile title"
        subtitle={`Step 1: Provide basic information about yourself`}
        actions={[
          {
            label: 'Back to homepage',
            icon: 'back',
            href: `/${pathNamespace}/`,
          },
          { label: 'Add experiences', href: `#`, disabled: true }
        ]}
      />

      <PageContent>
        <ProfileForm profile={profile} countries={countries} />
      </PageContent>
    </>
  );
}
