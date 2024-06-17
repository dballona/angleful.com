import WorkExperienceForm from '@/components/work-experience-form';
import PageContent from '@/components/page-content';
import PageTitle from '@/components/page-title';
import { getCurrentAccount } from '@/lib/auth';
import { getCountries } from '@/models/country';
import { getWorkExperiencesByAccountId } from '@/models/work-experience';

export const dynamic = 'force-dynamic';

export default async function AccountWorkExperiencesPage() {
  const currentAccount = await getCurrentAccount();
  const countries = await getCountries();

  const workExperiences = await getWorkExperiencesByAccountId(currentAccount!.id);

  return (
    <>
      <PageTitle
        title="Add your work experiences"
        subtitle={`Provide information about past work experiences`}
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
        <WorkExperienceForm workExperiences={workExperiences} countries={countries} />
      </PageContent>
    </>
  );
}
