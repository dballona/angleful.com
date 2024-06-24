import { Question, WorkExperience } from "@/db/types/generated";

/**
 * Manually added types for extending generated files.
 */
export enum ObjectStorageFileTableName {

}

export type Country = {
  isoCode: string,
  name: string,
  flag: string
}

export type WorkExperienceWithQuestions = WorkExperience & {
  questions: Question[]
};
