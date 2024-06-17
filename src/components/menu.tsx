import Link from 'next/link';

import { getCurrentAccount } from '@/lib/auth';
import Logo from '@/components/logo';
import Badge from '@/components/badge';
import AccountSignOutButton from '@/components/account-sign-out-button';
import { AccountRole } from '@/db/types';

async function LinksForAccount() {
  return (
    <>
      <li><Link href="/account/profile">Profile</Link></li>
      <li><Link href="/account/work-experiences">Work Experiences</Link></li>
      <li><Link href="/account/work-experiences">Education</Link></li>
      <li className="mt-4"><Link href="/account/resume">Resume</Link></li>
      <li className="mt-4"><Link href="/">Help & Support</Link></li>
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

  const menuHtmlClasses = [
    "w-[var(--menu-width)] min-h-screen items-stretch",
    "border-r border-solid border-black border-opacity-15 bg-white bg-opacity-30",
    "print:hidden"
  ]

  return (
    <aside className={menuHtmlClasses.join(' ')}>
      <div className="mt-16 px-8 pb-4">
        <Logo width={110} height={60} />
        {isAdmin && <Badge color="red">Admin</Badge>}
      </div>
      <nav className="px-8">
        <ul className="[&>li]:mb-1">
          {isAccount && <LinksForAccount />}
          {isAdmin && <LinksForAdmin />}
          <li className="mt-4">
            <AccountSignOutButton />
          </li>
        </ul>
      </nav>
    </aside>
  );
}
