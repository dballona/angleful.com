import Box from '@/components/box';
import Form from '@/components/form';
import FormItem from '@/components/form-item';
import PageContent from '@/components/page-content';
import PageTitle from '@/components/page-title';
import { getCurrentAccount } from '@/lib/auth';
import { getWorkExperiencesWithQuestionsByAccountId } from '@/models/work-experience';

export const dynamic = 'force-dynamic';

export default async function AccountResumePage() {
  const currentAccount = await getCurrentAccount();
  if (!currentAccount) return <></>;

  const workExperiencesWithQuestions = await getWorkExperiencesWithQuestionsByAccountId(currentAccount!.id);

  return (
    <>
      <PageTitle
        title="Questionnaire"
        subtitle={`Answer a few questions about your experiences`}
      />

      <PageContent>
        {workExperiencesWithQuestions.map((workExperienceWithQuestions) => (
          <div className="mb-12">
            <Box title={`${workExperienceWithQuestions.title} at ${workExperienceWithQuestions.companyName}`}>
              {workExperienceWithQuestions.questions.map((question) => (
                <Form className="mt-4">
                  <FormItem id={question.id} label={question.question}>
                    <p className="mb-2">{question.hint}</p>
                    <textarea rows={4}></textarea>
                  </FormItem>
                </Form>
              ))}
            </Box>
          </div>
        ))}
      </PageContent>
    </>
  )
}
