"use client";

import { navLinks } from "@/types/NavLinks";
import { getLinkClasses } from "@/utils/NavUtils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar({
    hasMemberSession,
    adminName,
}: {
    hasMemberSession: boolean;
    adminName: string | null;
}) {
    const path = usePathname();
    const links = [
        ...navLinks,
        ...(hasMemberSession || adminName ? [{ href: "/members/calendar", label: "Member Calendar" }] : []),
        ...(adminName ? [{ href: "/admin/dashboard", label: "Admin Dashboard" }] : []),
    ];

    return(
        <nav aria-label="Desktop navigation" className="justify-end flex-1 p-3 hidden md:flex">
            <ul className="flex list-none space-x-4 flex-wrap">
                {/* navigation links */ }
                {links.map(({ href, label }) => (
                    <li key={href}>
                        <Link
                            href={href}
                            className={getLinkClasses(path, href)}
                            aria-current={path === href ? "page" : undefined}
                        >
                            {label}
                        </Link>
                    </li>
                ))}

                {/* vertical divider */ }
                <li> 
                    <div className="border-l border-black/20 dark:border-white/20 h-8"></div>
                </li>
                <li>
                    {adminName ? (
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-semibold text-black/85 dark:text-white/85">
                                {`Welcome, ${adminName}!`}
                            </span>
                            <a
                                className="mt-2 inline-flex min-w-full items-center justify-center rounded-md bg-vt-impactOrange px-4 py-2 text-sm font-semibold text-white ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg dark:bg-vt-maroon"
                                href="/api/admin-logout?next=/"
                            >
                                Logout
                            </a>
                        </div>
                    ) : hasMemberSession ? (
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-semibold text-black/85 dark:text-white/85">
                                Welcome, member!
                            </span>
                            <a
                                className="mt-2 inline-flex min-w-full items-center justify-center rounded-md bg-vt-impactOrange px-4 py-2 text-sm font-semibold text-white ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg dark:bg-vt-maroon"
                                href="/api/member-logout?next=/"
                            >
                                Logout
                            </a>
                        </div>
                    ) : (
                        <Link
                            className="bg-vt-impactOrange text-white p-4 rounded-md ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg dark:bg-vt-maroon"
                            href="/member-login"
                        >
                            Member Login
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
}
