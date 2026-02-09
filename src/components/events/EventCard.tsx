"use client";

import DateCard from "@/src/components/events/DateCard";
import { Event } from "@/src/types/Event";
import { formatDate, formatTimeRange } from "@/src/utils/date";

export default function EventCard({ event }: { event: Event }) {
  return (
    <article
      className="
        flex flex-col sm:flex-row
        rounded-md overflow-hidden
        border-2 border-white/10
        bg-[#1a1e22]
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-lg
        hover:cursor-pointer
      "
    >

      {/* Date */}
      <div
        className="
          bg-[#20252a]
          p-4
          flex justify-center sm:items-center
        "
      >
        <DateCard isoDate={event.startISO} />
      </div>

      {/* Event details */}
      <div className="flex-1 space-y-1 p-4">
        <h3 className="text-xl font-vt-extrabold text-white/95">
          {event.summary}
        </h3>

        <p className="text-lg text-white/85">
          {formatDate(event.startISO)}
        </p>

        <p className="text-sm sm:text-lg text-white/85">
          {formatTimeRange(event.startISO, event.endISO)}
        </p>

        {event.location && (
          <p className="text-md text-white/65">
            {event.location}
          </p>
        )}

        {event.description && (
          <p className="text-md text-white/75 leading-relaxed">
            {event.description}
          </p>
        )}
      </div>
    </article>
  );
}
