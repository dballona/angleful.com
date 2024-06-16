import {
  ApplicationError,
  withErrorHandling,
} from '@/app/api/_shared/error-handling';
import { getLinkedInAccessToken } from '@/lib/linkedin';
import { NextRequest } from 'next/server';

interface Params {
  code: string,
  state: string
}

export const GET = withErrorHandling(async (req: NextRequest) => {
  const params = {
    code: req.nextUrl.searchParams.get('code') as string,
    state: req.nextUrl.searchParams.get('state') as string,
  };

  const { code } = await getValidatedParams(params);
  const { accessToken, expiresAt } = await getLinkedInAccessToken(code)

  // { "accessToken":,"expiresAt":5183999}

  return Response.json({ accessToken, expiresAt }, { status: 200 });
});

async function getValidatedParams(
  params: Params
): Promise<Omit<Params, 'state'>> {
  const isValidRequest = decodeURI(params.state) === process.env.LINKEDIN_STATE;

  if (isValidRequest) {
    return { code: params.code }
  } else {
    throw new ApplicationError({
      fieldErrors: {},
      formErrors: ["Something went wrong"],
      status: 400,
    });
  }
}
