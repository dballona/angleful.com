import { WorkExperience } from "@/db/types";
import { MONTH_NAMES } from "@/lib/constants";


export function workExperienceTimespan(workExperience: WorkExperience): string {
  if (!workExperience.startMonth) return '';
  if (!workExperience.endMonth) return '';

  const startMonthName = MONTH_NAMES[workExperience.startMonth - 1];
  const endMonthName = MONTH_NAMES[workExperience.endMonth - 1];

  return `${startMonthName} ${workExperience.startYear} - ${endMonthName} ${workExperience.endYear}`;
}
