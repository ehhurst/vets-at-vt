import OfficerCard from "@/components/officers/OfficerCard";
import Reveal from "@/components/animations/Reveal";
import { officersList } from "@/types/FakeOfficersData";
import { Officer } from "@/types/Officer";


export default function OfficersPage() {
    const executive_board:Officer[] = officersList.filter((officer:Officer) => officer.role_type == "executive");
    const chairs_list:Officer[] = officersList.filter((officer:Officer) => officer.role_type == "chair");


    return(
    <main className="min-h-content font-[var(--font-vt-normal)] bg-white dark:bg-[#14171a] text-black/90 dark:text-white/90">
        {/*Hero/title section*/}
        <div className="relative h-[220px] sm:h-[280px] md:h-[320px] w-full bg-gradient-to-br from-vt-maroon to-vt-impactOrange">
            <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
                <h1 className="text-4xl font-vt-bold text-white/95">Our Officers</h1>
            
                <p className="mt-3 max-w-2xl text-base text-white/80">
                Meet the dedicated leaders supporting Virginia Tech&apos;s military-connected community. 
                Feel free to reach out with any questions or to get involved in the organization
                </p>

                {/* buttons - column on mobile, row on desktop */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <a href="#executive-board">
                    <button className="w-full rounded-md bg-vt-impactOrange px-5 py-3 text-base font-bold text-white ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg sm:w-auto">
                        Executive Board
                    </button>
                    </a>
                    <a href="#chairs">
                    <button className="w-full rounded-md bg-vt-maroon px-5 py-3 text-base font-bold text-white ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg sm:w-auto">
                        Chairs
                    </button>
                    </a>
                </div>
            </div>
        </div>

        {/*executive board*/}
        <section id="executive-board" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 mt-8 sm:mt-10 mb-10">
            <Reveal>
                <h2 className="text-xl font-vt-extrabold text-black/95 dark:text-white/95 sm:text-2xl">Executive Board</h2>
            </Reveal>
            {/*card grid*/}
            <div className="mt-5 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
                {executive_board ? executive_board.map((officer:Officer, i:number) => 
                    <Reveal key={i} delayMs={80 + i * 60}>
                        <OfficerCard 
                            headshot_href={officer.headshot_href} 
                            name={officer.name} 
                            role={officer.role} 
                            role_type={officer.role_type} 
                            email={officer.email} 
                            description={officer.description} 
                            branch={officer.branch}/>
                    </Reveal>
                    ) : 
                    <></>
                }
            </div>
        </section>

        {/*chairs*/}
        <section id="chairs" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 mt-8 sm:mt-10 mb-10">
            <Reveal>
                <h2 className="text-xl font-vt-extrabold text-black/95 dark:text-white/95 sm:text-2xl">Chairs</h2>
            </Reveal>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
                {chairs_list ? chairs_list.map((officer:Officer, i:number) =>
                <Reveal key={i} delayMs={80 + i * 60}>
                    <OfficerCard 
                        headshot_href={officer.headshot_href} 
                        name={officer.name} 
                        role={officer.role} 
                        role_type={officer.role_type} 
                        email={officer.email}
                        description={officer.description}
                        branch={officer.branch}/>
                </Reveal>
                ): <></>}
            </div>
        </section>
    </main>
        
    ); 
}
