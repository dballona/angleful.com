'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';

import AlertContext from '@/providers/alert';
import FormItem from '@/components/form-item';
import FormAction from '@/components/form-action';
import { usePathNamespace } from '@/hooks/routes';
import { useForm } from '@/hooks/form';
import { Profile, Country } from '@/db/types';
import PhoneInput from '@/components/phone-input';
import { ProfileParams } from '@/models/profile';
import CountrySelect from './country-select';

export default function ProfileForm({
  profile = {} as Partial<Profile>,
  countries,
}: {
  profile?: Partial<Profile>;
  countries: Country[];
}) {
  const alert = useContext(AlertContext);

  const url = '/api/profile';
  const [method, verb] = profile?.id
    ? ['PUT', 'updated']
    : ['POST', 'created'];

  const { validationErrors, isSubmittingForm, onSubmit } =
    useForm<ProfileParams>({
      url,
      method,
      onSuccess: async response => {
        const { profile } = await response.json();
        alert.success(`Successfully ${verb} profile.`);
      },
    });

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <div className="grid grid-cols-6 gap-x-4">
          <div className="col-span-3">
            <FormItem
              id="firstName"
              label="First Name"
              errors={validationErrors.firstName}
            >
              <input
                id="firstName"
                name="firstName"
                type="text"
                defaultValue={profile.firstName}
              />
            </FormItem>
          </div>

          <div className="col-span-3">
            <FormItem
              id="lastName"
              label="Last Name"
              errors={validationErrors.lastName}
            >
              <input
                id="lastName"
                name="lastName"
                type="text"
                defaultValue={profile.lastName}
              />
            </FormItem>
          </div>

          <div className="col-span-3">
            <FormItem
              id="city"
              label="City"
              errors={validationErrors.city}
            >
              <input
                id="city"
                name="city"
                type="text"
                defaultValue={profile.city}
              />
            </FormItem>
          </div>

          <div className="col-span-3">
            <FormItem
              id="country"
              label="Country"
              errors={validationErrors.country}
            >
              <CountrySelect
                id="country"
                name="country"
                countries={countries}
                defaultValue={profile.country}
              />
            </FormItem>
          </div>

          <div className="col-span-2">
            <FormItem
              id="contactEmail"
              label="Contact Email"
              errors={validationErrors.contactEmail}
            >
              <input
                id="contactEmail"
                name="contactEmail"
                type="text"
                defaultValue={profile.contactEmail}
              />
            </FormItem>
          </div>

          <div className="col-span-2">
            <FormItem
              id="contactPhone"
              label="Contact Phone"
              errors={validationErrors.contactPhone}
            >
              <PhoneInput
                id="contactPhone"
                name="contactPhone"
                defaultValue={profile.contactPhone ?? undefined}
              />
            </FormItem>
          </div>

          <div className="col-span-2">
            <FormItem
              id="websiteUrl"
              label="Website URL"
              errors={validationErrors.websiteUrl}
            >
              <input
                id="websiteUrl"
                name="websiteUrl"
                type="text"
                defaultValue={profile.websiteUrl ?? undefined}
              />
            </FormItem>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-12 col-lg-12">
            <FormAction
              disabled={isSubmittingForm}
              label={`${profile.id ? 'Update' : 'Create'} basic information`}
            />
          </div>
        </div>
      </form >
    </>
  );
}
