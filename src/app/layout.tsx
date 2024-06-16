import '@/styles/index.css';
import '@/styles/vendor.css';

import { Providers } from '@/providers';
import { ReactNode } from 'react';
import Alert from '@/components/alert';
import Main from '@/components/main';
import Menu from '@/components/menu';
import GoogleAnalyticsScript from '@/components/google-analytics-script';
import { sansFont } from '@/lib/constants';

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalyticsScript />
      </head>
      <body className={sansFont.className}>
        <Providers>
          <Alert />
          <div className="flex">
            <Menu />
            <Main>
              <div className="container">{children}</div>
            </Main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
