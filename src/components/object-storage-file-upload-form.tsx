'use client';

import { ObjectStorageFileUploadParams } from '@/contracts/object-storage-file';
import { ObjectStorageFile } from '@/db/types';
import { useForm } from '@/hooks/form';
import {
  ChangeEvent,
  DragEvent,
  createRef,
  useContext,
  useEffect,
  useState,
} from 'react';
import FormItem from '@/components/form-item';
import { useRouter } from 'next/navigation';
import AlertContext from '@/providers/alert';

function getFileSize(bytes: number) {
  const decimalPlaces = 2;
  const threshold = 1000;

  if (Math.abs(bytes) < threshold) {
    return bytes + ' B';
  }

  const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let u = -1;
  const r = 10 ** decimalPlaces;

  do {
    bytes /= threshold;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= threshold &&
    u < units.length - 1
  );

  return bytes.toFixed(decimalPlaces) + ' ' + units[u];
}

export default function ObjectStorageFileUploadForm({
  recordId,
  recordTableName,
  kind,
  uploadedFiles,
  label,
  onSuccess,
}: {
  recordId: string;
  recordTableName: string;
  kind?: string;
  uploadedFiles: ObjectStorageFile[];
  label?: string;
  onSuccess?: (objectStorageFile: ObjectStorageFile) => void;
}) {
  const router = useRouter();
  const alert = useContext(AlertContext);

  const formRef = createRef<HTMLFormElement>();

  const [dragActive, setDragActive] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [promptText, setPromptText] = useState(
    'Click here or drag and drop files to upload.',
  );

  function handleDrag(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }

  // triggers when file is dropped
  function handleDrop(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      handleFile(e.dataTransfer.files[0]);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // at least one file has been selected so do something
      handleFile(e.target.files[0]);
    }
  }

  function handleFile(file: File) {
    setPromptText(`Selected file: ${file.name}`);
    setFile(file);
  }

  useEffect(() => {
    file && formRef.current!.requestSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const { validationErrors, isSubmittingForm, onSubmit } =
    useForm<ObjectStorageFileUploadParams>({
      url: `/api/object-storage-files`,
      method: 'POST',
      beforeSubmit: formData => {
        formData.set('file', file!);
        return formData;
      },
      onSuccess: async response => {
        const { objectStorageFile } = await response.json();
        alert.success(`Successfully uploaded file ${objectStorageFile.name}.`);
        router.refresh();
        onSuccess && onSuccess(objectStorageFile as ObjectStorageFile);
      },
    });

  const labelClassNames = ['file-input__label'];
  if (dragActive) labelClassNames.push('file-input__label--active');
  if (isSubmittingForm) labelClassNames.push('file-input__label--uploading');

  const fileInputId = `file-${crypto.randomUUID()}`;

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit}>
      <div className="file-input" onDragEnter={handleDrag}>
        <input
          type="hidden"
          name="recordTableName"
          defaultValue={recordTableName}
        />
        <input type="hidden" name="recordId" defaultValue={recordId} />
        <input type="hidden" name="kind" value={kind} />

        <FormItem
          id={fileInputId}
          label={label}
          errors={validationErrors.file}
        >
          <input
            id={fileInputId}
            name="file"
            type="file"
            onChange={handleChange}
          />

          <label htmlFor={fileInputId} className={labelClassNames.join(' ')}>
            {isSubmittingForm
              ? 'Uploading your file, please wait'
              : dragActive
                ? "Drop the file once you're ready to upload."
                : promptText}
          </label>

          {dragActive && (
            <div
              className="file-input__overlay"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            />
          )}
        </FormItem>

        {uploadedFiles && (
          <ul className="file-input__uploaded-files">
            {uploadedFiles.map(file => (
              <li key={file.id}>
                <a
                  href={`/api/object-storage-files/${file.id}`}
                  target="_blank"
                >
                  {file.name} ({getFileSize(file.sizeInBytes)})
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
