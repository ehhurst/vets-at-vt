import { Officer } from "@/src/types/Officer";
import Image from "next/image";
import { FaPlusCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function OfficerCard(officer: Officer) {
    return (
        <article className="w-full overflow-hidden rounded-lg bg-[#1a1e22] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className='h-2 bg-vt-impactOrange'/>

            {/* Top container: headshot, name, role, email */}
            <section className="flex gap-4 p-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-white/10">
                    <Image
                        src={officer.headshot_href}
                        alt={`${officer.name} Veterans at VT ${officer.role}`}
                        fill
                        className='object-cover'
                        sizes='80px'
                        priority
                    />
                </div>

                <div className="min-w-0 flex-1 border-b border-white/10 pb-3">
                    <h3 className="truncate text-base font-vt-extrabold text-white/95 sm:text-lg">{officer.name}</h3>
                    <p className="truncate text-sm text-white/70">{officer.role}</p>
   
                    <a
                        href={`mailto:${officer.email}`}
                        className="mt-2 inline-flex items-center gap-2 break-all text-sm text-white/75 hover:text-vt-impactOrange">
                        <MdEmail className="text-vt-burntOrange hover:text-vt-impactOrange"/> 
                        {officer.email}
                    </a>
                </div>
            </section>

            {/* Description container */}
            <section className='px-4 pb-4'>
                <p className="text-sm leading-relaxed text-white/75 sm:text-base">{officer.description}</p>

            </section>
            
            {/*Brnach section - Conditionally rendered section if officer has a branch */}
            {officer.branch ? 
                <section className="bg-[#20252a] px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-white/80">
                        <FaPlusCircle className="shrink-0 text-vt-impactOrange"/> 
                        <span className="wrap-break-word">{officer.branch}</span>
                    </div>
                    
                </section> : 
                <></>
            }
        </article>
    );
}
