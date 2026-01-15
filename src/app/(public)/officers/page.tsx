import OfficerCard from "@/src/components/officers/OfficerCard";
import { officersList } from "@/src/types/FakeOfficersData";
import { Officer } from "@/src/types/Officer";


export default function OfficersPage() {
    const executive_board:Officer[] = officersList.filter((officer:Officer) => officer.role_type == "executive");
    const chairs_list:Officer[] = officersList.filter((officer:Officer) => officer.role_type == "chair");


    return(
    <main className='min-h-content'>
        {/*Hero/title section*/}
        <div className='bg-gray-100'>
            <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-8 sm:py-10'>
                <h1 className='text-vt-maroon text-4xl font-vt-bold'>Our Officers</h1>
                
                <p className="mt-3 text-sm sm:text-base text-vt-hokieStone max-w-2xl">
                Meet the dedicated leaders supporting Virginia Tech&apos;s military-connected community. 
                Feel free to reach out with any questions or to get involved in the organization
                </p>

                {/* buttons - column on mobile, row on desktop */}
                <div className='mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4'>
                    <a href='#executive-board'>
                        <button className="w-full sm:w-auto px-4 py-3 p-3 bg-vt-impactOrange text-white font-bold rounded-md hover:cursor-pointer hover:bg-vt-maroon">Executive Board</button>
                    </a>
                    <a href='#chairs'>
                        <button className="w-full sm:w-auto px-4 py-3 p-3 bg-gray-200 text-vt-hokieStone font-bold rounded-md hover:cursor-pointer hover:bg-vt-maroon hover:text-white">Chairs</button>
                    </a>
                </div>
            </div>
        </div>

        {/*executive board*/}
        <section id="executive-board" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 mt-8 sm:mt-10 mb-10">
            <h2 className="text-vt-maroon text-xl sm:text-2xl font-vt-extrabold">Executive Board</h2>
            {/*card grid*/}
            <div className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6'>
                {executive_board ? executive_board.map((officer:Officer, i:number) => 
                    <OfficerCard 
                        key={i} 
                        headshot_href={officer.headshot_href} 
                        name={officer.name} 
                        role={officer.role} 
                        role_type={officer.role_type} 
                        email={officer.email} 
                        description={officer.description} 
                        branch={officer.branch}/>
                    ) : 
                    <></>
                }
            </div>
        </section>

        {/*chairs*/}
        <section id='chairs' className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 mt-8 sm:mt-10 mb-10">
            <h1 className="text-vt-maroon text-xl sm:text-2xl font-vt-extrabold">Chairs</h1>
            <div className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6'>
                {chairs_list ? chairs_list.map((officer:Officer, i:number) =>
                <OfficerCard 
                    key={i}
                    headshot_href={officer.headshot_href} 
                    name={officer.name} 
                    role={officer.role} 
                    role_type={officer.role_type} 
                    email={officer.email}
                    description={officer.description}
                    branch={officer.branch}/>
                ): <></>}
            </div>
        </section>
    </main>
        
    ); 
}