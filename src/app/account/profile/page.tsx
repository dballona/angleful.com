import ProfileForm from '@/components/profile-form';
import PageContent from '@/components/page-content';
import PageTitle from '@/components/page-title';
import { getCurrentAccount, getPathNamespaceForAccount } from '@/lib/auth';
import { getCountries } from '@/models/country';
import { maybeProfileByAccountId } from '@/models/profile';
import { Profile } from '@/db/types';
import { getWorkExperiencesByAccountId } from '@/models/work-experience';
import WorkExperienceForm from '@/components/work-experience-form';
import Box from '@/components/box';

export const dynamic = 'force-dynamic';

export default async function AccountProfilePage() {
  const currentAccount = await getCurrentAccount();
  const pathNamespace = await getPathNamespaceForAccount(currentAccount!);
  const countries = await getCountries();

  const profile = await maybeProfileByAccountId(currentAccount!.id) || {
    firstName: currentAccount!.firstName,
    lastName: currentAccount!.lastName,
    contactEmail: currentAccount!.email,
  } as Profile;

  const workExperiences = await getWorkExperiencesByAccountId(currentAccount!.id);

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
        <div className="mt-8">
          <h2 className="mb-4">Basic Information</h2>
          <Box>
            <ProfileForm profile={profile} countries={countries} />
          </Box>
        </div>

        <div className="mt-12">
          <h2 className="mb-4">Work Experiences</h2>
          <WorkExperienceForm workExperiences={workExperiences} countries={countries} />
        </div>
      </PageContent>
    </>
  );
}
