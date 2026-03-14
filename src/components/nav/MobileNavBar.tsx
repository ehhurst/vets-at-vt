"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/types/NavLinks";
import { getLinkClasses } from "@/utils/NavUtils";

export default function MobileNavBar({
    hasMemberSession,
    adminName,
}: {
    hasMemberSession: boolean;
    adminName: string | null;
}) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const linkClasses = (href: string) => getLinkClasses(pathname, href);
    const links = [
      ...navLinks,
      ...(hasMemberSession || adminName ? [{ href: "/members/calendar", label: "Member Calendar" }] : []),
      ...(adminName ? [{ href: "/admin/dashboard", label: "Admin Dashboard" }] : []),
    ];

    return (
        <div className="relative md:hidden">
            {/*Hamburger menu button*/}
            <button onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center rounded-md p-2 text-black/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-vt-impactOrange"
                aria-label="Open navigation menu"
                aria-expanded={isOpen}>

                    <span className="sr-only">Open menu</span>
                    <div className="space-y-1">
                        <span className="block h-0.5 w-6 bg-black/90 dark:bg-white/90"></span>
                        <span className="block h-0.5 w-6 bg-black/90 dark:bg-white/90"></span>
                        <span className="block h-0.5 w-6 bg-black/90 dark:bg-white/90"></span>
                    </div>
            </button>

            {/*Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black/40"
                    onClick={() => setIsOpen(false)}></div>
            )}
        {/* Slide-over menu (links only) */}
            <aside
                className={`fixed right-0 top-0 z-50 h-full w-72 bg-[#14171a] text-white/90 shadow-lg transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "translate-x-full"
                }`}
                aria-hidden={!isOpen}
            >
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                <span className="text-sm font-semibold text-white/90">Menu</span>
                <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close navigation menu"
                    className="rounded-md p-2 hover:bg-white/10"
                >
                    ✕
                </button>
                </div>

                <nav className="flex flex-col gap-2 px-4 py-6">
                {links.map(({ href, label }) => (
                    <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`rounded-md px-3 py-2 text-base ${linkClasses(href)}`}
                    >
                    {label}
                    </Link>
                ))}
                </nav>
                {adminName ? (
                  <div className="p-4 text-center">
                    <p className="text-sm font-semibold text-white/90">{`Welcome, ${adminName}!`}</p>
                    <a
                      className="mt-3 inline-flex min-w-full items-center justify-center rounded-md bg-vt-impactOrange px-4 py-2 text-sm font-semibold text-white ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg"
                      href="/api/admin-logout?next=/"
                      onClick={() => setIsOpen(false)}
                    >
                      Logout
                    </a>
                  </div>
                ) : hasMemberSession ? (
                  <div className="p-4 text-center">
                    <p className="text-sm font-semibold text-white/90">Welcome, member!</p>
                    <a
                      className="mt-3 inline-flex min-w-full items-center justify-center rounded-md bg-vt-impactOrange px-4 py-2 text-sm font-semibold text-white ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg"
                      href="/api/member-logout?next=/"
                      onClick={() => setIsOpen(false)}
                    >
                      Logout
                    </a>
                  </div>
                ) : (
                  <Link
                    className="bg-vt-impactOrange text-white p-4 rounded-md ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg"
                    href="/member-login"
                    onClick={() => setIsOpen(false)}
                  >
                    Member Login
                  </Link>
                )}
            </aside> 
        </div>
        );
}
