"use client";

import {navLinks} from "../../types/NavLinks";
import { getLinkClasses } from "../../utils/NavUtils";
import Link from "next/link";
import { usePathname } from "next/navigation";



export default function NavBar() {
    const path = usePathname();

    return(
        <nav aria-label="Desktop navigation" className="justify-end flex-1 p-3 hidden md:flex">
            <ul className="flex list-none space-x-4 flex-wrap">
                {/* navigation links */ }
                {navLinks.map(({ href, label }) => (
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
                    <div className="border-l border-gray-400 h-8"></div>
                </li>
                {/* calendar link button */ }
                <li>
                    <Link className="bg-vt-impactOrange text-white p-4 rounded-md hover:bg-vt-maroon" href="/calendar">Calendar (Requires Login)</Link>
                </li>
            </ul>
        </nav>
    );
}
