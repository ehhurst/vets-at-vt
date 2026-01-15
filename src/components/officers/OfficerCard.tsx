import { Officer } from "@/src/types/Officer";
import Image from "next/image";
import { FaPlusCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function OfficerCard(officer: Officer) {
    return (
        <article className='w-full rounded-lg shadow-sm bg-white overflow-hidden'>
            <div className='h-2 bg-vt-impactOrange'/>

            {/* Top container: headshot, name, role, email */}
            <section className="flex gap-4 p-4">
                <div className='relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-gray-100'>
                    <Image
                        src={officer.headshot_href}
                        alt={`${officer.name} Veterans at VT ${officer.role}`}
                        fill
                        className='object-cover'
                        sizes='80px'
                        priority
                    />
                </div>

                <div className='min-w-0 flex-1 border-b border-vt-grey pb-3'> {/*grey border*/}
                    <h3 className='text-vt-maroon text-base sm:text-lg font-vt-extrabold leading-snug truncate'>{officer.name}</h3>
                    <p className='text-sm text-vt-hokieStone truncate'>{officer.role}</p>
   
                    <a
                        href={`mailto:${officer.email}`}
                        className='mt-2 inline-flex items-center gap-2 text-sm text-vt-hokieStone hover:text-vt-maroon break-all'>
                        <MdEmail className='text-vt-burntOrange hover:text-vt-maroon'/> 
                        {officer.email}
                    </a>
                </div>
            </section>

            {/* Description container */}
            <section className='px-4 pb-4'>
                <p className='text-sm text-vt-hokieStone leading-relaxed sm:text-base'>{officer.description}</p>

            </section>
            
            {/*Brnach section - Conditionally rendered section if officer has a branch */}
            {officer.branch ? 
                <section className="bg-vt-grey px-4 py-3">
                    <div className='flex items-center gap-2 text-sm'>
                        <FaPlusCircle className="shrink-0"/> 
                        <span className="wrap-break-word">{officer.branch}</span>
                    </div>
                    
                </section> : 
                <></>
            }
        </article>
    );
}