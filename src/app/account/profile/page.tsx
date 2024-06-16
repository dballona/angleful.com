import ProfileForm from '@/components/profile-form';
import PageContent from '@/components/page-content';
import PageTitle from '@/components/page-title';
import { getCurrentAccount, getPathNamespaceForAccount } from '@/lib/auth';
import { getCountries } from '@/models/country';
import { getProfileByAccountId } from '@/models/profile';
import { Profile } from '@/db/types';

export const dynamic = 'force-dynamic';

export default async function NewBusinessPage() {
  const currentAccount = await getCurrentAccount();
  const pathNamespace = await getPathNamespaceForAccount(currentAccount!);
  const countries = await getCountries();

  const profile = await getProfileByAccountId(currentAccount!.id) || {
    firstName: currentAccount!.firstName,
    lastName: currentAccount!.lastName,
    contactEmail: currentAccount!.email,
  } as Profile;

  const title = profile?.id
    ? 'Update your profile'
    : 'Create your profile'

  return (
    <>
      <PageTitle
        title={title}
        subtitle={`Provide basic information about yourself`}
      // actions={[
      //   {
      //     label: 'Back to homepage',
      //     icon: 'back',
      //     href: `/${pathNamespace}/`,
      //   },
      //   { label: 'Add experiences', href: `#`, disabled: true }
      // ]}
      />

      <PageContent>
        <ProfileForm profile={profile} countries={countries} />
      </PageContent>
    </>
  );
}
