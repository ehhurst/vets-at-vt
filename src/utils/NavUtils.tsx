export function getLinkClasses(pathname: string, href: string) {
    return pathname === href ? 
    'text-vt-maroon p-5 font-bold border-b-5 border-vt-maroon' : 
    'text-gray-600 p-3 hover:text-vt-maroon font-bold';
}