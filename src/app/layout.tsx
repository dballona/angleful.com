import '@/styles/index.css';
import '@/styles/vendor.css';

import { Providers } from '@/providers';
import { ReactNode } from 'react';
import Main from '@/components/main';
import Menu from '@/components/menu';
import GoogleAnalyticsScript from '@/components/google-analytics-script';
import Alert from '@/components/alert';

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
      <body>
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
