import AlertContext from '@/providers/alert';
import { useState, FormEvent, useContext, useEffect } from 'react';

export function useForm<T>({
  url,
  method,
  onSuccess,
  beforeSubmit,
  onError,
}: {
  url: string;
  method: string;
  onSuccess: (response: Response) => void;
  beforeSubmit?: (formData: FormData) => FormData;
  onError?: () => void;
}) {
  const alert = useContext(AlertContext);
  const [formData, setFormData] = useState<null | FormData>(null);

  const [validationErrors, setValidationErrors] = useState<{
    [Property in keyof T]?: string[];
  }>({});
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);

  useEffect(() => {
    if (formData === null) return;

    fetch(url, {
      method,
      body: formData,
    })
      .then(async response => {
        if ([200, 201].includes(response.status)) {
          onSuccess(response);
        } else {
          const { error, fieldErrors } = await response.json();
          error
            ? alert.error(error)
            : alert.error('Something went wrong. Please see errors below.');
          setValidationErrors(fieldErrors);
          onError && onError();
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
      })
      .finally(() => {
        setIsSubmittingForm(false);
        setFormData(null);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmittingForm(true);
    setValidationErrors({});

    let formData = new FormData(e.currentTarget);
    if (beforeSubmit) {
      formData = beforeSubmit(formData);
    }

    setFormData(formData);
  }

  return {
    formData,
    validationErrors,
    isSubmittingForm,
    onSubmit,
  };
}
