import '@/styles/index.css';
import '@/styles/vendor.css';

import { Providers } from '@/providers';
import Header from '@/components/header';
import { ReactNode } from 'react';
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
          <div className="flex">
            <Menu />
            <Main>
              <Header />

              <div className="container">{children}</div>
            </Main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
