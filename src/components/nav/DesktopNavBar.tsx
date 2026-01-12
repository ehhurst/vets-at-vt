'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const path = usePathname();

    return(
        <nav className='justify-end flex-1 p-3 hidden md:flex'>
            <ul className="flex list-none space-x-4 flex-wrap">
                <li>
                    <Link className={path === '/' ? 'text-vt-maroon p-5 font-bold border-b-5 border-vt-maroon' : 'text-gray-600 p-3 hover:text-vt-maroon font-bold'} href="/">Home</Link>
                </li>
                <li>
                    <Link className={path === '/events' ? 'text-vt-maroon p-5 font-bold border-b-5 border-vt-maroon' : 'text-gray-600 p-3 hover:text-vt-maroon font-bold'} href="/events">Events</Link>
                </li>
                <li>
                    <Link className={path === '/officers' ? 'text-vt-maroon p-5 font-bold border-b-5 border-vt-maroon' : 'text-gray-600 p-3 hover:text-vt-maroon font-bold'} href="/officers">Resources</Link>
                </li>
                <li>
                    <Link className={path === '/contact' ? 'text-vt-maroon p-5 font-bold border-b-5 border-vt-maroon' : 'text-gray-600 p-3 hover:text-vt-maroon font-bold'} href="/contact">Contact</Link>
                </li>
                <li>
                    <Link className="bg-vt-impactOrange text-white p-4 rounded-md hover:bg-vt-maroon" href="/calendar">Calendar (Requires Login)</Link>
                </li>
            </ul>
        </nav>
    );
}