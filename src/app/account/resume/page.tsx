import { getCurrentAccount } from '@/lib/auth';
import { getProfileByAccountId } from '@/models/profile';
import { getWorkExperiencesByAccountId } from '@/models/work-experience';
import Resume from '@/components/resume';

export const dynamic = 'force-dynamic';

export default async function AccountResumePage() {
  const currentAccount = await getCurrentAccount();
  if (!currentAccount) return <></>;

  const profile = await getProfileByAccountId(currentAccount!.id);
  const workExperiences = await getWorkExperiencesByAccountId(currentAccount!.id);

  return (
    <Resume profile={profile} workExperiences={workExperiences} />
  )
}
