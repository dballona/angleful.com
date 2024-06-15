import { GOOGLE_ANALYTICS_ID } from '@/lib/analytics';
import Script from 'next/script';

export default function GoogleAnalyticsScript() {
  if (process.env.NODE_ENV !== 'production') {
    return <></>;
  }

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js? 
        id=${GOOGLE_ANALYTICS_ID}`}
      ></Script>
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `,
        }}
      ></Script>
    </>
  );
}
