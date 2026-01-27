"use client";

import EventCard from "@/src/components/events/EventCard";
import { Event } from "@/src/types/Event";
import { fakeCalendarResponse } from "@/src/types/FakeCalendarResponse";
import { useMemo, useState } from "react";
import EventsFilter, { EventsFilters } from "@/src/components/events/EventsFilter";

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
    <div className="px-4 max-w-5xl mx-auto ">
      {/* hero image + title */}
      <div> 
        <h1 className="text-3xl font-bold text-white bg-vt-maroon py-10 px-4">Upcoming Events</h1>
      </div>

      <div className=" bg-gray-100 p-4">
        <h2 className="font-semibold text-vt-maroon text-2xl">Join Us at Veterans@VT</h2>
        <p className="text-gray-600">
          Explore our upcoming events designed to connect, support, or to get involved.
        </p>
        <EventsFilter
          value={filters}
          onChange={setFilters}
          onClear={() => setFilters({ timeRange: "NEXT_30_DAYS", location: "ALL" })}
        />

      </div>

      <div className="flex flex-col gap-4 p-4">
        {filtered.map((event) => (
          <EventCard key={event.uid} event={event} />
        ))}
      </div>
      <div className='flex justify-center p-4'>
        <button className="rounded-md p-4 bg-vt-impactOrange hover:bg-vt-maroon text-white font-bold hover: cursor-pointer transition">
                View Full Calendar (Requires Login)
        </button>
    
    </div>
    </div>
  );
}

