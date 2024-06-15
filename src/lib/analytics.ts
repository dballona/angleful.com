export const HOTJAR_ID = '4947333';
export const GOOGLE_ANALYTICS_ID = '';

export function logPageview(url: string) {
  (<any>window).gtag('config', 'TRACKING-ID', {
    page_path: url,
  });
}
