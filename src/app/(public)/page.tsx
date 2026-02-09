import Image from "next/image";
import Link from "next/link";
import Reveal from "../../components/animations/Reveal";

type UpcomingEvent = {
  title: string;
  subtitle?: string;
  dateLabel: string; // e.g., "Fri, Aug. 30"
};

const upcoming: UpcomingEvent[] = [
  { title: "Football Tailgate", subtitle: "Nerdp bunchmatec", dateLabel: "Fri, Aug. 30" },
  { title: "Laser Tag Night", subtitle: "Noh: aummatace", dateLabel: "Thu, Sept. 5" },
];

export default function Home() {
  return (
    <main className="font-[var(--font-vt-normal)]">
      {/* HERO */}
      <section aria-label="Veterans@VT introduction" className="w-full">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8">
          <Reveal>
            <div className="rounded-2xl bg-gradient-to-br from-vt-maroon/40 via-vt-impactOrange/25 to-vt-hokieStone/30 p-[1px] transition-all duration-300 hover:shadow-xl">
              <div className="relative overflow-hidden rounded-2xl bg-black/5 dark:bg-[#1a1e22]">
            {/* Background image */}
            <div className="relative min-h-[360px] sm:min-h-[420px] lg:min-h-[520px] transition-transform duration-500 hover:scale-[1.01]">
              <Image
                src="/bg_image_vets.jpg"
                alt="Homepage Background"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                className="object-cover object-center"
              />
              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15 dark:from-black/75 dark:via-black/45" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Hero content */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full px-5 sm:px-8 lg:px-12">
                <div className="max-w-2xl">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/90">
                    Veterans@VT
                  </p>
                  <h1 className="mt-3 text-balance text-4xl font-[var(--font-vt-extrabold)] tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.05]">
                    Supporting Virginia Tech&apos;s
                    <br />
                    Military-Connected Community
                  </h1>

                  <p className="mt-4 max-w-xl text-pretty text-base text-white/95 sm:text-lg">
                    A safe, welcoming space for veterans, service members, and their dependents at VT
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <Link
                      href="/events"
                      className="inline-flex min-w-[170px] items-center justify-center rounded-md bg-vt-maroon px-6 py-3.5 text-base font-semibold text-white shadow-sm ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      View Events
                    </Link>

                    <Link
                      href="/contact"
                      className="inline-flex min-w-[170px] items-center justify-center rounded-md bg-vt-impactOrange px-6 py-3.5 text-base font-semibold text-white shadow-sm ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      Get Involved
                    </Link>
                  </div>
                </div>
              </div>
            </div>
              </div>
            </div>
          </Reveal>

{/* Spacer */}
          <div className="h-10 sm:h-12" />
        </div>
      </section>

      {/* MISSION + STUDY SPACE */}
      <section
        aria-label="Mission and study space"
        className="w-full bg-vt-smoke/60 py-10 sm:py-12 dark:bg-[#14171a]"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
            {/* Our Mission */}
            <Reveal delayMs={50}>
              <div className="flex h-full flex-col justify-center rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#1a1e22] sm:p-8">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-vt-maroon/10 text-vt-maroon"
                  >
                    VT
                  </span>
                  <h2 className="text-2xl font-[var(--font-vt-bold)] text-vt-maroon dark:text-white">
                    Our Mission
                  </h2>
                </div>

                <p className="mt-4 text-base leading-7 text-black/85 dark:text-white/90">
                  Veterans@VT supports military-connected students in the transition of veterans and
                  reservists from their time in service to civilian and student life at Virginia Tech.
                </p>

                <ul className="mt-5 space-y-2 text-base text-black/85 dark:text-white/90">
                  <li className="flex gap-2">
                    <span aria-hidden className="mt-0.5 text-vt-impactOrange">✓</span>
                    <span>Community &amp; belonging</span>
                  </li>
                  <li className="flex gap-2">
                    <span aria-hidden className="mt-0.5 text-vt-impactOrange">✓</span>
                    <span>Academic and personal support</span>
                  </li>
                  <li className="flex gap-2">
                    <span aria-hidden className="mt-0.5 text-vt-impactOrange">✓</span>
                    <span>Events, advocacy, and outreach</span>
                  </li>
                </ul>

                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/calendar"
                    className="inline-flex items-center justify-center rounded-md bg-vt-maroon px-6 py-3.5 text-base font-semibold text-white shadow-sm ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-maroon"
                  >
                    View Calendar
                  </Link>
                  <Link
                    href="/events"
                    className="inline-flex items-center justify-center rounded-md bg-vt-impactOrange px-6 py-3.5 text-base font-semibold text-white shadow-sm ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-impactOrange"
                  >
                    View Events
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Veterans Study Space card */}
            <Reveal delayMs={120}>
              <div className="flex h-full flex-col rounded-2xl border border-black/10 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#1a1e22]">
                <div className="relative h-44 overflow-hidden rounded-t-2xl sm:h-56">
                  {/* <Image
                    src="" 
                    alt="Students sitting and studying together"
                    fill
                    className="object-cover"
                  /> */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(134,31,65,0.18),_transparent_55%)]" />
                  <div className="absolute inset-0 bg-gradient-to-br from-vt-maroon/10 via-transparent to-vt-impactOrange/10" />
                </div>

                <div className="flex h-full flex-col justify-center p-6 sm:p-8">
                  <h3 className="text-2xl font-[var(--font-vt-bold)] text-vt-maroon dark:text-white">
                    Veterans Study Space
                  </h3>
                  <p className="mt-1 text-base text-black/75 dark:text-white/85">
                    VetZone @ Johnson Student Center
                  </p>

                  <ul className="mt-4 space-y-2 text-base text-black/85 dark:text-white/90">
                    <li className="flex gap-2">
                      <span aria-hidden className="mt-0.5 text-vt-impactOrange">•</span>
                      <span>Vet lounge with free printers, computers, TV, and more</span>
                    </li>
                  </ul>

                  <div className="mt-6 flex justify-center">
                    <Link
                      href="https://www.veterans.vt.edu/students/vetzone.html"
                      className="inline-flex items-center justify-center rounded-md bg-vt-impactOrange px-6 py-3.5 text-base font-semibold text-white shadow-sm ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-impactOrange"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>

          <div className="h-10 sm:h-12" />
        </div>
      </section>

      {/* UPCOMING EVENTS + ABOUT */}
      <section aria-label="Upcoming events and about" className="w-full py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 pb-4">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
            {/* Upcoming Events */}
            <Reveal delayMs={60}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#1a1e22]">
                <div className="flex items-center gap-3 bg-vt-maroon px-6 py-4 text-white">
                  <span aria-hidden className="text-lg">📅</span>
                  <h2 className="text-xl font-[var(--font-vt-bold)]">Upcoming Events</h2>
                </div>

                <div className="flex h-full flex-col p-6">
                  <ul className="space-y-4">
                    {upcoming.map((e) => (
                      <li
                        key={`${e.title}-${e.dateLabel}`}
                        className="flex items-start justify-between gap-4 rounded-xl border border-black/10 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-vt-impactOrange/40 hover:bg-vt-smoke/60 dark:border-white/10 dark:bg-[#20252a] dark:hover:bg-[#2a3036]"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-md border border-black/10 bg-black/5 text-base dark:border-white/10 dark:bg-white/10"
                            aria-hidden
                          >
                            🗓️
                          </div>
                          <div>
                            <p className="text-base font-semibold">{e.title}</p>
                            {e.subtitle ? (
                              <p className="text-sm text-black/70 dark:text-white/85">{e.subtitle}</p>
                            ) : null}
                          </div>
                        </div>

                        <p className="shrink-0 text-base font-medium text-black/75 dark:text-white/85">
                          {e.dateLabel}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <Link
                      href="/events"
                      className="inline-flex w-full items-center justify-center rounded-md bg-vt-maroon px-6 py-3.5 text-base font-semibold text-white shadow-sm ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-maroon"
                    >
                      View Calendar
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* About */}
            <Reveal delayMs={140}>
              <div className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#1a1e22] sm:p-8">
                <h2 className="text-2xl font-[var(--font-vt-bold)] text-vt-maroon dark:text-white">
                  About Veterans@VT
                </h2>

                <p className="mt-4 text-base leading-7 text-black/85 dark:text-white/90">
                  We are a registered student organization serving veterans, reservists, active duty
                  members, and dependents at Virginia Tech.
                </p>

                <p className="mt-4 text-base leading-7 text-black/85 dark:text-white/90">
                  We are proud to be an active chapter of Student Veterans of America and a diverse,
                  welcoming community.
                </p>

                <div className="mt-6 flex justify-center">
                  <Link
                    href="/officers"
                    className="inline-flex items-center justify-center rounded-md bg-vt-burntOrange px-6 py-3.5 text-base font-semibold text-white shadow-sm ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-burntOrange"
                  >
                    Meet the Officers
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
