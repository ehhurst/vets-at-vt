'use client';
import Image from "next/image";
import NavBar from "../nav/NavBar";
import Link from "next/link";

export default function Header() {
    return(
        <header className="w-full flex items-center justify-between px-8 shadow-md bg-white dark:bg-black">

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
                    <h1 className="hidden md:block text-vt-maroon font-vt-extrabold text-3xl font-bold">Veterans@VT</h1>
                </div>
            </Link>

            <NavBar/> {/* Includes both desktop and mobile navbars and auto-adjusts based on screen size */}
          
        </header>
    );
}