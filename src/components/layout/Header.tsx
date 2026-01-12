'use client';
import Image from "next/image";
import NavBar from "../nav/NavBar";
import Link from "next/link";

export default function Header() {
    return(
        <div className="height-13 flex items-center px-8 bg-white dark:bg-black text-white">
            <Link href="/" className="flex items-center gap-4">
            <div className="flex items-center gap-4">
                <Image
                src="/veteransvtlogo.png"
                alt="Veterans at Virginia Tech logo"
                width={75}
                height={15}
                priority
                />
                <h1 className="text-vt-maroon font-vt-extrabold text-3xl font-bold">Veterans@VT</h1>
            </div>
            </Link>
            <NavBar />
            <button className="bg-vt-impactOrange p-3 rounded-md" onClick={() => alert('Hello, World!')}>Calendar (Requires Login)</button>

            

        </div>
    );
}