import { ObjectStorageFile } from '@/db/types';
// import { Bucket, Storage } from '@google-cloud/storage';
import fs from 'fs';
import path from 'path';

if (!process.env.NODE_ENV) {
  throw new Error('$NODE_ENV not set.');
}

interface IObjectStorage {
  storeFile(
    recordTableName: string,
    recordId: string,
    file: File,
  ): Promise<
    Pick<
      ObjectStorageFile,
      | 'recordId'
      | 'recordTableName'
      | 'name'
      | 'sizeInBytes'
      | 'contentType'
      | 'path'
    >
  >;
  getSignedFileUrl(fullPath: string): Promise<string>;
}

function getFullFilePath(recordTableName: string, recordId: string): string {
  return `${process.env.NODE_ENV}/object-storage-files/${recordTableName}/${recordId}/`;
}

function getSanitizedFileName(name: string): string {
  return [
    new Date().valueOf().toString(),
    name.replace(/[^a-z0-9\.]/gi, '_'),
  ].join('-');
}

class FileStorage implements IObjectStorage {
  constructor() { }

  async storeFile(recordTableName: string, recordId: string, file: File) {
    const fullPath = [
      getFullFilePath(recordTableName, recordId),
      getSanitizedFileName(file.name),
    ].join('');

    const absolutePath = path.join(
      process.cwd(),
      'public',
      'assets',
      'uploads',
      fullPath,
    );
    const absoluteDir = absolutePath.split('/').slice(0, -1).join('/');

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    fs.mkdirSync(absoluteDir, { recursive: true });
    await fs.writeFileSync(absolutePath, buffer);

    return {
      recordId,
      recordTableName,
      name: file.name,
      sizeInBytes: file.size,
      contentType: file.type,
      path: fullPath,
    };
  }

  async getSignedFileUrl(fullPath: string) {
    return [process.env.SITE_URL, 'assets', 'uploads', fullPath].join('/');
  }
}

// class GoogleCloudStorage implements IObjectStorage {
//   storage: Storage;
//   bucket: Bucket;

//   constructor() {
//     if (!process.env.GCP_BUCKET_NAME || !process.env.GCP_PROJECT_ID) {
//       throw new Error('$GCP_BUCKET_NAME or $GCP_PROJECT_ID not set.');
//     }

//     this.storage = new Storage({ projectId: process.env.GCP_PROJECT_ID });
//     this.bucket = this.storage.bucket(process.env.GCP_BUCKET_NAME);
//   }

//   async storeFile(recordTableName: string, recordId: string, file: File) {
//     const fullPath = [
//       getFullFilePath(recordTableName, recordId),
//       getSanitizedFileName(file.name),
//     ].join('');

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     await this.bucket
//       .file(fullPath)
//       .createWriteStream({
//         resumable: false,
//         metadata: { contentType: file.type },
//       })
//       .on('error', err => {
//         throw err;
//       })
//       .on('finish', () => {
//         Promise.resolve();
//       })
//       .end(buffer);

//     return {
//       recordId,
//       recordTableName,
//       name: file.name,
//       sizeInBytes: file.size,
//       contentType: file.type,
//       path: fullPath,
//     };
//   }

//   async getSignedFileUrl(fullPath: string) {
//     const [url] = await this.bucket.file(fullPath).getSignedUrl({
//       version: 'v4',
//       action: 'read',
//       expires: Date.now() + 15 * 60 * 1000,
//     });

//     return url;
//   }
// }

let storage: IObjectStorage;

if (process.env.NODE_ENV === 'production') {
  // storage = new GoogleCloudStorage();
} else {
  storage = new FileStorage();
}

export { storage };
