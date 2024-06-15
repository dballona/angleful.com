'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

import AlertContext from '@/providers/alert';
import Box from '@/components/box';
import FormItem from '@/components/form-item';
import FormAction from '@/components/form-action';
import { usePathNamespace } from '@/hooks/routes';
import { useForm } from '@/hooks/form';
import { Profile, Country } from '@/db/types';
import PhoneInput from '@/components/phone-input';
import { ProfileParams } from '@/models/profile';

export default function ProfileForm({
  profile = {} as Partial<Profile>,
  countries,
}: {
  profile?: Partial<Profile>;
  countries: Country[];
}) {
  const router = useRouter();
  const alert = useContext(AlertContext);
  const pathNamespace = usePathNamespace();

  const [country, setCountry] = useState<Country>(
    getCountryFromIsoCode(profile.country),
  );

  function getCountryFromIsoCode(isoCode: string | undefined): Country {
    if (!isoCode) return countries[0];
    return countries.filter(country => country.isoCode === isoCode)[0];
  }

  const url = '/api/profile';
  const [method, verb] = profile.id
    ? ['PUT', 'updated']
    : ['POST', 'created'];

  const { validationErrors, isSubmittingForm, onSubmit } =
    useForm<ProfileParams>({
      url,
      method,
      onSuccess: async response => {
        const { profile } = await response.json();
        router.push(`/${pathNamespace}/`);
        alert.success(`Successfully ${verb} profile.`);
        router.refresh();
      },
    });

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <Box title="Profile Information">
          <div className="grid grid-cols-6 gap-4">
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
                <select
                  id="country"
                  name="country"
                  defaultValue={profile.country || 'US'}
                >
                  {countries.map(country => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </FormItem>
            </div>

            <div className="col-span-2">
              <FormItem
                id="contactEmail"
                label="contactEmail"
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
                  defaultValue={profile.contactPhone}
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
        </Box>

        <div className="row mt-5">
          <div className="col-12 col-lg-12">
            <FormAction
              disabled={isSubmittingForm}
              label={`${profile.id ? 'Update' : 'Create'} profile`}
            />
          </div>
        </div>
      </form >
    </>
  );
}
