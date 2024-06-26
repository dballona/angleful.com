'use client';

import { useReactToPrint } from "react-to-print";

import { Profile, WorkExperience } from "@/db/types";
import { workExperienceTimespan } from '@/helpers/work-experience-helper';
import { useRef } from "react";
import Button from "@/components/button";
import { SITE_URL } from "@/lib/constants";

export default function Resume({
  profile,
  workExperiences,
}: {
  profile: Profile;
  workExperiences: WorkExperience[]
}) {

  let resumeRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: `CV`,
    pageStyle: ``,
    fonts: [{
      family: 'Open Sans', source: `${SITE_URL}/assets/fonts/OpenSans-VariableFont_wdth,wght.ttf`
    }],
    onPrintError: () => alert("there was an error when printing"),
  });

  const resumeBodyClassNames = [
    "bg-white w-full p-16 text-sm",
    "border border-solid border-black border-opacity-10 shadow-lg",
    "print:p-0 print:border-transparent print:shadow-none",
  ]

  return (
    <>
      <Button onClick={handlePrint}>Print</Button>
      <div className={resumeBodyClassNames.join(' ')} ref={resumeRef}>
        <div className="grid grid-cols-6 gap-x-4 items-center border-b border-solid border-black border-opacity-15 pb-6">
          <div className="col-span-2">
            <h1 className="text-2xl">{profile.firstName} {profile.lastName}</h1>
            <span className="block text-xs">{profile.city}, {profile.country}</span>
            <span className="block text-xs">{profile.contactEmail}</span>
            <span className="block text-xs">{profile.contactPhone}</span>
            <span className="block text-xs">{profile.websiteUrl}</span>
          </div>
          <div className="text-right col-span-4">
            <span className="block">A small generated summary that I will add later which can be relatively long making it very lengthy and break lines at least thrice.</span>
          </div>
        </div>

        <h2 className="mt-8 pb-2 text-sm text-slate-600 uppercase tracking-wider">Work Experience</h2>
        {workExperiences.map((workExperience) => (
          <div key={workExperience.id} className="grid grid-cols-4 mt-2 [&>*]:pb-6">
            <div className="col-span-1">
              {workExperienceTimespan(workExperience)}
            </div>
            <div className="col-span-3">
              <strong className="block mb-2">{workExperience.title} at {workExperience.companyName}</strong>
              <ul className="list-disc [&>li]:ml-4 [&>li]:pb-2">
                <li>Prevented Customer Service operating expenses doubling every year through investments in self-service, AI and automation. If not addressed, the increase in cost would be $XXXM per year. At the end of my tenure 2% of visits to spotify.com/account and support.spotify.com led to a contact and ~65% of contacts were resolved before reaching a support agent with customer satisfaction 85%.</li>
                <li>Led the consolidation of 3 bespoke support systems owned by different verticals (Music, Podcasts & Audiobooks) into two new platform products. This consolidation effort also reduced the average time to enable customer support for new verticals from 3+ months to 2 weeks.</li>
                <li>Systematically addressed organisational challenges, making my team's employee satisfaction score go from 8 points below average (40th percentile) to 11 points above the average (95th percentile).</li>
                <li>Partnered with Talent Acquisition in creating new processes for the parent org (~450 people) that streamlined engineering hiring pipelines. The changes made us hire 6x faster – we hired 47 engineers and engineering managers in 3 months at peak time.</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
