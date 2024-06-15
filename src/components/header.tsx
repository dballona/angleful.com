import AccountSignOutButton from '@/components/account-sign-out-button';

import { getCurrentAccount } from '@/lib/auth';
import Alert from '@/components/alert';
import Link from 'next/link';
import Image from 'next/image';

export default async function Header() {
  const currentAccount = await getCurrentAccount();

  if (!currentAccount) {
    return (
      <>
        <Link
          href="/"
          className="block my-8 text-center"
        >
          <Image src="/assets/logo.svg" width={180} height={80} style={{ margin: '0 auto' }} alt="Logo" />
        </Link>

        <div className="mb-8 text-center">
          <Alert />
        </div>
      </>
    );
  }

  return (
    <header className="w-full pt-8">
      <div className="container">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-4">
            <Alert />
          </div>

          <div className="col-span-2">
            <nav className="text-right">
              <ul className="list-none [&>li]:inline-block [&>li]:ml-4">
                <li>
                  <Link href="/">Help & Support</Link>
                </li>
                <li>
                  <AccountSignOutButton />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
