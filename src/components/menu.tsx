import Link from 'next/link';

import { getCurrentAccount } from '@/lib/auth';
import Image from 'next/image';
import Badge from '@/components/badge';
import { AccountRole } from '@/db/types';

async function LinksForAccount() {

  return (
    <>
      <li><Link href="/account">Home</Link></li>
    </>
  );
}

async function LinksForAdmin() {
  return (
    <>
      <li><Link href="/admin">Home</Link></li>
    </>
  );
}

export default async function Menu() {
  const currentAccount = await getCurrentAccount();
  if (!currentAccount) return <></>;

  const isAdmin = currentAccount!.role === AccountRole.Admin;
  const isAccount = currentAccount!.role === AccountRole.Account;

  return (
    <aside className="w-[var(--menu-width)] min-h-screen items-stretch bg-opaque border-r border-solid border-opaque">
      <div className="mt-8 px-8 pb-4">
        <Link href="/">
          <Image src="/assets/logo.svg" width={135} height={45} alt="Logo" />
        </Link>
        {isAdmin && <Badge color="red">Admin</Badge>}
      </div>
      <nav className="px-8">
        <ul>
          {isAccount && <LinksForAccount />}
          {isAdmin && <LinksForAdmin />}
        </ul>
      </nav>
    </aside>
  );
}
