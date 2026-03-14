"use client";

import EventCard from "@/components/events/EventCard";
import { Event } from "@/types/Event";
import { fakeCalendarResponse } from "@/types/FakeCalendarResponse";
import { useMemo, useState } from "react";
import EventsFilter, { EventsFilters } from "@/components/events/EventsFilter";
import Link from "next/link";
import Reveal from "@/components/animations/Reveal";

function isOnlineLocation(location?: string) {
  if (!location) return false;
  const s = location.toLowerCase();
  return s.includes("zoom") || s.includes("teams") || s.includes("online") || s.includes("virtual");
}

function applyFilters(events: Event[], filters: EventsFilters) {
  const now = new Date();

  const end = new Date(now);
  if (filters.timeRange === "NEXT_30_DAYS") end.setDate(end.getDate() + 30);
  if (filters.timeRange === "THIS_MONTH") end.setMonth(end.getMonth() + 1);
  if (filters.timeRange === "NEXT_6_MONTHS") end.setMonth(end.getMonth() + 6);
  console.log(events, filters);
  return events;

    // .filter((e) => {
    //   const start = new Date(e.startISO);
    //   if (Number.isNaN(start.getTime())) return false;
    //   return start >= now && start <= end;
    // })
    // .filter((e) => {
    //   if (filters.location === "ALL") return true;
    //   const online = isOnlineLocation(e.location);
    //   return filters.location === "ONLINE" ? online : !online;
    // });
}

export default function PublicEventsPage() {

  const [filters, setFilters] = useState<EventsFilters>({
    timeRange: "NEXT_30_DAYS",
    location: "ALL",
  });

  const events: Event[] = fakeCalendarResponse.publicEvents;
  console.log(events)

  const filtered = useMemo(() => applyFilters(events, filters), [events, filters]);

  return (
    <>
      {/* hero image + title - full width gradient */}
      <section className="relative h-[220px] sm:h-[280px] md:h-[320px] w-full bg-gradient-to-br from-vt-maroon to-vt-impactOrange">
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

        <div className="relative mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 sm:px-6 lg:px-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-vt-bold text-white">Upcoming Events</h1>

          <nav aria-label="Breadcrumb" className="mt-3 text-xs sm:text-sm text-white/80">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white hover:underline underline-offset-2">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="text-white">Public Events</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* constrained content */}
      <main className="mx-auto max-w-5xl px-4 text-black/90 dark:text-white/90">
        <div className="bg-white dark:bg-[#14171a] p-4">
          <h2 className="text-2xl font-semibold text-black/95 dark:text-white/95">Join Us at Veterans@VT</h2>
          <p className="text-black/80 dark:text-white/80">
            Explore our upcoming events designed to connect, support, or to get involved.
          </p>
          <EventsFilter
            value={filters}
            onChange={setFilters}
            onClear={() => setFilters({ timeRange: "NEXT_30_DAYS", location: "ALL" })}
          />
        </div>

        <div className="flex flex-col max-w-5xl gap-4 p-4">
          {filtered.map((event, index) => (
            <Reveal key={event.uid} delayMs={80 + index * 60}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>

        <div className="flex justify-center p-4">
          <Link
            href="/login"
            className="cursor-pointer rounded-md bg-vt-maroon p-4 font-bold text-white ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg"
          >
            View Full Calendar (Requires Login)
          </Link>
        </div>
      </main>
    </>
  );
}
