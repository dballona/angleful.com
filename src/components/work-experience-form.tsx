'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import AlertContext from '@/providers/alert';
import FormItem from '@/components/form-item';
import FormAction from '@/components/form-action';
import { usePathNamespace } from '@/hooks/routes';
import { useForm } from '@/hooks/form';
import { WorkExperience, Country } from '@/db/types';
import { WorkExperienceParams } from '@/models/work-experience';
import YearSelect from './year-select';
import MonthSelect from './month-select';
import Table from '@/components/table';
import Button from './button';
import { Icon } from './icon';
import Modal from './modal';

export default function WorkExperienceForm({
  workExperiences,
  countries,
}: {
  workExperiences: WorkExperience[];
  countries: Country[];
}) {
  const router = useRouter();
  const alert = useContext(AlertContext);
  const pathNamespace = usePathNamespace();

  const [workExperience, setWorkExperience] = useState<WorkExperience>({} as WorkExperience);
  const [url, setUrl] = useState<string>("/api/work-experiences");
  const [method, setMethod] = useState<"POST" | "PUT">("POST");
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    setUrl(workExperience.id ? `/api/work-experiences/${workExperience.id}` : "/api/work-experiences");
    setMethod(workExperience.id ? "PUT" : "POST")
  }, [workExperience])

  const { validationErrors, isSubmittingForm, onSubmit } =
    useForm<WorkExperienceParams>({
      url,
      method,
      onSuccess: async response => {
        const workExperience = await response.json();
        alert.success(`Successfully created work experience.`);
        setShowModal(false);
        router.refresh();
      },
    });

  return (
    <>
      <Table className="mb-4">
        <thead>
          <tr>
            <th>Role</th>
            <th>Date</th>
            <th>Location</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {workExperiences.map((workExperience) => (
            <tr key={workExperience.id}>
              <td>
                {workExperience.title} at {workExperience.companyName}
              </td>
              <td>
                {workExperience.startMonth}/{workExperience.startYear} - {workExperience.endMonth}/{workExperience.endYear}
              </td>
              <td>
                {workExperience.city}, {workExperience.country}
              </td>
              <td className="text-right">
                <Button
                  className=""
                  size="sm"
                  onClick={() => {
                    setWorkExperience(workExperience)
                    setShowModal(true)
                  }}
                >
                  <Icon name="edit" style={{ width: '.835rem', top: -1 }} /> Edit
                </Button>

                <Button
                  className="ml-2"
                  size="sm"
                  onClick={() => null}
                >
                  <Icon name="delete" style={{ width: '.835rem', top: -1 }} /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button
        className="mb-4"
        onClick={() => {
          setWorkExperience({} as WorkExperience)
          setShowModal(true)
        }}
      >
        Add a new experience
      </Button>

      {showModal && (
        <Modal
          title={workExperience.id ? `Editing Work Experience` : 'Adding Work Experience'}
          width={800}
          closeModal={() => {
            setShowModal(false)
          }}
        >
          <form className="form" onSubmit={onSubmit}>
            <div className="grid grid-cols-6 gap-x-4">
              <div className="col-span-3">
                <FormItem
                  id="title"
                  label="Title"
                  errors={validationErrors.title}
                >
                  <input
                    id="title"
                    name="title"
                    type="text"
                    defaultValue={workExperience.title}
                  />
                </FormItem>
              </div>

              <div className="col-span-3">
                <FormItem
                  id="companyName"
                  label="Company Name"
                  errors={validationErrors.companyName}
                >
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    defaultValue={workExperience.companyName}
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
                    defaultValue={workExperience.city}
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
                    defaultValue={workExperience.country || 'US'}
                  >
                    {countries.map(country => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </FormItem>
              </div>

              <div className="col-span-1">
                <FormItem
                  id="startMonth"
                  label="Start Month"
                  errors={validationErrors.startMonth}
                >
                  <MonthSelect
                    id="startMonth"
                    name="startMonth"
                    defaultValue={workExperience.startMonth ?? undefined}
                  />
                </FormItem>
              </div>

              <div className="col-span-2">
                <FormItem
                  id="startYear"
                  label="Start Year"
                  errors={validationErrors.startYear}
                >
                  <YearSelect
                    id="startYear"
                    name="startYear"
                    defaultValue={workExperience.startYear}
                  />
                </FormItem>
              </div>

              <div className="col-span-1">
                <FormItem
                  id="endMonth"
                  label="End Month"
                  errors={validationErrors.endMonth}
                >
                  <MonthSelect
                    id="endMonth"
                    name="endMonth"
                    defaultValue={workExperience.endMonth ?? undefined}
                  />
                </FormItem>
              </div>

              <div className="col-span-2">
                <FormItem
                  id="endYear"
                  label="End Year"
                  errors={validationErrors.endYear}
                >
                  <YearSelect
                    id="endYear"
                    name="endYear"
                    defaultValue={workExperience.endYear ?? undefined}
                  />
                </FormItem>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-12 col-lg-12">
                <FormAction
                  disabled={isSubmittingForm}
                  label="Save Work Experience"
                />
              </div>
            </div>
          </form >
        </Modal>
      )}
    </>
  );
}
