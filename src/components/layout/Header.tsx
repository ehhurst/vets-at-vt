import Image from "next/image";
import NavBar from "@/components/nav/NavBar";
import Link from "next/link";
import { getActiveAdminName } from "@/lib/admin-auth/server";
import { hasActiveMemberSession } from "@/lib/member-auth/server";


export default async function Header() {
    const hasMemberSession = await hasActiveMemberSession();
    const adminName = await getActiveAdminName();

    return(
        <header className="w-full flex items-center justify-between px-8 shadow-md bg-white dark:bg-[#14171a] text-black dark:text-white">
            {/* Logo and site title- title is hidden for mobile, both link to homepage */}
            <Link href="/" className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                    <Image
                        src="/veteransvtlogo.png"
                        alt="Veterans at Virginia Tech logo"
                        width={75}
                        height={15}
                        priority
                    />
                    <h1 className="hidden md:block text-black dark:text-white font-[var(--font-vt-extrabold)] text-3xl font-bold">
                        Veterans@VT
                    </h1>
                </div>
            </Link>

            <NavBar hasMemberSession={hasMemberSession} adminName={adminName}/> {/* Includes both desktop and mobile navbars and auto-adjusts based on screen size */}
          
        </header>
    );
}
