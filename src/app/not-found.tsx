import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <div className="mt-6">
        You can <Link href="/">go back to home</Link>.
      </div>
    </>
  );
}
