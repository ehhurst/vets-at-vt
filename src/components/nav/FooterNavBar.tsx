"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {navLinks} from "../../types/NavLinks";
import { getLinkClasses } from "../../utils/NavUtils";


export default function FooterNavBar() {
  const path = usePathname();

  return (
    <nav aria-label="Footer navigation" className="hidden flex-1 md:block">
      <ul className="flex flex-wrap gap-2">
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
      </ul>
    </nav>
  );
}
