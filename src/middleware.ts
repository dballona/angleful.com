import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { AccountRole } from '@/db/types';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // If user is not authenticated but trying to access sign-up / sign-in or password-reset
  if (!token && isPublicPathname(pathname)) {
    return NextResponse.next();
  }

  if (!token) return NextResponse.redirect(new URL('/sign-in', request.url));

  // Check the role and redirect based on the role
  switch (token.role as AccountRole) {
    case AccountRole.Account:
      if (!pathname.startsWith('/account')) {
        return NextResponse.redirect(new URL('/account', request.url));
      }
      break;
    case AccountRole.Admin:
      if (!pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      break;
    default:
      return NextResponse.redirect(new URL('/sign-in', request.url));
  }
}

function isPublicPathname(pathname: string) {
  return (
    pathname.startsWith('/sign-up') ||
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/password-reset')
  );
}

export const config = {
  matcher: [
    // Match all routes except the ones that start with:
    // /api, /assets, /storage and /static
    '/((?!api|_next/static|_next/images|favicon.ico|assets).*)',
  ],
};
