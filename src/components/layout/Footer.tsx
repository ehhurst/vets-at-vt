"use client";

import FooterNavBar from "../nav/FooterNavBar";
import { IconLink } from "../../utils/IconLinkUtil";

import { FaFacebook, FaRegCalendarAlt, FaInstagram, FaLinkedin } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";
import { IoIosMail } from "react-icons/io";
import { MdCopyright } from "react-icons/md";
import { BiWorld } from "react-icons/bi";



export default function Footer() {
  return (
    <footer className="w-full bg-[#14171a] text-white/90 shadow-md px-4 py-6 sm:px-6 lg:px-10 2xl:px-16">
        {/*start top row */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-4 md:flex-row items-center md:justify-between">
            {/* footer nav links */}
            <FooterNavBar />

            {/* icons */}
            <div className="flex flex-wrap items-center gap-2 md:justify-end">
                {/* calendar icon link */}
                <IconLink
                    href="/calendar"
                    label="Calendar (Requires Login)"
                    icon={<FaRegCalendarAlt size={30} className="inline" />}
                />

                {/* facebook icon link */}  
                <IconLink
                    href="https://www.facebook.com/groups/126507457397200"
                    label="Facebook"
                    icon={<FaFacebook size={30} className="inline" />}
                    openInNewTab
                />

                {/* instagram icon link */}
                <IconLink
                    href="https://www.instagram.com/veterans_at_virginiatech/"
                    label="Instagram"
                    icon={<FaInstagram size={30} className="inline" />}
                    openInNewTab
                />

                {/* linkedin icon link */}
                <IconLink
                    href="https://www.linkedin.com/company/veterans-virginiatech/"
                    label="LinkedIn"
                    icon={<FaLinkedin size={30} className="inline" />}
                    openInNewTab
                />

                {/* official vt website link */}
                <IconLink
                    href="https://www.veterans.vt.edu/students/veteransatvt.html"
                    label="Virginia Tech Official Veterans at VT Website"
                    icon={<BiWorld size={30} className="inline" />}
                    openInNewTab
                />
            </div>
        </div> {/*end top row */}


        {/*start bottom row */}
        <div className="pt-4">

            <div className="flex flex-col gap-3 md:flex-row items-center md:justify-between">
                {/* location and contact info*/}
                <address className="not-italic text-sm text-white/90">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                        <span className="inline-flex items-center gap-2">
                            <GrLocationPin aria-hidden="true" size={18} />
                            <span>Blacksburg, VA</span>
                        </span>

                        <span className="hidden text-white/35 sm:inline">|</span>

                        <span className="inline-flex items-center gap-2">
                            <IoIosMail aria-hidden="true" size={18} />
                            <a
                                href="mailto:veteran@vt.edu"
                                className="text-white/90 underline-offset-2 hover:text-vt-impactOrange hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-impactOrange focus-visible:ring-offset-2"
                                >
                                veteran@vt.edu
                                </a>
                        </span>
                    </div>
                </address>

                {/* copyright info */}
                <p className="flex items-center gap-2 text-sm text-white/90 md:justify-end">
                    <MdCopyright aria-hidden="true" size={18} /><span>Veterans@VT {new Date().getFullYear()}</span>
                </p>
            </div>
            
        </div> {/*end bottom row */}

    </footer>
  );
}
