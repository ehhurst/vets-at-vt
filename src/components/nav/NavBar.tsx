'use client';

import DesktopNavBar from "@/components/nav/DesktopNavBar";
import MobileNavBar from "@/components/nav/MobileNavBar";

export default function NavBar({
    hasMemberSession,
    adminName,
}: {
    hasMemberSession: boolean;
    adminName: string | null;
}) {
    return(
        <>
                <DesktopNavBar hasMemberSession={hasMemberSession} adminName={adminName}/>
                <MobileNavBar hasMemberSession={hasMemberSession} adminName={adminName}/>
        </>
    );
}
