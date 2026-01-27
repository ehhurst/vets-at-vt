import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-top justify-between bg-zinc-50 font-sans dark:bg-black">

      <div className="relative w-full" style={{ maxHeight: '33.33vh', minHeight: '300px' }}>
        <div className="relative w-full" style={{ maxHeight: '33.33vh', minHeight: '300px', overflow: 'hidden' }}>
          <Image
            src="/bg_image_vets.jpg"
            alt="Homepage Background"
            width={1599}
            height={1200}
            priority
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
              minHeight: '300px',
              maxHeight: '33.33vh',
              objectFit: 'cover'
            }}
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-start justify-center px-4 sm:px-8 md:px-12">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4 max-w-full sm:max-w-xl md:max-w-2xl" style={{ textShadow: '0 4px 6px rgba(0,0,0,0.5)' }}>
            Supporting Virginia Tech&apos;s Military-Connected Community
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-white mb-4 sm:mb-6 md:mb-8 max-w-full sm:max-w-xl md:max-w-2xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            A safe, welcoming space for veterans, service members, and dependents at VT
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <a 
              href="/contact" 
              className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-vt-impactOrange text-white text-sm sm:text-base font-bold rounded-lg hover:bg-vt-maroon transition text-center"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
            >
              Get Involved
            </a>
            <a 
              href="/about" 
              className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-vt-impactOrange text-white text-sm sm:text-base font-bold rounded-lg hover:bg-vt-maroon transition text-center"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      <div className="bg-red-300 p-4 sm:p-6 md:p-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl">Middle</h1>
      </div>

      <div className="bg-green-500 p-4 sm:p-6 md:p-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl">Bottom</h1>
      </div>

    </div>
  );
}