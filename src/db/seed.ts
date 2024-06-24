import { createQuestion, QuestionParams } from "@/models/question";
import { CareerPath, QuestionableType } from "@/db/types";

const managerWorkExperienceParams = {
  questionableType: QuestionableType.WorkExperience,
  careerPath: CareerPath.Manager,
}

const workExperienceManagerQuestions: QuestionParams[] = [
  {
    ...managerWorkExperienceParams,
    question: `Tell us about a time where you had a positive impact on something that mattered for the business.`,
    hint: `Bla bla ble ble`
  },
  {
    ...managerWorkExperienceParams,
    question: `Tell us about a time where you had strong impact on engineering craft.`,
    hint: `Bla bla ble ble`
  },
  {
    ...managerWorkExperienceParams,
    question: `Tell us about a time where you collaborated with others to deliver a goal.`,
    hint: `Bla bla ble ble`
  },
  {
    ...managerWorkExperienceParams,
    question: `Tell us about a time where you set the direction for an ambiguous initiative.`,
    hint: `Bla bla ble ble`
  },
  {
    ...managerWorkExperienceParams,
    question: `Tell us about a time where you helped grow others.`,
    hint: `Bla bla ble ble`
  }
]

export function seedQuestions() {
  workExperienceManagerQuestions.map(async (params) => await createQuestion(params))
}
