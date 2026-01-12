"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "../../types/NavLinks";
import { getLinkClasses } from "../../utils/NavUtils";

export default function MobileNavBar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const linkClasses = (href: string) => getLinkClasses(pathname, href);

    return (
        <div className="relative md:hidden">
            {/*Hamburger menu button*/}
            <button onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-label="Open navigation menu"
                aria-expanded={isOpen}>

                    <span className="sr-only">Open menu</span>
                    <div className="space-y-1">
                        <span className="block h-0.5 w-6 bg-gray-800"></span>
                        <span className="block h-0.5 w-6 bg-gray-800"></span>
                        <span className="block h-0.5 w-6 bg-gray-800"></span>
                    </div>
            </button>

            {/*Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black/40"
                    onClick={() => setIsOpen(false)}></div>
            )}
        {/* Slide-over menu (links only) */}
            <aside
                className={`fixed right-0 top-0 z-50 h-full w-72 bg-white shadow-lg transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "translate-x-full"
                }`}
                aria-hidden={!isOpen}
            >
                <div className="flex items-center justify-between border-b px-4 py-4">
                <span className="text-sm font-semibold text-gray-700">Menu</span>
                <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close navigation menu"
                    className="rounded-md p-2 hover:bg-gray-100"
                >
                    ✕
                </button>
                </div>

                <nav className="flex flex-col gap-2 px-4 py-6">
                {navLinks.map(({ href, label }) => (
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
                <Link className="bg-vt-impactOrange text-white p-4 rounded-md hover:bg-vt-maroon" href="/calendar">Calendar (Requires Login)</Link>
            </aside> 
        </div>
        );
}