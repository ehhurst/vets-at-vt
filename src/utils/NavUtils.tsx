export function getLinkClasses(pathname: string, href: string) {
    return pathname === href ? 
    'text-vt-impactOrange p-5 font-extrabold border-b-4 border-vt-impactOrange' : 
    'text-black/90 dark:text-white/90 p-3 hover:text-vt-impactOrange font-bold';
}
