import { SITE_URL } from "@/lib/constants"

/*
 * See more in https://learn.microsoft.com/en-gb/linkedin/shared/authentication/authorization-code-flow
 */

const LINKEDIN_STATE = process.env.LINKEDIN_STATE as string
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID as string
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET as string
const LINKEDIN_SCOPE = "openid profile email"
const LINKEDIN_API_URL = "https://api.linkedin.com"
const LINKEDIN_REDIRECT_URL = `${SITE_URL}/api/auth/linkedin`

type Params = { [key: string]: string }

function encodeParams(params: Params): string {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
}

function getFullUrl(path: string, params?: Params): string {
  let url = `${LINKEDIN_API_URL}/${path}`;
  if (!params) return url

  const query = encodeParams(params);
  return `${url}?${query}`
}

export function getLinkedInSignInUrl(): string {
  return getFullUrl("oauth/v2/authorization", {
    response_type: "code",
    client_id: LINKEDIN_CLIENT_ID,
    redirect_uri: LINKEDIN_REDIRECT_URL,
    state: LINKEDIN_STATE,
    scope: LINKEDIN_SCOPE
  });
}

type LinkedInAccessToken = {
  accessToken: string,
  expiresAt: Date
}

export async function getLinkedInAccessToken(code: string): Promise<LinkedInAccessToken> {
  const url = getFullUrl("oauth/v2/accessToken")

  return await fetch(url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: encodeParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: LINKEDIN_REDIRECT_URL,
      client_id: LINKEDIN_CLIENT_ID,
      client_secret: LINKEDIN_CLIENT_SECRET
    })
  }).then(async response => {
    if (!response.ok) {
      const body = await response.text();
      throw Error(
        `Failed to fetch LinkedIn access token. \nResponse status was ${response.status} \nResponse body was ${body}`,
      );
    }

    const responseJson = await response.json();

    const accessToken = responseJson.access_token
    const expiresAt = new Date(Date.now() + (responseJson.expires_in * 1000))

    return {
      accessToken,
      expiresAt
    }
  });
}

type LinkedInUserInfo = {
  data: any
}

export async function getLinkedInUserInfo(accessToken: string): Promise<LinkedInUserInfo> {
  const url = getFullUrl("v2/me")

  return await fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${accessToken}`
    })
  }).then(async response => {
    if (!response.ok) {
      const body = await response.text();
      throw Error(
        `Failed to fetch LinkedIn user info. \nResponse status was ${response.status} \nResponse body was ${body}`,
      );
    }

    const responseJson = await response.json();

    return {
      data: responseJson
    }
  });
}
